"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import Button from "@/components/ui/Button";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";
import agencyImage from "@/assets/home-imgs/lagence.webp";

export default function About() {
  const { t } = useI18n();
  const copy = t.aboutHome;
  const reduce = useReducedMotion();

  return (
    <section id="agence" className="section-y relative overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent/6 blur-[150px]"
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeader
            label={copy.eyebrow}
            index="05"
            title={copy.title}
            description={copy.p1}
          />
        </Reveal>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <motion.div
              initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
              whileInView={reduce ? undefined : { clipPath: "inset(0 0 0% 0)" }}
              viewport={VIEWPORT}
              transition={{ duration: DURATION.slow, ease: EASE.out }}
              className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-deep sm:aspect-[5/5]"
            >
              <Parallax offset={30} className="h-full">
                <Image
                  src={agencyImage}
                  alt={copy.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="scale-[1.1] object-cover"
                />
              </Parallax>
            </motion.div>

            <div className="mt-6 border-s-2 border-accent ps-5">
              <p className="label-mono text-accent">{copy.promiseEyebrow}</p>
              <p className="mt-2 max-w-md font-display text-xl leading-snug tracking-tight text-fg sm:text-2xl">
                {copy.promiseText}
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <Reveal>
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {copy.p2}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-8 border-t border-line">
                {copy.pillars.map(([term, value]) => (
                  <div
                    key={term}
                    className="grid gap-1 border-b border-line py-4 sm:grid-cols-[0.36fr_1fr] sm:items-baseline sm:gap-6"
                  >
                    <dt className="label-mono text-muted">{term}</dt>
                    <dd className="text-sm leading-relaxed text-fg/85">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="#contact">
                  {copy.cta}
                  <ArrowUpRight size={16} className="rtl-flip" />
                </Button>
                <Button href="/our-story" variant="secondary">
                  {t.aboutIntro.cta}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
