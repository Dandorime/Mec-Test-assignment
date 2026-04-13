import { apiClient } from "@shared/api/client";
import type { ApiResponse, PaginatedPosts, Post } from "../model/post.types";

interface SinglePostResponse {
  post: Post;
}

export interface FetchPostsParams {
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
};
