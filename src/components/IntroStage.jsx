"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { markIntroSeen } from "@/lib/intro";

const LINE_IN_MS = 220;
const LINE_OUT_MS = 1500;
const PANEL_OUT_MS = 2050;
const DONE_MS = 2600;

/**
 * One-line opening stage. Mounted only when the hero decides the intro should
 * run. Rendered through a portal so `position: fixed` resolves against the
 * viewport instead of the transformed `PageTransition` wrapper.
 */
export default function IntroStage({ onDone }) {
  const [lineIn, setLineIn] = useState(false);
  const [lineOut, setLineOut] = useState(false);
  const [panelOut, setPanelOut] = useState(false);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(
      new CustomEvent("skemalab:scroll-lock", { detail: true }),
    );

    const timers = [
      window.setTimeout(() => setLineIn(true), LINE_IN_MS),
      window.setTimeout(() => setLineOut(true), LINE_OUT_MS),
      window.setTimeout(() => setPanelOut(true), PANEL_OUT_MS),
      window.setTimeout(() => {
        markIntroSeen();
        document.body.style.overflow = previousOverflow;
        window.dispatchEvent(
          new CustomEvent("skemalab:scroll-lock", { detail: false }),
        );
        doneRef.current?.();
      }, DONE_MS),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      document.body.style.overflow = previousOverflow;
      window.dispatchEvent(
        new CustomEvent("skemalab:scroll-lock", { detail: false }),
      );
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[130] flex items-center justify-center bg-page text-fg transition-opacity duration-500 ease-out-expo"
      style={{ opacity: panelOut ? 0 : 1 }}
    >
      <span
        className={`select-none font-display text-[clamp(2.2rem,7vw,5rem)] font-light leading-none tracking-[-0.05em] transition-[transform,opacity] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
          lineOut
            ? "-translate-y-6 opacity-0"
            : lineIn
              ? "translate-y-0 opacity-100"
              : "translate-y-[14px] opacity-0"
        }`}
      >
        skemalab
      </span>
    </div>,
    document.body,
  );
}
