import { postApi, postQueryKeys } from '@entities/post';
import type { Comment, PaginatedComments, Post } from '@entities/post';
import { prependComment } from './prependComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => postApi.createComment(postId, text),
    onSuccess: (newComment: Comment) => {
      const existing = queryClient.getQueryData<InfiniteData<PaginatedComments>>(
        postQueryKeys.comments(postId),
      );
      const isDuplicate =
        existing?.pages.some((p) =>
          p.comments.some((c) => c.id === newComment.id),
        ) ?? false;

      queryClient.setQueryData<InfiniteData<PaginatedComments>>(
        postQueryKeys.comments(postId),
        (old) => prependComment(old, newComment),
      );

      if (!isDuplicate) {
        queryClient.setQueryData<Post>(
          postQueryKeys.post(postId),
          (old) => (old ? { ...old, commentsCount: old.commentsCount + 1 } : old),
        );
      }
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: postQueryKeys.comments(postId),
      });
      queryClient.setQueryData<Post>(
        postQueryKeys.post(postId),
        (old) =>
          old ? { ...old, commentsCount: Math.max(0, old.commentsCount - 1) } : old,
      );
    },
  });
}
