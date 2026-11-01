"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { founders } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import CalendlyButton from "@/components/CalendlyButton";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Founders() {
  const { t } = useI18n();
  const copy = t.aboutPage;
  const [activeId, setActiveId] = useState(founders[0].id);
  const reduce = useReducedMotion();
  const active = founders.find((founder) => founder.id === activeId) || founders[0];

  return (
    <section id="fondateurs" className="section-y relative overflow-hidden bg-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-brand/8 blur-[150px]"
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeader
            label={copy.foundersEyebrow}
            title={
              <>
                {copy.foundersTitlePart1}
                <span className="text-accent">{copy.foundersTitleHighlight}</span>
              </>
            }
            description={copy.foundersSubtitle}
          />
        </Reveal>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-deep">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active.id}
                  initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DURATION.base, ease: EASE.out }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#07110e] via-[#07110e]/20 to-transparent"
              />

              <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                <p className="label-mono text-accent">{active.role}</p>
                <p className="mt-2 font-display text-2xl leading-none tracking-tight text-cream sm:text-3xl">
                  {active.name}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="min-w-0">
            <div className="border-t border-line" role="group" aria-label={copy.foundersEyebrow}>
              {founders.map((founder, index) => {
                const isActive = founder.id === active.id;
                return (
                  <button
                    key={founder.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveId(founder.id)}
                    className={cn(
                      "group flex w-full items-baseline gap-4 border-b border-line py-4 text-start transition-colors duration-300",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    <span
                      className={cn(
                        "label-mono w-6 shrink-0",
                        isActive ? "text-accent" : "text-muted",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl leading-tight tracking-tight sm:text-2xl">
                        {founder.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">
                        {founder.role}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 transition-colors rtl-flip",
                        isActive ? "text-accent" : "text-muted group-hover:text-muted",
                      )}
                    />
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: DURATION.fast, ease: EASE.out }}
                className="mt-6"
                aria-live="polite"
              >
                <p className="label-mono text-muted">{active.title}</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {active.shortBio}
                </p>
                <p className="mt-4 text-sm text-fg/85">
                  <span className="label-mono me-2 text-muted">
                    {copy.foundersList[0].expertiseLabel}
                  </span>
                  {active.focusArea}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CalendlyButton className="min-h-12 px-5 text-sm">
                {copy.foundersList[0].ctaBtn}
              </CalendlyButton>
              <a
                href={active.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Profil LinkedIn de ${active.name}`}
                className="inline-flex h-12 items-center gap-2 rounded-md border border-line px-4 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
              >
                LinkedIn
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
