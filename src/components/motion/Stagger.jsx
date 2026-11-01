"use client";

import { motion, useReducedMotion } from "motion/react";
import { VIEWPORT, staggerContainer, staggerItem } from "@/lib/motion";

/** Parent that orchestrates children revealed in sequence. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
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
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className, as = "div", ...rest }) {
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
    <Component className={className} variants={staggerItem} {...rest}>
      {children}
    </Component>
  );
}
