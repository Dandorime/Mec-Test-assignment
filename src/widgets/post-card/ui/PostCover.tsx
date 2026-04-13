import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";

interface PostCoverProps {
  uri: string;
  aspectRatio?: number;
}

export function PostCover({ uri, aspectRatio = 1 }: PostCoverProps) {
  return (
    <Image
      source={{ uri }}
      style={[styles.cover, { aspectRatio }]}
      contentFit="cover"
    />
  );
}

const styles = StyleSheet.create({
  cover: {
    width: "100%",
  },
});
