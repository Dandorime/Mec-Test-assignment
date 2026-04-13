export const postQueryKeys = {
  feed: ['feed'] as const,
  post: (id: string) => ['post', id] as const,
};
