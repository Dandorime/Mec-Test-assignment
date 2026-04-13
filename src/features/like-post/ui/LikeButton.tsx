import { feedStore, type Post } from "@entities/post";
import LikeBorder from "@shared/assets/svgs/like_border.svg";
import LikeSolid from "@shared/assets/svgs/like_solid.svg";
import { tokens } from "@shared/constants/tokens";
import { useButtonColor } from "@shared/lib/useButtonColor";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";
import { useLikePost } from "../model/useLikePost";

interface LikeButtonProps {
  post: Post;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export const LikeButton = observer(function LikeButton({
  post,
}: LikeButtonProps) {
  const { isLiked, likesCount } = feedStore.getLikeState(post);
  const { toggle, isPending } = useLikePost(post);

  const isLikedRef = useRef(isLiked);
  isLikedRef.current = isLiked;

  const { bgStyle, onPressIn, onPressOut, animateTo } = useButtonColor({
    getDefault: () =>
      isLikedRef.current
        ? tokens.button.like.active.default
        : tokens.button.like.inactive.default,
    getPressed: () =>
      isLikedRef.current
        ? tokens.button.like.active.pressed
        : tokens.button.like.inactive.pressed,
  });

  useEffect(() => {
    animateTo(
      isLiked
        ? tokens.button.like.active.default
        : tokens.button.like.inactive.default,
    );
  }, [isLiked, animateTo]);

  return (
    <Pressable
      onPress={toggle}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={isPending}
      hitSlop={4}
    >
      <Animated.View style={[styles.container, bgStyle]}>
        {isLiked ? (
          <LikeSolid width={24} height={24} />
        ) : (
          <LikeBorder width={24} height={24} />
        )}
        <Text style={[styles.count, isLiked && styles.countActive]}>
          {formatCount(likesCount)}
        </Text>
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingLeft: 6,
    paddingRight: 12,
    gap: 4,
    borderRadius: tokens.radius.full,
  },
  count: {
    color: tokens.color.text.secondary,
    fontFamily: tokens.font.family.bold,
    fontSize: tokens.font.size.sm,
    lineHeight: 18,
  },
  countActive: {
    color: tokens.color.text.onAccent,
  },
});
