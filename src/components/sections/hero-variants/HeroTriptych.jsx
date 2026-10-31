"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion } from "motion/react";
import { LABEL, SERVICE_KEYS } from "./copy";
import { Cta, EASE, cn, dotGrid, heroCtx } from "./shared";

/** Small drawing that plays each time its panel opens. */
function Specimen({ serviceKey }) {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className="w-full overflow-visible">
      {serviceKey === "build" &&
        [150, 104, 176, 88, 130].map((width, index) => (
          <motion.rect
            key={index}
            y={index * 24}
            height={14}
            rx={4}
            fill={index === 2 ? "#3ad9bf" : "rgba(58,217,191,0.28)"}
            initial={{ width: 0 }}
            animate={{ width }}
            transition={{ delay: 0.3 + index * 0.09, duration: 0.7, ease: EASE }}
          />
        ))}
      {serviceKey === "grow" && (
        <>
          <motion.path
            d="M0 108 L40 88 L80 94 L120 54 L160 40 L200 8"
            fill="none"
            stroke="#3ad9bf"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 1.1, ease: "easeInOut" }}
          />
          <motion.circle
            cx={200}
            cy={8}
            fill="#3ad9bf"
            initial={{ r: 0 }}
            animate={{ r: 5 }}
            transition={{ delay: 1.35 }}
          />
        </>
      )}
      {serviceKey === "automate" && (
        <>
          <path d="M24 60 H176" stroke="rgba(58,217,191,0.3)" strokeWidth={2} />
          {[24, 100, 176].map((cx) => (
            <circle key={cx} cx={cx} cy={60} r={12} fill="#0f2e2a" stroke="#3ad9bf" strokeWidth={2} />
          ))}
          <motion.circle
            cy={60}
            r={4}
            fill="#3ad9bf"
            initial={{ cx: 24 }}
            animate={{ cx: [24, 100, 176] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}
    </svg>
  );
}

export default function HeroTriptych({ locale = "fr" }) {
  const { t, dir } = heroCtx(locale);
  const [active, setActive] = useState("build");
  const timer = useRef(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Hover intent: avoids flicker while the pointer crosses panels that are resizing.
  const hover = (key) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setActive(key), 110);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        dir={dir}
        aria-labelledby="hero-tri-title"
        className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#07110e] text-cream"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10 rtl:-scale-x-100">
          <div className="absolute inset-0 bg-[radial-gradient(55%_50%_at_85%_0%,rgba(8,149,135,0.28),transparent)]" />
          <div
            className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]"
            style={dotGrid("rgba(242,237,226,0.12)")}
          />
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end gap-12 px-5 pb-10 pt-32 sm:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <h1
              id="hero-tri-title"
              className="text-balance font-display text-[clamp(2.5rem,5.6vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.03em] lg:col-span-8 rtl:leading-[1.25] rtl:tracking-normal"
            >
              {t.triptych.title}
            </h1>
            <div className="flex flex-col gap-6 lg:col-span-4">
              <p className="max-w-sm text-pretty leading-relaxed text-cream/65">
                {t.triptych.sub}
              </p>
              <Cta t={t} />
            </div>
          </div>

          <div className="flex h-[34rem] flex-col overflow-hidden rounded-lg border border-cream/15 lg:h-[26rem] lg:flex-row">
            {SERVICE_KEYS.map((key, index) => {
              const on = key === active;
              return (
                <motion.div
                  key={key}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") hover(key);
                  }}
                  onPointerLeave={() => window.clearTimeout(timer.current)}
                  initial={{ opacity: 0, y: 48, flexGrow: key === "build" ? 4 : 1 }}
                  animate={{ opacity: 1, y: 0, flexGrow: on ? 4 : 1 }}
                  transition={{
                    opacity: { duration: 0.8, delay: 0.4 + index * 0.12 },
                    y: { duration: 0.9, delay: 0.4 + index * 0.12, ease: EASE },
                    flexGrow: { type: "spring", stiffness: 130, damping: 22 },
                  }}
                  className={cn(
                    "relative min-h-0 min-w-0 basis-0 overflow-hidden",
                    index > 0 && "border-t border-cream/10 lg:border-s lg:border-t-0",
                    on
                      ? "bg-[#0a2b24] bg-[radial-gradient(80%_90%_at_100%_100%,rgba(8,149,135,0.22),transparent)]"
                      : "hover:bg-cream/[0.03]",
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`tri-${key}`}
                    onClick={() => setActive(key)}
                    onFocus={() => setActive(key)}
                    className="absolute inset-0 z-10 cursor-pointer outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-accent-bright"
                  >
                    <span className="sr-only">{LABEL[key]}</span>
                  </button>

                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute end-5 top-5 size-4 transition-transform duration-500",
                      on && "rotate-45",
                    )}
                  >
                    <i className="absolute inset-x-0 top-1/2 h-px bg-cream/60" />
                    <i className="absolute inset-y-0 left-1/2 w-px bg-cream/60" />
                  </span>

                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 flex items-center p-5 transition-opacity duration-300 lg:items-end lg:justify-center",
                      on ? "pointer-events-none opacity-0" : "opacity-100 delay-100",
                    )}
                  >
                    <span className="text-2xl font-semibold text-cream/80 lg:rotate-180 lg:[writing-mode:vertical-rl]">
                      {LABEL[key]}
                    </span>
                  </div>

                  <div
                    id={`tri-${key}`}
                    className={cn(
                      "absolute inset-0 p-6 transition-opacity duration-300 lg:min-w-[28rem] lg:p-8",
                      on ? "opacity-100 delay-150" : "pointer-events-none opacity-0",
                    )}
                  >
                    <p className="text-sm font-medium text-accent-bright">{LABEL[key]}</p>
                    <h2 className="mt-2 max-w-sm text-2xl font-semibold leading-tight lg:text-3xl">
                      {t.services[key].title}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/65 lg:text-base">
                      {t.services[key].text}
                    </p>
                    {on && (
                      <div className="absolute bottom-6 end-6 w-36 lg:bottom-8 lg:end-8 lg:w-56">
                        <Specimen serviceKey={key} />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
