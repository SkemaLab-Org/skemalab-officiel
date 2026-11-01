"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

function applyThemeClass(next) {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.style.colorScheme = next;
}

function getStoredTheme() {
  try {
    return window.localStorage.getItem("skemalab-theme") === "light"
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}

function subscribeTheme(onStoreChange) {
  const onStorage = (e) => {
    if (e.key === "skemalab-theme") onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

export function ThemeProvider({ children }) {
  const stored = useSyncExternalStore(
    subscribeTheme,
    getStoredTheme,
    () => "dark",
  );
  const [override, setOverride] = useState(null);
  const theme = override ?? stored;

  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setOverride((current) => {
      const base = current ?? getStoredTheme();
      const next = base === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem("skemalab-theme", next);
      } catch {
        /* ignore */
      }
      applyThemeClass(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
