"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import BandHeader from "@/components/home/BandHeader";
import Button from "@/components/ui/Button";
import { MoroccanZelligeLattice } from "@/components/ui/MoroccanPattern";
import Reveal from "@/components/motion/Reveal";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function ProjectsBand() {
  const { t } = useI18n();
  const copy = t.projectsSection;
  const goals = copy.list;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGoal = goals[activeIndex] || goals[0];
  const reduce = useReducedMotion();

  return (
    <section
      id="projets"
      aria-labelledby="projects-title"
      className="band-y bg-surface"
    >
      <div className="shell">
        <BandHeader
          eyebrow={copy.eyebrow}
          index="06"
          title={copy.title}
          titleId="projects-title"
          description={copy.description}
        />

        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <Reveal>
            <div role="group" aria-label={copy.eyebrow} className="border-t border-line">
              {goals.map((goal, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={goal.goal}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "group flex w-full items-center gap-4 border-b border-line py-5 text-start transition-colors duration-300",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    <span
                      className={cn(
                        "mono-label w-7 shrink-0 transition-colors",
                        active ? "text-accent" : "text-muted",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm leading-snug font-medium sm:text-base">
                        {goal.goal}
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {goal.category}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 transition-all duration-300 rtl-flip",
                        active
                          ? "text-accent"
                          : "text-muted group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:sticky lg:top-28">
            <div
              aria-live="polite"
              className="relative flex min-h-[22rem] flex-col overflow-hidden border-t border-line pt-6 sm:min-h-[25rem] lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0"
            >
              <MoroccanZelligeLattice
                idPrefix="projects-lattice"
                opacity={0.05}
                strokeColor="currentColor"
                strokeWidth={0.7}
                size={112}
                fadeMask={false}
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 end-0 font-display text-[6rem] leading-none tracking-tighter text-fg/[0.045] sm:text-[8rem]"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </span>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeGoal.goal}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: DURATION.base, ease: EASE.out }}
                  className="relative flex h-full flex-col"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 mono-label text-muted">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-accent" />
                      {activeGoal.category}
                    </span>
                    <span className="mono-label text-muted tabular-nums">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(goals.length).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="display-band mt-8 max-w-[18ch] text-fg">
                    {activeGoal.goal}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-[1.8] text-muted sm:text-base">
                    {activeGoal.description}
                  </p>

                  <div className="mt-auto pt-10">
                    <Button href="#contact" size="sm">
                      {copy.similarProject}
                      <ArrowUpRight size={15} className="rtl-flip" aria-hidden="true" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
