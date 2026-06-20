/**
 * LoadingSpinner Component
 *
 * Animated loading indicator with modern pulsing animation and brand colors.
 * Used when fetching data or processing actions.
 */

import { MotiView } from "moti";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme";

interface LoadingSpinnerProps {
  text?: string;
  size?: "small" | "large";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Loading...",
  size = "large",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size={size} color={colors.primary} />
      </View>
      {text && (
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: "timing",
            duration: 500,
            delay: 200,
          }}
        >
          <Text style={styles.text}>{text}</Text>
        </MotiView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  spinnerContainer: {
    zIndex: 10,
  },
  text: {
    marginTop: spacing.lg,
    fontSize: typography.fontSize.base,
    color: colors.textLight,
    fontFamily: typography.fontFamily.medium,
  },
});
