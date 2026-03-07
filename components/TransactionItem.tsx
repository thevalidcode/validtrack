/**
 * Modern TransactionItem Component - 2026 SaaS Design
 *
 * Sleek transaction card with enhanced visual hierarchy.
 * Features smooth animations and interactive feedback.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Transaction } from "../services/types";
import { borderRadius, colors, shadows, spacing, typography } from "../theme";

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
  onPress?: () => void;
}

const categoryIcons: Record<
  string,
  keyof typeof MaterialCommunityIcons.glyphMap
> = {
  food: "food-variant",
  transport: "car-side",
  shopping: "shopping",
  entertainment: "movie-play",
  bills: "receipt-text",
  health: "heart-pulse",
};

const categoryColors: Record<string, string> = {
  food: colors.food,
  transport: colors.transport,
  shopping: colors.shopping,
  entertainment: colors.entertainment,
  bills: colors.bills,
  health: colors.health,
};

const categoryBackgrounds: Record<string, string> = {
  food: colors.foodLight,
  transport: colors.transportLight,
  shopping: colors.shoppingLight,
  entertainment: colors.entertainmentLight,
  bills: colors.billsLight,
  health: colors.healthLight,
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  index,
  onPress,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const iconName = categoryIcons[transaction.category] || "cash";
  const iconColor = categoryColors[transaction.category] || colors.primary;
  const iconBg =
    categoryBackgrounds[transaction.category] || colors.primaryLight + "20";
  const isExpense = transaction.type === "expense";

  return (
    <MotiView
      from={{ opacity: 0, translateX: -30 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{
        type: "spring",
        delay: index * 50,
        damping: 20,
      }}
      style={styles.wrapper}
    >
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {/* Category Icon with Modern Design */}
        <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
          <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />
        </View>

        {/* Transaction Details with Better Hierarchy */}
        <View style={styles.details}>
          <Text style={styles.description} numberOfLines={1}>
            {transaction.description}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.category}>
              {transaction.category.charAt(0).toUpperCase() +
                transaction.category.slice(1)}
            </Text>
            <View style={styles.dot} />
            <Text style={styles.date}>{formatDate(transaction.date)}</Text>
          </View>
        </View>

        {/* Amount with Bold Typography */}
        <View style={styles.amountContainer}>
          <Text
            style={[styles.amount, isExpense ? styles.expense : styles.income]}
          >
            {isExpense ? "-" : "+"}
            {formatCurrency(transaction.amount)}
          </Text>
        </View>
      </TouchableOpacity>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing.base,
    marginVertical: spacing.xs,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  category: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.bold,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textLight,
    marginHorizontal: spacing.xs,
  },
  date: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.textLight,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.extraBold,
    letterSpacing: -0.5,
  },
  expense: {
    color: colors.error,
  },
  income: {
    color: colors.success,
  },
});
