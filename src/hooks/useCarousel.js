"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Shared carousel state: index, prev/next, autoplay, swipe.
 * Autoplay pauses when reduced-motion is preferred or when paused=true.
 */
export default function useCarousel(length, { intervalMs = 6500, paused = false } = {}) {
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);
  const reduceMotion = useReducedMotion();

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? length - 1 : i - 1));
  }, [length]);

  const next = useCallback(() => {
    setIndex((i) => (i === length - 1 ? 0 : i + 1));
  }, [length]);

  const goTo = useCallback((i) => {
    setIndex(Math.max(0, Math.min(length - 1, i)));
  }, [length]);

  useEffect(() => {
    if (paused || reduceMotion || length < 2) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i === length - 1 ? 0 : i + 1));
    }, intervalMs);
    return () => clearInterval(id);
  }, [paused, reduceMotion, length, intervalMs]);

  const onTouchStart = useCallback((e) => {
    touchX.current = e.changedTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      if (touchX.current == null) return;
      const delta = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(delta) > 45) {
        if (delta > 0) prev();
        else next();
      }
      touchX.current = null;
    },
    [prev, next],
  );

  return {
    index,
    setIndex: goTo,
    prev,
    next,
    reduceMotion,
    onTouchStart,
    onTouchEnd,
  };
}
