import PetError from "@shared/assets/svgs/pet_error.svg";
import { tokens } from "@shared/constants/tokens";
import { PrimaryButton } from "@shared/ui/PrimaryButton";
import { StyleSheet, Text, View } from "react-native";

interface ErrorPetProps {
  onRetry: () => void;
  title: string;
  buttonText: string;
  loading?: boolean;
}

export default function ErrorPet({
  onRetry,
  title,
  buttonText,
  loading,
}: ErrorPetProps) {
  return (
    <View style={styles.container}>
      <PetError width={112} height={112} />
      <Text style={styles.title}>{title}</Text>
      <PrimaryButton
        onPress={onRetry}
        label={buttonText}
        loading={loading}
        fullWidth
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: tokens.spacing.md,
    width: "100%",
  },
  title: {
    color: tokens.color.text.primary,
    fontFamily: tokens.font.family.bold,
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
  },
});
