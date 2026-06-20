import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { ASSETS } from "../constants/assets";

const textFonts = {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
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
  const [textLoaded] = useFonts(textFonts);
  const [iconsLoaded, setIconsLoaded] = useState(Platform.OS !== "web");

  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    let cancelled = false;

    loadWebIconFont()
      .then(() => {
        if (!cancelled) {
          setIconsLoaded(true);
        }
      })
      .catch((error) => {
        console.error("Failed to load icon font:", error);
        if (!cancelled) {
          setIconsLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (Platform.OS !== "web") {
    return textLoaded;
  }

  return textLoaded && iconsLoaded;
}
