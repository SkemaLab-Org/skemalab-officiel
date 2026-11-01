"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useI18n } from "@/components/I18nProvider";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";
import BandHeader from "@/components/home/BandHeader";
import EngineCanvas from "@/components/home/EngineCanvas";
import useMediaQuery from "@/components/home/useMediaQuery";
import { cn } from "@/lib/utils";

const PIN_QUERY = "(min-width: 1024px)";

/* Desktop turns the four engines into a scroll-pinned horizontal rail. The
   track is measured after layout so the rail always ends flush with its last
   panel; mobile and reduced-motion visitors keep the static grid. */
export default function Engines() {
  const { t, isRTL } = useI18n();
  const copy = t.home.engines;
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery(PIN_QUERY);
  const canPin = isDesktop && !reduced;

  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0005,
  });

  useEffect(() => {
    if (!canPin) return undefined;

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return undefined;

    let frame = 0;
    const measure = () => {
      frame = 0;
      setDistance(Math.max(0, Math.round(track.scrollWidth - viewport.clientWidth)));
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    // Deferred so the first measurement lands after the pinned layout settles.
    schedule();

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    observer?.observe(track);
    observer?.observe(viewport);
    window.addEventListener("resize", schedule);
    // Webfonts can settle after hydration and change the track width.
    const late = window.setTimeout(measure, 400);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", schedule);
      window.clearTimeout(late);
    };
  }, [canPin, copy.list.length]);

  const travel = canPin ? distance : 0;
  const x = useTransform(smooth, (value) => {
    if (!travel) return 0;
    const progress = Math.min(1, Math.max(0, value));
    return (isRTL ? 1 : -1) * travel * progress;
  });

  useMotionValueEvent(smooth, "change", (value) => {
    if (!canPin) return;
    const last = copy.list.length - 1;
    const next = Math.min(
      last,
      Math.max(0, Math.round(value * last)),
    );
    setActive((current) => (current === next ? current : next));
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="engines-title"
      className={cn(
        "relative bg-page",
        canPin && "lg:h-[260vh]",
      )}
    >
      <div
        className={cn(
          canPin && "lg:sticky lg:top-0 lg:h-svh lg:overflow-hidden",
        )}
      >
        <div className="shell band-y lg:flex lg:h-full lg:flex-col lg:justify-center lg:py-0 lg:pt-24 lg:pb-8">
          <BandHeader
            eyebrow={copy.eyebrow}
            index="02"
            title={copy.title}
            titleId="engines-title"
            description={copy.lede}
            titleClassName={cn(
              canPin && "lg:max-w-[26ch] lg:text-[clamp(1.9rem,3vw,2.7rem)]",
            )}
          />

          <div
            ref={viewportRef}
            className={cn(
              "mt-10 sm:mt-12",
              canPin && "lg:mt-8 lg:min-h-0 lg:flex-1 lg:overflow-hidden",
            )}
          >
            <motion.div
              ref={trackRef}
              style={canPin ? { x } : undefined}
              className={cn(
                "grid gap-px border-y border-line bg-line sm:grid-cols-2",
                canPin && "lg:flex lg:h-full lg:w-max lg:flex-nowrap",
              )}
            >
              {copy.list.map((engine, index) => (
                <article
                  key={engine.key}
                  className={cn(
                    "group relative flex flex-col bg-page p-5 transition-colors duration-300 hover:bg-surface sm:p-6",
                    canPin &&
                      "lg:h-full lg:w-[min(44vw,34rem)] lg:flex-none lg:p-7",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-x-0 top-0 h-px bg-accent transition-opacity duration-500",
                      canPin && index === active ? "opacity-100" : "opacity-0",
                    )}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <span className="mono-label text-muted">
                      {String(index + 1).padStart(2, "0")} / {engine.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rotate-45 border border-accent/70 transition-colors duration-300 group-hover:bg-accent"
                    />
                  </div>

                  <div
                    className={cn(
                      "relative mt-5 aspect-[5/4] overflow-hidden border border-line bg-surface/50",
                      canPin &&
                        "lg:mt-6 lg:aspect-auto lg:min-h-[8.5rem] lg:flex-1",
                    )}
                  >
                    <EngineCanvas
                      mode={engine.key}
                      className="absolute inset-0 h-full w-full"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line"
                    />
                  </div>

                  <h3 className="mt-6 font-display text-xl leading-tight tracking-tight text-fg sm:text-[1.35rem]">
                    {engine.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {engine.text}
                  </p>
                </article>
              ))}
            </motion.div>
          </div>

          <div
            className={cn(
              "mt-5 flex flex-wrap items-center gap-x-4 gap-y-2",
              canPin && "lg:mt-7 lg:flex-nowrap",
            )}
          >
            <p className="mono-label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <span aria-hidden="true" className="h-px w-8 bg-accent/70" />
              {copy.note}
            </p>

            {canPin ? (
              <div className="hidden lg:ms-auto lg:flex lg:w-[min(30rem,46%)] lg:items-center lg:gap-4">
                <span className="mono-label shrink-0 tabular-nums text-accent">
                  {copy.list[active].label}
                </span>
                <span className="relative h-px flex-1 overflow-hidden bg-line">
                  <motion.span
                    aria-hidden="true"
                    style={{
                      scaleX: smooth,
                      transformOrigin: isRTL ? "right center" : "left center",
                    }}
                    className="absolute inset-0 bg-accent"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="mono-label shrink-0 tabular-nums text-muted"
                >
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(copy.list.length).padStart(2, "0")}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
