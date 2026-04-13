import { tokens } from "@shared/constants/tokens";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function LockedPostContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔒</Text>
      <Text style={styles.title}>Платный контент</Text>
      <Text style={styles.subtitle}>
        Поддержите автора, чтобы прочитать этот пост
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.color.bg.secondary,
    borderRadius: tokens.radius.md,
    paddingVertical: tokens.spacing.lg,
    paddingHorizontal: tokens.spacing.md,
    alignItems: "center",
    gap: tokens.spacing.sm,
  },
  icon: {
    fontSize: 22,
  },
  title: {
    color: tokens.color.text.primary,
    fontFamily: tokens.font.family.semiBold,
    fontSize: tokens.font.size.md,
  },
  subtitle: {
    color: tokens.color.text.secondary,
    fontFamily: tokens.font.family.regular,
    fontSize: tokens.font.size.sm,
    textAlign: "center",
    lineHeight: tokens.font.size.sm * 1.5,
  },
});
