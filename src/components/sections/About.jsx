"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import agencyImage from "@/assets/home-imgs/lagence.webp";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { MoroccanZelligeLattice, LuxuryRibbonMotif, MoroccanCornerOrnament } from "@/components/ui/MoroccanPattern";

export default function About() {
  const { t, locale } = useI18n();

  return (
    <section
      id="agence"
      className="relative overflow-hidden bg-page py-20 sm:py-28 lg:py-40"
    >
      {/* Moroccan Zellige Background Lattice */}
      <MoroccanZelligeLattice
        opacity={0.05}
        strokeColor="#089587"
        size={110}
        fadeMask={true}
      />
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-brand/8 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-accent/8 blur-[100px]" />

      {/* Static Luxury Ribbon Wave Motif (Non-animated, static positioning) */}
      <div
        className="pointer-events-none absolute -left-24 top-20 opacity-30 lg:opacity-45"
        aria-hidden="true"
      >
        <LuxuryRibbonMotif width={650} height={380} opacity={0.5} />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:gap-16 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Left Visual Column with Moroccan Architectural Framing */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-md sm:max-w-none lg:mx-0">
            {/* Outer Geometric Frame */}
            <div className="absolute inset-0 rounded-[4px] border border-brand/30 sm:-inset-4" />
            <div className="absolute -bottom-3 -right-3 hidden h-24 w-24 rounded-[3px] bg-accent/80 sm:block sm:h-28 sm:w-28 md:-bottom-4 md:-right-4" />
            <div className="absolute -left-3 -top-3 hidden h-16 w-16 rounded-[3px] bg-deep/90 sm:block sm:h-20 sm:w-20 md:-left-4 md:-top-4" />

            <div className="relative overflow-hidden rounded-[4px] shadow-2xl">
              <div className="relative aspect-[5/6] overflow-hidden sm:aspect-[4/5]">
                <Image
                  src={agencyImage}
                  alt={t.aboutHome.imageAlt}
                  fill
                  className="object-fill"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Content Column */}
        <div className="min-w-0">
          <Reveal>
            <SectionHeading
              eyebrow={
                locale === "ar"
                  ? "عن سكيما لاب · الهوية والرؤية"
                  : t.aboutHome.eyebrow
              }
              title={t.aboutHome.title}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-sm leading-relaxed text-muted sm:mt-6 sm:text-base md:text-lg">
              {t.aboutHome.p1}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
              {t.aboutHome.p2}
            </p>
          </Reveal>

          {/* Core Strategic Pillars Grid with Moroccan Corner Accents */}
          <Reveal delay={0.16}>
            <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
              {t.aboutHome.pillars.map(([title, text]) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-[4px] border border-line bg-surface p-4 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md sm:p-5"
                >
                  <MoroccanCornerOrnament
                    className="absolute right-1 top-1 opacity-20 transition-opacity group-hover:opacity-60"
                    size={20}
                  />
                  <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
                    <span className="h-1.5 w-1.5 rotate-45 rounded-[0.5px] bg-brand" />
                    <div className="h-[2px] w-8 rounded-[1px] bg-brand transition-all duration-300 group-hover:w-12" />
                  </div>
                  <p className="text-sm font-semibold text-fg">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <Button href="#contact" variant="accent" className="w-full sm:w-auto">
                {t.aboutHome.cta}
                <ArrowUpRight size={16} className="rtl-flip" />
              </Button>
              <Button href="/about" variant="ghost" className="w-full sm:w-auto">
                {locale === "ar" ? "تعرف على قصة المؤسسين" : "Découvrir les fondateurs"}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
