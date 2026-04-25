import { postQueryKeys } from '@entities/post';
import type { PaginatedComments, Post, WsEvent } from '@entities/post';
import { prependComment } from '@features/comment-post';
import { buildWsUrl, wsService } from '@shared/lib/wsService';
import { useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export function usePostRealtime(postId: string) {
  const queryClient = useQueryClient();
  const postIdRef = useRef(postId);
  postIdRef.current = postId;

  useEffect(() => {
    wsService.connect(buildWsUrl());

    const unsubscribe = wsService.subscribe((event: WsEvent) => {
      const pid = postIdRef.current;

      if (event.type === 'like_updated' && event.postId === pid) {
        queryClient.setQueryData<Post>(postQueryKeys.post(pid), (old) => {
          if (!old) return old;
          return { ...old, likesCount: event.likesCount };
        });
      }

      if (event.type === 'comment_added' && event.postId === pid) {
        const existing = queryClient.getQueryData<InfiniteData<PaginatedComments>>(
          postQueryKeys.comments(pid),
        );
        const isDuplicate =
          existing?.pages.some((p) =>
            p.comments.some((c) => c.id === event.comment.id),
          ) ?? false;

        if (!isDuplicate) {
          queryClient.setQueryData<InfiniteData<PaginatedComments>>(
            postQueryKeys.comments(pid),
            (old) => prependComment(old, event.comment),
          );
          queryClient.setQueryData<Post>(postQueryKeys.post(pid), (old) =>
            old ? { ...old, commentsCount: old.commentsCount + 1 } : old,
          );
        }
      }
    });

    return () => {
      unsubscribe();
      wsService.disconnect();
    };
  }, [queryClient]);
}
