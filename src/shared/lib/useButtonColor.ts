import { useCallback, useRef } from "react";
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ButtonColorConfig {
  getDefault: () => string;
  getPressed: () => string;
}

export function useButtonColor({ getDefault, getPressed }: ButtonColorConfig) {
  const bgColor = useSharedValue(getDefault());

  const getDefaultRef = useRef(getDefault);
  getDefaultRef.current = getDefault;
  const getPressedRef = useRef(getPressed);
  getPressedRef.current = getPressed;

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: bgColor.value,
  }));

  const onPressIn = useCallback(() => {
    cancelAnimation(bgColor);
    bgColor.value = withTiming(getPressedRef.current(), { duration: 80 });
  }, [bgColor]);

  const onPressOut = useCallback(() => {
    cancelAnimation(bgColor);
    bgColor.value = withTiming(getDefaultRef.current(), { duration: 150 });
  }, [bgColor]);

  const animateTo = useCallback(
    (color: string, duration = 200) => {
      cancelAnimation(bgColor);
      bgColor.value = withTiming(color, { duration });
    },
    [bgColor],
  );

  return { bgStyle, onPressIn, onPressOut, animateTo };
}
