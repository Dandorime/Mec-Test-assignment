import { tokens } from "@shared/constants/tokens";
import { useButtonColor } from "@shared/lib/useButtonColor";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

interface PrimaryButtonProps {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function PrimaryButton({
  onPress,
  label,
  disabled,
  loading,
  fullWidth,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  const { bgStyle, onPressIn, onPressOut } = useButtonColor({
    getDefault: () => {
      if (loading) return tokens.button.primary.loading;
      if (disabled) return tokens.button.primary.disabled;
      return tokens.button.primary.default;
    },
    getPressed: () => tokens.button.primary.pressed,
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={isDisabled}
      style={{ width: fullWidth ? "100%" : undefined }}
    >
      <Animated.View style={[styles.container, bgStyle]}>
        {loading ? (
          <ActivityIndicator color="#C0A1EB" size="small" />
        ) : (
          <Text style={[styles.label, disabled && styles.labelDisabled]}>
            {label}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
  },
  label: {
    color: "#FFFFFF",
    fontFamily: tokens.font.family.semiBold,
    fontSize: tokens.font.size.md,
  },
  labelDisabled: {
    color: tokens.button.primary.default,
  },
});
