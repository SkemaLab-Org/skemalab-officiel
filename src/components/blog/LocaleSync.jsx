"use client";

import { useEffect } from "react";
import { useI18n } from "@/components/I18nProvider";
import { DIR } from "@/lib/blog/config";

/**
 * Aligns the site language with the blog URL. The URL is the source of truth
 * inside /[locale]/blog, even though the rest of the site uses localStorage.
 */
export default function LocaleSync({ locale }) {
  const { locale: currentLocale, setLocale } = useI18n();

  useEffect(() => {
    if (currentLocale !== locale) setLocale(locale);

    const root = document.documentElement;
    root.lang = locale;
    root.dir = DIR[locale] || "ltr";
    root.classList.toggle("rtl", DIR[locale] === "rtl");
  }, [locale, currentLocale, setLocale]);

  return null;
}
