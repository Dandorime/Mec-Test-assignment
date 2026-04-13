import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { tokens } from '@shared/constants/tokens';

interface AvatarProps {
  uri: string | null;
  displayName: string;
  size?: number;
}

export function Avatar({ uri, displayName, size = tokens.avatar.md }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  if (!uri || hasError) {
    return (
      <View style={[styles.fallback, containerStyle]}>
        <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{initials}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={containerStyle}
      contentFit="cover"
      onError={() => setHasError(true)}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: tokens.color.accent.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: tokens.color.text.primary,
    fontFamily: tokens.font.family.bold,
  },
});
