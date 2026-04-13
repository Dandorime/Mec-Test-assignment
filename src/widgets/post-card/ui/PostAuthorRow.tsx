import type { Author } from "@entities/post";
import { tokens } from "@shared/constants/tokens";
import { Avatar } from "@shared/ui/Avatar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PostAuthorRowProps {
  author: Author;
}

export function PostAuthorRow({ author }: PostAuthorRowProps) {
  return (
    <View style={styles.row}>
      <Avatar uri={author.avatarUrl} displayName={author.displayName} />
      <Text style={styles.displayName} numberOfLines={1}>
        {author.displayName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    paddingTop: tokens.spacing.sm,
    paddingBottom: tokens.spacing.md,
  },
  displayName: {
    color: tokens.color.text.primary,
    fontFamily: tokens.font.family.bold,
    fontSize: tokens.font.size.md,
    flexShrink: 1,
  },
});
