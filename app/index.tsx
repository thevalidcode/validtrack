/**
 * Main Navigation
 *
 * React Navigation stack + tabs. On web, URL is synced via expo-router replace()
 * so paths stay absolute (e.g. /Tabs/Settings) instead of appending segments.
 */

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  NavigationContainerRef,
  NavigationIndependentTree,
  NavigationState,
  PartialState,
} from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { usePathname, useRouter } from "expo-router";
import React, { useMemo, useRef } from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  getWebPathFromState,
  getWebStateFromPath,
} from "../navigation/linking";
import { parseWebPath } from "../navigation/parseWebPath";
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
import { colors, typography } from "../theme";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  const insets = useSafeAreaInsets();
  const tabBarBottomPadding = Math.max(insets.bottom, 12);

  return (
    <Tab.Navigator
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

function AppStack() {
  return (
    <Stack.Navigator
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
      <Stack.Screen name="Tabs" component={TabNavigator} />
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

export default function Index() {
  const pathname = usePathname();
  const router = useRouter();
  const navigationRef = useRef<NavigationContainerRef<Record<string, unknown>>>(
    null
  );
  const isSyncingUrl = useRef(false);

  const initialNavigationState = useMemo(() => {
    if (Platform.OS !== "web") {
      return undefined;
    }

    return (
      getWebStateFromPath(pathname) ??
      getWebStateFromPath(
        (() => {
          const { stack, tab } = parseWebPath(pathname);
          return tab ? `/Tabs/${tab}` : `/${stack}`;
        })()
      )
    );
  }, []);

  const syncWebUrl = (
    state: NavigationState | PartialState<NavigationState> | undefined
  ) => {
    if (Platform.OS !== "web" || !state || isSyncingUrl.current) {
      return;
    }

    const nextPath = getWebPathFromState(state);

    if (!nextPath || window.location.pathname === nextPath) {
      return;
    }

    isSyncingUrl.current = true;
    router.replace(nextPath as never);
    isSyncingUrl.current = false;
  };

  if (Platform.OS === "web") {
    return (
      <NavigationIndependentTree>
        <NavigationContainer
          ref={navigationRef}
          initialState={initialNavigationState}
          linking={{ enabled: false, prefixes: [] }}
          documentTitle={{ enabled: false }}
          onStateChange={(state) => syncWebUrl(state)}
        >
          <AppStack />
        </NavigationContainer>
      </NavigationIndependentTree>
    );
  }

  return <AppStack />;
}
