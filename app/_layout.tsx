import { useReactQueryDevTools } from "@dev-plugins/react-query";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { tokens } from "@shared/constants/tokens";
import { queryClient } from "@shared/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

function ReactQueryDevTools() {
  useReactQueryDevTools(queryClient);
  return null;
}

function AppShell() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar style="dark" translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: tokens.color.bg.primary },
          animation: "simple_push",
        }}
      />
      <BlurView
        intensity={60}
        tint="prominent"
        style={[styles.topBlur, { height: insets.top }]}
        pointerEvents="none"
      />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {__DEV__ && <ReactQueryDevTools />}
        <AppShell />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
