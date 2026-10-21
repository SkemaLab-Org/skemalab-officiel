"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import useCarousel from "@/hooks/useCarousel";
import { MoroccanZelligeLattice, MoroccanCornerOrnament } from "@/components/ui/MoroccanPattern";

export default function Projects() {
  const { t, isRTL, locale } = useI18n();
  const projectList = t.projectsSection.list;
  const { index, setIndex, prev, next, reduceMotion, onTouchStart, onTouchEnd } =
    useCarousel(projectList.length, { intervalMs: 7000 });

  const project = projectList[index];

  return (
    <section
      id="projets"
      className="relative overflow-hidden bg-page py-20 sm:py-28 lg:py-36"
    >
      {/* Moroccan Background Pattern */}
      <MoroccanZelligeLattice
        opacity={0.05}
        strokeColor="#089587"
        size={110}
        fadeMask={true}
      />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/8 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-80 w-80 rounded-full bg-brand/8 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow={
                locale === "ar"
                  ? "سجل الإنجازات · مشاريع رائدة"
                  : t.projectsSection.eyebrow
              }
              title={t.projectsSection.title}
              description={t.projectsSection.description}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label={t.projectsSection.prevLabel}
                className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-[3px] border border-line bg-surface text-fg shadow-sm transition-all hover:border-brand hover:bg-brand hover:text-white sm:h-12 sm:w-12"
              >
                {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={t.projectsSection.nextLabel}
                className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-[3px] border border-line bg-surface text-fg shadow-sm transition-all hover:border-brand hover:bg-brand hover:text-white sm:h-12 sm:w-12"
              >
                {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </button>
              <span className="ml-2 font-mono text-sm text-muted sm:ml-3" aria-hidden="true">
                <span className="font-semibold text-fg">{String(index + 1).padStart(2, "0")}</span>
                <span className="mx-1.5 text-muted/40">/</span>
                {String(projectList.length).padStart(2, "0")}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div
            className="relative overflow-hidden rounded-[4px] border border-line bg-surface shadow-xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <MoroccanCornerOrnament
              className="absolute right-2 top-2 z-20 opacity-30"
              size={26}
              color="#089587"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={project.title}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="relative grid lg:grid-cols-[1.35fr_0.85fr]"
              >
                <div className="relative min-h-[240px] overflow-hidden sm:min-h-[380px] lg:min-h-[480px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-fill"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-page/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-surface/95" />

                  {/* Category Pill with Moroccan Accent */}
                  <div className="absolute left-3 top-3 flex items-center gap-2 rounded-[3px] border border-white/30 bg-[#0f2e2a]/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-mist backdrop-blur-md sm:left-5 sm:top-5 sm:text-[11px]">
                    <span className="h-1.5 w-1.5 rotate-45 bg-brand" />
                    <span>{project.category}</span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 lg:py-14 lg:pl-4 lg:pr-12">
                  <div>
                    <div className="flex items-center gap-2 text-accent">
                      <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] sm:text-[11px] sm:tracking-[0.28em]">
                        {t.projectsSection.measuredImpact}
                      </p>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-fg sm:mt-5 sm:text-3xl lg:text-4xl">
                      {project.title}
                    </h3>

                    <p className="mt-4 inline-flex items-center border-l-2 border-brand pl-3 text-lg font-semibold text-fg sm:mt-6 sm:pl-4 sm:text-xl lg:text-2xl">
                      {project.result}
                    </p>

                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted sm:mt-6">
                      {t.projectsSection.summary}
                    </p>
                  </div>

                  <a
                    href="#contact"
                    className="mt-8 inline-flex min-h-11 w-fit touch-manipulation items-center gap-2.5 rounded-[3px] bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(8,149,135,0.3)] transition-all hover:bg-accent hover:gap-3.5"
                  >
                    <span>{t.projectsSection.similarProject}</span>
                    <ArrowUpRight size={16} className="rtl-flip" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Thumbnail Navigation Bar */}
        <div
          className="-mx-4 mt-5 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5"
          role="group"
          aria-label={t.projectsSection.eyebrow}
        >
          {projectList.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-pressed={i === index}
              aria-label={item.title}
              onClick={() => setIndex(i)}
              className={`group relative w-[42%] min-w-[42%] shrink-0 overflow-hidden rounded-[3px] border text-left transition-all duration-300 touch-manipulation sm:w-auto sm:min-w-0 ${
                i === index
                  ? "border-brand shadow-[0_0_0_1px_rgba(8,149,135,0.25)] ring-2 ring-brand/20"
                  : "border-line hover:border-brand/40"
              }`}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className={`object-fill transition-opacity duration-500 ${
                    i === index ? "opacity-100" : "opacity-55 group-hover:opacity-85"
                  }`}
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 truncate text-[11px] font-semibold text-mist">
                  {item.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
