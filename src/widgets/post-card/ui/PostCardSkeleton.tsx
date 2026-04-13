import { tokens } from "@shared/constants/tokens";
import { Skeleton } from "@shared/ui/Skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

export function PostCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.authorRow}>
        <Skeleton
          width={tokens.avatar.md}
          height={tokens.avatar.md}
          borderRadius={tokens.radius.full}
        />
        <Skeleton width={120} height={20} />
      </View>

      <Skeleton width="100%" style={styles.cover} borderRadius={0} />

      <View style={styles.postBlock}>
        <View style={styles.lines}>
          <Skeleton width="40%" borderRadius={tokens.radius.full} height={26} />
          <Skeleton
            width="100%"
            borderRadius={tokens.radius.full}
            height={20}
          />
        </View>

        <View style={styles.actions}>
          <Skeleton width={64} height={36} borderRadius={tokens.radius.full} />
          <Skeleton width={64} height={36} borderRadius={tokens.radius.full} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.color.bg.card,
    borderRadius: tokens.radius.md,
    overflow: "hidden",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    paddingTop: tokens.spacing.sm,
    paddingBottom: tokens.spacing.md,
  },
  cover: {
    aspectRatio: 1,
    height: undefined,
  },
  postBlock: {
    paddingHorizontal: tokens.spacing.md,
    paddingTop: tokens.spacing.xs,
    paddingBottom: tokens.spacing.sm,
    gap: tokens.spacing.md,
  },
  lines: {
    gap: tokens.spacing.xs,
  },
  actions: {
    flexDirection: "row",
    gap: tokens.spacing.xs,
  },
});
