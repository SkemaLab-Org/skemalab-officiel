"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

/** Route transition between the home page and /our-story. */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <div>{children}</div>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.32, ease: EASE.out }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
