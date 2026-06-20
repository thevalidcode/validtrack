/**
 * ChartCard Component
 *
 * Wrapper card for charts with animated entrance and consistent styling.
 * Used to display analytics and spending visualizations.
 */

import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { borderRadius, colors, spacing, typography } from "../theme";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  delay?: number; // Animation delay in ms
  style?: ViewStyle;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  delay = 0,
  style,
}) => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95, translateY: 20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 90,
        delay,
      }}
      style={[styles.container, style]}
    >
      {/* Card Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      {/* Chart Content */}
      <View style={styles.content}>{children}</View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  header: {
    marginBottom: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
    marginBottom: spacing.xxs,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
    fontFamily: typography.fontFamily.medium,
  },
  content: {
    alignItems: "center",
    paddingTop: spacing.sm,
  },
});
