"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import BandHeader from "@/components/home/BandHeader";
import RibbonCanvas from "@/components/home/RibbonCanvas";
import Button from "@/components/ui/Button";
import { MoroccanZelligeLattice } from "@/components/ui/MoroccanPattern";
import Reveal from "@/components/motion/Reveal";

export default function AgencyBand() {
  const { t } = useI18n();
  const copy = t.aboutHome;

  return (
    <section
      id="agence"
      aria-labelledby="agency-title"
      className="band-y bg-page"
    >
      <div className="shell">
        <BandHeader
          eyebrow={copy.eyebrow}
          index="07"
          title={copy.title}
          titleId="agency-title"
          description={copy.p1}
        />

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <Reveal>
            <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden border border-line bg-[#07110e] p-6 text-cream sm:aspect-[16/11] lg:aspect-[4/5] lg:p-8">
              <RibbonCanvas className="absolute inset-0" />

              <div aria-hidden="true" className="hero-veil absolute inset-0" />

              <MoroccanZelligeLattice
                idPrefix="agency-lattice"
                opacity={0.12}
                strokeColor="rgba(197,168,128,0.6)"
                strokeWidth={0.8}
                size={120}
                fadeMask={false}
              />

              <div className="relative flex items-start justify-between gap-4 mono-label text-cream/55">
                <span>Skemalab</span>
                <span dir="ltr">31.5085° N · 9.7700° W</span>
              </div>

              <div className="relative max-w-[24ch]">
                <p className="mono-label text-accent-bright">{copy.promiseEyebrow}</p>
                <p className="mt-3 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-light leading-tight tracking-tight text-cream">
                  {copy.promiseText}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <p className="max-w-xl text-base leading-[1.8] text-muted sm:text-lg">
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
                    <dt className="mono-label text-muted">{term}</dt>
                    <dd className="text-sm leading-relaxed text-fg/85">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="#contact">
                  {copy.cta}
                  <ArrowUpRight size={16} className="rtl-flip" aria-hidden="true" />
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
