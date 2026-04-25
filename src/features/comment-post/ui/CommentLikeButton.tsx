import LikeBorder from "@shared/assets/svgs/like_border.svg";
import LikeSolid from "@shared/assets/svgs/like_solid.svg";
import { tokens } from "@shared/constants/tokens";
import { formatCount } from "@shared/lib/formatCount";
import * as Haptics from "expo-haptics";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { commentLikeStore } from "../model/CommentLikeStore";

interface CommentLikeButtonProps {
  commentId: string;
  initialLikesCount?: number;
}

export const CommentLikeButton = observer(function CommentLikeButton({
  commentId,
  initialLikesCount = 0,
}: CommentLikeButtonProps) {
  const isLiked = commentLikeStore.isLiked(commentId);
  const count = commentLikeStore.getCount(commentId);

  useEffect(() => {
    commentLikeStore.init(commentId, initialLikesCount);
  }, [commentId, initialLikesCount]);

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        commentLikeStore.toggle(commentId);
      }}
      hitSlop={8}
    >
      <View style={styles.container}>
        {isLiked ? (
          <LikeSolid color={tokens.color.like} width={24} height={24} />
        ) : (
          <LikeBorder width={24} height={24} />
        )}
        <Text style={styles.count}>{formatCount(count)}</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  count: {
    color: tokens.color.text.secondary,
    fontFamily: tokens.font.family.bold,
    fontSize: tokens.font.size.sm,
    lineHeight: 18,
  },
});
