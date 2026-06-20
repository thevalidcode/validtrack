import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import * as Font from "expo-font";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ASSETS } from "../constants/assets";

const nativeFonts = {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
};

const webFonts = {
  PlusJakartaSans_400Regular: ASSETS.fonts.regular,
  PlusJakartaSans_500Medium: ASSETS.fonts.medium,
  PlusJakartaSans_600SemiBold: ASSETS.fonts.semibold,
  PlusJakartaSans_700Bold: ASSETS.fonts.bold,
  PlusJakartaSans_800ExtraBold: ASSETS.fonts.extraBold,
};

async function loadWebIconFont() {
  if (Font.isLoaded("material-community")) {
    return;
  }

  await Font.loadAsync({
    "material-community": ASSETS.fonts.materialCommunityIcons,
  });
}

export function useAppFonts(): boolean {
  const [textLoaded] = useFonts(Platform.OS === "web" ? webFonts : nativeFonts);

  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    loadWebIconFont().catch((error) => {
      console.error("Failed to load icon font:", error);
    });
  }, []);

  return textLoaded;
}
