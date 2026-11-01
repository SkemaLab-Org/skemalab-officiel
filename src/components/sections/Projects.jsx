"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import SectionHeader from "@/components/ui/SectionHeader";
import Spotlight from "@/components/ui/Spotlight";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Projects() {
  const { t } = useI18n();
  const copy = t.projectsSection;
  const goals = copy.list;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGoal = goals[activeIndex] || goals[0];
  const reduce = useReducedMotion();

  return (
    <section id="projets" className="section-y relative overflow-hidden bg-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-[24rem] w-[24rem] rounded-full bg-brand/7 blur-[140px]"
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeader
            label={copy.eyebrow}
            index="04"
            title={copy.title}
            description={copy.description}
          />
        </Reveal>

        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-14">
          <Reveal>
            <div
              role="group"
              aria-label={copy.eyebrow}
              className="border-t border-line"
            >
              {goals.map((goal, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={goal.goal}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "group flex w-full items-center gap-4 border-b border-line py-4 text-start transition-colors duration-300 sm:py-5",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    <span
                      className={cn(
                        "label-mono w-6 shrink-0 transition-colors",
                        active ? "text-accent" : "text-muted",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium leading-snug sm:text-base">
                        {goal.goal}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">
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
                          : "text-muted group-hover:text-muted",
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:sticky lg:top-28">
            <Spotlight
              className="relative min-h-[24rem] overflow-hidden rounded-lg border border-line bg-surface p-6 sm:min-h-[26rem] sm:p-10 lg:p-12"
              aria-live="polite"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-5 end-7 font-display text-[4.5rem] leading-none tracking-tighter text-fg/[0.06] sm:text-[5.5rem]"
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
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line-strong px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden="true" />
                    <span className="label-mono text-muted">{activeGoal.category}</span>
                  </span>

                  <h3 className="display-md mt-8 max-w-[20ch]">{activeGoal.goal}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                    {activeGoal.description}
                  </p>

                  <div className="mt-auto pt-10">
                    <Button href="#contact" size="sm">
                      {copy.similarProject}
                      <ArrowUpRight size={15} className="rtl-flip" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Spotlight>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
