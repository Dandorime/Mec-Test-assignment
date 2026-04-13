import { tokens } from "@shared/constants/tokens";
import React, { useCallback } from "react";
import { Pressable } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface TextButtonProps {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function TextButton({
  onPress,
  disabled = false,
  children,
}: TextButtonProps) {
  const defaultColor = disabled
    ? tokens.button.primary.disabled
    : tokens.button.primary.default;

  const color = useSharedValue(defaultColor);

  const colorStyle = useAnimatedStyle(() => ({ color: color.value }));

  const onPressIn = useCallback(() => {
    if (disabled) return;
    cancelAnimation(color);
    color.value = withTiming(tokens.button.primary.pressed, { duration: 80 });
  }, [color, disabled]);

  const onPressOut = useCallback(() => {
    if (disabled) return;
    cancelAnimation(color);
    color.value = withTiming(tokens.button.primary.default, { duration: 150 });
  }, [color, disabled]);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      hitSlop={4}
    >
      <Animated.Text style={[styles.text, colorStyle]}>
        {children}
      </Animated.Text>
    </Pressable>
  );
}

const styles = {
  text: {
    fontFamily: tokens.font.family.medium,
    fontSize: tokens.font.size.md,
    lineHeight: 20,
  },
} as const;
