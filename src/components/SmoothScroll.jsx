"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling with Lenis. Skipped entirely for reduced-motion visitors so
 * native scrolling stays authoritative for them.
 *
 * Lenis keeps its own scroll position, so `body { overflow: hidden }` is not
 * enough to freeze the page during the intro. The intro dispatches a
 * `skemalab:scroll-lock` event instead and Lenis stops its virtual scroll.
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
    const onScrollLock = (event) => {
      if (event.detail) lenis.stop();
      else lenis.start();
    };

    query.addEventListener("change", onReducedMotion);
    window.addEventListener("skemalab:scroll-lock", onScrollLock);

    return () => {
      query.removeEventListener("change", onReducedMotion);
      window.removeEventListener("skemalab:scroll-lock", onScrollLock);
      lenis.destroy();
    };
  }, []);

  return null;
}
