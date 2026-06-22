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

  const tabsIndex = segments.indexOf("Tabs");

  if (tabsIndex !== -1) {
    let tab: TabScreenName = "Dashboard";

    for (let i = 0; i < segments.length - 1; i += 1) {
      if (
        segments[i] === "Tabs" &&
        TAB_SCREENS.includes(segments[i + 1] as TabScreenName)
      ) {
        tab = segments[i + 1] as TabScreenName;
      }
    }

    return { stack: "Tabs", tab };
  }

  const first = segments[0];

  if (STACK_SCREENS.includes(first as StackScreenName)) {
    return { stack: first as StackScreenName };
  }

  return { stack: "Login" };
}
