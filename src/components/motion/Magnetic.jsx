"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Cursor-attracted wrapper for primary actions. Desktop pointers only, and
 * fully disabled when the visitor prefers reduced motion.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.28,
  as = "div",
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const Component = motion[as] || motion.div;

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const active = enabled && !reduce;

  const onPointerMove = (event) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (!active) {
    const Plain = as;
    return (
      <Plain ref={ref} className={cn("inline-flex", className)} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Component
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      {...rest}
    >
      {children}
    </Component>
  );
}
