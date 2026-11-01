"use client";

import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Display heading split into masked lines. Each line rises from behind its own
 * mask — the page's signature entrance.
 *
 * `lines` accepts strings or nodes; `text` provides the accessible label.
 */
export default function SplitText({
  lines = [],
  text,
  as = "h1",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  onView = false,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Component = motion[as] || motion.h1;
  const label = text || lines.map((line) => (typeof line === "string" ? line : "")).join(" ");

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {lines.map((line, index) => (
          <span key={index} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </Plain>
    );
  }

  const animateProps = onView
    ? { whileInView: "show", viewport: VIEWPORT }
    : { animate: "show" };

  return (
    <Component
      className={className}
      aria-label={label || undefined}
      initial="hidden"
      {...animateProps}
      {...rest}
    >
      {lines.map((line, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={cn("mask-line", lineClassName)}
        >
          <motion.span
            className="block"
            variants={{
              hidden: { y: "110%" },
              show: {
                y: "0%",
                transition: {
                  duration: DURATION.slow,
                  delay: delay + index * stagger,
                  ease: EASE.out,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

/** Word-by-word variant for paragraph-scale statements. */
export function SplitWords({
  children,
  as = "p",
  className,
  delay = 0,
  stagger = 0.035,
  onView = true,
}) {
  const reduce = useReducedMotion();
  const text = typeof children === "string" ? children : "";
  const words = text.split(/\s+/).filter(Boolean);
  const Component = motion[as] || motion.p;

  if (reduce || !words.length) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const animateProps = onView
    ? { whileInView: "show", viewport: VIEWPORT }
    : { animate: "show" };

  return (
    <Component
      className={className}
      aria-label={text}
      initial="hidden"
      {...animateProps}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true" className="inline-block whitespace-pre">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: "0.4em" },
              show: {
                opacity: 1,
                y: "0em",
                transition: {
                  duration: 0.5,
                  delay: delay + index * stagger,
                  ease: EASE.out,
                },
              },
            }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
