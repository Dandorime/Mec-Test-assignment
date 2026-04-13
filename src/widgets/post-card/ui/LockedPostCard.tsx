import DonateSolid from "@shared/assets/svgs/donate_solid.svg";
import { tokens } from "@shared/constants/tokens";
import { PrimaryButton } from "@shared/ui/PrimaryButton";
import { Skeleton } from "@shared/ui/Skeleton";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface LockedPostCardProps {
  coverUrl?: string;
  onDonate: () => void;
}

export function LockedPostCard({ coverUrl, onDonate }: LockedPostCardProps) {
  return (
    <>
      <View style={styles.visual}>
        {coverUrl ? (
          <Image
            source={{ uri: coverUrl }}
            style={styles.cover}
            contentFit="cover"
            blurRadius={40}
          />
        ) : (
          <View style={styles.placeholder} />
        )}

        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <View style={styles.iconWrapper}>
              <DonateSolid width={30} height={30} />
            </View>
            <Text style={styles.title}>
              {"Контент скрыт пользователем.\nДоступ откроется после доната"}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <PrimaryButton
              fullWidth
              label="Отправить донат"
              onPress={onDonate}
            />
          </View>
        </View>
      </View>

      <View style={styles.skeletonBlock}>
        <Skeleton borderRadius={tokens.radius.full} height={26} width="40%" />
        <Skeleton borderRadius={tokens.radius.full} height={40} width="98%" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  visual: {
    aspectRatio: 1,
    overflow: "hidden",
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: tokens.color.bg.secondary,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.xl,
  },
  overlayContent: {
    gap: tokens.spacing.xs,
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: tokens.color.accent.primary,
    padding: tokens.spacing.xxs,
    borderRadius: tokens.radius.sm,
  },
  buttonWrapper: {
    alignSelf: "stretch",
  },
  title: {
    color: tokens.color.text.onAccent,
    fontFamily: tokens.font.family.bold,
    fontSize: tokens.font.size.md,
    textAlign: "center",
  },
  skeletonBlock: {
    paddingHorizontal: tokens.spacing.md,
    paddingTop: tokens.spacing.sm,
    paddingBottom: tokens.spacing.md,
    gap: tokens.spacing.sm,
  },
});
