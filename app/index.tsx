/**
 * Main Navigation
 *
 * Sets up bottom tab navigation with Dashboard, Transactions, and Analytics screens.
 * Uses React Navigation for navigation management.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { usePathname } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AddExpenseScreen,
  AnalyticsScreen,
  DashboardScreen,
  ForgotPasswordScreen,
  LoginScreen,
  ProfileScreen,
  SettingsScreen,
  SignupScreen,
  TransactionsScreen,
} from "../screens";
import { parseWebPath, TabScreenName } from "../navigation/parseWebPath";
import { colors, typography } from "../theme";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface TabNavigatorProps {
  initialRouteName?: TabScreenName;
}

function TabNavigator({ initialRouteName = "Dashboard" }: TabNavigatorProps) {
  const insets = useSafeAreaInsets();
  const tabBarBottomPadding = Math.max(insets.bottom, 12);

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: colors.cardBackground,
          paddingBottom: tabBarBottomPadding,
          paddingTop: 12,
          height: 72 + tabBarBottomPadding,
          elevation: 0,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: typography.fontFamily.bold,
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "view-dashboard" : "view-dashboard-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "receipt" : "receipt-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "chart-pie" : "chart-line"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "cog" : "cog-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Main Stack Navigator
 * Wraps tabs with modal screens like AddExpense
 */
export default function Index() {
  const pathname = usePathname();
  const { stack, tab } = parseWebPath(pathname);

  return (
    <Stack.Navigator
      initialRouteName={stack}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Tabs">
        {() => <TabNavigator initialRouteName={tab ?? "Dashboard"} />}
      </Stack.Screen>
      <Stack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          presentation: "modal",
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </Stack.Navigator>
  );
}
