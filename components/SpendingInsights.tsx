/**
 * SpendingInsights Component
 *
 * Interactive analytics widget showing spending progress with SaaS 2026 aesthetics.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { colors, shadows, spacing, typography } from "../theme";

const { width } = Dimensions.get("window");

export const SpendingInsights = () => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9, translateY: 20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ type: "spring", damping: 20, delay: 300 }}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={20}
              color="#f59e0b"
            />
          </View>
          <Text style={styles.title}>AI Insights</Text>
        </View>
        <Text style={styles.weekText}>This Week</Text>
      </View>

      <Text style={styles.insightText}>
        You've spent <Text style={styles.bold}>12% less</Text> on dining out
        compared to last week. Great job!
      </Text>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Food & Dining</Text>
          <Text style={styles.progressValue}>$420 / $500</Text>
        </View>
        <View style={styles.progressBarBg}>
          <LinearGradient
            colors={["#f59e0b", "#fbbf24"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressBarFill, { width: "84%" }]}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.viewDetailedButton}>
        <Text style={styles.detailedButtonText}>View Detailed Report</Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={16}
          color={colors.primary}
        />
      </TouchableOpacity>
    </MotiView>
  );
};

// Internal TouchableOpacity for component
const TouchableOpacity = ({ children, style, onPress }: any) => (
  <View
    onStartShouldSetResponder={() => {
      onPress && onPress();
      return true;
    }}
    style={style}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    marginHorizontal: spacing.md,
    padding: spacing.lg,
    marginVertical: spacing.md,
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#f59e0b20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  title: {
    fontSize: 16,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
  },
  weekText: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: typography.fontFamily.semibold,
  },
  insightText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
    fontFamily: typography.fontFamily.regular,
    marginBottom: spacing.lg,
  },
  bold: {
    fontFamily: typography.fontFamily.extraBold,
    color: colors.primary,
  },
  progressSection: {
    marginBottom: spacing.md,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
  },
  progressValue: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: typography.fontFamily.semibold,
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borderLight,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  viewDetailedButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
  },
  detailedButtonText: {
    fontSize: 14,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.primary,
    marginRight: 4,
  },
});
