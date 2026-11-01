"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { founders, contactInfo } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import Button from "@/components/ui/Button";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";
import aboutImage from "@/assets/home-imgs/home-about.webp";

export default function AboutIntro() {
  const { t } = useI18n();
  const copy = t.aboutIntro;
  const reduce = useReducedMotion();

  return (
    <section id="skemalab" className="section-y relative overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-brand/8 blur-[150px]"
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeader
            label={copy.eyebrow}
            index="01"
            title={
              <>
                {copy.title}{" "}
                <span className="text-accent">{copy.highlight}</span>
              </>
            }
            description={copy.description}
            action={
              <Button href="/our-story" variant="secondary" size="sm">
                {copy.cta}
                <ArrowUpRight size={15} className="rtl-flip" />
              </Button>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-16">
          <motion.figure
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
            whileInView={reduce ? undefined : { clipPath: "inset(0 0 0% 0)" }}
            viewport={VIEWPORT}
            transition={{ duration: DURATION.slow, ease: EASE.out }}
            className="relative m-0 overflow-hidden rounded-lg border border-line bg-deep"
          >
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/5]">
              <Parallax offset={26} className="h-full">
                <Image
                  src={aboutImage}
                  alt={copy.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="scale-[1.08] object-cover"
                />
              </Parallax>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#07110e] via-transparent to-transparent opacity-70"
              />
            </div>

            <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 sm:inset-x-6 sm:bottom-6">
              <span className="inline-flex items-center gap-2.5 rounded-md border border-cream/20 bg-[#07110e]/70 px-3 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rotate-45 bg-accent-bright" aria-hidden="true" />
                <span className="label-mono text-cream/80">{copy.imageCaption}</span>
              </span>
              <span className="label-mono text-cream/65">{t.aboutPage.scopeValue}</span>
            </figcaption>
          </motion.figure>

          <div className="min-w-0">
            <Reveal delay={0.08}>
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {copy.secondary}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-8 border-t border-line">
                {[
                  [copy.foundedBy, `${founders[0].name} · ${copy.founderStatus}`],
                  [t.aboutPage.hqLabel, contactInfo.locations.join(" · ")],
                  [t.aboutPage.scopeLabel, t.aboutPage.scopeValue],
                ].map(([term, value]) => (
                  <div
                    key={term}
                    className="grid gap-1 border-b border-line py-4 sm:grid-cols-[0.4fr_1fr] sm:items-baseline sm:gap-6"
                  >
                    <dt className="label-mono text-muted">{term}</dt>
                    <dd className="text-sm leading-relaxed text-fg">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/our-story" size="md">
                  {copy.cta}
                  <ArrowUpRight size={16} className="rtl-flip" />
                </Button>
                <a
                  href="#services"
                  className="link-underline min-h-11 text-sm text-muted transition-colors hover:text-fg"
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
