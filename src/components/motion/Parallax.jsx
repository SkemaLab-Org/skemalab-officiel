"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked translation. Only `transform` is animated; disabled entirely
 * under reduced motion.
 */
export default function Parallax({
  children,
  className,
  offset = 60,
  axis = "y",
  ...rest
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={cn("relative", className)} {...rest}>
      <motion.div
        className="relative h-full w-full"
        style={reduce ? undefined : axis === "y" ? { y: distance } : { x: distance }}
      >
        {children}
      </motion.div>
    </div>
  );
}
