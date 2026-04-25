import type { Comment } from "@entities/post";
import { tokens } from "@shared/constants/tokens";
import { Avatar } from "@shared/ui/Avatar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CommentLikeButton } from "./CommentLikeButton";

interface CommentItemProps {
  comment: Comment;
}

function formatAge(createdAt: string): string {
  const diff = (Date.now() - new Date(createdAt).getTime()) / 1000;
  if (diff < 60) return "только что";
  if (diff < 3600) return `${Math.floor(diff / 60)} мин.`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ч.`;
  return `${Math.floor(diff / 86400)} дн.`;
}

export const CommentItem = React.memo(function CommentItem({
  comment,
}: CommentItemProps) {
  const author = comment.author;
  if (!author) return null;

  return (
    <View style={styles.row}>
      <Avatar
        uri={author.avatarUrl}
        displayName={author.displayName}
        size={tokens.avatar.md}
      />
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {author.displayName}
        </Text>
        <Text style={styles.text}>{comment.text}</Text>
      </View>
      <CommentLikeButton
        commentId={comment.id}
        initialLikesCount={comment.likesCount ?? 0}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.xs,
    gap: tokens.spacing.sm,
    alignItems: "center",
  },
  body: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: tokens.font.family.bold,
    fontSize: tokens.font.size.md,
    lineHeight: 20,
    color: tokens.color.text.primary,
    flexShrink: 1,
  },
  age: {
    fontFamily: tokens.font.family.regular,
    fontSize: tokens.font.size.xs,
    color: tokens.color.text.secondary,
  },
  text: {
    fontFamily: tokens.font.family.medium,
    fontSize: 14,
    color: tokens.color.text.primary,
    lineHeight: 20,
  },
});
