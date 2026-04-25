import { useInfiniteQuery } from '@tanstack/react-query';
import { postApi, postQueryKeys } from '@entities/post';
import type { PaginatedComments } from '@entities/post';

export function useCommentsQuery(postId: string) {
  return useInfiniteQuery<PaginatedComments, Error>({
    queryKey: postQueryKeys.comments(postId),
    queryFn: ({ pageParam }) =>
      postApi.getComments(postId, { cursor: pageParam as string | undefined }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
  });
}
