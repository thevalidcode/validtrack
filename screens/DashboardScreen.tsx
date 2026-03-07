/**
 * Dashboard Screen
 *
 * Main screen showing balance, monthly summary, pie chart, and recent transactions.
 * Uses React Query hooks for data fetching and Moti for animations.
 */

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  BalanceCard,
  ChartCard,
  Header,
  LoadingSpinner,
  QuickActions,
  SimplePieChart,
  SmartSearch,
  SpendingInsights,
  TransactionItem,
} from "../components";
import { useBalance, useCategorySpending, useTransactions } from "../hooks";
import { colors, shadows, spacing, typography } from "../theme";

interface DashboardScreenProps {
  navigation: any;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  navigation,
}) => {
  // Fetch data using React Query hooks
  const { data: balance, isLoading: balanceLoading } = useBalance();
  const { data: transactions, isLoading: transactionsLoading } =
    useTransactions(5); // Recent 5
  const { data: categorySpending, isLoading: categoryLoading } =
    useCategorySpending();

  // Show loading state while fetching data
  if (balanceLoading || transactionsLoading || categoryLoading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  // Transform category data for Pie Chart
  const pieData =
    categorySpending?.map((item) => ({
      value: item.amount,
      color: item.color,
      label: item.category,
    })) || [];

  const handleTransactionPress = () => {
    navigation.navigate("Transactions");
  };

  const handleViewAllTransactions = () => {
    navigation.navigate("Transactions");
  };

  return (
    <View style={styles.container}>
      <Header title="ValidTrack" subtitle="Your financial companion" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SmartSearch />

        {/* Balance Card */}
        {balance && <BalanceCard balance={balance} delay={100} />}

        <SpendingInsights />

        {/* Monthly Spending Summary */}
        <ChartCard
          title="Spending Overview"
          subtitle="Current month breakdown"
          delay={200}
        >
          <SimplePieChart data={pieData} size={240} innerRadius={70} />

          {/* Legend */}
          <View style={styles.legendContainer}>
            {categorySpending?.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)}
                </Text>
                <Text style={styles.legendValue}>
                  ${item.amount.toFixed(0)}
                </Text>
              </View>
            ))}
          </View>
        </ChartCard>

        {/* Recent Transactions */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <Text style={styles.viewAll} onPress={handleViewAllTransactions}>
              View All
            </Text>
          </View>

          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                index={index}
                onPress={handleTransactionPress}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No transactions yet</Text>
          )}
        </View>

        {/* Bottom Padding for FAB */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Add Button */}
      <QuickActions navigation={navigation} />
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
    paddingBottom: 120,
  },
  legendContainer: {
    marginTop: spacing.xl,
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: spacing.md,
  },
  legendText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
  },
  legendValue: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
  },
  sectionContainer: {
    marginTop: 40, // More space before the section
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xl, // Increase title bottom margin
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
    letterSpacing: -0.6,
  },
  viewAll: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: typography.fontFamily.bold,
    textDecorationLine: "none", // Cleaner without underline
    backgroundColor: colors.primaryLight + "15",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: typography.fontFamily.medium,
    color: colors.textLight,
    paddingVertical: 40,
    backgroundColor: colors.cardBackgroundSecondary,
    borderRadius: 20,
    marginHorizontal: 4,
    ...shadows.sm,
  },
  bottomPadding: {
    height: 140, // More padding to account for FAB and tabs
  },
});
