"use client";

import { useI18n } from "@/components/I18nProvider";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";

export default function Stats() {
  const { t } = useI18n();

  return (
    <section
      aria-label={t.statsList.map((stat) => stat.label).join(", ")}
      className="bg-page py-14 sm:py-16"
    >
      <div className="shell">
        <div className="grid grid-cols-1 gap-px border-y border-line bg-line min-[560px]:grid-cols-2 min-[1000px]:grid-cols-4">
          {t.statsList.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.05}
              className="h-full bg-page"
            >
              <div className="flex h-full flex-col justify-between gap-8 px-6 py-9 first:ps-0 last:pe-0 sm:px-8 sm:py-10">
                <span className="label-mono text-muted">
                  KPI · {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <p className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-light leading-none tracking-[-0.03em]">
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-accent"
                      suffixClassName="text-fg"
                    />
                  </p>
                  <p className="mt-4 max-w-[16rem] text-[12.5px] leading-snug text-muted">
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
