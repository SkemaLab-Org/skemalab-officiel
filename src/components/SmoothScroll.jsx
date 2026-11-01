"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling with Lenis. Skipped entirely for reduced-motion visitors so
 * native scrolling stays authoritative for them.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      anchors: { offset: -88 },
      autoRaf: true,
    });

    const onReducedMotion = (event) => {
      if (event.matches) lenis.destroy();
    };
    query.addEventListener("change", onReducedMotion);

    return () => {
      query.removeEventListener("change", onReducedMotion);
      lenis.destroy();
    };
  }, []);

  return null;
}
