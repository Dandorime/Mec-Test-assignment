import { tokens } from "@shared/constants/tokens";
import {
  PostAuthorRow,
  PostCardSkeleton,
  PostContentError,
} from "@widgets/post-card";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePostQuery } from "../model/usePostQuery";

export function PostPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: post, isLoading, refetch, isRefetching } = usePostQuery(id);

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {isLoading && <PostCardSkeleton />}

      {post && (
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <View style={styles.card}>
            <PostAuthorRow author={post.author} />

            <PostContentError onRetry={refetch} loading={isRefetching} />

            {/* {post.coverUrl ? <PostCover uri={post.coverUrl} /> : null} */}

            {/* {isError && !isNotFoundError(error) && (
              <PostContentError onRetry={refetch} />
            )}
            <View style={styles.body}>
              <PostContent post={post} variant="full" />
              <PostActions post={post} onCommentPress={() => {}} />
            </View> */}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg.primary,
  },
  scroll: {
    flex: 1,
  },
  card: {
    backgroundColor: tokens.color.bg.card,
    borderRadius: tokens.radius.md,
    overflow: "hidden",
  },
});
