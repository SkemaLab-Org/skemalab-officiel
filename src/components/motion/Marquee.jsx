"use client";

import { cn } from "@/lib/utils";

/**
 * CSS marquee (transform-only). Duplicated track is hidden from assistive tech,
 * pauses on hover/focus, and stops under reduced motion.
 */
export default function Marquee({ children, className, duration = 42, repeat = 2 }) {
  const copies = Array.from({ length: repeat }, (_, index) => index);

  return (
    <div className={cn("marquee relative overflow-hidden", className)}>
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` }}
      >
        {copies.map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy > 0 ? "true" : undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
