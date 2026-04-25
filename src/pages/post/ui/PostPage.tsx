import type { Comment } from "@entities/post";
import {
  CommentInput,
  CommentItem,
  CommentItemSkeleton,
  useCommentsQuery,
  useCreateComment,
} from "@features/comment-post";
import { tokens } from "@shared/constants/tokens";
import { ErrorState } from "@shared/ui/ErrorState";
import { FlashList } from "@shopify/flash-list";
import {
  PostActions,
  PostAuthorRow,
  PostCardSkeleton,
  PostContent,
  PostCover,
} from "@widgets/post-card";
import { useLocalSearchParams } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePostQuery } from "../model/usePostQuery";
import { usePostRealtime } from "../model/usePostRealtime";

type CommentSkeleton = { id: string; _skeleton: true };
type CommentListItem = Comment | CommentSkeleton;

const COMMENT_SKELETONS: CommentSkeleton[] = Array.from(
  { length: 6 },
  (_, i) => ({
    id: `skeleton-${i}`,
    _skeleton: true as const,
  }),
);

export function PostPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: post,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = usePostQuery(id);

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchComments,
    isRefetching: isCommentsRefetching,
  } = useCommentsQuery(id);

  const isRefreshingAll = isRefetching || isCommentsRefetching;
  const handleRefresh = useCallback(() => {
    refetch();
    refetchComments();
  }, [refetch, refetchComments]);

  const {
    mutate: createComment,
    isPending: isSubmitting,
    isError: isCommentError,
  } = useCreateComment(id);

  const [commentText, setCommentText] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("oldest");
  const insets = useSafeAreaInsets();
  const flashListRef = useRef<{
    scrollToOffset: (params: { offset: number; animated: boolean }) => void;
  } | null>(null);

  usePostRealtime(id);

  const rawComments: Comment[] =
    commentsData?.pages.flatMap((p) => p.comments) ?? [];
  const comments = useMemo(() => {
    const sorted = [...rawComments];
    if (sort === "oldest") {
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    } else {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    return sorted;
  }, [rawComments, sort]);

  const listData: CommentListItem[] = isCommentsLoading
    ? COMMENT_SKELETONS
    : comments;

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSubmit = useCallback(() => {
    const text = commentText.trim();
    if (!text || isSubmitting) return;
    setCommentText("");
    createComment(text);
  }, [commentText, isSubmitting, createComment]);

  const handleSortToggle = useCallback(() => {
    setSort((s) => (s === "newest" ? "oldest" : "newest"));
  }, []);

  useEffect(() => {
    flashListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [sort]);

  useEffect(() => {
    if (isCommentError) {
      Alert.alert("Ошибка", "Не удалось отправить комментарий. Попробуйте снова.");
    }
  }, [isCommentError]);

  const renderComment = useCallback(({ item }: { item: CommentListItem }) => {
    if ("_skeleton" in item) return <CommentItemSkeleton />;
    return <CommentItem comment={item} />;
  }, []);

  const ListHeader = useMemo(
    () => (
      <View style={styles.card}>
        {isLoading && <PostCardSkeleton />}

        {isError && !isLoading && (
          <View style={styles.errorContainer}>
            <ErrorState
              onRetry={refetch}
              loading={isRefetching}
              buttonText="Повторить"
              message="Не удалось загрузить публикацию"
            />
          </View>
        )}

        {post && (
          <>
            <PostAuthorRow author={post.author} />
            {post.coverUrl ? <PostCover uri={post.coverUrl} /> : null}
            <View style={styles.body}>
              <PostContent post={post} variant="full" />
              <PostActions post={post} onCommentPress={() => {}} />
            </View>
          </>
        )}

        {post && (
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsTitle}>
              {post.commentsCount} комментария
            </Text>
            <Pressable onPress={handleSortToggle} hitSlop={8}>
              <Text style={styles.sortToggle}>
                {sort === "newest" ? "Сначала новые" : "Сначала старые"}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    ),
    [isLoading, isError, post, refetch, isRefetching, sort, handleSortToggle],
  );

  const ListFooter = useMemo(
    () =>
      isFetchingNextPage ? (
        <View>
          <CommentItemSkeleton />
          <CommentItemSkeleton />
          <CommentItemSkeleton />
        </View>
      ) : null,
    [isFetchingNextPage],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -insets.bottom : 16}
    >
      <FlashList
        ref={flashListRef}
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={renderComment}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentInset={{ top: insets.top }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 8,
          backgroundColor: tokens.color.bg.card,
        }}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            tintColor={tokens.color.accent.primary}
            refreshing={isRefreshingAll}
            onRefresh={handleRefresh}
          />
        }
      />

      <CommentInput
        value={commentText}
        onChangeText={setCommentText}
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg.primary,
  },
  card: {
    backgroundColor: tokens.color.bg.card,
    borderRadius: tokens.radius.md,
    overflow: "hidden",
    marginBottom: tokens.spacing.md,
  },
  body: {
    paddingHorizontal: tokens.spacing.md,
    paddingTop: tokens.spacing.xs,
    paddingBottom: tokens.spacing.md,
    gap: tokens.spacing.md,
  },
  commentsHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: tokens.spacing.md,
  },
  commentsTitle: {
    fontFamily: tokens.font.family.semiBold,
    fontSize: tokens.font.size.md,
    lineHeight: 20,
    color: tokens.color.text.gray,
    flex: 1,
  },
  sortToggle: {
    fontFamily: tokens.font.family.medium,
    fontSize: tokens.font.size.md,
    lineHeight: 20,
    color: tokens.color.accent.primary,
  },
  errorContainer: {
    padding: tokens.spacing.xl,
  },
});
