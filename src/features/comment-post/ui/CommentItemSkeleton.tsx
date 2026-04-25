import { tokens } from "@shared/constants/tokens";
import { Skeleton } from "@shared/ui/Skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

export function CommentItemSkeleton() {
  return (
    <View style={styles.row}>
      <Skeleton
        width={tokens.avatar.sm}
        height={tokens.avatar.sm}
        borderRadius={tokens.radius.full}
      />
      <View style={styles.body}>
        <View style={styles.header}>
          <Skeleton width={88} height={12} borderRadius={tokens.radius.full} />
          <Skeleton width={36} height={10} borderRadius={tokens.radius.full} />
        </View>
        <Skeleton width="90%" height={14} borderRadius={tokens.radius.full} />
      </View>
      <View style={styles.likeArea}>
        <Skeleton width={24} height={24} borderRadius={tokens.radius.full} />
        <Skeleton width={20} height={12} borderRadius={tokens.radius.full} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.xs,
    gap: tokens.spacing.xs,
    alignItems: "center",
  },
  body: {
    flex: 1,
    gap: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.xs,
  },
  likeArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
