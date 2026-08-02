"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/content";
import Button from "@/components/ui/Button";
import useCarousel from "@/hooks/useCarousel";

const SLIDE_MS = 6500;

export default function Hero() {
  const [paused, setPaused] = useState(false);
  const {
    index,
    setIndex,
    prev,
    next,
    reduceMotion,
    onTouchStart,
    onTouchEnd,
  } = useCarousel(services.length, { intervalMs: SLIDE_MS, paused });

  const slide = services[index];

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={slide.heroImage}
              alt=""
              fill
              priority={slide.id === services[0].id}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-page/50 to-transparent sm:h-40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:pb-24">
        <div className="mb-5 flex flex-wrap items-center gap-2 sm:mb-8 sm:gap-3">
          <span className="rounded-[3px] border border-line bg-surface/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-fg backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.22em]">
            Skema<span className="text-brand">lab</span>
          </span>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-white/95 drop-shadow-[0_1px_6px_rgba(11,14,20,0.45)] sm:inline">
            Développement · Marketing · Automatisation
          </span>
        </div>

        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div className="relative w-full min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-2xl rounded-[3px] border border-line p-4 backdrop-blur-xl sm:p-6 md:p-8"
                style={{ background: "var(--hero-panel)" }}
                aria-live="polite"
              >
                <p className="eyebrow text-brand">{slide.heroLabel}</p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-accent sm:mt-4 sm:text-[11px] sm:tracking-[0.24em]">
                  {slide.title}
                </p>
                <h1 className="mt-2 text-[clamp(1.45rem,5.5vw,3.4rem)] font-semibold leading-[1.12] tracking-tight text-balance text-fg sm:mt-3">
                  {slide.heroHeadline}
                </h1>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg">
                  {slide.heroText}
                </p>
                <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                  <Button href="#contact" variant="primary" className="w-full sm:w-auto">
                    Lancer un projet
                    <ArrowUpRight size={16} />
                  </Button>
                  <Button href="#services" variant="ghost" className="w-full sm:w-auto">
                    Voir le service
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex w-full min-w-0 flex-col justify-end gap-4 lg:items-end lg:gap-5">
            <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start lg:self-end">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Slide précédent"
                  className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-[3px] border border-line bg-surface/85 text-fg backdrop-blur-md transition-all hover:border-brand hover:bg-brand hover:text-white sm:h-12 sm:w-12"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Slide suivant"
                  className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-[3px] border border-line bg-surface/85 text-fg backdrop-blur-md transition-all hover:border-brand hover:bg-brand hover:text-white sm:h-12 sm:w-12"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              <span className="font-mono text-sm text-muted" aria-hidden="true">
                <span className="text-fg">{String(index + 1).padStart(2, "0")}</span>
                <span className="mx-1 text-muted/50">/</span>
                {String(services.length).padStart(2, "0")}
              </span>
            </div>

            <div
              className="w-full space-y-2 lg:max-w-sm lg:self-end"
              role="tablist"
              aria-label="Services"
            >
              {services.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                  className={`group flex min-h-12 w-full touch-manipulation items-center gap-3 rounded-[3px] border px-3 py-3 text-left transition-all duration-300 sm:px-4 ${
                    i === index
                      ? "border-brand bg-surface/90"
                      : "border-line/60 bg-surface/50 hover:border-line hover:bg-surface/80"
                  }`}
                >
                  <span
                    className={`shrink-0 font-mono text-xs ${
                      i === index ? "text-brand" : "text-muted"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`min-w-0 flex-1 truncate text-sm font-medium ${
                      i === index ? "text-fg" : "text-muted"
                    }`}
                  >
                    {item.title}
                  </span>
                  {i === index && !reduceMotion && (
                    <span className="relative hidden h-[3px] w-10 shrink-0 overflow-hidden rounded-[3px] bg-line sm:block">
                      <span
                        key={`${item.id}-${paused}`}
                        className={`absolute inset-y-0 left-0 origin-left rounded-[3px] bg-brand ${
                          paused ? "" : "hero-progress"
                        }`}
                        style={paused ? { width: "100%" } : undefined}
                      />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
