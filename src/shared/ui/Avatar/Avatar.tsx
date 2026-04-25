import { tokens } from '@shared/constants/tokens';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AvatarProps {
  uri: string | null;
  displayName: string;
  size?: number;
}

export function Avatar({ uri, displayName, size = tokens.avatar.md }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const initials = displayName
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    overflow: 'hidden' as const,
  };

  return (
    <View style={[styles.fallback, containerStyle]}>
      <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{initials}</Text>
      {uri && !hasError && (
        <Image
          source={{ uri }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={200}
          onError={() => setHasError(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: tokens.color.accent.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: tokens.color.text.onAccent,
    fontFamily: tokens.font.family.bold,
  },
});
