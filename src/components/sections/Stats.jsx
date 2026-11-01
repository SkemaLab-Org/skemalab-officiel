"use client";

import { useI18n } from "@/components/I18nProvider";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";

export default function Stats() {
  const { t } = useI18n();

  return (
    <section
      aria-label={t.statsList.map((stat) => stat.label).join(", ")}
      className="border-y border-line bg-surface-2 text-fg"
    >
      <div className="shell">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {t.statsList.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.05}
              className="h-full"
            >
              <div className="flex h-full flex-col justify-between gap-8 border-b border-line py-10 last:border-b-0 sm:px-8 sm:py-12 lg:border-b-0 lg:border-e lg:px-10 lg:last:border-e-0 lg:first:ps-0">
                <span className="label-mono text-muted">
                  KPI · {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <p className="font-display text-[clamp(2.6rem,6.2vw,4.25rem)] leading-none tracking-tight text-fg">
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      suffixClassName="text-accent"
                    />
                  </p>
                  <p className="mt-4 max-w-[15rem] text-sm leading-snug text-muted">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
