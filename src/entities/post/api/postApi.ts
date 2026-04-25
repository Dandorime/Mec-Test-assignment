import { apiClient } from "@shared/api/client";
import type { ApiResponse, Comment, PaginatedComments, PaginatedPosts, Post, PostTier } from "../model/post.types";

interface SinglePostResponse {
  post: Post;
}

interface SingleCommentResponse {
  comment: Comment;
}

export interface FetchPostsParams {
  cursor?: string;
  limit?: number;
  tier?: PostTier;
}

export interface FetchCommentsParams {
  cursor?: string;
  limit?: number;
}

export const postApi = {
  getPosts: async (params: FetchPostsParams = {}): Promise<PaginatedPosts> => {
    const response = await apiClient.get<ApiResponse<PaginatedPosts>>(
      "/posts",
      {
        params: {
          limit: params.limit ?? 10,
          ...(params.cursor ? { cursor: params.cursor } : {}),
          ...(params.tier ? { tier: params.tier } : {}),
        },
      },
    );
    return response.data.data;
  },

  getPost: async (id: string): Promise<Post> => {
    const response = await apiClient.get<ApiResponse<SinglePostResponse>>(`/posts/${id}`);
    return response.data.data.post;
  },

  likePost: async (id: string): Promise<void> => {
    await apiClient.post(`/posts/${id}/like`);
  },

  getComments: async (postId: string, params: FetchCommentsParams = {}): Promise<PaginatedComments> => {
    const response = await apiClient.get<ApiResponse<PaginatedComments>>(
      `/posts/${postId}/comments`,
      {
        params: {
          limit: params.limit ?? 20,
          ...(params.cursor ? { cursor: params.cursor } : {}),
        },
      },
    );
    return response.data.data;
  },

  createComment: async (postId: string, text: string): Promise<Comment> => {
    const response = await apiClient.post<ApiResponse<SingleCommentResponse>>(
      `/posts/${postId}/comments`,
      { text },
    );
    return response.data.data.comment;
  },
};
