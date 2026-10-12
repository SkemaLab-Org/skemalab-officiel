"use client";

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/components/I18nProvider";

export default function Process() {
  const { t, isRTL } = useI18n();
  const processSteps = t.processSection.steps;

  return (
    <section id="method" className="relative overflow-hidden bg-surface py-16 sm:py-24 lg:py-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand/8 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={t.processSection.eyebrow}
            title={t.processSection.title}
            description={t.processSection.description}
          />
        </Reveal>

        <div className="relative mt-10 sm:mt-14 lg:mt-20">
          <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px bg-line lg:block" />

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {processSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.08} className="h-full">
                <div className="group relative flex h-full flex-col rounded-[3px] border border-line bg-page/70 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-brand/30 hover:bg-page hover:shadow-[0_6px_18px_rgba(11,14,20,0.04)] sm:p-7 lg:p-8">
                  <div className="relative z-10 mb-6 flex items-center justify-between sm:mb-10">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[3px] bg-ink text-sm font-semibold text-mist transition-colors duration-500 group-hover:bg-brand dark:bg-mist dark:text-ink dark:group-hover:bg-brand dark:group-hover:text-white">
                      {step.step}
                    </span>
                    <span
                      className={`h-[3px] w-8 rounded-[3px] bg-brand transition-transform duration-500 group-hover:scale-x-100 sm:w-10 ${
                        isRTL ? "origin-right scale-x-0" : "origin-left scale-x-0"
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-fg sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {step.text}
                  </p>
                  <div
                    className={`absolute inset-x-0 bottom-0 h-[3px] bg-brand transition-transform duration-500 group-hover:scale-x-100 ${
                      isRTL ? "origin-right scale-x-0" : "origin-left scale-x-0"
                    }`}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
