"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Single-shot entrance reveal. Falls back to a plain element when the visitor
 * asks for reduced motion.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  once = true,
  className,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={once ? VIEWPORT : { ...VIEWPORT, once: false }}
      transition={{ duration: DURATION.base, delay, ease: EASE.out }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Horizontal rule that draws itself in on scroll. */
export function RevealRule({ className = "", delay = 0 }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div aria-hidden="true" className={cn("h-px w-full bg-line", className)} />;
  }

  return (
    <motion.div
      aria-hidden="true"
      className={cn("h-px w-full origin-left bg-line", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.slow, delay, ease: EASE.out }}
    />
  );
}
