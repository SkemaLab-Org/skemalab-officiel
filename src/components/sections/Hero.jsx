"use client";

import { useEffect, useRef } from "react";
import {
  MotionConfig,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useI18n } from "@/components/I18nProvider";
import Button from "@/components/ui/Button";
import {
  LuxuryRibbonMotif,
  MoroccanZelligeLattice,
} from "@/components/ui/MoroccanPattern";
import { cn } from "@/lib/utils";

const SWEEP = [0.65, 0, 0.25, 1];

const H1 =
  "col-start-1 row-start-1 max-w-[15ch] text-balance font-display text-[clamp(2.75rem,7.2vw,7.5rem)] font-medium leading-[0.98] tracking-[-0.035em] rtl:max-w-none rtl:leading-[1.25] rtl:tracking-normal";

export default function Hero() {
  const { t, isRTL } = useI18n();
  const pillars = t.hero.pillars;
  const reduce = useReducedMotion();
  const headRef = useRef(null);

  const scan = useMotionValue(0); // intro sweep, 0 → 1
  const gx = useMotionValue(-999); // torch in section space
  const gy = useMotionValue(-999);
  const hx = useMotionValue(-999); // torch in headline space
  const hy = useMotionValue(-999);

  useEffect(() => {
    if (reduce) {
      scan.set(1);
      return undefined;
    }
    const controls = animate(scan, 1, {
      duration: 1.8,
      delay: 0.3,
      ease: SWEEP,
    });
    return () => controls.stop();
  }, [scan, reduce]);

  const clip = useTransform(scan, (p) => {
    if (p >= 1) return "none";
    const hidden = (1 - p) * 100;
    return isRTL
      ? `inset(-0.3em 0 -0.3em ${hidden}%)`
      : `inset(-0.3em ${hidden}% -0.3em 0)`;
  });
  const beam = useTransform(scan, (p) => `${p * 100}%`);
  const beamOpacity = useTransform(scan, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);
  const gridLit = useMotionTemplate`radial-gradient(320px circle at ${gx}px ${gy}px, #000, transparent 70%)`;
  const textLit = useMotionTemplate`radial-gradient(220px circle at ${hx}px ${hy}px, #000, transparent 72%)`;

  const move = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    gx.set(event.clientX - box.left);
    gy.set(event.clientY - box.top);
    const head = headRef.current?.getBoundingClientRect();
    if (head) {
      hx.set(event.clientX - head.left);
      hy.set(event.clientY - head.top);
    }
  };
  const off = () => {
    gx.set(-999);
    gy.set(-999);
    hx.set(-999);
    hy.set(-999);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        data-zellige="custom"
        dir={isRTL ? "rtl" : "ltr"}
        aria-labelledby="hero-title"
        onPointerMove={move}
        onPointerLeave={off}
        className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#07110e] text-cream"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_20%_45%,rgba(8,149,135,0.2),transparent)] rtl:-scale-x-100" />
          <MoroccanZelligeLattice
            idPrefix="hero-zellige"
            opacity={0.55}
            strokeColor="rgba(197,168,128,0.3)"
            strokeWidth={0.9}
            size={112}
            fadeMask={false}
          />
          <LuxuryRibbonMotif
            fill
            idPrefix="hero-ribbon"
            opacity={0.72}
            className="max-md:hidden rtl:-scale-x-100"
          />
          <motion.div
            className="absolute inset-0"
            style={{
              maskImage: gridLit,
              WebkitMaskImage: gridLit,
            }}
          >
            <MoroccanZelligeLattice
              idPrefix="hero-zellige-lit"
              opacity={0.95}
              strokeColor="rgba(58,217,191,0.68)"
              strokeWidth={0.9}
              size={112}
              fadeMask={false}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 max-md:hidden rtl:-scale-x-100"
            style={{
              maskImage: gridLit,
              WebkitMaskImage: gridLit,
            }}
          >
            <LuxuryRibbonMotif fill idPrefix="hero-ribbon-lit" opacity={1} />
          </motion.div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-12 pt-32 sm:px-8">
          <div ref={headRef} className="relative grid w-fit max-w-full">
            <motion.h1 id="hero-title" style={{ clipPath: clip }} className={H1}>
              {t.hero.headline}
            </motion.h1>
            <motion.div
              aria-hidden="true"
              style={{
                clipPath: clip,
                maskImage: textLit,
                WebkitMaskImage: textLit,
              }}
              className={cn(
                H1,
                "pointer-events-none select-none text-accent-bright [text-shadow:0_0_40px_rgba(58,217,191,0.5)]",
              )}
            >
              {t.hero.headline}
            </motion.div>
            <motion.span
              aria-hidden="true"
              style={
                isRTL
                  ? { right: beam, opacity: beamOpacity }
                  : { left: beam, opacity: beamOpacity }
              }
              className="pointer-events-none absolute -inset-y-6 w-px bg-accent-bright shadow-[0_0_28px_6px_rgba(58,217,191,0.5)]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.9 }}
            className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <p className="max-w-md text-pretty text-lg leading-relaxed text-cream/65">
              {t.hero.subheading}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="#contact">{t.hero.ctaPrimary}</Button>
              <Button href="#services" variant="outlineLight">
                {t.hero.ctaAll}
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.nav
          aria-label={t.hero.ctaAll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.9 }}
          className="mx-auto grid w-full max-w-7xl px-5 pb-10 sm:px-8 md:grid-cols-3 md:gap-6"
        >
          {pillars.map((pillar) => (
            <a
              key={pillar.id}
              href="#services"
              className="group relative py-5 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent-bright after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100"
            >
              <span className="block text-lg font-semibold transition-colors group-hover:text-accent-bright group-focus-visible:text-accent-bright">
                {pillar.label}
              </span>
              <span className="mt-1 block text-sm text-cream/65 transition-colors group-hover:text-accent-bright group-focus-visible:text-accent-bright">
                {pillar.title}
              </span>
            </a>
          ))}
        </motion.nav>
      </section>
    </MotionConfig>
  );
}
