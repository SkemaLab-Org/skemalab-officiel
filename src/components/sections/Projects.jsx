"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import useCarousel from "@/hooks/useCarousel";

export default function Projects() {
  const { index, setIndex, prev, next, reduceMotion, onTouchStart, onTouchEnd } =
    useCarousel(projects.length, { intervalMs: 7000 });

  const project = projects[index];

  return (
    <section id="projets" className="relative overflow-hidden bg-page py-16 sm:py-24 lg:py-36">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Réalisations"
              title="Des projets pensés pour performer."
              description="Chaque livraison allie design, technique et impact business — des résultats concrets, pas des slides."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Projet précédent"
                className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-[3px] border border-line bg-surface text-fg transition-all hover:border-brand hover:bg-brand hover:text-white sm:h-12 sm:w-12"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Projet suivant"
                className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-[3px] border border-line bg-surface text-fg transition-all hover:border-brand hover:bg-brand hover:text-white sm:h-12 sm:w-12"
              >
                <ArrowRight size={18} />
              </button>
              <span className="ml-2 font-mono text-sm text-muted sm:ml-3" aria-hidden="true">
                <span className="text-fg">{String(index + 1).padStart(2, "0")}</span>
                <span className="mx-1.5 text-muted/40">/</span>
                {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div
            className="relative overflow-hidden rounded-[3px] border border-line bg-surface"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={project.title}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="relative grid lg:grid-cols-[1.4fr_0.85fr]"
              >
                <div className="relative min-h-[220px] overflow-hidden sm:min-h-[360px] lg:min-h-[460px]">
                  <motion.div
                    initial={reduceMotion ? false : { scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-page/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-surface/95" />
                  <div className="absolute left-3 top-3 rounded-[3px] border border-white/30 bg-ink/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-mist backdrop-blur-md sm:left-5 sm:top-5 sm:px-3 sm:py-1.5 sm:text-[11px]">
                    {project.category}
                  </div>
                </div>

                <div className="relative z-10 flex flex-col justify-between p-5 sm:p-8 lg:py-14 lg:pl-4 lg:pr-12">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-accent sm:text-[11px] sm:tracking-[0.28em]">
                      Impact mesuré
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:mt-5 sm:text-3xl lg:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 inline-flex items-center border-l-2 border-brand pl-3 text-lg font-medium text-fg sm:mt-6 sm:pl-4 sm:text-xl lg:text-2xl">
                      {project.result}
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted sm:mt-6">
                      Conception, build et optimisation — livrés avec une
                      feuille de route claire et des indicateurs de succès
                      définis dès le départ.
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="mt-8 inline-flex min-h-11 w-fit touch-manipulation items-center gap-2 rounded-[3px] bg-brand px-5 py-3 text-sm font-medium text-white transition-all hover:bg-accent hover:gap-3"
                  >
                    Projet similaire
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div
          className="-mx-4 mt-5 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5"
          role="group"
          aria-label="Projets"
        >
          {projects.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-pressed={i === index}
              aria-label={item.title}
              onClick={() => setIndex(i)}
              className={`group relative w-[42%] min-w-[42%] shrink-0 overflow-hidden rounded-[3px] border text-left transition-all duration-300 touch-manipulation sm:w-auto sm:min-w-0 ${
                i === index
                  ? "border-brand shadow-[0_0_0_1px_rgba(8,149,135,0.18)]"
                  : "border-line hover:border-brand/30"
              }`}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className={`object-cover transition-all duration-500 ${
                    i === index ? "opacity-100" : "opacity-55 group-hover:opacity-80"
                  }`}
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 truncate text-[11px] font-medium text-mist">
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
