export const postQueryKeys = {
  feed: (filter = 'all') => ['feed', filter] as const,
  post: (id: string) => ['post', id] as const,
  comments: (postId: string) => ['comments', postId] as const,
};
