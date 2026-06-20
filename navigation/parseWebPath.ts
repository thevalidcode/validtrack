const TAB_SCREENS = [
  "Dashboard",
  "Transactions",
  "Analytics",
  "Settings",
] as const;

const STACK_SCREENS = [
  "Login",
  "Signup",
  "ForgotPassword",
  "Profile",
  "Tabs",
  "AddExpense",
] as const;

export type TabScreenName = (typeof TAB_SCREENS)[number];
export type StackScreenName = (typeof STACK_SCREENS)[number];

export function parseWebPath(pathname: string): {
  stack: StackScreenName;
  tab?: TabScreenName;
} {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return { stack: "Login" };
  }

  if (segments[0] === "Tabs") {
    const tabName = segments[1];
    const tab = TAB_SCREENS.includes(tabName as TabScreenName)
      ? (tabName as TabScreenName)
      : "Dashboard";

    return { stack: "Tabs", tab };
  }

  if (STACK_SCREENS.includes(segments[0] as StackScreenName)) {
    return { stack: segments[0] as StackScreenName };
  }

  return { stack: "Login" };
}
