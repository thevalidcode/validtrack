/**
 * Custom Toast Notifications Hook
 *
 * Professional 2026 SaaS style toasts at bottom center.
 */

import Toast from "react-native-root-toast";
import { shadows, spacing, typography } from "../theme";

interface ToastOptions {
  type?: "success" | "error" | "info" | "warning";
  duration?: number;
}

export const useToast = () => {
  const showToast = (message: string, options: ToastOptions = {}) => {
    const { type = "info", duration: toastDuration = 3000 } = options;

    const getIconName = () => {
      switch (type) {
        case "success":
          return "check-circle";
        case "error":
          return "alert-circle";
        case "warning":
          return "alert-rhombus";
        default:
          return "information";
      }
    };

    const getColors = () => {
      switch (type) {
        case "success":
          return { bg: "#064e3b", border: "#059669", icon: "#10b981" };
        case "error":
          return { bg: "#450a0a", border: "#dc2626", icon: "#ef4444" };
        case "warning":
          return { bg: "#422006", border: "#d97706", icon: "#f59e0b" };
        default:
          return { bg: "#1e1b4b", border: "#4f46e5", icon: "#6366f1" };
      }
    };

    const c = getColors();

    const toast = Toast.show(message, {
      duration: toastDuration,
      position: Toast.positions.BOTTOM - 40,
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: c.bg,
      opacity: 1,
      containerStyle: {
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: c.border,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        ...shadows.lg,
      },
      textStyle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: typography.fontFamily.semibold,
      },
    });

    return toast;
  };

  return { showToast };
};
