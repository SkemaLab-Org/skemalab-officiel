"use client";

import {
  ArrowUpRight,
  BarChart3,
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

export default function Projects() {
  const { t, isRTL, locale } = useI18n();
  const goals = t.projectsSection.list;
  const goalIcons = [Code2, TrendingUp, Workflow, BarChart3, Globe2, MousePointer2];

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
            eyebrow={
              locale === "ar"
                ? "من الفكرة إلى الأثر"
                : t.projectsSection.eyebrow
            }
            title={t.projectsSection.title}
            description={t.projectsSection.description}
          />
        </Reveal>

        <div
          className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          role="list"
        >
          {goals.map((goal, index) => {
            const GoalIcon = goalIcons[index % goalIcons.length];

            return (
              <Reveal key={goal.goal} delay={index * 0.06} className="h-full">
                <article
                  role="listitem"
                  className="group relative isolate flex h-full w-full min-h-[310px] flex-col overflow-hidden rounded-[4px] border border-line/80 bg-surface/80 p-5 shadow-[0_4px_18px_rgba(11,15,14,0.025)] transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:bg-surface hover:shadow-[-12px_-12px_40px_rgba(8,149,135,0.2),0_18px_46px_rgba(8,149,135,0.08)] dark:bg-surface/70 dark:hover:bg-surface/90 sm:min-h-[320px] sm:p-6 lg:p-7"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 z-0 h-[60%] w-[60%] overflow-hidden bg-gradient-to-br from-brand/20 via-brand/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      maskImage: "linear-gradient(135deg, #000 0%, #000 34%, transparent 88%)",
                      WebkitMaskImage: "linear-gradient(135deg, #000 0%, #000 34%, transparent 88%)",
                      filter: "drop-shadow(-7px -7px 20px rgba(8,149,135,0.4))",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 top-0 z-0 h-[60%] w-[60%] overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      maskImage: "linear-gradient(135deg, #000 0%, #000 34%, transparent 88%)",
                      WebkitMaskImage: "linear-gradient(135deg, #000 0%, #000 34%, transparent 88%)",
                    }}
                  >
                    <MoroccanZelligeLattice
                      idPrefix={"project-card-" + index}
                      opacity={0.28}
                      strokeColor="#089587"
                      strokeWidth={0.8}
                      size={72}
                      fadeMask={false}
                    />
                  </div>

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <span className="font-mono text-xs font-medium tracking-[0.16em] text-brand/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] border border-brand/15 bg-brand/[0.06] text-brand transition-all duration-500 group-hover:scale-105 group-hover:border-brand/30 group-hover:bg-brand/10 sm:h-14 sm:w-14">
                      <GoalIcon size={23} strokeWidth={1.6} />
                    </span>
                  </div>

                  <div className="relative z-10 mt-6">
                    <span className="inline-flex items-center gap-2 rounded-[4px] border border-brand/15 bg-brand/[0.045] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-accent sm:text-[10px]">
                      <span className="h-1.5 w-1.5 rotate-45 bg-brand" />
                      {goal.category}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-fg transition-colors duration-300 group-hover:text-brand sm:text-[1.35rem]">
                      {goal.goal}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                      {goal.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-auto flex items-center gap-2 pt-6 text-xs font-semibold text-brand/80 transition-colors duration-300 group-hover:text-brand">
                    <span className="h-px w-7 origin-left bg-brand/45 transition-all duration-300 group-hover:w-11 group-hover:bg-brand" />
                    <span className="font-mono tracking-[0.12em] text-brand/60">SKEMALAB</span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-8 flex justify-center sm:mt-10">
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center gap-3 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(8,149,135,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_12px_30px_rgba(8,149,135,0.28)]"
            >
              <span>{t.projectsSection.similarProject}</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl-flip"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
