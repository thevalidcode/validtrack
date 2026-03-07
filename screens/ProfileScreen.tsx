/**
 * Profile Screen
 *
 * Shows user account details and settings.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, shadows, spacing, typography } from "../theme";

export const ProfileScreen = ({ navigation }: any) => {
  const menuItems = [
    {
      icon: "account-edit-outline",
      label: "Edit Profile",
      color: colors.primary,
    },
    { icon: "shield-lock-outline", label: "Security", color: "#6366f1" },
    { icon: "bell-ring-outline", label: "Notifications", color: "#f59e0b" },
    { icon: "credit-card-outline", label: "Payment Methods", color: "#10b981" },
    { icon: "help-circle-outline", label: "Help & Support", color: "#8b5cf6" },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.primaryGradientEnd]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={28}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.profileSection}
        >
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=32" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatar}>
              <MaterialCommunityIcons name="camera" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userEmail}>alex.j@validtrack.com</Text>

          <View style={styles.badge}>
            <MaterialCommunityIcons name="star" size={14} color="#f59e0b" />
            <Text style={styles.badgeText}>Premium Member</Text>
          </View>
        </MotiView>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.noBorder,
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.color + "20" },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={22}
                  color={item.color}
                />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={colors.textLight}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.replace("Login")}
        >
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={colors.error}
          />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>ValidTrack v1.0.0 (2026)</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    marginRight: 40,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  content: {
    flex: 1,
    marginTop: -30,
    paddingHorizontal: spacing.xl,
  },
  profileSection: {
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    padding: spacing.xl,
    ...shadows.md,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  editAvatar: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 22,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: typography.fontFamily.medium,
    color: colors.textLight,
    marginTop: 2,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: spacing.md,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: typography.fontFamily.bold,
    color: "#b45309",
    marginLeft: 4,
  },
  menuContainer: {
    marginTop: spacing.xl,
    backgroundColor: colors.cardBackground,
    borderRadius: 24,
    paddingVertical: spacing.sm,
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.error + "10",
    borderRadius: 20,
  },
  logoutText: {
    color: colors.error,
    fontFamily: typography.fontFamily.bold,
    marginLeft: spacing.sm,
    fontSize: 16,
  },
  versionText: {
    textAlign: "center",
    color: colors.textLight,
    fontSize: 12,
    fontFamily: typography.fontFamily.medium,
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
});
