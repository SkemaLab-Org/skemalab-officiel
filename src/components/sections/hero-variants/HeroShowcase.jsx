"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useI18n } from "@/components/I18nProvider";
import { cn } from "@/lib/utils";
import Hero from "@/components/sections/Hero";
import HeroScan from "./HeroScan";
import HeroShift from "./HeroShift";
import HeroTriptych from "./HeroTriptych";

/**
 * Hero variant picker.
 *
 * Temporary decision aid: pick a variant, compare them in place, then keep the
 * winner and delete this file (plus the losing variants). The choice is stored
 * in `localStorage` and mirrored in `?hero=` so a specific variant can be
 * shared or screenshotted. Set `NEXT_PUBLIC_HERO_SWITCHER=false` to hide the
 * bar without touching the code.
 */

const STORAGE_KEY = "skemalab-hero-variant";
const HERO_EVENT = "skemalab:hero-variant";
const DEFAULT_VARIANT = "shift";
const SWITCHER_ENABLED = process.env.NEXT_PUBLIC_HERO_SWITCHER !== "false";

const VARIANTS = [
  { id: "current", label: "Actuel" },
  { id: "scan", label: "Scan" },
  { id: "shift", label: "Shift" },
  { id: "triptych", label: "Triptych" },
];

const isVariant = (value) => VARIANTS.some((variant) => variant.id === value);

function subscribe(onChange) {
  window.addEventListener("storage", onChange);
  window.addEventListener("popstate", onChange);
  window.addEventListener(HERO_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(HERO_EVENT, onChange);
  };
}

function getSnapshot() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("hero");
    if (isVariant(fromUrl)) return fromUrl;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isVariant(stored)) return stored;
  } catch {
    /* storage can be blocked */
  }
  return DEFAULT_VARIANT;
}

const getServerSnapshot = () => DEFAULT_VARIANT;

export default function HeroShowcase() {
  const { locale } = useI18n();
  const variant = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [nearTop, setNearTop] = useState(true);

  // The bar only floats while the hero is on screen, so it never sits on top of
  // the sections below.
  useEffect(() => {
    const onScroll = () => setNearTop(window.scrollY < window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const select = (id) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
      const url = new URL(window.location.href);
      url.searchParams.set("hero", id);
      window.history.replaceState({}, "", url);
    } catch {
      /* storage can be blocked */
    }
    window.dispatchEvent(new Event(HERO_EVENT));
  };

  return (
    <>
      {variant === "scan" ? (
        <HeroScan locale={locale} />
      ) : variant === "triptych" ? (
        <HeroTriptych locale={locale} />
      ) : variant === "current" ? (
        <Hero />
      ) : (
        <HeroShift locale={locale} />
      )}

      {SWITCHER_ENABLED ? (
        <div
          className={cn(
            "pointer-events-none fixed inset-x-0 top-[4.25rem] z-[90] flex justify-center px-4 transition-opacity duration-300 sm:top-[5.25rem]",
            nearTop ? "opacity-100" : "invisible opacity-0",
          )}
        >
          <div
            role="group"
            aria-label="Variante du hero"
            className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-cream/15 bg-[#07110e]/90 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md"
          >
            <span className="label-mono hidden ps-2.5 pe-1.5 text-cream/65 sm:block">
              Hero
            </span>
            {VARIANTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => select(item.id)}
                aria-pressed={variant === item.id}
                className={cn(
                  "min-h-9 rounded-full px-3 text-xs font-medium transition-colors duration-200",
                  variant === item.id
                    ? "bg-accent-bright text-[#04120e]"
                    : "text-cream/65 hover:text-cream",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
