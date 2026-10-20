"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/components/I18nProvider";
import { MoroccanZelligeLattice, MoroccanCornerOrnament } from "@/components/ui/MoroccanPattern";
import LuxuryPictogram from "@/components/ui/LuxuryPictogram";

export default function Process() {
  const { t, isRTL, locale } = useI18n();
  const processSteps = t.processSection.steps;

  const bilingualPhaseTags = [
    { fr: "Phase 01 · Diagnostic & Blueprint", ar: "المرحلة 01 · التشخيص والتخطيط", en: "Phase 01 · Diagnostic & Blueprint" },
    { fr: "Phase 02 · Design & Architecture", ar: "المرحلة 02 · الهندسة والتصميم", en: "Phase 02 · Design & Architecture" },
    { fr: "Phase 03 · Sprints & Développement", ar: "المرحلة 03 · التطوير والبرمجة", en: "Phase 03 · Sprints & Engineering" },
    { fr: "Phase 04 · Déploiement & Scale", ar: "المرحلة 04 · الإطلاق والنمو", en: "Phase 04 · Launch & Scalability" },
  ];

  return (
    <section
      id="method"
      className="relative overflow-hidden bg-surface py-20 sm:py-28 lg:py-36"
    >
      {/* Moroccan Geometric Background Texture */}
      <MoroccanZelligeLattice
        opacity={0.06}
        strokeColor="#089587"
        size={96}
        fadeMask={true}
      />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-brand/8 blur-[100px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-72 w-72 rounded-full bg-accent/8 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={
              locale === "ar"
                ? "منهجية العمل · دقة وسرعة الإنجاز"
                : t.processSection.eyebrow
            }
            title={t.processSection.title}
            description={t.processSection.description}
          />
        </Reveal>

        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          {/* Architectural Connecting Guide Line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[60px] hidden h-px bg-gradient-to-r from-transparent via-brand/35 to-transparent lg:block" />

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, index) => {
              const phaseTag =
                bilingualPhaseTags[index]?.[locale] || `Phase 0${index + 1}`;

              return (
                <Reveal key={step.step} delay={index * 0.08} className="h-full">
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-page/75 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:bg-page hover:shadow-[0_12px_30px_rgba(8,149,135,0.08)] sm:p-7 lg:p-8 dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
                    {/* Moroccan Corner Ornament */}
                    <MoroccanCornerOrnament
                      className="absolute right-2 top-2 opacity-25 transition-opacity duration-300 group-hover:opacity-75"
                      size={24}
                      color="#089587"
                    />

                    {/* Step Header with Pictogram & Moroccan Octagram Number */}
                    <div className="relative z-10 mb-6 flex items-center justify-between sm:mb-8">
                      <LuxuryPictogram
                        type={`process-${index + 1}`}
                        size="md"
                        glow={false}
                      />

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-brand">
                          0{index + 1}
                        </span>
                        <span
                          className={`h-[2px] w-8 rounded-[1px] bg-brand/50 transition-all duration-500 group-hover:w-12 group-hover:bg-brand ${
                            isRTL ? "origin-right" : "origin-left"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Bilingual Phase Pill */}
                    <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                      {phaseTag}
                    </span>

                    <h3 className="text-lg font-semibold tracking-tight text-fg sm:text-xl">
                      {step.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {step.text}
                    </p>

                    {/* Bottom Active Glow Bar */}
                    <div
                      className={`absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-brand via-accent to-brand transition-transform duration-500 group-hover:scale-x-100 ${
                        isRTL ? "origin-right scale-x-0" : "origin-left scale-x-0"
                      }`}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
