/**
 * Notification Modal Component
 *
 * Professional popup for recent app updates and financial notifications.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, shadows, spacing, typography } from "../theme";

interface NotificationModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Salary Credited",
    message:
      'Your salary of $4,500.00 from "Tech Solutions Inc" was successfully deposited.',
    date: "2m ago",
    isNew: true,
  },
  {
    id: 2,
    type: "alert",
    title: "High Spending Alert",
    message: 'You have spent 92% of your "Entertainment" budget for March.',
    date: "45m ago",
    isNew: true,
  },
  {
    id: 3,
    type: "info",
    title: "Savings Goal Achievement",
    message:
      'Congratulations! You are just $50 away from hitting your "Summer Trip" goal.',
    date: "3h ago",
    isNew: false,
  },
  {
    id: 4,
    type: "update",
    title: "Smart Insights v2.4",
    message:
      "Our AI now provides personalized suggestions based on your spending patterns.",
    date: "Yesterday",
    isNew: false,
  },
  {
    id: 5,
    type: "success",
    title: "Refund Processed",
    message: 'The refund of $34.90 from "Amazon" has been credited back.',
    date: "Yesterday",
    isNew: false,
  },
];

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isVisible,
  onClose,
}) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <MotiView
          from={{ opacity: 0, scale: 0.9, translateY: -20 }}
          animate={{ opacity: 1, scale: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 15 }}
          style={styles.modalContent}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Activity Center</Text>
              <View style={styles.badgeContainer}>
                <View style={styles.activeDot} />
                <Text style={styles.badgeText}>2 New Alerts</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons
                name="close-circle"
                size={28}
                color={colors.textLight}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {notifications.map((notif, index) => (
              <MotiView
                key={notif.id}
                from={{ opacity: 0, scale: 0.9, translateY: 10 }}
                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                transition={{
                  type: "timing",
                  duration: 400,
                  delay: index * 100,
                }}
                style={[
                  styles.notifItem,
                  notif.isNew && styles.newItem,
                  { minHeight: 70, backgroundColor: "rgba(255,255,255,0.03)" },
                ]}
              >
                <View style={[styles.iconWrapper, getBadgeStyle(notif.type)]}>
                  <MaterialCommunityIcons
                    name={getIcon(notif.type) as any}
                    size={22}
                    color={getBadgeColor(notif.type)}
                  />
                </View>
                <View style={styles.notifText}>
                  <View style={styles.notifHeader}>
                    <Text
                      style={[
                        styles.notifTitle,
                        notif.isNew && styles.boldTitle,
                      ]}
                    >
                      {notif.title}
                    </Text>
                    <Text style={styles.notifDate}>{notif.date}</Text>
                  </View>
                  <Text numberOfLines={2} style={styles.notifMessage}>
                    {notif.message}
                  </Text>
                </View>
                {notif.isNew && <View style={styles.unreadMarker} />}
              </MotiView>
            ))}

            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>View All History</Text>
            </TouchableOpacity>
          </ScrollView>
        </MotiView>
      </View>
    </Modal>
  );
};

const getBadgeStyle = (type: string) => ({
  backgroundColor:
    type === "success"
      ? "#10b98110"
      : type === "alert"
        ? "#ef444410"
        : type === "info"
          ? "#3b82f610"
          : "#8b5cf610",
});

const getBadgeColor = (type: string) =>
  type === "success"
    ? "#10b981"
    : type === "alert"
      ? "#ef4444"
      : type === "info"
        ? "#3b82f6"
        : "#8b5cf6";

const getIcon = (type: string) =>
  type === "success"
    ? "check-decagram"
    : type === "alert"
      ? "alert-decagram"
      : type === "info"
        ? "information"
        : "auto-fix";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: "94%",
    alignSelf: "center",
    minHeight: "60%",
    backgroundColor: colors.cardBackground,
    borderRadius: 32,
    padding: spacing.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    ...shadows.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
    letterSpacing: -0.8,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: typography.fontFamily.semibold,
  },
  closeButton: {
    padding: 2,
  },
  content: {
    flex: 1,
    minHeight: 10,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },
  notifItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  newItem: {
    backgroundColor: "rgba(59, 130, 246, 0.08)",
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  notifText: {
    flex: 1,
  },
  notifHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  notifTitle: {
    fontSize: 15,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
  },
  boldTitle: {
    fontFamily: typography.fontFamily.extraBold,
    color: colors.primary,
  },
  notifDate: {
    fontSize: 11,
    color: colors.textLight,
    fontFamily: typography.fontFamily.medium,
  },
  notifMessage: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    fontFamily: typography.fontFamily.regular,
  },
  unreadMarker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: spacing.sm,
  },
  seeAllButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: typography.fontFamily.bold,
    color: colors.textSecondary,
  },
});
