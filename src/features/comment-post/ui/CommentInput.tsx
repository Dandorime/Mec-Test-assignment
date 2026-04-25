import SendIcon from "@shared/assets/svgs/button_chat-message.svg";
import { tokens } from "@shared/constants/tokens";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CommentInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function CommentInput({
  value,
  onChangeText,
  onSubmit,
  disabled,
}: CommentInputProps) {
  const { bottom } = useSafeAreaInsets();
  const canSend = value.trim().length > 0 && !disabled;
  return (
    <View
      style={[styles.container, { paddingBottom: bottom + tokens.spacing.xs }]}
    >
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Написать комментарий"
        placeholderTextColor={tokens.color.text.placeholder}
        returnKeyType="send"
        onSubmitEditing={onSubmit}
        submitBehavior="blurAndSubmit"
        editable={!disabled}
        multiline={false}
      />
      <Pressable
        onPress={onSubmit}
        disabled={!canSend}
        style={[styles.sendBtn]}
        hitSlop={4}
      >
        {({ pressed }) => (
          <SendIcon
            color={
              !canSend
                ? tokens.button.primary.disabled
                : pressed
                  ? tokens.button.primary.pressed
                  : tokens.color.accent.primary
            }
            width={30}
            height={30}
          />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    gap: 10,
    backgroundColor: tokens.color.bg.secondary,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: tokens.spacing.sm,
    borderRadius: tokens.radius.full,
    fontFamily: tokens.font.family.medium,
    fontSize: tokens.font.size.md,
    lineHeight: 20,
    color: tokens.color.text.primary,
    borderColor: tokens.color.border,
    borderWidth: 2,
  },
  sendBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
