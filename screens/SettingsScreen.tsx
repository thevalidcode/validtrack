/**
 * Settings Screen
 *
 * Provides application configuration and user preferences.
 * Features a modern, categorized list style with interactive toggles.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../components";
import { colors, shadows, spacing, typography } from "../theme";

interface SettingItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  type: "toggle" | "link";
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
  color?: string;
  isLast?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  type,
  value,
  onValueChange,
  onPress,
  color = colors.primary,
  isLast = false,
}) => (
  <TouchableOpacity
    style={[styles.settingItem, isLast && styles.noBorder]}
    onPress={type === "link" ? onPress : undefined}
    activeOpacity={type === "link" ? 0.7 : 1}
  >
    <View style={[styles.iconWrapper, { backgroundColor: color + "15" }]}>
      <MaterialCommunityIcons name={icon} size={22} color={color} />
    </View>
    <Text style={styles.settingLabel}>{label}</Text>
    {type === "toggle" ? (
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D1D5DB", true: colors.primary + "80" }}
        thumbColor={value ? colors.primary : "#F9FAFB"}
        ios_backgroundColor="#D1D5DB"
      />
    ) : (
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={colors.textLight}
      />
    )}
  </TouchableOpacity>
);

export const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Header title="Settings" subtitle="Preferences & Security" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Account & Security</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="fingerprint"
              label="Biometric Login"
              type="toggle"
              value={biometrics}
              onValueChange={setBiometrics}
              color="#10b981"
            />
            <SettingItem
              icon="bell-outline"
              label="Push Notifications"
              type="toggle"
              value={notifications}
              onValueChange={setNotifications}
              color="#f59e0b"
            />
            <SettingItem
              icon="cloud-upload-outline"
              label="Cloud Backup"
              type="link"
              color="#3b82f6"
              isLast
            />
          </View>
        </MotiView>

        {/* Preferences Section */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 100 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="palette-outline"
              label="Dark Mode"
              type="toggle"
              value={darkMode}
              onValueChange={setDarkMode}
              color="#6366f1"
            />
            <SettingItem
              icon="currency-usd"
              label="Default Currency (USD)"
              type="link"
              color="#059669"
            />
            <SettingItem
              icon="translate"
              label="Language (English)"
              type="link"
              color="#8b5cf6"
              isLast
            />
          </View>
        </MotiView>

        {/* App Info Section */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 200 }}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="information-outline"
              label="About ValidTrack"
              type="link"
              color={colors.textLight}
            />
            <SettingItem
              icon="star-outline"
              label="Rate the App"
              type="link"
              color="#f59e0b"
              isLast
            />
          </View>
        </MotiView>

        <Text style={styles.footerText}>ValidTrack v1.0.0</Text>
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
    padding: spacing.lg,
    paddingBottom: 120,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.textLight,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },
  sectionContent: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    paddingVertical: spacing.sm,
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: typography.fontFamily.medium,
    color: colors.textLight,
    marginTop: spacing.md,
    opacity: 0.6,
  },
});
