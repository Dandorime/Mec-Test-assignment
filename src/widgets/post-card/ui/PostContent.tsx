import type { Post } from "@entities/post";
import { tokens } from "@shared/constants/tokens";
import { TextButton } from "@shared/ui/TextButton";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LockedPostContent } from "./LockedPostContent";

const COMPACT_LINES = 2;
const LINE_HEIGHT = 22;

interface PostContentProps {
  post: Pick<Post, "title" | "body" | "preview" | "tier">;
  variant: "compact" | "full";
  onShowMore?: () => void;
}

export function PostContent({ post, variant, onShowMore }: PostContentProps) {
  const { title, body, preview, tier } = post;
  const isCompact = variant === "compact";
  const [isTruncated, setIsTruncated] = useState(false);

  return (
    <View style={styles.container}>
      <Text
        style={[styles.title, !isCompact && styles.titleFull]}
        numberOfLines={isCompact ? COMPACT_LINES : undefined}
      >
        {title}
      </Text>

      {tier === "paid" ? (
        <LockedPostContent />
      ) : isCompact ? (
        <View>
          <Text
            style={[styles.text, styles.hidden]}
            onTextLayout={(e) => {
              setIsTruncated(e.nativeEvent.lines.length > COMPACT_LINES);
            }}
          >
            {preview}
          </Text>

          <View>
            <Text style={styles.text} numberOfLines={COMPACT_LINES}>
              {preview}
            </Text>

            {isTruncated && onShowMore && (
              <LinearGradient
                colors={["rgba(255,255,255,0)", tokens.color.bg.card]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.13, y: 0 }}
                style={styles.overlay}
                pointerEvents="box-none"
              >
                <TextButton onPress={onShowMore}>Показать ещё</TextButton>
              </LinearGradient>
            )}
          </View>
        </View>
      ) : (
        <Text style={styles.text}>{body}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.xs,
  },
  title: {
    color: tokens.color.text.primary,
    fontFamily: tokens.font.family.bold,
    fontSize: 18,
    lineHeight: 26,
  },
  titleFull: {
    fontSize: 20,
    lineHeight: 28,
  },
  text: {
    color: tokens.color.text.primary,
    fontFamily: tokens.font.family.medium,
    fontSize: 15,
    lineHeight: LINE_HEIGHT,
  },
  hidden: {
    position: "absolute",
    opacity: 0,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: LINE_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
});
