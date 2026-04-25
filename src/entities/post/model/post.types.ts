export interface Author {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
  subscribersCount: number;
  isVerified: boolean;
}

export type PostTier = 'free' | 'paid';

export interface Post {
  id: string;
  author: Author;
  title: string;
  body: string;
  preview: string;
  coverUrl: string | null;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: PostTier;
  createdAt: string;
}

export interface PaginatedPosts {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: Author;
  text: string;
  likesCount?: number;
  createdAt: string;
}

export interface PaginatedComments {
  comments: Comment[];
  nextCursor: string | null;
  hasMore: boolean;
}

export type WsEvent =
  | { type: 'ping' }
  | { type: 'like_updated'; postId: string; likesCount: number }
  | { type: 'comment_added'; postId: string; comment: Comment };

export interface ApiResponse<T> {
  ok: true;
  data: T;
}

export interface ApiError {
  ok: false;
  error: {
    code: string;
    message: string;
  };
}
