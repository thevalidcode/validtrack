/**
 * Modern BalanceCard Component - 2026 SaaS Design
 *
 * Premium balance display with gradient background and smooth animations.
 * Features glassmorphism and modern typography.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Balance } from "../services/types";
import { colors, shadows, spacing, typography } from "../theme";

interface BalanceCardProps {
  balance: Balance;
  delay?: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  delay = 0,
}) => {
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const isPositiveChange = balance.monthlyChange >= 0;

  return (
    <MotiView
      from={{ opacity: 0, translateY: -20, scale: 0.95 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: "spring", delay, damping: 20, stiffness: 90 }}
      style={styles.container}
    >
      <LinearGradient
        colors={[colors.primaryDark, colors.primaryGradientStart]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Decorative Background Pattern */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />

        {/* Header with Icon */}
        <View style={styles.header}>
          <Text style={styles.label}>Available Balance</Text>
          <View style={styles.glassChip}>
            <MaterialCommunityIcons
              name="shield-check"
              size={14}
              color="#FFFFFF"
            />
            <Text style={styles.chipText}>Secure</Text>
          </View>
        </View>

        {/* Main Balance Amount */}
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: delay + 200, damping: 15 }}
          style={styles.balanceContainer}
        >
          <Text style={styles.currencySymbol}>$</Text>
          <Text style={styles.amount}>
            {balance.total.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </Text>
        </MotiView>

        {/* Monthly Change Indicator - Glassmorphism style */}
        <View style={styles.glassContainer}>
          <View style={styles.glassRow}>
            <View style={styles.statBox}>
              <Text style={styles.statMiniLabel}>Income</Text>
              <Text style={styles.statMiniAmount}>
                {formatCurrency(balance.income)}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statMiniLabel}>Expenses</Text>
              <Text style={styles.statMiniAmount}>
                {formatCurrency(balance.expenses)}
              </Text>
            </View>
          </View>

          <View style={styles.trendBadge}>
            <MaterialCommunityIcons
              name={isPositiveChange ? "trending-up" : "trending-down"}
              size={14}
              color={isPositiveChange ? colors.success : colors.error}
            />
            <Text
              style={[
                styles.trendText,
                { color: isPositiveChange ? colors.success : colors.error },
              ]}
            >
              {isPositiveChange ? "+" : ""}
              {balance.monthlyChange}%
            </Text>
          </View>
        </View>
      </LinearGradient>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.base,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  gradient: {
    borderRadius: 28,
    padding: spacing.xl,
    overflow: "hidden",
    ...shadows.lg,
  },
  decorativeCircle1: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    top: -100,
    right: -80,
  },
  decorativeCircle2: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    bottom: -60,
    left: -40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: typography.fontFamily.semibold,
    letterSpacing: 0.5,
  },
  glassChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  chipText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontFamily: typography.fontFamily.bold,
    marginLeft: 4,
    textTransform: "uppercase",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: spacing.xl,
  },
  currencySymbol: {
    fontSize: 24,
    color: "#FFFFFF",
    fontFamily: typography.fontFamily.semibold,
    marginRight: 4,
    opacity: 0.9,
  },
  amount: {
    fontSize: 38,
    fontFamily: typography.fontFamily.extraBold,
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  glassContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    position: "relative",
  },
  glassRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statBox: {
    flex: 1,
  },
  statMiniLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: typography.fontFamily.medium,
    marginBottom: 2,
  },
  statMiniAmount: {
    fontSize: 15,
    color: "#FFFFFF",
    fontFamily: typography.fontFamily.bold,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: spacing.md,
  },
  trendBadge: {
    position: "absolute",
    right: 12,
    top: -12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    ...shadows.sm,
  },
  trendText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.extraBold,
    marginLeft: 2,
  },
});
