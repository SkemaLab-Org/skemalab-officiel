"use client";

import { Minus, Plus } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import BandHeader from "@/components/home/BandHeader";
import Reveal from "@/components/motion/Reveal";

export default function MethodBand() {
  const { t } = useI18n();
  const copy = t.processSection;
  const steps = copy.steps;

  return (
    <section
      id="method"
      aria-labelledby="method-title"
      className="band-y bg-page"
    >
      <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <BandHeader
            eyebrow={copy.eyebrow}
            index="05"
            title={copy.title}
            titleId="method-title"
            description={copy.description}
          />

          <Reveal delay={0.1}>
            <p className="mt-10 hidden max-w-[22ch] border-t border-line pt-4 mono-label text-muted lg:block">
              01 &rarr; {String(steps.length).padStart(2, "0")} &middot; {copy.eyebrow}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <div className="border-t border-line">
            {steps.map((step, index) => (
              <details
                key={step.step}
                className="accordion-item group border-b border-line"
                open={index === 0}
              >
                <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 transition-colors duration-300 hover:text-accent sm:py-7">
                  <span className="flex min-w-0 gap-4 sm:gap-6">
                    <span className="mono-label mt-1.5 shrink-0 text-accent">
                      {step.step}
                    </span>
                    <span className="min-w-0 font-display text-xl leading-tight tracking-tight text-fg transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                      {step.title}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-muted transition-colors duration-300 group-hover:text-accent"
                  >
                    <Plus className="accordion-plus" size={16} strokeWidth={1.5} />
                    <Minus className="accordion-minus" size={16} strokeWidth={1.5} />
                  </span>
                </summary>

                <div className="pb-7 ps-9 sm:ps-12">
                  <p className="max-w-xl text-sm leading-[1.8] text-muted sm:text-base">
                    {step.text}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
