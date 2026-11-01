"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/* Hydration-safe reduced-motion preference: the server snapshot is always
   false, so the first client render matches the server markup and the real
   preference is applied right after hydration. This avoids mismatches in
   components that branch on motion at render time. */
export default function usePrefersReducedMotion() {
  const subscribe = useCallback((onChange) => {
    if (typeof window === "undefined") return () => {};
    const mql = window.matchMedia(QUERY);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
