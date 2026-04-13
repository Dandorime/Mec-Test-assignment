import { makeAutoObservable } from "mobx";
import type { Post } from "./post.types";

interface LikeState {
  isLiked: boolean;
  likesCount: number;
}

class FeedStore {
  private likeOverrides = new Map<string, LikeState>();

  constructor() {
    makeAutoObservable(this);
  }

  optimisticToggle(post: Post): void {
    const current = this.likeOverrides.get(post.id) ?? {
      isLiked: post.isLiked,
      likesCount: post.likesCount,
    };
    const nextIsLiked = !current.isLiked;
    this.likeOverrides.set(post.id, {
      isLiked: nextIsLiked,
      likesCount: nextIsLiked ? current.likesCount + 1 : current.likesCount - 1,
    });
  }

  revert(post: Post): void {
    this.likeOverrides.delete(post.id);
  }

  getLikeState(post: Post): LikeState {
    return (
      this.likeOverrides.get(post.id) ?? {
        isLiked: post.isLiked,
        likesCount: post.likesCount,
      }
    );
  }

  clear(): void {
    this.likeOverrides.clear();
  }
}

export const feedStore = new FeedStore();
