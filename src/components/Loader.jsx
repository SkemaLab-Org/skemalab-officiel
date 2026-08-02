"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import BrandMark from "@/components/BrandMark";

const LOAD_MS = 700;

export default function Loader() {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion !== false) return undefined;

    const start = performance.now();
    let frame;
    document.body.style.overflow = "hidden";

    const tick = (now) => {
      const elapsed = now - start;
      const next = Math.min(100, Math.floor((elapsed / LOAD_MS) * 100));
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 120);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  const visible = reduceMotion !== true && !done;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-page"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 gradient-mesh opacity-70" />
          <div className="absolute inset-0 grid-bg opacity-40" />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 px-6 sm:gap-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center">
              <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-muted">
                Digital Studio
              </p>
              <BrandMark
                as="span"
                className="text-4xl tracking-[-0.03em] sm:text-5xl md:text-6xl"
              />
              <div className="mx-auto mt-5 h-[2px] w-16 rounded-[3px] bg-brand" />
            </div>

            <div className="w-[min(15rem,80vw)] sm:w-80">
              <div className="mb-2.5 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted">
                <span>Chargement</span>
                <span className="tabular-nums text-fg/70">{progress}%</span>
              </div>
              <div className="h-[3px] overflow-hidden rounded-[3px] bg-line">
                <div
                  className="h-full rounded-[3px] bg-brand transition-[width] duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
