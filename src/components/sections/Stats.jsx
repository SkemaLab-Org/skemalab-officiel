"use client";

import { useI18n } from "@/components/I18nProvider";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";

export default function Stats() {
  const { t } = useI18n();

  return (
    <section
      aria-label={t.statsList.map((stat) => stat.label).join(", ")}
      className="bg-page py-10 sm:py-14"
    >
      <div className="shell">
        <div className="grid grid-cols-2 gap-px border-y border-line bg-line min-[1000px]:grid-cols-4">
          {t.statsList.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.05}
              className="h-full bg-page"
            >
              <div className="flex h-full flex-col justify-between gap-3 px-4 py-5 max-[999px]:odd:ps-0 max-[999px]:even:pe-0 sm:gap-8 sm:px-6 sm:py-9 min-[1000px]:px-8 min-[1000px]:py-10 min-[1000px]:first:ps-0 min-[1000px]:last:pe-0">
                <span className="label-mono text-muted">
                  KPI · {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <p className="font-display text-[clamp(1.75rem,7.5vw,3.4rem)] font-light leading-none tracking-[-0.03em]">
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-accent"
                      suffixClassName="text-fg"
                    />
                  </p>
                  <p className="mt-2 max-w-[16rem] text-[11.5px] leading-snug text-muted sm:mt-4 sm:text-[12.5px]">
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
