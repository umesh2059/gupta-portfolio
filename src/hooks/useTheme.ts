import { useSyncExternalStore } from "react";

const root = () => document.documentElement;

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};

export const toggleTheme = () => {
  const dark = root().classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    /* storage unavailable */
  }
};

/** True when the page is in dark mode. Re-renders whenever the theme changes. */
export const useIsDark = () => useSyncExternalStore(subscribe, () => root().classList.contains("dark"));
