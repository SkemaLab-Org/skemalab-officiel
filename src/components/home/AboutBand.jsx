"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import BandHeader from "@/components/home/BandHeader";
import Button from "@/components/ui/Button";
import { MoroccanZelligeLattice } from "@/components/ui/MoroccanPattern";
import Reveal from "@/components/motion/Reveal";

/* The studio band sits right under the pinned hero: it arrives as a sheet
   sliding over the last frames of the hero, then scrolls on its own with a
   sticky studio sheet beside the manifesto. */
export default function AboutBand() {
  const { t } = useI18n();
  const copy = t.home.about;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative z-10 band-y bg-page lg:-mt-[14vh] lg:rounded-t-[2rem] lg:shadow-[0_-40px_90px_-50px_rgba(7,17,14,0.8)]"
    >
      <div className="shell">
        <BandHeader
          eyebrow={copy.eyebrow}
          index="01"
          title={copy.title}
          titleId="about-title"
          description={copy.lede}
        />

        <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="min-w-0">
            <Reveal>
              <p className="max-w-[24ch] font-display text-[clamp(1.6rem,2.9vw,2.6rem)] font-light leading-[1.16] tracking-[-0.03em] text-balance text-fg">
                {copy.statement}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-6 max-w-xl text-sm leading-[1.85] text-muted sm:text-base">
                {copy.body}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/our-story" variant="secondary">
                  {copy.ctaStory}
                </Button>
                <Button href="#contact">
                  {copy.ctaContact}
                  <ArrowUpRight size={16} className="rtl-flip" aria-hidden="true" />
                </Button>
              </div>
            </Reveal>

            <ol className="mt-12 border-t border-line">
              {copy.principles.map((item, index) => (
                <Reveal key={item.title} as="li" delay={index * 0.05}>
                  <div className="grid gap-2 border-b border-line py-5 sm:grid-cols-[auto_0.8fr_1.2fr] sm:items-baseline sm:gap-6">
                    <span className="mono-label tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg leading-tight tracking-tight text-fg">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.08} className="lg:sticky lg:top-28 lg:self-start">
            <aside className="border border-line bg-surface">
              <div className="relative h-44 overflow-hidden bg-[#07110e] text-cream sm:h-56">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_28%_18%,rgba(23,160,140,0.38),transparent_70%)]"
                />

                <MoroccanZelligeLattice
                  idPrefix="about-lattice"
                  opacity={0.22}
                  strokeColor="rgba(197,168,128,0.6)"
                  strokeWidth={0.8}
                  size={112}
                  fadeMask={false}
                />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-4 mono-label text-cream/60">
                  <span>{copy.factsLabel}</span>
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rotate-45 bg-accent-bright"
                  />
                </div>

                <p className="absolute inset-x-4 bottom-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-light leading-none tracking-tight text-cream">
                  Skemalab
                </p>
              </div>

              <dl>
                {copy.facts.map(([term, value]) => (
                  <div
                    key={term}
                    className="grid grid-cols-[0.7fr_1.3fr] items-baseline gap-4 border-b border-line px-4 py-4 last:border-b-0"
                  >
                    <dt className="mono-label text-muted">{term}</dt>
                    <dd className="text-sm leading-snug text-fg" dir="auto">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
