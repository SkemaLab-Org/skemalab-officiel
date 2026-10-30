"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useI18n } from "@/components/I18nProvider";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";

export default function Process() {
  const { t } = useI18n();
  const copy = t.processSection;
  const steps = copy.steps;
  const railRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 72%", "end 85%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.3,
  });
  const scaleY = useTransform(progress, [0, 1], [0.02, 1]);

  return (
    <section id="method" className="section-y relative overflow-hidden bg-surface">
      <div className="shell relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeader
              label={copy.eyebrow}
              index="03"
              title={copy.title}
              description={copy.description}
            />
          </Reveal>
        </div>

        <div ref={railRef} className="relative">
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
            {steps.map((step, index) => (
              <li key={step.step} className="relative ps-9 sm:ps-12">
                <span
                  aria-hidden="true"
                  className="absolute start-0 top-[0.3rem] h-[15px] w-[15px] rounded-full border border-accent/60 bg-surface"
                >
                  <span className="absolute inset-[3px] rounded-full bg-accent" />
                </span>

                <Reveal delay={index * 0.04}>
                  <div className="border-b border-line pb-8 sm:pb-10">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <span className="label-mono text-accent">{step.step}</span>
                      <span className="label-mono text-muted">
                        {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl leading-tight tracking-tight sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                      {step.text}
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
