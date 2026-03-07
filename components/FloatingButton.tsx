/**
 * Modern FloatingButton Component - 2026 SaaS Design
 *
 * Elegant FAB with gradient, shadow, and pulsing animation.
 * Provides clear call-to-action with smooth interactions.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors, shadows, spacing } from "../theme";

interface FloatingButtonProps {
  onPress: () => void;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  icon = "plus",
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <MotiView
      from={{ opacity: 0, scale: 0, rotate: "-180deg" }}
      animate={{ opacity: 1, scale: 1, rotate: "0deg" }}
      transition={{
        type: "spring",
        delay: 600,
        damping: 12,
      }}
      style={styles.container}
    >
      {/* Pulsing Background Circle */}
      <MotiView
        from={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 1.3, opacity: 0 }}
        transition={{
          type: "timing",
          duration: 2000,
          loop: true,
          repeatReverse: false,
        }}
        style={[styles.pulseCircle, { backgroundColor: colors.primary }]}
      />

      {/* Main Button */}
      <MotiView
        animate={{
          scale: isPressed ? 0.92 : 1,
        }}
        transition={{
          type: "timing",
          duration: 100,
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          activeOpacity={0.9}
          style={styles.touchable}
        >
          <LinearGradient
            colors={[colors.primaryGradientStart, colors.primaryGradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <MaterialCommunityIcons name={icon} size={28} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </MotiView>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: spacing.xl + 75, // Higher up for better UX
    right: spacing.xl, // Professional spacing
    zIndex: 999,
  },
  pulseCircle: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 36,
    top: -4,
    left: -4,
  },
  touchable: {
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  gradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.xl, // Professional 2026 shadow
  },
});
