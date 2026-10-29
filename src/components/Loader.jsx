"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import BrandMark from "@/components/BrandMark";
import { LuxuryRibbonMotif } from "@/components/ui/MoroccanPattern";

const LOAD_MS = 1100;
const EXIT_MS = 380;
const SESSION_KEY = "skemalab-loader-seen";

const STAGES = [
  { at: 0, label: "Initialisation" },
  { at: 28, label: "Chargement" },
  { at: 62, label: "Préparation" },
  { at: 88, label: "Presque prêt" },
];

function subscribe() {
  return () => {};
}

function getSkipSnapshot() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function getServerSkipSnapshot() {
  return true;
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function stageLabel(progress) {
  let label = STAGES[0].label;
  for (const stage of STAGES) {
    if (progress >= stage.at) label = stage.label;
  }
  return label;
}

export default function Loader() {
  const reduceMotion = useReducedMotion();
  const skip = useSyncExternalStore(
    subscribe,
    getSkipSnapshot,
    getServerSkipSnapshot,
  );
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const shouldAnimate = !skip && reduceMotion === false;
  const visible = shouldAnimate && !done;

  useEffect(() => {
    if (!shouldAnimate) return undefined;

    const start = performance.now();
    let frame;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tick = (now) => {
      const t = Math.min(1, (now - start) / LOAD_MS);
      const next = Math.min(100, Math.round(easeOutCubic(t) * 100));
      setProgress(next);

      if (t < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }

      window.setTimeout(() => {
        setDone(true);
        document.body.style.overflow = prevOverflow;
      }, 120);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = prevOverflow;
    };
  }, [shouldAnimate]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="brand-fusion-bg fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: EXIT_MS / 1000,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          aria-hidden="true"
          role="presentation"
        >
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" />
          <div className="pointer-events-none absolute -left-1/4 top-1/4 h-[50vmin] w-[50vmin] rounded-full bg-brand/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-1/4 bottom-1/4 h-[45vmin] w-[45vmin] rounded-full bg-accent/25 blur-[90px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35">
            <LuxuryRibbonMotif width={620} height={360} opacity={0.65} />
          </div>

          <motion.div
            className="relative z-10 flex w-full max-w-md flex-col items-center px-6"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="mb-5 text-[10px] uppercase tracking-[0.42em] text-white/50 sm:text-[11px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              Digital Studio
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <BrandMark as="span" className="h-10 sm:h-12" />
            </motion.div>

            <motion.div
              className="mt-7 h-px w-14 origin-center bg-brand/80 sm:mt-8 sm:w-16"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="mt-10 w-full max-w-[16rem] sm:mt-12 sm:max-w-[18rem]">
              <div className="mb-3 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-white/45 sm:text-[11px]">
                <span className="truncate">{stageLabel(progress)}</span>
                <span className="tabular-nums text-white/70">
                  {String(progress).padStart(2, "0")}%
                </span>
              </div>

              <div className="relative h-[2px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-brand shadow-[0_0_16px_rgba(8,149,135,0.55)]"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.12, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>

          <motion.p
            className="absolute bottom-8 left-0 right-0 text-center text-[10px] uppercase tracking-[0.28em] text-white/30 sm:bottom-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Build · Grow · Automate
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
