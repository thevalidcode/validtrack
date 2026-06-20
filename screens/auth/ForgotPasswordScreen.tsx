/**
 * ForgotPassword Screen
 *
 * Screen for password recovery with professional styling.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    colors,
    shadows,
    spacing,
    typography,
} from "../../theme";

interface ForgotPasswordScreenProps {
  navigation: any;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, scale: 0.9, translateY: -20 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 20 }}
        style={[styles.header, { paddingTop: insets.top + spacing.lg }]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Recovery Mode</Text>
        <Text style={styles.subtitle}>Enter your email to reset password</Text>
      </MotiView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {!submitted ? (
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500, delay: 200 }}
            style={styles.form}
          >
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={colors.textLight}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="example@mail.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setSubmitted(true)}
              activeOpacity={0.8}
              style={styles.submitButtonContainer}
            >
              <LinearGradient
                colors={[
                  colors.primaryGradientStart,
                  colors.primaryGradientEnd,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Reset Password</Text>
              </LinearGradient>
            </TouchableOpacity>
          </MotiView>
        ) : (
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            style={styles.successView}
          >
            <View style={styles.successIcon}>
              <MaterialCommunityIcons
                name="check-circle"
                size={80}
                color={colors.success}
              />
            </View>
            <Text style={styles.successTitle}>Check Your Inbox</Text>
            <Text style={styles.successSubtitle}>
              We've sent recovery instructions to your email address.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.replace("Login")}
              style={styles.backToLogin}
            >
              <Text style={styles.backToLoginText}>Back to Log In</Text>
            </TouchableOpacity>
          </MotiView>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  title: {
    fontSize: 28,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    fontFamily: typography.fontFamily.medium,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: "flex-start",
    paddingTop: spacing.xl,
  },
  form: {
    width: "100%",
  },
  inputWrapper: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: 14,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    height: 56,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.sm,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontFamily: typography.fontFamily.medium,
  },
  submitButtonContainer: {
    marginTop: spacing.xl,
  },
  submitButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    ...shadows.md,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: typography.fontFamily.extraBold,
  },
  successView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.massive,
  },
  successIcon: {
    marginBottom: spacing.xl,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: typography.fontFamily.extraBold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  successSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    fontFamily: typography.fontFamily.medium,
    paddingHorizontal: spacing.xl,
    lineHeight: 24,
  },
  backToLogin: {
    marginTop: spacing.xxl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    ...shadows.sm,
  },
  backToLoginText: {
    color: colors.primary,
    fontFamily: typography.fontFamily.extraBold,
    fontSize: 16,
  },
});
