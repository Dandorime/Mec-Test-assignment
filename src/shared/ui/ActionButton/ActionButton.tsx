import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { tokens } from '@shared/constants/tokens';
import { useButtonColor } from '@shared/lib/useButtonColor';

interface ActionButtonProps {
  onPress: () => void;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function ActionButton({ onPress, label, icon, disabled }: ActionButtonProps) {
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
        {icon}
        {label ? <Text style={styles.label}>{label}</Text> : null}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: 6,
    borderRadius: tokens.radius.full,
  },
  label: {
    color: tokens.color.text.primary,
    fontFamily: tokens.font.family.medium,
    fontSize: tokens.font.size.sm,
  },
});
