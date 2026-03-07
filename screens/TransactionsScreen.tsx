/**
 * Transactions Screen
 *
 * Full list of all transactions with search/filter capability.
 * Shows transaction history with animated entry.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Header, LoadingSpinner, TransactionItem } from "../components";
import { useTransactions } from "../hooks";
import { Transaction, TransactionCategory } from "../services/types";
import { borderRadius, colors, shadows, spacing, typography } from "../theme";

interface TransactionsScreenProps {
  navigation: any;
}

export const TransactionsScreen: React.FC<TransactionsScreenProps> = ({
  navigation,
}) => {
  const { data: transactions, isLoading } = useTransactions();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    TransactionCategory | "all"
  >("all");

  // Filter transactions based on search and category
  const filteredTransactions = transactions?.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || transaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Category filter options
  const categories: Array<TransactionCategory | "all"> = [
    "all",
    "food",
    "transport",
    "shopping",
    "entertainment",
    "bills",
    "health",
  ];

  const renderTransaction = ({
    item,
    index,
  }: {
    item: Transaction;
    index: number;
  }) => <TransactionItem transaction={item} index={index} />;

  if (isLoading) {
    return <LoadingSpinner text="Loading transactions..." />;
  }

  return (
    <View style={styles.container}>
      <Header
        title="Transactions"
        subtitle={`${filteredTransactions?.length || 0} transactions`}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter Pills */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item;
            return (
              <TouchableOpacity
                style={[
                  styles.filterPill,
                  isSelected && styles.filterPillActive,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected && styles.filterTextActive,
                  ]}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Transactions List */}
      {filteredTransactions && filteredTransactions.length > 0 ? (
        <FlatList
          data={filteredTransactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="receipt-outline"
            size={64}
            color={colors.textLight}
          />
          <Text style={styles.emptyText}>No transactions found</Text>
          <Text style={styles.emptySubtext}>
            {searchQuery
              ? "Try adjusting your search criteria"
              : "Start adding your expenses and income"}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    marginHorizontal: spacing.lg,
    marginTop: spacing.base,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  searchIcon: {
    marginRight: spacing.md,
  },
  searchInput: {
    flex: 1,
    height: 52,
    fontSize: typography.fontSize.base,
    color: colors.text,
    fontFamily: typography.fontFamily.medium,
  },
  filterContainer: {
    marginBottom: spacing.base,
  },
  filterContent: {
    paddingHorizontal: spacing.lg,
  },
  filterPill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginRight: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.cardBackground,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  filterPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...shadows.md,
  },
  filterText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.bold,
    color: colors.textLight,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingBottom: spacing.massive,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxl,
  },
  emptyText: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
    marginTop: spacing.lg,
    letterSpacing: -0.8,
  },
  emptySubtext: {
    fontSize: typography.fontSize.base,
    color: colors.textLight,
    fontFamily: typography.fontFamily.medium,
    marginTop: spacing.md,
    textAlign: "center",
    lineHeight: 24,
  },
});
