"use client";

import { ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/data/content";
import { useI18n } from "@/components/I18nProvider";
import Button from "@/components/ui/Button";
import { MoroccanZelligeLattice } from "@/components/ui/MoroccanPattern";
import Reveal from "@/components/motion/Reveal";

export default function ClosingBand() {
  const { t } = useI18n();
  const copy = t.ctaBanner;

  return (
    <section
      data-zellige="custom"
      aria-labelledby="closing-title"
      className="relative isolate overflow-hidden border-y border-cream/10 bg-[#07110e] text-cream"
    >
      <MoroccanZelligeLattice
        idPrefix="closing-lattice"
        opacity={0.09}
        strokeColor="rgba(197,168,128,0.7)"
        strokeWidth={0.8}
        size={128}
        fadeMask={false}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(23,160,140,0.16),transparent_70%)]"
      />

      <div className="shell band-y relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 mono-label text-cream/55">
            <span aria-hidden="true" className="h-px w-8 bg-accent-bright/70" />
            {copy.eyebrow}
            <span aria-hidden="true" className="h-px w-8 bg-accent-bright/70" />
          </p>

          <h2
            id="closing-title"
            className="mx-auto mt-8 max-w-[22ch] font-display text-[clamp(2.2rem,5.4vw,4.6rem)] font-light leading-[1.02] tracking-[-0.04em] text-balance text-cream"
          >
            {copy.headline}
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-[1.8] text-cream/65 sm:text-base">
            {copy.description}
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button href="#contact" size="lg" className="w-full sm:w-auto">
              {copy.ctaPrimary}
              <ArrowUpRight size={17} className="rtl-flip" aria-hidden="true" />
            </Button>
            <Button
              href={`mailto:${contactInfo.email}`}
              variant="outlineLight"
              size="lg"
              className="w-full sm:w-auto"
            >
              {copy.ctaSecondary}
            </Button>
          </div>

          <p className="mt-10 mono-label text-cream/40">
            {t.common.tagline}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
