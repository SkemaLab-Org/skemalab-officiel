"use client";

import { ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/data/content";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { MoroccanZelligeLattice, LuxuryRibbonMotif } from "@/components/ui/MoroccanPattern";

export default function CTA() {
  const { t, locale } = useI18n();
  const banner = t.ctaBanner;

  return (
    <section className="brand-fusion-bg relative overflow-hidden py-24 text-white sm:py-32 lg:py-40">
      {/* Design Pattern Background */}
      <div className="pointer-events-none absolute inset-0">
        <MoroccanZelligeLattice
          opacity={0.08}
          strokeColor="#089587"
          size={110}
          fadeMask={true}
        />
      </div>

      {/* Static Luxury Ribbon Wave Motif */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-65 lg:opacity-85"
        aria-hidden="true"
      >
        <LuxuryRibbonMotif width={880} height={500} opacity={0.65} />
      </div>

      {/* Ambient Lighting Orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-[#089587]/25 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-[#c5a880]/15 blur-[100px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-8">
        <Reveal>
          {/* Prestige Eyebrow Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-[3px] border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/90 backdrop-blur-md">
            <span>🇲🇦</span>
            <span>{locale === "ar" ? "جاهزون للارتقاء بأعمالك" : banner.eyebrow}</span>
          </div>

          <h2 className="mt-4 text-[clamp(1.75rem,5.5vw,3.6rem)] font-bold leading-[1.12] tracking-tight text-balance text-white sm:mt-6">
            {banner.headline}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-base md:text-lg">
            {banner.description}
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-11 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button
              href="#contact"
              variant="primary"
              className="w-full shadow-[0_4px_24px_rgba(8,149,135,0.45)] sm:w-auto"
            >
              {banner.ctaPrimary}
              <ArrowUpRight size={17} className="rtl-flip" />
            </Button>
            <Button
              href={`mailto:${contactInfo.email}`}
              variant="ghost"
              className="w-full border-white/30 bg-white/10 text-white backdrop-blur-md hover:border-brand hover:bg-brand/30 hover:text-white sm:w-auto"
            >
              {banner.ctaSecondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
