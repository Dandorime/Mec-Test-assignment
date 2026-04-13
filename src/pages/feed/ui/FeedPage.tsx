import type { Post } from "@entities/post";
import { tokens } from "@shared/constants/tokens";
import { ErrorState } from "@shared/ui/ErrorState";
import { FlashList } from "@shopify/flash-list";
import { PostCard, PostCardSkeleton } from "@widgets/post-card";
import React, { useCallback } from "react";
import { RefreshControl, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFeedQuery } from "../model/useFeedQuery";

type SkeletonItem = { id: string; _skeleton: true };
type ListItem = Post | SkeletonItem;

const SKELETON_COUNT = 4;
const SKELETONS: SkeletonItem[] = Array.from(
  { length: SKELETON_COUNT },
  (_, i) => ({
    id: `skeleton-${i}`,
    _skeleton: true,
  }),
);

function isSkeleton(item: ListItem): item is SkeletonItem {
  return "_skeleton" in item;
}

export function FeedPage() {
  const {
    data,
    isLoading,
    isError,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFeedQuery();

  const insets = useSafeAreaInsets();

  const posts = data?.pages?.flatMap((page) => page?.posts ?? []) ?? [];
  const listData: ListItem[] = isLoading ? SKELETONS : posts;

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(({ item }: { item: ListItem }) => {
    if (isSkeleton(item)) return <PostCardSkeleton />;
    return <PostCard post={item} />;
  }, []);

  const ListFooter = isFetchingNextPage ? (
    <View style={styles.footerSkeletons}>
      <PostCardSkeleton />
      <PostCardSkeleton />
    </View>
  ) : null;

  if (isError) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ErrorState
          onRetry={refetch}
          loading={isRefetching}
          buttonText="Повторить"
          message="Не удалось загрузить публикации"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={listData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ height: tokens.spacing.md }} />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={ListFooter}
        refreshControl={
          <RefreshControl
            tintColor={tokens.color.accent.primary}
            progressViewOffset={insets.top}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.color.bg.primary,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  footerSkeletons: {
    gap: tokens.spacing.md,
    paddingTop: tokens.spacing.md,
  },
});
