"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Code2,
  Globe2,
  MousePointer2,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { MoroccanZelligeLattice } from "@/components/ui/MoroccanPattern";

const AUTO_PLAY_DURATION = 4000;
const GOAL_ICONS = [ Code2, TrendingUp, Workflow, BarChart3, Globe2, MousePointer2 ];
const CAROUSEL_COPY = {
  ar: {
    carousel: "أهدافنا",
    controls: "التنقل بين الأهداف",
    previous: "الهدف السابق",
    next: "الهدف التالي",
    goTo: "انتقل إلى الهدف",
    role: "عارض",
    slide: ( current, total ) => `عرض الهدف ${ current } من ${ total }`,
  },
  en: {
    carousel: "Our goals",
    controls: "Goal navigation",
    previous: "Previous goal",
    next: "Next goal",
    goTo: "Go to goal",
    role: "carousel",
    slide: ( current, total ) => `Showing goal ${ current } of ${ total }`,
  },
  fr: {
    carousel: "Nos objectifs",
    controls: "Navigation des objectifs",
    previous: "Objectif précédent",
    next: "Objectif suivant",
    goTo: "Aller à l’objectif",
    role: "carrousel",
    slide: ( current, total ) => `Objectif ${ current } sur ${ total }`,
  },
};

export default function Projects() {
  const { t, isRTL, locale } = useI18n();
  const goals = t.projectsSection.list;
  const [ activeIndex, setActiveIndex ] = useState( 0 );
  const [ direction, setDirection ] = useState( 1 );
  const activeGoal = goals[ activeIndex ] || goals[ 0 ];
  const ActiveIcon = GOAL_ICONS[ activeIndex % GOAL_ICONS.length ];
  const copy = CAROUSEL_COPY[ locale ] || CAROUSEL_COPY.fr;

  useEffect( () => {
    const timeout = window.setTimeout( () => {
      setDirection( 1 );
      setActiveIndex( ( index ) => ( index + 1 ) % goals.length );
    }, AUTO_PLAY_DURATION );

    return () => window.clearTimeout( timeout );
  }, [ activeIndex, goals.length ] );

  const showSlide = ( index, movement ) => {
    setDirection( movement );
    setActiveIndex( ( index + goals.length ) % goals.length );
  };

  const nextSlide = () => showSlide( activeIndex + 1, 1 );
  const previousSlide = () => showSlide( activeIndex - 1, -1 );
  const slideLabel = copy.slide( activeIndex + 1, goals.length );
  const visualDirection = isRTL ? -direction : direction;

  return (
    <section
      id="projets"
      className="relative overflow-hidden bg-page py-20 sm:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brand/[0.07] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={ t.projectsSection.eyebrow }
            title={ t.projectsSection.title }
            description={ t.projectsSection.description }
          />
        </Reveal>

        <Reveal delay={ 0.08 }>
          <div className="mt-10 sm:mt-14 lg:mt-16">
            <div
              role="region"
              aria-roledescription={ copy.role }
              aria-label={ copy.carousel }
              className="relative isolate min-h-[390px] overflow-hidden rounded-[4px] border border-line bg-surface shadow-[0_16px_52px_rgba(11,15,14,0.06)] sm:min-h-[410px] lg:min-h-[440px]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_0%,rgba(8,149,135,0.11),transparent_48%),linear-gradient(135deg,rgba(8,149,135,0.035),transparent_62%)]"
              />

              <AnimatePresence mode="wait" initial={ false }>
                <motion.article
                  key={ activeGoal.goal }
                  role="group"
                  aria-roledescription={ locale === "en" ? "slide" : locale === "ar" ? "شريحة" : "diapositive" }
                  aria-label={ slideLabel }
                  initial={ { opacity: 0, x: visualDirection * 42 } }
                  animate={ { opacity: 1, x: 0 } }
                  exit={ { opacity: 0, x: visualDirection * -34 } }
                  transition={ { duration: 0.32, ease: [ 0.22, 1, 0.36, 1 ] } }
                  className="relative isolate grid min-h-[390px] h-full grid-cols-1 items-center gap-5 p-5 sm:min-h-[410px] sm:p-8 md:grid-cols-[1fr_0.42fr] md:gap-8 md:p-10 lg:min-h-[440px] lg:p-14"
                  dir={ isRTL ? "rtl" : "ltr" }
                >
                  <div className="relative z-10 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-[4px] border border-brand/20 bg-brand/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent sm:text-[11px]">
                        <span className="h-1.5 w-1.5 rotate-45 bg-brand" />
                        { activeGoal.category }
                      </span>
                      <span className="font-mono text-xs tracking-[0.12em] text-muted">
                        { String( activeIndex + 1 ).padStart( 2, "0" ) } / { String( goals.length ).padStart( 2, "0" ) }
                      </span>
                    </div>

                    <h3 className="mt-6 max-w-3xl text-[clamp(2rem,5.8vw,4.5rem)] font-semibold leading-[1.04] tracking-tight text-fg sm:mt-8">
                      { activeGoal.goal }
                    </h3>
                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:mt-6 sm:text-base md:text-lg">
                      { activeGoal.description }
                    </p>

                    <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand/80 sm:mt-10">
                      <span className="h-px w-10 bg-brand/50" />
                      <span className="font-mono tracking-[0.12em]">SKEMALAB</span>
                    </div>
                  </div>

                  <div className="pointer-events-none relative z-10 mx-auto flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40 md:h-52 md:w-52">
                    <div className="absolute inset-0 rotate-45 rounded-[28px] border border-brand/15 bg-brand/[0.035]" />
                    <div className="absolute inset-[12%] rotate-45 rounded-[20px] border border-accent/15" />
                    <div className="relative flex h-[58%] w-[58%] rotate-45 items-center justify-center rounded-[14px] border border-brand/20 bg-surface/90 text-brand shadow-[0_12px_36px_rgba(8,149,135,0.12)]">
                      <span className="-rotate-45">
                        <ActiveIcon size={ 38 } strokeWidth={ 1.45 } />
                      </span>
                    </div>
                    <span aria-hidden="true" className="absolute -end-3 -top-4 font-mono text-6xl font-semibold tracking-tighter text-brand/[0.11] sm:text-7xl md:text-8xl">
                      { String( activeIndex + 1 ).padStart( 2, "0" ) }
                    </span>
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 opacity-40"
                  >
                    <MoroccanZelligeLattice
                      idPrefix={ `goal-slide-${ activeIndex }` }
                      opacity={ 0.3 }
                      strokeColor="#089587"
                      strokeWidth={ 0.7 }
                      size={ 108 }
                      fadeMask
                    />
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 sm:mt-6">
              <div role="group" aria-label={ copy.controls } className="flex items-center gap-2">
                { goals.map( ( goal, index ) => (
                  <button
                    key={ goal.goal }
                    type="button"
                    aria-label={ `${ copy.goTo } ${ index + 1 }` }
                    aria-current={ activeIndex === index ? "step" : undefined }
                    onClick={ () => showSlide( index, index >= activeIndex ? 1 : -1 ) }
                    className="group flex h-8 items-center justify-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
                  >
                    <span
                      className={ `relative block h-[3px] overflow-hidden rounded-full transition-all duration-300 ${ activeIndex === index
                        ? "w-9 bg-brand"
                        : "w-4 bg-line group-hover:w-6 group-hover:bg-brand/50"
                        }` }
                    >
                      { activeIndex === index && (
                        <motion.span
                          key={ `slide-progress-${ activeIndex }` }
                          aria-hidden="true"
                          className="absolute inset-0 origin-left rounded-full bg-accent"
                          initial={ { scaleX: 0 } }
                          animate={ { scaleX: 1 } }
                          transition={ { duration: AUTO_PLAY_DURATION / 1000, ease: "linear" } }
                          style={ { transformOrigin: isRTL ? "right center" : "left center" } }
                        />
                      ) }
                    </span>
                  </button>
                ) ) }
              </div>

              <div className="flex items-center gap-3">
                <span className="min-w-[92px] text-end font-mono text-xs tracking-[0.12em] text-muted">
                  { slideLabel }
                </span>
                <button
                  type="button"
                  aria-label={ copy.previous }
                  onClick={ previousSlide }
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-line bg-surface text-fg transition-colors hover:border-brand/40 hover:bg-brand/[0.06] hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
                >
                  <ChevronLeft size={ 18 } className="rtl-flip" />
                </button>
                <button
                  type="button"
                  aria-label={ copy.next }
                  onClick={ nextSlide }
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-line bg-surface text-fg transition-colors hover:border-brand/40 hover:bg-brand/[0.06] hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
                >
                  <ChevronRight size={ 18 } className="rtl-flip" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={ 0.12 }>
          <div className="mt-8 flex justify-center sm:mt-10">
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center gap-3 rounded-[4px] bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(8,149,135,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_12px_30px_rgba(8,149,135,0.28)]"
            >
              <span>{ t.projectsSection.similarProject }</span>
              <ArrowUpRight
                size={ 16 }
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl-flip"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
