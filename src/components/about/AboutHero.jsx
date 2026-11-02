"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";

export default function AboutHero() {
  const { t } = useI18n();
  const copy = t.aboutPage;
  return (
    <section id="story-hero" data-scroll-stage className="story-hero-stage relative isolate bg-[#07110e] text-cream">
      <div className="story-hero-pin zellige-spot zellige-spot--top-end zellige-spot--small">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_28%,rgba(58,217,191,0.14),transparent_42%),linear-gradient(135deg,#0b1b16_0%,#07110e_60%)]"
      />
      <div className="story-hero-content shell relative z-10 flex min-h-svh flex-col justify-end pb-10 pt-24 sm:pb-12 sm:pt-24">
        <div className="ledger-rule">
          <span className="label-mono text-cream/65">{copy.heroBadge}</span>
          <span className="label-mono text-cream/65">Skemalab · About</span>
        </div>

        <Reveal>
          <h1 className="display-xl mt-8 text-cream">
            {copy.heroH1Part1}
            <span className="text-accent-bright">{copy.heroH1Highlight}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
            {copy.heroHeadline}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/65 sm:text-base">
            {copy.heroLead}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#histoire" size="lg" className="w-full sm:w-auto">
              {copy.heroCta1}
              <ArrowUpRight size={17} className="rtl-flip" />
            </Button>
            <Button
              href="#fondateurs"
              variant="outlineLight"
              size="lg"
              className="w-full sm:w-auto"
            >
              {copy.heroCta2}
            </Button>
          </div>
        </Reveal>
      </div>
      <div aria-hidden="true" className="story-hero-alt shell">
        <p className="label-mono mb-4 text-accent-bright">Skemalab · Essaouira</p>
        <p className="max-w-[25ch] font-display text-[clamp(1.8rem,4.2vw,3.4rem)] font-light leading-[1.06] tracking-[-0.035em] text-cream">{copy.heroLead}</p>
      </div>
      <div aria-hidden="true" className="story-hero-meter"><i /></div>
      </div>
    </section>
  );
}
