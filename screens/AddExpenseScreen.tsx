/**
 * Add Expense Screen
 *
 * Modal/screen for adding new expenses or income.
 * Includes input fields, category selection, and animated submit button.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Header } from "../components";
import { useAddTransaction, useToast } from "../hooks";
import { TransactionCategory, TransactionType } from "../services/types";
import { borderRadius, colors, shadows, spacing, typography } from "../theme";

interface AddExpenseScreenProps {
  navigation: any;
}

const categoryIcons: Record<
  TransactionCategory,
  keyof typeof MaterialCommunityIcons.glyphMap
> = {
  food: "food",
  transport: "car",
  shopping: "shopping",
  entertainment: "movie",
  bills: "receipt",
  health: "hospital",
};

const categoryColors: Record<TransactionCategory, string> = {
  food: colors.food,
  transport: colors.transport,
  shopping: colors.shopping,
  entertainment: colors.entertainment,
  bills: colors.bills,
  health: colors.health,
};

const categoryLightColors: Record<TransactionCategory, string> = {
  food: colors.foodLight,
  transport: colors.transportLight,
  shopping: colors.shoppingLight,
  entertainment: colors.entertainmentLight,
  bills: colors.billsLight,
  health: colors.healthLight,
};

export const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({
  navigation,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<TransactionCategory>("food");
  const [transactionType, setTransactionType] =
    useState<TransactionType>("expense");

  const { showToast } = useToast();
  const addTransactionMutation = useAddTransaction();

  const categories: TransactionCategory[] = [
    "food",
    "transport",
    "shopping",
    "entertainment",
    "bills",
    "health",
  ];

  const handleSubmit = async () => {
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      showToast("Please enter a valid amount", { type: "error" });
      return;
    }

    if (!description.trim()) {
      showToast("Please add a description", { type: "warning" });
      return;
    }

    try {
      await addTransactionMutation.mutateAsync({
        amount: parseFloat(amount),
        description: description.trim(),
        category: selectedCategory,
        type: transactionType,
        date: new Date().toISOString(),
        notes: notes.trim() || undefined,
      });

      showToast(
        `${transactionType === "expense" ? "Expense" : "Income"} saved!`,
        {
          type: "success",
        },
      );

      // Reset form
      setAmount("");
      setDescription("");
      setNotes("");

      // Delay goBack to let the toast be seen
      setTimeout(() => navigation.goBack(), 1200);
    } catch (error) {
      showToast("Failed to add transaction", { type: "error" });
    }
  };

  const isSubmitting = addTransactionMutation.isPending;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header
        title="Add Transaction"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Transaction Type Toggle */}
        <View style={styles.typeToggle}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              transactionType === "expense" && styles.typeButtonActive,
            ]}
            onPress={() => setTransactionType("expense")}
          >
            <Text
              style={[
                styles.typeText,
                transactionType === "expense" && styles.typeTextActive,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              transactionType === "income" && styles.typeButtonActive,
            ]}
            onPress={() => setTransactionType("income")}
          >
            <Text
              style={[
                styles.typeText,
                transactionType === "income" && styles.typeTextActive,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={colors.textLight}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        {/* Description Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Grocery shopping"
            placeholderTextColor={colors.textSecondary}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Category Selection */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => {
              const isSelected = selectedCategory === category;
              const iconName = categoryIcons[category];
              const color = categoryColors[category];
              const lightColor = categoryLightColors[category];

              return (
                <MotiView
                  key={category}
                  from={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    delay: index * 50,
                  }}
                  style={styles.categoryCardWrapper}
                >
                  <TouchableOpacity
                    style={[
                      styles.categoryCard,
                      isSelected && [
                        styles.categoryCardActive,
                        { borderColor: color, backgroundColor: lightColor },
                      ],
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <View
                      style={[
                        styles.categoryIcon,
                        { backgroundColor: lightColor },
                        isSelected && { backgroundColor: color },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={iconName}
                        size={28}
                        color={isSelected ? "#FFFFFF" : color}
                      />
                    </View>
                    <Text
                      style={[
                        styles.categoryName,
                        isSelected && styles.categoryNameActive,
                      ]}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                  </TouchableOpacity>
                </MotiView>
              );
            })}
          </View>
        </View>

        {/* Notes Input (Optional) */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="Add any additional notes..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={3}
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* Submit Button */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 18, delay: 400 }}
        >
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primaryGradientStart, colors.primaryGradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.submitButton,
                isSubmitting && styles.submitButtonDisabled,
              ]}
            >
              <MaterialCommunityIcons
                name={
                  transactionType === "expense"
                    ? "plus-circle"
                    : "arrow-down-circle"
                }
                size={24}
                color="#FFFFFF"
                style={styles.submitIcon}
              />
              <Text style={styles.submitText}>
                {isSubmitting
                  ? "Adding..."
                  : `Add ${transactionType === "expense" ? "Expense" : "Income"}`}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
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
    padding: spacing.lg,
    paddingBottom: spacing.massive,
  },
  typeToggle: {
    flexDirection: "row",
    backgroundColor: colors.glass,
    borderRadius: borderRadius.xl,
    padding: 6,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing.md + 2,
    alignItems: "center",
    borderRadius: borderRadius.lg,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
    ...shadows.md,
  },
  typeText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.bold,
    color: colors.textLight,
  },
  typeTextActive: {
    color: "#FFFFFF",
  },
  inputSection: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    borderWidth: 2,
    borderColor: colors.borderLight,
    ...shadows.md,
  },
  currencySymbol: {
    fontSize: 32,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.primary,
    marginRight: spacing.sm,
  },
  amountInput: {
    flex: 1,
    fontSize: 36,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
    paddingVertical: spacing.lg,
    letterSpacing: -1.5,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  notesInput: {
    height: 100,
    textAlignVertical: "top",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xs,
  },
  categoryCardWrapper: {
    width: "30%",
    marginBottom: spacing.md,
  },
  categoryCard: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  categoryCardActive: {
    borderWidth: 2,
    ...shadows.md,
    transform: [{ scale: 1.05 }],
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  categoryName: {
    fontSize: 11,
    fontFamily: typography.fontFamily.bold,
    color: colors.textLight,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  categoryNameActive: {
    color: colors.text,
  },
  submitButton: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: spacing.lg,
    ...shadows.lg,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitIcon: {
    marginRight: spacing.sm,
  },
  submitText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.extraBold,
    color: "#FFFFFF",
    letterSpacing: 0.8,
  },
});
