import { tokens } from "@shared/constants/tokens";
import ErrorPet from "@shared/ui/ErrorState/ErrorPet";
import React from "react";
import { StyleSheet, View } from "react-native";

interface PostContentErrorProps {
  onRetry: () => void;
  loading?: boolean;
}

export function PostContentError({ onRetry, loading }: PostContentErrorProps) {
  return (
    <View style={styles.container}>
      <ErrorPet
        onRetry={onRetry}
        title="Не удалось загрузить публикацию"
        buttonText="Повторить"
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: tokens.color.bg.card,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
  },
});
