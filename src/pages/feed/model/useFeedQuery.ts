import { useInfiniteQuery } from '@tanstack/react-query';
import { postApi, postQueryKeys, type PaginatedPosts } from '@entities/post';

export function useFeedQuery() {
  return useInfiniteQuery<PaginatedPosts, Error>({
    queryKey: postQueryKeys.feed,
    queryFn: ({ pageParam }) =>
      postApi.getPosts({ cursor: pageParam as string | undefined }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
  });
}
