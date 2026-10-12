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
import { defaultLocale, locales, getDictionary } from "@/i18n";

const I18nContext = createContext({
  locale: defaultLocale,
  setLocale: () => {},
  t: getDictionary(defaultLocale),
  dir: "ltr",
  isRTL: false,
  locales,
});

function applyLocaleToDoc(locale) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const isRtl = locales[locale]?.dir === "rtl";

  root.lang = locale;
  root.dir = isRtl ? "rtl" : "ltr";
  root.classList.toggle("rtl", isRtl);
}

function getStoredLocale() {
  if (typeof window === "undefined") return defaultLocale;
  try {
    // 1. Check URL search param (?lang=ar)
    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get("lang");
    if (queryLang && locales[queryLang]?.enabled) {
      return queryLang;
    }

    // 2. Check localStorage
    const saved = window.localStorage.getItem("skemalab-locale");
    if (saved && locales[saved]?.enabled) {
      return saved;
    }
  } catch {
    /* ignore error */
  }
  return defaultLocale;
}

function subscribeLocale(onStoreChange) {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e) => {
    if (e.key === "skemalab-locale") onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

export function I18nProvider({ children }) {
  const stored = useSyncExternalStore(
    subscribeLocale,
    getStoredLocale,
    () => defaultLocale,
  );
  const [override, setOverride] = useState(null);
  const locale = override ?? stored;

  useEffect(() => {
    applyLocaleToDoc(locale);
  }, [locale]);

  const setLocale = useCallback((nextLocale) => {
    if (!locales[nextLocale]?.enabled) return;
    setOverride(nextLocale);
    try {
      window.localStorage.setItem("skemalab-locale", nextLocale);
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      /* ignore */
    }
    applyLocaleToDoc(nextLocale);
  }, []);

  const dir = locales[locale]?.dir || "ltr";
  const isRTL = dir === "rtl";
  const t = useMemo(() => getDictionary(locale), [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      dir,
      isRTL,
      locales,
    }),
    [locale, setLocale, t, dir, isRTL],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}
