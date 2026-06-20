/**
 * SmartSearch Component
 *
 * Interactive search bar with recents and categories.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, shadows, spacing, typography } from "../theme";

export const SmartSearch = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");

  const recentSearches = ["Groceries", "Amazon", "Rent", "Netflix"];

  return (
    <View style={styles.container}>
      <MotiView
        animate={{
          scale: isFocused ? 1.02 : 1,
          borderColor: isFocused ? colors.primary : colors.borderLight,
        }}
        style={styles.searchBar}
      >
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color={isFocused ? colors.primary : colors.textLight}
        />
        <TextInput
          style={styles.input}
          placeholder="Search transactions, insights..."
          placeholderTextColor={colors.textLight}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <MaterialCommunityIcons
              name="close-circle"
              size={18}
              color={colors.textLight}
            />
          </TouchableOpacity>
        )}
      </MotiView>

      <AnimatePresence>
        {isFocused && (
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 90 }}
            exit={{ opacity: 0, height: 0 }}
            style={styles.resultsContainer}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity>
                <Text style={styles.clearAll}>Clear All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.recentsList}
            >
              {recentSearches.map((item, index) => (
                <TouchableOpacity key={index} style={styles.recentItem}>
                  <Text style={styles.recentText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    zIndex: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    height: 52,
    borderWidth: 1.5,
    ...shadows.sm,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  resultsContainer: {
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.textLight,
    textTransform: "uppercase",
  },
  clearAll: {
    fontSize: 12,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
  recentsList: {
    flexDirection: "row",
    marginTop: spacing.xs,
  },
  recentItem: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    height: 29,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  recentText: {
    fontSize: 13,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
  },
});
