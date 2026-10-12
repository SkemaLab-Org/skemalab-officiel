"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import useCarousel from "@/hooks/useCarousel";
import { useI18n } from "@/components/I18nProvider";

const SLIDE_MS = 6500;

export default function Hero() {
  const { t, isRTL } = useI18n();
  const services = t.servicesList;

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

  const slide = services[index] || services[0];

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
              quality={70}
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1400px"
              aria-hidden="true"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-page/50 to-transparent sm:h-40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:pb-24">
        <div className="mb-5 flex flex-wrap items-center gap-2 sm:mb-8 sm:gap-3">
          <h1 className="rounded-[3px] border border-line bg-surface/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-fg backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.22em]">
            Skema<span className="text-brand">lab</span>
          </h1>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-white/95 drop-shadow-[0_1px_6px_rgba(11,15,14,0.45)] sm:inline">
            {t.common.tagline}
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
                <p className="mt-2 text-[clamp(1.45rem,5.5vw,3.4rem)] font-semibold leading-[1.12] tracking-tight text-balance text-fg sm:mt-3">
                  {slide.heroHeadline}
                </p>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg">
                  {slide.heroText}
                </p>
                <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                  <Button href="#contact" variant="primary" className="w-full sm:w-auto">
                    {t.hero.ctaPrimary}
                    <ArrowUpRight size={16} className="rtl-flip" />
                  </Button>
                  <Button href="#services" variant="ghost" className="w-full sm:w-auto">
                    {t.hero.ctaSecondary}
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
                  aria-label={t.hero.prevSlide}
                  className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-[3px] border border-line bg-surface/85 text-fg backdrop-blur-md transition-all hover:border-brand hover:bg-brand hover:text-white sm:h-12 sm:w-12"
                >
                  {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label={t.hero.nextSlide}
                  className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-[3px] border border-line bg-surface/85 text-fg backdrop-blur-md transition-all hover:border-brand hover:bg-brand hover:text-white sm:h-12 sm:w-12"
                >
                  {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
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
              role="group"
              aria-label={t.hero.selectService}
            >
              {services.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={i === index}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                  className={`group flex min-h-12 w-full touch-manipulation items-center gap-3 rounded-[3px] border px-3 py-3 text-start transition-all duration-300 sm:px-4 ${
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
                        className={`absolute inset-y-0 ${isRTL ? "right-0 origin-right" : "left-0 origin-left"} rounded-[3px] bg-brand ${
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
