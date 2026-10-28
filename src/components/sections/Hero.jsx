"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import useCarousel from "@/hooks/useCarousel";
import { useI18n } from "@/components/I18nProvider";
import { MoroccanZelligeLattice, LuxuryRibbonMotif } from "@/components/ui/MoroccanPattern";
import LuxuryPictogram from "@/components/ui/LuxuryPictogram";

const SLIDE_MS = 6500;

export default function Hero() {
  const { t, isRTL } = useI18n();
  const pillars = t.hero.pillars;

  const [ paused, setPaused ] = useState( false );
  const {
    index,
    setIndex,
    prev,
    next,
    reduceMotion,
    onTouchStart,
    onTouchEnd,
  } = useCarousel( pillars.length, { intervalMs: SLIDE_MS, paused } );

  const pillar = pillars[ index ] || pillars[ 0 ];

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden text-mist"
      style={ {
        backgroundColor: "#0b332c",
      } }
      onMouseEnter={ () => setPaused( true ) }
      onMouseLeave={ () => setPaused( false ) }
      onTouchStart={ onTouchStart }
      onTouchEnd={ onTouchEnd }
    >
      {/* =========================================================================
          LUMINOUS LUXURY BRAND CANVAS (Not too dark, rich elegant teal view)
          Features elegant static Luxury Ribbon Band (not animated, no parallax)
          ========================================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Luminous Jewel-Tone Emerald & Teal Atmosphere */ }
        <div
          className="absolute inset-0"
          style={ {
            background:
              "radial-gradient(ellipse 90% 85% at 75% 20%, #15554b 0%, #0e3d35 40%, #0b332c 80%, #082923 100%)",
          } }
        />

        {/* Radiant Emerald & Champagne Light Pools */ }
        <div className="absolute -top-24 right-1/4 h-[580px] w-[580px] rounded-full bg-[#089587]/30 blur-[130px]" />
        <div className="absolute top-1/4 -left-16 h-[500px] w-[500px] rounded-full bg-[#0d655c]/32 blur-[120px]" />
        <div className="absolute top-10 right-10 h-[420px] w-[420px] rounded-full bg-[#c5a880]/18 blur-[110px]" />

        {/* Static Subtle Geometric Lattice Background */ }
        <div className="absolute inset-0">
          <MoroccanZelligeLattice
            opacity={ 0.06 }
            strokeColor="#089587"
            strokeWidth={ 1 }
            size={ 110 }
            fadeMask={ true }
          />
        </div>

        {/* Static Luxury Ribbon Band Motif (Haute Gamme, Non-animated, no parallax) */ }
        <div className="absolute -right-16 top-16 md:right-4 lg:right-16 md:top-20 lg:top-14 opacity-55 lg:opacity-75">
          <LuxuryRibbonMotif width={ 780 } height={ 460 } opacity={ 0.65 } />
        </div>

        {/* Soft Bottom Blending */ }
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-page/60 via-page/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#082923]/50 to-transparent" />
      </div>

      {/* =========================================================================
          HERO CONTENT CONTAINER (Static position, no parallax)
          ========================================================================= */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-8 sm:pb-24 sm:pt-28 lg:pb-24 lg:pt-28">
        {/* Restored Original Clean Badge & Tagline (Erased Disponibilité Projets 2026) */ }
        <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-3 sm:gap-3">
          {/* <h1 className="rounded-[3px] border border-white/20 bg-surface/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-fg backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.22em]">
            Skema<span className="text-brand">lab</span>
          </h1> */}
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-white/95 drop-shadow-[0_1px_6px_rgba(11,15,14,0.45)] sm:inline">
            { t.hero.eyebrow }
          </span>
        </div>

        {/* Hero Grid: Main Presentation Card (Left) + Slide Controller (Right) */ }
        <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          {/* Main Slide Presentation Card */ }
          <div className="relative w-full min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={ pillar.id }
                initial={ reduceMotion ? false : { opacity: 0, y: 20 } }
                animate={ { opacity: 1, y: 0 } }
                exit={ reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 } }
                transition={ { duration: 0.45, ease: [ 0.22, 1, 0.36, 1 ] } }
                className="relative w-full max-w-2xl overflow-hidden rounded-[4px] border border-[#089587]/35 p-5 shadow-[0_16px_48px_rgba(8,41,35,0.45)] backdrop-blur-2xl sm:p-7 md:p-9"
                style={ {
                  background:
                    "linear-gradient(135deg, rgba(16,56,50,0.92) 0%, rgba(10,38,34,0.88) 100%)",
                } }
                aria-live="polite"
              >
                {/* Eyebrow Label with Teal Diamond */ }
                <div className="flex items-center gap-2.5">
                  <span className="inline-block h-2 w-2 rotate-45 rounded-[1px] bg-[#089587]" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#089587] sm:text-xs">
                    { String( index + 1 ).padStart( 2, "0" ) } / { String( pillars.length ).padStart( 2, "0" ) } · { pillar.label }
                  </p>
                </div>

                {/* Headline */ }
                <p className="mt-2 text-[clamp(1.65rem,5.2vw,3.2rem)] font-bold leading-[1.14] tracking-tight text-white sm:mt-3">
                  { pillar.title }
                </p>

                {/* Supporting Text */ }
                <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-base md:text-lg">
                  { pillar.description }
                </p>

                {/* Action CTA Buttons */ }
                <div className="mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                  <Button
                    href="#contact"
                    variant="primary"
                    className="w-full shadow-[0_4px_20px_rgba(8,149,135,0.4)] sm:w-auto"
                  >
                    { t.hero.ctaPrimary }
                    <ArrowUpRight size={ 17 } className="rtl-flip" />
                  </Button>
                  <Button
                    href="#services"
                    variant="ghost"
                    className="w-full border-white/25 bg-white/5 text-white hover:border-[#089587] hover:bg-[#089587]/20 sm:w-auto"
                  >
                    { t.hero.ctaSecondary }
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Controller: Service Cards & Progress Indicators */ }
          <div className="flex w-full min-w-0 flex-col justify-center gap-4 lg:items-end lg:gap-5">
            {/* Carousel Counter & Arrow Navigation */ }
            <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start lg:self-end">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={ prev }
                  aria-label={ t.hero.prevSlide }
                  className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-[3px] border border-white/20 bg-[#0f3d36]/80 text-white backdrop-blur-md transition-all hover:border-[#089587] hover:bg-[#089587] hover:text-white sm:h-12 sm:w-12"
                >
                  { isRTL ? <ArrowRight size={ 18 } /> : <ArrowLeft size={ 18 } /> }
                </button>
                <button
                  type="button"
                  onClick={ next }
                  aria-label={ t.hero.nextSlide }
                  className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-[3px] border border-white/20 bg-[#0f3d36]/80 text-white backdrop-blur-md transition-all hover:border-[#089587] hover:bg-[#089587] hover:text-white sm:h-12 sm:w-12"
                >
                  { isRTL ? <ArrowLeft size={ 18 } /> : <ArrowRight size={ 18 } /> }
                </button>
              </div>
              <span className="font-mono text-sm text-white/70" aria-hidden="true">
                <span className="font-semibold text-white">{ String( index + 1 ).padStart( 2, "0" ) }</span>
                <span className="mx-1 text-white/35">/</span>
                { String( pillars.length ).padStart( 2, "0" ) }
              </span>
            </div>

            {/* Interactive Service Selector Pills with Pictograms */ }
            <div
              className="w-full space-y-2.5 lg:max-w-md lg:self-end"
              role="group"
              aria-label={ t.hero.selectService }
            >
              { pillars.map( ( item, i ) => (
                <button
                  key={ item.id }
                  type="button"
                  aria-pressed={ i === index }
                  aria-current={ i === index ? "true" : undefined }
                  onClick={ () => setIndex( i ) }
                  className={ `group relative flex min-h-[58px] w-full touch-manipulation items-center gap-3.5 rounded-[4px] border px-4 py-3 text-start transition-all duration-300 ${ i === index
                    ? "border-[#089587] bg-[#11453d]/95 shadow-[0_8px_24px_rgba(8,149,135,0.25)] backdrop-blur-xl"
                    : "border-white/12 bg-[#0c3630]/65 hover:border-white/25 hover:bg-[#0f4039]/75 backdrop-blur-md"
                    }` }
                >
                  {/* Pillar pictogram */ }
                  <LuxuryPictogram
                    type={ item.id }
                    size="sm"
                    glow={ i === index }
                    className="shrink-0"
                  />

                  {/* Pillar label, title and description */ }
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={ `font-mono text-xs font-semibold ${ i === index ? "text-[#089587]" : "text-white/50"
                          }` }
                      >
                        0{ i + 1 }
                      </span>
                      <p
                        className={ `truncate text-sm font-semibold tracking-wide ${ i === index ? "text-white" : "text-white/75"
                          }` }
                      >
                        { item.label }
                      </p>
                    </div>
                    <p className="text-xs leading-snug text-white/55">
                      <span className="font-medium text-white/80">{ item.title }</span>
                    </p>
                  </div>

                  {/* Active Progress Bar Timer */ }
                  { i === index && !reduceMotion && (
                    <span className="relative hidden h-[3px] w-12 shrink-0 overflow-hidden rounded-[3px] bg-white/20 sm:block">
                      <span
                        key={ `${ item.id }-${ paused }` }
                        className={ `absolute inset-y-0 ${ isRTL ? "right-0 origin-right" : "left-0 origin-left"
                          } rounded-[3px] bg-[#089587] ${ paused ? "" : "hero-progress" }` }
                        style={ paused ? { width: "100%" } : undefined }
                      />
                    </span>
                  ) }
                </button>
              ) ) }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
