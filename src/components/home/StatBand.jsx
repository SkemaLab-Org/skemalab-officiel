"use client";

import { useI18n } from "@/components/I18nProvider";
import BandHeader from "@/components/home/BandHeader";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";

export default function StatBand() {
  const { t } = useI18n();
  const copy = t.home.stats;

  return (
    <section
      aria-labelledby="stats-title"
      className="band-y bg-surface-2"
    >
      <div className="shell">
        <BandHeader
          eyebrow={copy.eyebrow}
          index="04"
          title={copy.title}
          titleId="stats-title"
          description={copy.lede}
        />

        <div className="mt-12 grid gap-px border-y border-line bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {t.statsList.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.05} className="h-full">
              <div className="flex h-full flex-col justify-between gap-10 bg-surface-2 py-8 sm:px-7 lg:py-10">
                <div className="flex items-center justify-between gap-3">
                  <span className="mono-label text-muted">
                    KPI · {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                </div>

                <div>
                  <p
                    dir="ltr"
                    className="font-display text-[clamp(2.9rem,5.8vw,4.6rem)] font-light leading-none tracking-[-0.04em] text-fg"
                  >
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      suffixClassName="text-accent"
                      leadingClassName="text-accent"
                    />
                  </p>
                  <p className="mt-5 max-w-[15rem] text-sm leading-snug text-muted">
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
