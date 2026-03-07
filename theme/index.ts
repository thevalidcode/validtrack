/**
 * ValidTrack Modern Theme - 2026 SaaS Design
 *
 * Central export point for all theme configuration.
 * Import this file to access colors, spacing, typography, etc.
 *
 * @example
 * import { colors, spacing, shadows } from '@/theme';
 */

export * from "./colors";
export * from "./fonts";
export * from "./spacing";
export * from "./ThemeContext";
export * from "./typography";

// Re-export everything as a single theme object for convenience
import { colors } from "./colors";
import { globalText, withProfessionalFont } from "./fonts";
import { borderRadius, shadows, spacing } from "./spacing";
import { typography } from "./typography";

export const theme = {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
  globalText,
  withProfessionalFont,
};

export type Theme = typeof theme;
