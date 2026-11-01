"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

const STORAGE_KEY = "skemalab-theme";
const DEFAULT_THEME = "dark";
const THEMES = new Set(["dark", "light"]);

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  toggleTheme: () => {},
});

const listeners = new Set();
let cachedTheme = null;

function readStoredTheme() {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return THEMES.has(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

/* Snapshot must stay referentially stable between notifications, so the value
   is cached and only refreshed when the theme actually changes. */
function getSnapshot() {
  if (cachedTheme === null) cachedTheme = readStoredTheme();
  return cachedTheme;
}

function getServerSnapshot() {
  return DEFAULT_THEME;
}

function applyThemeClass(theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(onStoreChange) {
  listeners.add(onStoreChange);

  const onStorage = (event) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    cachedTheme = readStoredTheme();
    applyThemeClass(cachedTheme);
    emitChange();
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function persistTheme(next) {
  if (!THEMES.has(next) || next === getSnapshot()) return;

  cachedTheme = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* Storage can be unavailable (private mode); the in-memory value still works. */
  }
  applyThemeClass(next);
  emitChange();
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Keep the document in sync during hydration and cross-tab changes.
  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    persistTheme(getSnapshot() === "dark" ? "light" : "dark");
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
