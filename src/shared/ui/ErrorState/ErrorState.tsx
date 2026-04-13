import { tokens } from "@shared/constants/tokens";
import React from "react";
import { StyleSheet, View } from "react-native";
import ErrorPet from "./ErrorPet";

interface ErrorStateProps {
  message?: string;
  buttonText?: string;
  loading?: boolean;
  onRetry: () => void;
}

export function ErrorState({
  onRetry,
  message,
  buttonText,
  loading,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <ErrorPet
        onRetry={onRetry}
        title={message || "По вашему запросу ничего не найдено"}
        buttonText={buttonText || "На главную"}
        loading={loading || false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: tokens.color.bg.card,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: tokens.spacing.md,
  },
});
