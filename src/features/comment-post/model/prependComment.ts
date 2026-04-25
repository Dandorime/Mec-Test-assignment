import type { Comment, PaginatedComments } from "@entities/post";
import type { InfiniteData } from "@tanstack/react-query";

export function prependComment(
  old: InfiniteData<PaginatedComments> | undefined,
  newComment: Comment,
): InfiniteData<PaginatedComments> {
  if (!old) {
    return {
      pages: [{ comments: [newComment], nextCursor: null, hasMore: false }],
      pageParams: [undefined],
    };
  }
  const firstPage = old.pages[0] ?? { comments: [], nextCursor: null, hasMore: false };
  if (firstPage.comments.some((c) => c.id === newComment.id)) return old;
  return {
    ...old,
    pages: [
      { ...firstPage, comments: [newComment, ...firstPage.comments] },
      ...old.pages.slice(1),
    ],
  };
}
