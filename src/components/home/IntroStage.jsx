"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/components/I18nProvider";
import { INTRO_SESSION_KEY, INTRO_TOTAL_MS } from "@/components/home/intro";
import { EASE } from "@/lib/motion";

function subscribe() {
  return () => {};
}

function getSeenSnapshot() {
  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

/* The server never renders the overlay, so the first paint is the real page.
   Returning visitors skip it entirely. */
function getServerSeenSnapshot() {
  return true;
}

export default function IntroStage() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const seen = useSyncExternalStore(
    subscribe,
    getSeenSnapshot,
    getServerSeenSnapshot,
  );
  const [lift, setLift] = useState(false);
  const [exit, setExit] = useState(false);
  const [done, setDone] = useState(false);

  const active = !seen && reduce === false && !done;

  useEffect(() => {
    if (!active) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const liftTimer = window.setTimeout(() => setLift(true), 1500);
    const exitTimer = window.setTimeout(() => setExit(true), 2050);
    const doneTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
      } catch {
        /* storage can be unavailable */
      }
      setDone(true);
      document.body.style.overflow = previousOverflow;
    }, INTRO_TOTAL_MS);

    return () => {
      window.clearTimeout(liftTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  if (!active) return null;

  return (
    <motion.div
      role="presentation"
      aria-hidden="true"
      className="fixed inset-0 z-[130] flex flex-col items-center justify-center overflow-hidden bg-[#07110e] px-6 text-cream"
      initial={{ opacity: 1 }}
      animate={exit ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.34, ease: EASE.inOut }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "url(/moroccan-zellige.svg)",
          backgroundSize: "128px 128px",
        }}
      />

      <motion.p
        className="relative max-w-[18ch] text-center font-display text-[clamp(2.2rem,6.6vw,5rem)] font-light leading-[0.98] tracking-[-0.05em] text-cream"
        initial={{ opacity: 0, y: 14 }}
        animate={lift ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: lift ? 0.5 : 0.8, delay: lift ? 0 : 0.22, ease: EASE.out },
          y: { duration: lift ? 0.5 : 0.8, delay: lift ? 0 : 0.22, ease: EASE.out },
        }}
      >
        {t.home.introLine}
      </motion.p>

      <motion.span
        aria-hidden="true"
        className="mt-8 h-px w-40 origin-left bg-accent/70"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.35, delay: 0.3, ease: EASE.out }}
      />
    </motion.div>
  );
}
