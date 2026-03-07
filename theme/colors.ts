/**
 * ValidTrack Modern Color Theme - 2026 SaaS Design
 *
 * Premium color palette with gradients and modern aesthetics.
 * Designed for a professional fintech SaaS platform.
 */

export const colors = {
  // Primary Brand Colors - Modern Purple Gradient
  primary: "#7C3AED",
  primaryLight: "#A78BFA",
  primaryDark: "#5B21B6",
  primaryGradientStart: "#7C3AED",
  primaryGradientEnd: "#EC4899",

  // Background Colors - Modern Layered Design
  background: "#FAFAFA",
  backgroundDark: "#F5F5F7",
  cardBackground: "#FFFFFF",
  cardBackgroundSecondary: "#F9FAFB",

  // Text Colors - Enhanced Contrast
  text: "#111827",
  textSecondary: "#6B7280",
  textLight: "#9CA3AF",
  textInverse: "#FFFFFF",

  // Status Colors - Vibrant & Modern
  success: "#10B981",
  successLight: "#D1FAE5",
  error: "#EF4444",
  errorLight: "#FEE2E2",
  warning: "#F59E0B",
  warningLight: "#FEF3C7",
  info: "#3B82F6",
  infoLight: "#DBEAFE",

  // Transaction Categories - Refined Color Palette
  food: "#EF4444",
  transport: "#3B82F6",
  shopping: "#F59E0B",
  entertainment: "#EC4899",
  bills: "#8B5CF6",
  health: "#10B981",

  // Category Light Backgrounds
  foodLight: "#FEE2E2",
  transportLight: "#DBEAFE",
  shoppingLight: "#FEF3C7",
  entertainmentLight: "#FCE7F3",
  billsLight: "#EDE9FE",
  healthLight: "#D1FAE5",

  // UI Elements - Sophisticated Shadows & Overlays
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  shadow: "rgba(0, 0, 0, 0.08)",
  shadowMedium: "rgba(0, 0, 0, 0.12)",
  shadowHeavy: "rgba(0, 0, 0, 0.18)",
  overlay: "rgba(0, 0, 0, 0.6)",
  overlayLight: "rgba(0, 0, 0, 0.3)",

  // Glassmorphism
  glass: "rgba(255, 255, 255, 0.8)",
  glassDark: "rgba(255, 255, 255, 0.6)",
};

export type ColorKey = keyof typeof colors;
