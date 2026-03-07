/**
 * QuickActions Component
 *
 * Floating glassmorphism menu for rapid access to core app features.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, shadows, spacing, typography } from "../theme";

const { width } = Dimensions.get("window");

export const QuickActions = ({ navigation }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: "plus",
      label: "Add Expense",
      color: colors.primary,
      screen: "AddExpense",
    },
    {
      icon: "format-list-bulleted",
      label: "Transactions",
      color: "#8b5cf6",
      screen: "Transactions",
    },
    {
      icon: "chart-arc",
      label: "Quick Report",
      color: "#10b981",
      screen: "Analytics",
    },
    {
      icon: "shield-check",
      label: "Security",
      color: "#f59e0b",
      screen: "Profile",
    },
  ];

  return (
    <View style={styles.container}>
      <AnimatePresence>
        {isOpen && (
          <MotiView
            from={{ opacity: 0, scale: 0.5, translateY: 50 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            exit={{ opacity: 0, scale: 0.5, translateY: 50 }}
            style={styles.menuContainer}
          >
            <BlurView intensity={80} tint="light" style={styles.blurContainer}>
              <View style={styles.actionsGrid}>
                {actions.map((action, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.actionItem}
                    onPress={() => {
                      setIsOpen(false);
                      navigation.navigate(action.screen);
                    }}
                  >
                    <View
                      style={[
                        styles.iconWrapper,
                        { backgroundColor: action.color + "20" },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={action.icon as any}
                        size={24}
                        color={action.color}
                      />
                    </View>
                    <Text style={styles.actionLabel}>{action.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </BlurView>
          </MotiView>
        )}
      </AnimatePresence>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setIsOpen(!isOpen)}
        style={[styles.mainButton, isOpen && styles.mainButtonActive]}
      >
        <MotiView
          animate={{ rotate: isOpen ? "135deg" : "0deg" }}
          transition={{ type: "spring", damping: 12 }}
        >
          <MaterialCommunityIcons name="plus" size={32} color="#FFFFFF" />
        </MotiView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 90, // Above tab bar
    right: 20,
    alignItems: "flex-end",
    zIndex: 9999,
  },
  mainButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.lg,
  },
  mainButtonActive: {
    backgroundColor: colors.text,
  },
  menuContainer: {
    marginBottom: 16,
    width: width * 0.8,
    borderRadius: 24,
    overflow: "hidden",
    ...shadows.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  blurContainer: {
    padding: spacing.lg,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionItem: {
    width: "45%",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  actionLabel: {
    fontSize: 12,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
    textAlign: "center",
  },
});
