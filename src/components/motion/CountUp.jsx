"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/** Number ticker that counts up once, when the value enters the viewport. */
export default function CountUp({
  value,
  suffix = "",
  duration = 1600,
  className,
  suffixClassName = "text-accent",
  leadingClassName,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      return undefined;
    }

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value, duration]);

  const shown = reduce ? value : display;
  const text = String(shown);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {leadingClassName ? (
        <>
          <span className={leadingClassName}>{text.slice(0, 1)}</span>
          {text.slice(1)}
        </>
      ) : (
        text
      )}
      {suffix ? <span className={suffixClassName}>{suffix}</span> : null}
    </span>
  );
}
