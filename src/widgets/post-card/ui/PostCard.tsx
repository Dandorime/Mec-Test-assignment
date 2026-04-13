import type { Post } from "@entities/post";
import { tokens } from "@shared/constants/tokens";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { LockedPostCard } from "./LockedPostCard";
import { PostActions } from "./PostActions";
import { PostAuthorRow } from "./PostAuthorRow";
import { PostContent } from "./PostContent";
import { PostCover } from "./PostCover";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const navigateToPost = () => router.push(`/post/${post.id}`);

  return (
    <View style={styles.card}>
      <PostAuthorRow author={post.author} />

      {post.tier === "paid" ? (
        <LockedPostCard
          coverUrl={post.coverUrl ?? undefined}
          onDonate={() => {}}
        />
      ) : (
        <>
          {post.coverUrl ? (
            <Pressable onPress={navigateToPost}>
              <PostCover uri={post.coverUrl} />
            </Pressable>
          ) : null}

          <View style={styles.postBlock}>
            <Pressable onPress={navigateToPost}>
              <PostContent
                post={post}
                variant="compact"
                onShowMore={navigateToPost}
              />
            </Pressable>

            <PostActions post={post} onCommentPress={navigateToPost} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.color.bg.card,
    borderRadius: tokens.radius.md,
  },
  postBlock: {
    paddingHorizontal: tokens.spacing.md,
    paddingTop: tokens.spacing.xs,
    paddingBottom: tokens.spacing.sm,
    gap: tokens.spacing.md,
  },
});
