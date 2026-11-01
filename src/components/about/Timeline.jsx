"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, Quote } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { timelineMilestones } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";

export default function Timeline() {
  const { t } = useI18n();
  const copy = t.aboutPage;
  const railRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 85%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.3,
  });
  const scaleY = useTransform(progress, [0, 1], [0.02, 1]);

  return (
    <section id="histoire" className="section-y relative overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-accent/6 blur-[150px]"
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeader
            align="center"
            label={copy.timelineEyebrow}
            title={
              <>
                {copy.timelineTitlePart1}
                <span className="text-accent">{copy.timelineTitleHighlight}</span>
              </>
            }
            description={
              <>
                {copy.timelineSubtitlePart1}
                <strong className="font-semibold text-fg">Feissal Tarkaoui</strong>
                {copy.timelineSubtitlePart2}
                <strong className="font-semibold text-fg">Marouan Khadiri</strong>
                {copy.timelineSubtitlePart3}
              </>
            }
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 rounded-lg border border-line bg-page p-6 sm:mt-16 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-brand/15 text-accent">
                  <Quote size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="label-mono text-accent">{copy.thesisEyebrow}</p>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-fg/85 sm:text-base">
                    {copy.thesisQuote}
                  </p>
                  <p className="mt-3 text-xs text-muted">{copy.thesisAuthors}</p>
                </div>
              </div>
              <Button href="#fondateurs" variant="secondary" size="sm" className="shrink-0">
                {copy.seeProfiles}
                <ArrowUpRight size={15} className="rtl-flip" />
              </Button>
            </div>
          </div>
        </Reveal>

        <div ref={railRef} className="relative mt-14 sm:mt-20">
          <div
            aria-hidden="true"
            className="absolute inset-y-2 start-[7px] w-px bg-line"
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-2 start-[7px] w-px origin-top bg-accent"
            style={reduce ? { scaleY: 1 } : { scaleY }}
          />

          <ol className="m-0 list-none space-y-8 p-0">
            {timelineMilestones.map((milestone, index) => (
              <li key={milestone.id} className="relative ps-9 sm:ps-12">
                <span
                  aria-hidden="true"
                  className="absolute start-0 top-[0.4rem] h-[15px] w-[15px] rounded-full border border-accent/60 bg-surface"
                >
                  <span className="absolute inset-[3px] rounded-full bg-accent" />
                </span>

                <Reveal delay={index * 0.04}>
                  <div className="border-b border-line pb-8 sm:pb-10">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-display text-2xl leading-none tracking-tight text-accent sm:text-3xl">
                        {milestone.year}
                      </span>
                      <span className="label-mono text-muted">
                        {milestone.period} · {milestone.tag}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl leading-tight tracking-tight sm:text-2xl">
                      {milestone.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-accent">{milestone.subtitle}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                      {milestone.description}
                    </p>

                    <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-fg/80">
                      <span className="h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden="true" />
                      {milestone.highlight}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
