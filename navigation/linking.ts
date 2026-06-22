import type { NavigationState, PartialState } from "@react-navigation/native";
import { getPathFromState, getStateFromPath } from "@react-navigation/native";
import type { TabScreenName } from "./parseWebPath";

export const linking = {
  config: {
    screens: {
      Login: "Login",
      Signup: "Signup",
      ForgotPassword: "ForgotPassword",
      Profile: "Profile",
      Tabs: {
        path: "Tabs",
        screens: {
          Dashboard: "Dashboard",
          Transactions: "Transactions",
          Analytics: "Analytics",
          Settings: "Settings",
        },
      },
      AddExpense: "AddExpense",
    },
  },
};

export function getWebPathFromState(
  state: NavigationState | PartialState<NavigationState>
): string | undefined {
  const path = getPathFromState(state, linking.config);

  if (!path) {
    return undefined;
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function getWebStateFromPath(pathname: string) {
  const normalized = pathname.startsWith("/") ? pathname.slice(1) : pathname;

  if (!normalized) {
    return undefined;
  }

  return getStateFromPath(normalized, linking.config);
}

export function getTabPath(tab: TabScreenName): string {
  return `/Tabs/${tab}`;
}
