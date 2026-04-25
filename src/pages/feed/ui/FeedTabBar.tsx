import { tokens } from "@shared/constants/tokens";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import type { FeedFilter } from "../model/useFeedQuery";

interface Tab {
  key: FeedFilter;
  label: string;
}

interface FeedTabBarProps {
  tabs: Tab[];
  activeFilter: FeedFilter;
  onSelect: (key: FeedFilter) => void;
  paddingTop: number;
}

export const TABS: Tab[] = [
  { key: "all", label: "Все" },
  { key: "free", label: "Бесплатные" },
  { key: "paid", label: "Платные" },
];

export function FeedTabBar({
  tabs,
  activeFilter,
  onSelect,
  paddingTop,
}: FeedTabBarProps) {
  const [containerWidth, setContainerWidth] = React.useState(0);
  const activeIndex = tabs.findIndex((t) => t.key === activeFilter);
  const tabWidth = containerWidth / tabs.length;

  const translateX = useSharedValue(0);
  const isFirstLayout = React.useRef(true);

  React.useEffect(() => {
    if (containerWidth > 0) {
      const target = activeIndex * tabWidth;
      if (isFirstLayout.current) {
        isFirstLayout.current = false;
        translateX.value = target;
      } else {
        translateX.value = withSpring(target, { damping: 150, stiffness: 1000 });
      }
    }
  }, [activeIndex, tabWidth, containerWidth]);

  const dropletStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.tabBarWrapper, { paddingTop }]}>
      <View
        style={styles.tabBar}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        {containerWidth > 0 && (
          <Animated.View
            style={[styles.tabDroplet, { width: tabWidth }, dropletStyle]}
          />
        )}
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.key;
          return (
            <Pressable
              key={tab.key}
              onPress={() => onSelect(tab.key)}
              style={styles.tab}
            >
              <Text
                style={[styles.tabLabel, isActive && styles.tabLabelActive]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    backgroundColor: tokens.color.bg.primary,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: tokens.color.bg.secondary,
    borderRadius: tokens.radius.full,
    borderWidth: 1,
    borderColor: tokens.color.border,
    position: "relative",
    overflow: "hidden",
  },
  tabDroplet: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.color.accent.primary,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: tokens.spacing.xs,
    zIndex: 1,
  },
  tabLabel: {
    fontFamily: tokens.font.family.medium,
    fontSize: tokens.font.size.sm,
    color: tokens.color.text.secondary,
    lineHeight: 18,
  },
  tabLabelActive: {
    color: tokens.color.text.onAccent,
    fontFamily: tokens.font.family.bold,
  },
});
