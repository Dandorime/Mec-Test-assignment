import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { feedStore, postApi } from '@entities/post';
import type { Post } from '@entities/post';

export function useLikePost(post: Post) {
  const { mutate, isPending } = useMutation({
    mutationFn: () => postApi.likePost(post.id),
    onMutate: () => {
      feedStore.optimisticToggle(post);
    },
    onError: () => {
      feedStore.revert(post);
    },
  });

  const toggle = useCallback(() => {
    if (!isPending) {
      mutate();
    }
  }, [mutate, isPending]);

  return { toggle, isPending };
}
