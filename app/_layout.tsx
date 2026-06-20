/**
 * Root Layout
 *
 * Sets up React Query provider for data management.
 * Wraps the entire app with QueryClientProvider and SafeAreaProvider.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAppFonts } from "../hooks/useAppFonts";
import { ThemeProvider } from "../theme";

if (Platform.OS === "web") {
  // Required for Moti/Reanimated on web (see moti.fyi/web).
  (globalThis as typeof globalThis & { _frameTimestamp?: null })._frameTimestamp =
    null;
}

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RootSiblingParent>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="[...path]" />
            </Stack>
          </RootSiblingParent>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
