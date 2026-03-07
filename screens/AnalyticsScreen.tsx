/**
 * Analytics Screen
 *
 * Detailed spending analytics with pie charts and bar charts.
 * Shows category breakdown and weekly/monthly trends.
 */

import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ChartCard,
  Header,
  LoadingSpinner,
  SimpleBarChart,
  SimplePieChart,
} from "../components";
import { useCategorySpending, useMonthlyData, useWeeklyData } from "../hooks";
import { colors, shadows, spacing, typography } from "../theme";

interface AnalyticsScreenProps {
  navigation: any;
}

const { width } = Dimensions.get("window");

type ChartPeriod = "weekly" | "monthly";

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  navigation,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>("weekly");

  const { data: categorySpending, isLoading: categoryLoading } =
    useCategorySpending();
  const { data: weeklyData, isLoading: weeklyLoading } = useWeeklyData();
  const { data: monthlyData, isLoading: monthlyLoading } = useMonthlyData();

  if (categoryLoading || weeklyLoading || monthlyLoading) {
    return <LoadingSpinner text="Loading analytics..." />;
  }

  // Transform data for charts
  const pieData =
    categorySpending?.map((item) => ({
      value: item.amount,
      color: item.color,
      label: item.category,
    })) || [];

  const chartData = selectedPeriod === "weekly" ? weeklyData : monthlyData;

  const barData =
    chartData?.map((item) => ({
      label: item.label,
      value: item.value,
    })) || [];

  // Calculate total spending
  const totalSpending =
    categorySpending?.reduce((sum, item) => sum + item.amount, 0) || 0;

  return (
    <View style={styles.container}>
      <Header title="Analytics" subtitle="Spending insights" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Spending Pie Chart */}
        <ChartCard
          title="Category Breakdown"
          subtitle={`Total: $${totalSpending.toFixed(2)}`}
          delay={100}
        >
          <SimplePieChart data={pieData} size={260} innerRadius={80} />

          {/* Category Legend */}
          <View style={styles.legendContainer}>
            {categorySpending?.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)}
                </Text>
                <Text style={styles.legendValue}>
                  ${item.amount.toFixed(2)}
                </Text>
                <Text style={styles.legendPercentage}>
                  ({item.percentage}%)
                </Text>
              </View>
            ))}
          </View>
        </ChartCard>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === "weekly" && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod("weekly")}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === "weekly" && styles.periodTextActive,
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              selectedPeriod === "monthly" && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod("monthly")}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === "monthly" && styles.periodTextActive,
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
        </View>

        {/* Spending Trend Bar Chart */}
        <ChartCard
          title={`${selectedPeriod === "weekly" ? "Weekly" : "Monthly"} Spending`}
          subtitle="Spending trends over time"
          delay={200}
        >
          <SimpleBarChart
            data={barData}
            width={width - 80}
            height={220}
            barColor={colors.primary}
          />
        </ChartCard>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // More padding for bottom tabs & visibility
    paddingTop: spacing.lg,
  },
  legendContainer: {
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg, // Taller items for modern fintech feel
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.cardBackgroundSecondary, // Light back for legend
    borderRadius: 16,
    ...shadows.sm,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6, // Circular dots look cleaner
    marginRight: spacing.md,
  },
  legendText: {
    flex: 1,
    fontSize: 15,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text,
  },
  legendValue: {
    fontSize: 16,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
    marginRight: 10,
  },
  legendPercentage: {
    fontSize: 13,
    color: colors.primary, // Highlight percentage
    fontFamily: typography.fontFamily.bold,
    backgroundColor: colors.primaryLight + "20",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  periodSelector: {
    flexDirection: "row",
    marginHorizontal: spacing.xl, // Wider margins
    marginVertical: spacing.xl,
    backgroundColor: "#EEF2F6", // More subtle gray-blue background
    borderRadius: 20,
    padding: 5,
    ...shadows.sm,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 16,
  },
  periodButtonActive: {
    backgroundColor: colors.cardBackground, // Selected should pop white against gray
    ...shadows.md,
  },
  periodText: {
    fontSize: 15,
    fontFamily: typography.fontFamily.semibold,
    color: colors.textLight,
  },
  periodTextActive: {
    color: colors.primary, // Primary color for active text in selector
    fontFamily: typography.fontFamily.bold,
  },
  bottomPadding: {
    height: 100,
  },
});
