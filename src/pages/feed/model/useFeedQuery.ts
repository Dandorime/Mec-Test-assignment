import { useInfiniteQuery } from '@tanstack/react-query';
import { postApi, postQueryKeys, type PaginatedPosts, type PostTier } from '@entities/post';

export type FeedFilter = 'all' | PostTier;

export function useFeedQuery(filter: FeedFilter = 'all') {
  const tier = filter === 'all' ? undefined : filter;

  return useInfiniteQuery<PaginatedPosts, Error>({
    queryKey: postQueryKeys.feed(filter),
    queryFn: ({ pageParam }) =>
      postApi.getPosts({ cursor: pageParam as string | undefined, tier }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
  });
}
