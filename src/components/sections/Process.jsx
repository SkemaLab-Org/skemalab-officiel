"use client";

import { useI18n } from "@/components/I18nProvider";
import BandHeader from "@/components/ui/BandHeader";
import Reveal from "@/components/motion/Reveal";

export default function Process() {
  const { t } = useI18n();
  const copy = t.processSection;
  const steps = copy.steps;

  return (
    <section id="method" className="section-y bg-surface">
      <div className="shell">
        <Reveal>
          <BandHeader
            index="02"
            label={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-12 sm:mt-16">
          <ol className="m-0 grid list-none grid-cols-1 gap-px border-y border-line bg-line p-0 min-[560px]:grid-cols-2 min-[1000px]:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step.step}
                className="flex flex-col bg-surface px-6 py-7 sm:px-7 sm:py-8"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="label-mono text-muted">{step.step}</span>
                  <span className="label-mono text-muted" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(steps.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[21px] leading-tight tracking-[-0.01em] text-fg">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
