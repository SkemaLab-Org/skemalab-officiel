"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Tolerance (px) around the scroll edges before a fade is drawn. */
const EDGE = 2;

/** Reads a CSS length and returns it in pixels. */
function toPx(raw) {
  const value = Number.parseFloat(raw);
  if (Number.isNaN(value)) return 0;
  if (raw.endsWith("rem")) {
    const root = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize,
    );
    return value * (Number.isNaN(root) ? 16 : root);
  }
  return value;
}

/**
 * Scrollable rail of category chips.
 *
 * It owns three progressive enhancements on top of a plain list of links:
 *  - it measures the overflow so the edge fades only appear when there is
 *    actually something to scroll to;
 *  - it watches its own position so the bar can switch to a frosted panel
 *    only while it is pinned under the navbar;
 *  - it moves the focus between chips with the arrow keys.
 */
export default function CategoryRail({ label, children }) {
  const railRef = useRef(null);
  const navRef = useRef(null);
  const [overflow, setOverflow] = useState("none");
  const [stuck, setStuck] = useState(false);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    if (max <= EDGE) {
      setOverflow("none");
      return;
    }

    // In RTL the scrollLeft is negative, so the absolute position keeps the
    // comparison symmetric between both writing directions.
    const pos = Math.abs(el.scrollLeft);
    const hiddenStart = pos > EDGE;
    const hiddenEnd = pos < max - EDGE;

    setOverflow(
      hiddenStart && hiddenEnd
        ? "both"
        : hiddenStart
          ? "start"
          : hiddenEnd
            ? "end"
            : "none",
    );
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return undefined;

    measure();

    const onScroll = () => measure();
    el.addEventListener("scroll", onScroll, { passive: true });

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    for (const child of el.children) observer.observe(child);

    return () => {
      el.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [measure]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const offset = toPx(
        getComputedStyle(nav).getPropertyValue("--blog-nav-offset"),
      );
      setStuck(nav.getBoundingClientRect().top <= offset + 1);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const onKeyDown = useCallback((event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    const el = railRef.current;
    if (!el) return;

    const links = Array.from(el.querySelectorAll("a"));
    const index = links.indexOf(document.activeElement);
    if (index === -1) return;

    const rtl = getComputedStyle(el).direction === "rtl";
    const forward = rtl ? event.key === "ArrowLeft" : event.key === "ArrowRight";
    const target = links[index + (forward ? 1 : -1)];
    if (!target) return;

    event.preventDefault();
    target.focus();
    target.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, []);

  return (
    <nav
      ref={navRef}
      className="blog-categorybar"
      aria-label={label}
      role="navigation"
      data-stuck={stuck ? "true" : undefined}
    >
      <div
        ref={railRef}
        className="blog-categorybar-rail"
        data-overflow={overflow}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
    </nav>
  );
}
