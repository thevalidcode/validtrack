/**
 * Theme Context for ValidTrack
 *
 * Manages light and dark mode toggling and persistence.
 * Provides the global styles for the app's professional 2026 SaaS look.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance, useColorScheme as useDeviceColorScheme } from "react-native";
import { colors as lightColors } from "./colors";
import { typography } from "./typography";
import { spacing, shadows, borderRadius } from "./spacing";

// Minimal dark palette for 2026 SaaS aesthetic - True Dark OLED version
const darkColors = {
  ...lightColors,
  primary: "#A78BFA",
  primaryLight: "#C4B5FD",
  primaryDark: "#7C3AED",
  background: "#000000", // True Black
  backgroundDark: "#0A0A0A",
  cardBackground: "#121212", // Deep Slate
  cardBackgroundSecondary: "#1A1A1A",
  text: "#FFFFFF",
  textSecondary: "#A3A3A3",
  textLight: "#737373",
  borderLight: "#262626",
  shadow: "#000000",
};

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  colors: typeof lightColors;
  typography: typeof typography;
  spacing: typeof spacing;
  shadows: typeof shadows;
  borderRadius: typeof borderRadius;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceColorScheme = useDeviceColorScheme();
  const [isDark, setIsDark] = useState(deviceColorScheme === "dark");

  useEffect(() => {
    setIsDark(deviceColorScheme === "dark");
  }, [deviceColorScheme]);

  const activeColors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        setIsDark,
        colors: activeColors,
        typography,
        spacing,
        shadows,
        borderRadius,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
