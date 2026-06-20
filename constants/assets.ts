/**
 * Absolute root paths for static PWA assets.
 * Always use these instead of relative paths or external CDNs.
 */

export const ASSETS = {
  avatar: "/avatar.png",
  favicon: "/favicon.png",
  icon: "/icon.png",
  icon192: "/icon-192.png",
  icon512: "/icon-512.png",
  appleTouchIcon: "/apple-touch-icon.png",
  manifest: "/manifest.json",
  fonts: {
    regular: "/fonts/PlusJakartaSans_400Regular.ttf",
    medium: "/fonts/PlusJakartaSans_500Medium.ttf",
    semibold: "/fonts/PlusJakartaSans_600SemiBold.ttf",
    bold: "/fonts/PlusJakartaSans_700Bold.ttf",
    extraBold: "/fonts/PlusJakartaSans_800ExtraBold.ttf",
    materialCommunityIcons: "/fonts/MaterialCommunityIcons.ttf",
  },
} as const;

/** Resolve a root-relative asset path to an absolute URL (required for PWA standalone). */
export function resolveAssetUri(path: string): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return new URL(path, window.location.origin).href;
  }

  return path;
}
