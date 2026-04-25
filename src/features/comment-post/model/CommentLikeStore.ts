import { makeAutoObservable } from "mobx";

class CommentLikeStore {
  private likeMap = new Map<string, boolean>();
  private countMap = new Map<string, number>();

  constructor() {
    makeAutoObservable(this);
  }

  init(commentId: string, initialCount: number): void {
    if (!this.countMap.has(commentId)) {
      this.countMap.set(commentId, initialCount);
    }
  }

  toggle(commentId: string): void {
    const liked = this.isLiked(commentId);
    this.likeMap.set(commentId, !liked);
    const current = this.countMap.get(commentId) ?? 0;
    this.countMap.set(commentId, liked ? Math.max(0, current - 1) : current + 1);
  }

  isLiked(commentId: string): boolean {
    return this.likeMap.get(commentId) ?? false;
  }

  getCount(commentId: string): number {
    return this.countMap.get(commentId) ?? 0;
  }
}

export const commentLikeStore = new CommentLikeStore();
