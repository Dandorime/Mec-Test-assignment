import type { Post } from "@entities/post";
import { CommentButton } from "@features/comment-post";
import { LikeButton } from "@features/like-post";
import { tokens } from "@shared/constants/tokens";
import React from "react";
import { StyleSheet, View } from "react-native";

interface PostActionsProps {
  post: Post;
  onCommentPress: () => void;
}

export function PostActions({ post, onCommentPress }: PostActionsProps) {
  return (
    <View style={styles.row}>
      <LikeButton post={post} />
      <CommentButton count={post.commentsCount} onPress={onCommentPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.md,
  },
});
