/**
 * Header Component
 *
 * Reusable header/navbar for screens with title and optional actions.
 * Provides consistent navigation styling across the app.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { borderRadius, colors, shadows, spacing, typography } from "../theme";
import { NotificationModal } from "./NotificationModal";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onRightPress?: () => void;
  showProfile?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  rightIcon = "bell-outline",
  onRightPress,
  showProfile = true,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [notifVisible, setNotifVisible] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + (Platform.OS === "ios" ? 0 : 10) },
      ]}
    >
      <NotificationModal
        isVisible={notifVisible}
        onClose={() => setNotifVisible(false)}
      />
      {/* Left Action (Profile or Back Button) */}
      <View style={styles.leftAction}>
        {showBack && onBackPress ? (
          <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        ) : showProfile ? (
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=32" }}
              style={styles.profileImage}
            />
            <View style={styles.onlineBadge} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right Action */}
      <View style={styles.rightAction}>
        <TouchableOpacity
          onPress={() => setNotifVisible(true)}
          style={styles.iconButton}
        >
          <MaterialCommunityIcons
            name={rightIcon}
            size={24}
            color={colors.text}
          />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    ...shadows.sm,
  },
  leftAction: {
    width: 50,
  },
  rightAction: {
    width: 50,
    alignItems: "flex-end",
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "relative",
    ...shadows.sm,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  onlineBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.cardBackground,
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
    borderWidth: 1.5,
    borderColor: colors.cardBackground,
  },
  title: {
    fontSize: 18,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: typography.fontFamily.medium,
    color: colors.textLight,
  },
  iconButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.backgroundDark,
  },
});
