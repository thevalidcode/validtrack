/**
 * ValidTrack Typography Standardizer
 *
 * This utility ensures Plus Jakarta Sans is applied globally.
 */

import { StyleSheet } from "react-native";
import { typography } from "./typography";

/**
 * Global text style helper to ensure professional font usage.
 */
export const globalText = StyleSheet.create({
  regular: {
    fontFamily: typography.fontFamily.regular,
  },
  medium: {
    fontFamily: typography.fontFamily.medium,
  },
  semibold: {
    fontFamily: typography.fontFamily.semibold,
  },
  bold: {
    fontFamily: typography.fontFamily.bold,
  },
  extraBold: {
    fontFamily: typography.fontFamily.extraBold,
  },
});

/**
 * Deep merge professional fonts into any style object.
 */
export const withProfessionalFont = (style: any): any => {
  if (!style) return style;

  const fontMap: Record<string, string> = {
    "400": typography.fontFamily.regular,
    "500": typography.fontFamily.medium,
    "600": typography.fontFamily.semibold,
    "700": typography.fontFamily.bold,
    "800": typography.fontFamily.extraBold,
    "900": typography.fontFamily.extraBold,
    bold: typography.fontFamily.bold,
    normal: typography.fontFamily.regular,
  };

  const getFontFamily = (weight: string | number | undefined) => {
    return fontMap[String(weight || "400")] || typography.fontFamily.regular;
  };

  if (Array.isArray(style)) {
    return style.map((s) => ({
      ...s,
      fontFamily: s?.fontFamily || getFontFamily(s?.fontWeight),
    }));
  }

  return {
    ...style,
    fontFamily: style?.fontFamily || getFontFamily(style?.fontWeight),
  };
};
