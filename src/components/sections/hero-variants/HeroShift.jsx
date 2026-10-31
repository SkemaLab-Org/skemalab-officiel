"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { LABEL, SERVICE_KEYS } from "./copy";
import { Cta, EASE, cn, dotGrid, heroCtx } from "./shared";

const STEP_MS = 6500;
const N = 12;

/** Build: a 4×3 grid of modules. */
const BUILD = Array.from({ length: N }, (_, i) => ({
  x: 19 + (i % 4) * 114,
  y: 52 + Math.floor(i / 4) * 90,
  w: 100,
  h: 76,
  r: 10,
}));

/** Grow: twelve bars climbing from the baseline. */
const GROW = Array.from({ length: N }, (_, i) => {
  const h = 36 + i * 21 + (i % 3) * 6;
  return { x: 26 + i * 36, y: 316 - h, w: 24, h, r: 6 };
});

/** Automate: twelve nodes in four layers, connected by EDGES. */
const NODES = [
  [50, 90], [50, 180], [50, 270],
  [170, 60], [170, 140], [170, 220], [170, 300],
  [290, 90], [290, 180], [290, 270],
  [410, 135], [410, 225],
];
const FLOW = NODES.map(([cx, cy]) => ({ x: cx - 17, y: cy - 17, w: 34, h: 34, r: 17 }));
const EDGES = [
  [0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6],
  [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9],
  [7, 10], [8, 10], [8, 11], [9, 11],
];

const SHAPES = { build: BUILD, grow: GROW, automate: FLOW };
const MODULES = ["ERP", "CRM", "Stock", "Sales", "HR", "Billing", "API", "Auth", "BI", "Docs", "Mobile", "Web"];
const TREND = GROW.map((g, i) => `${i ? "L" : "M"}${g.x + g.w / 2} ${g.y - 12}`).join(" ");
const SPRING = { type: "spring", stiffness: 90, damping: 14, mass: 0.8 };

const paint = (key, i) => {
  if (key === "build") {
    return { fill: "rgba(8,149,135,0.10)", stroke: "rgba(58,217,191,0.35)" };
  }
  if (key === "grow") {
    return {
      fill: `rgba(8,149,135,${(0.18 + i * 0.05).toFixed(2)})`,
      stroke: "rgba(58,217,191,0.8)",
    };
  }
  return { fill: "#0f2e2a", stroke: "#3ad9bf" };
};

export default function HeroShift({ locale = "fr" }) {
  const { t, rtl, dir } = heroCtx(locale);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);
  const progress = useMotionValue(0);
  const key = SERVICE_KEYS[active];
  const service = t.services[key];

  // Auto-advance: pauses on hover/focus, off-screen and with reduced motion.
  useAnimationFrame((_, delta) => {
    if (reduce || paused || !inView) return;
    const next = progress.get() + delta / STEP_MS;
    if (next < 1) {
      progress.set(next);
    } else {
      progress.set(0);
      setActive((current) => (current + 1) % SERVICE_KEYS.length);
    }
  });

  const pick = (index) => {
    progress.set(0);
    setActive(index);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        dir={dir}
        aria-labelledby="hero-shift-title"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        className="relative isolate flex min-h-svh items-center overflow-hidden bg-[#07110e] text-cream"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 rtl:-scale-x-100">
          <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_78%_48%,rgba(8,149,135,0.26),transparent)]" />
          <div
            className="absolute inset-0 [mask-image:radial-gradient(60%_70%_at_75%_50%,#000,transparent)]"
            style={dotGrid("rgba(242,237,226,0.16)")}
          />
        </div>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-sm text-cream/65">{t.tagline}</p>

            <div aria-live="polite" className="mt-5 min-h-[17rem] lg:min-h-[20rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <h1
                    id="hero-shift-title"
                    className="text-balance font-display text-[clamp(2.4rem,5.2vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.03em] rtl:leading-[1.25] rtl:tracking-normal"
                  >
                    {service.title}
                  </h1>
                  <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-cream/65">
                    {service.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <Cta t={t} one className="mt-8" />

            <div
              role="tablist"
              aria-label={t.cta.all}
              className="mt-12 grid grid-cols-3 gap-4"
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              {SERVICE_KEYS.map((serviceKey, index) => {
                const on = index === active;
                return (
                  <button
                    key={serviceKey}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => pick(index)}
                    className="group text-start outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent-bright"
                  >
                    <span className="relative block h-px bg-cream/15">
                      <motion.span
                        className="absolute inset-x-0 -top-px h-0.5 bg-accent-bright"
                        style={{
                          scaleX: on ? (reduce ? 1 : progress) : 0,
                          transformOrigin: rtl ? "100% 50%" : "0% 50%",
                        }}
                      />
                    </span>
                    <span
                      className={cn(
                        "mt-3 block text-sm font-medium transition-colors",
                        on ? "text-cream" : "text-cream/65 group-hover:text-cream/85",
                      )}
                    >
                      {LABEL[serviceKey]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <svg viewBox="0 0 480 360" role="img" aria-label={service.title} className="w-full">
              {EDGES.map(([a, b], index) => (
                <motion.line
                  key={index}
                  x1={NODES[a][0]}
                  y1={NODES[a][1]}
                  x2={NODES[b][0]}
                  y2={NODES[b][1]}
                  stroke="#3ad9bf"
                  strokeWidth={1.2}
                  strokeDasharray="3 7"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: key === "automate" ? 0.6 : 0,
                    strokeDashoffset: [0, -20],
                  }}
                  transition={{
                    opacity: { delay: key === "automate" ? 0.6 : 0, duration: 0.5 },
                    strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: "linear" },
                  }}
                />
              ))}

              <motion.path
                d={TREND}
                fill="none"
                stroke="#3ad9bf"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: key === "grow" ? 1 : 0,
                  opacity: key === "grow" ? 0.9 : 0,
                }}
                transition={{ duration: 0.9, delay: key === "grow" ? 0.7 : 0 }}
              />

              {Array.from({ length: N }, (_, index) => {
                const shape = SHAPES[key][index];
                return (
                  <motion.rect
                    key={index}
                    strokeWidth={1.2}
                    initial={{
                      x: 240,
                      y: 180,
                      width: 0,
                      height: 0,
                      rx: 0,
                      opacity: 0,
                      fill: "rgba(8,149,135,0)",
                      stroke: "rgba(58,217,191,0)",
                    }}
                    animate={{
                      x: shape.x,
                      y: shape.y,
                      width: shape.w,
                      height: shape.h,
                      rx: shape.r,
                      opacity: 1,
                      ...paint(key, index),
                    }}
                    transition={{ ...SPRING, delay: index * 0.03 }}
                  />
                );
              })}

              {MODULES.map((module, index) => {
                const shape = SHAPES[key][index];
                return (
                  <motion.text
                    key={module}
                    textAnchor="middle"
                    fontSize={13}
                    fill="#f2ede2"
                    pointerEvents="none"
                    initial={{ x: 240, y: 180, opacity: 0 }}
                    animate={{
                      x: shape.x + shape.w / 2,
                      y: shape.y + shape.h / 2 + 4,
                      opacity: key === "build" ? 0.85 : 0,
                    }}
                    transition={{ ...SPRING, delay: index * 0.03 }}
                  >
                    {module}
                  </motion.text>
                );
              })}
            </svg>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
