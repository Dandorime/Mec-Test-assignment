import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { tokens } from '@shared/constants/tokens';

interface BadgeProps {
  icon: React.ReactNode;
  count: number;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function Badge({ icon, count }: BadgeProps) {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.count}>{formatCount(count)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.xs,
  },
  count: {
    color: tokens.color.text.secondary,
    fontFamily: tokens.font.family.medium,
    fontSize: tokens.font.size.sm,
  },
});
