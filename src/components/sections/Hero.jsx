"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import SplitText from "@/components/motion/SplitText";
import useCarousel from "@/hooks/useCarousel";
import { useI18n } from "@/components/I18nProvider";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HeroBackdrop = dynamic(() => import("@/components/ui/HeroBackdrop"), {
  ssr: false,
});

const SLIDE_MS = 6500;

export default function Hero() {
  const { t, isRTL } = useI18n();
  const pillars = t.hero.pillars;
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { margin: "-5% 0px -20% 0px" });
  const [hovered, setHovered] = useState(false);

  const {
    index,
    setIndex,
    prev,
    next,
    reduceMotion,
    onTouchStart,
    onTouchEnd,
  } = useCarousel(pillars.length, {
    intervalMs: SLIDE_MS,
    paused: hovered || !inView,
  });

  const pillar = pillars[index] || pillars[0];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#07110e] text-cream"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <HeroBackdrop />

      <div className="shell relative flex min-h-svh flex-col pb-10 pt-24 sm:pt-28 lg:pb-12 lg:pt-32">
        <div className="ledger-rule ledger-rule--ink">
          <span className="label-mono text-cream/65">{t.common.tagline}</span>
          <span className="label-mono text-cream/65">
            {t.aboutIntro.imageCaption}
          </span>
        </div>

        <div className="grid flex-1 items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:py-10">
          <div className="min-w-0">
            <SplitText
              as="h1"
              id="hero-title"
              text={t.hero.eyebrow}
              lines={[t.hero.eyebrow]}
              className="display-xl max-w-[16ch] text-cream"
              delay={0.12}
            />

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.base, delay: 0.42, ease: EASE.out }}
              className="mt-7 max-w-md text-sm leading-relaxed text-cream/65 sm:text-base"
            >
              {t.common.badgeStudio}
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.base, delay: 0.52, ease: EASE.out }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="#contact" size="lg" className="w-full sm:w-auto">
                {t.hero.ctaPrimary}
                <ArrowUpRight size={17} className="rtl-flip" />
              </Button>
              <Button
                href="#services"
                variant="outlineLight"
                size="lg"
                className="w-full sm:w-auto"
              >
                {t.hero.ctaSecondary}
              </Button>
            </motion.div>
          </div>

          {/* Rotating pillar panel */}
          <div className="min-w-0 lg:justify-self-end lg:pl-6">
            <div className="relative min-h-[15.5rem] border border-cream/12 bg-[#0a1d18]/70 p-6 backdrop-blur-md sm:min-h-[16.5rem] sm:p-8">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent-bright/70 via-accent-bright/10 to-transparent"
              />

              <div className="flex items-center justify-between gap-4">
                <span className="label-mono text-accent-bright">
                  {String(index + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label={t.hero.prevSlide}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-cream/15 text-cream/70 transition-colors hover:border-accent-bright hover:text-accent-bright"
                  >
                    {isRTL ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label={t.hero.nextSlide}
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-cream/15 text-cream/70 transition-colors hover:border-accent-bright hover:text-accent-bright"
                  >
                    {isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
                  </button>
                </div>
              </div>

              <div aria-live="polite" className="mt-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={pillar.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: DURATION.fast, ease: EASE.out }}
                  >
                    <p className="label-mono text-cream/65">{pillar.label}</p>
                    <h2 className="mt-2 font-display text-2xl leading-tight tracking-tight text-cream sm:text-3xl">
                      {pillar.title}
                    </h2>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/65">
                      {pillar.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar rail */}
        <div
          role="group"
          aria-label={t.hero.selectService}
          className="grid border-t border-cream/15 sm:grid-cols-3"
        >
          {pillars.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setIndex(i)}
                className={cn(
                  "group relative flex items-center gap-3 border-b border-cream/10 py-4 text-start transition-colors duration-300 sm:border-b-0 sm:border-e sm:border-cream/10 sm:px-4 sm:py-5 sm:first:ps-0 sm:last:border-e-0",
                  active ? "text-cream" : "text-cream/65 hover:text-cream/80",
                )}
              >
                <span className="label-mono text-accent-bright/80">0{i + 1}</span>
                <span className="text-sm font-medium tracking-tight">
                  {item.label}
                </span>
                <span className="ms-auto hidden text-xs text-cream/65 sm:block">
                  {item.title}
                </span>
                {active && !reduceMotion ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent-bright"
                    style={{
                      animation: `rail-fill ${SLIDE_MS}ms linear forwards`,
                      animationPlayState: hovered || !inView ? "paused" : "running",
                    }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
