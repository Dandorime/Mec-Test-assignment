import CommentFill from "@shared/assets/svgs/comment_fill.svg";
import { tokens } from "@shared/constants/tokens";
import { formatCount } from "@shared/lib/formatCount";
import { useButtonColor } from "@shared/lib/useButtonColor";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

interface CommentButtonProps {
  count: number;
  onPress: () => void;
  disabled?: boolean;
}

export function CommentButton({
  count,
  onPress,
  disabled,
}: CommentButtonProps) {
  const { bgStyle, onPressIn, onPressOut } = useButtonColor({
    getDefault: () =>
      disabled ? tokens.button.action.disabled : tokens.button.action.default,
    getPressed: () => tokens.button.action.pressed,
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      hitSlop={4}
    >
      <Animated.View style={[styles.container, bgStyle]}>
        <CommentFill width={24} height={24} />
        <Text style={styles.count}>{formatCount(count)}</Text>
      </Animated.View>
    </Pressable>
  );
}

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
});
