"use client";

import { cn } from "@/lib/utils";
import { copy } from "./copy";

/** Shared easing for the hero variants (exponential ease-out). */
export const EASE = [0.16, 1, 0.3, 1];

export { cn };

/** Copy + direction for a locale. */
export function heroCtx(locale) {
  const safe = copy[locale] ? locale : "fr";
  const rtl = safe === "ar";
  return { t: copy[safe], rtl, dir: rtl ? "rtl" : "ltr" };
}

export const lineGrid = (color, size = 64) => ({
  backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
  backgroundSize: `${size}px ${size}px`,
});

export const dotGrid = (color, size = 28) => ({
  backgroundImage: `radial-gradient(${color} 1.2px, transparent 1.4px)`,
  backgroundSize: `${size}px ${size}px`,
});

const RING =
  "outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent-bright";

/**
 * Primary + secondary call to action.
 * `one` = secondary label for a single service.
 */
export function Cta({ t, one, className }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a
        href="#contact"
        className={cn(
          "group relative inline-flex h-12 items-center overflow-hidden rounded-md bg-brand px-6 text-sm font-semibold text-on-brand",
          RING,
        )}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-accent-bright transition-transform duration-300 ease-out group-hover:scale-y-100"
        />
        <span className="relative transition-colors duration-300 group-hover:text-[#04120e]">
          {t.cta.primary}
        </span>
      </a>
      <a
        href="#services"
        className={cn(
          "inline-flex h-12 items-center rounded-md border border-cream/20 px-6 text-sm font-medium text-cream/90 transition-colors hover:border-accent-bright hover:text-accent-bright",
          RING,
        )}
      >
        {one ? t.cta.one : t.cta.all}
      </a>
    </div>
  );
}
