"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";

const STRIP = [
  { value: "40+", key: "strip1" },
  { value: "100%", key: "strip2" },
  { value: "3×", key: "strip3" },
  { value: "18h", key: "strip4" },
];

export default function AboutHero() {
  const { t } = useI18n();
  const copy = t.aboutPage;

  return (
    <section className="relative isolate overflow-hidden bg-[#07110e] text-cream">
      <Image
        src="/team/lab_concept.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,#07110e_8%,rgba(7,17,14,0.82)_46%,rgba(7,17,14,0.55)_100%)]"
      />
      <div aria-hidden="true" className="zellige absolute inset-0 opacity-25" />

      <div className="shell relative flex min-h-[88svh] flex-col justify-end pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="ledger-rule ledger-rule--ink">
          <span className="label-mono text-cream/65">{copy.heroBadge}</span>
          <span className="label-mono text-cream/65">Skemalab · About</span>
        </div>

        <Reveal>
          <h1 className="display-xl mt-8 max-w-[19ch] text-cream">
            {copy.heroH1Part1}
            <span className="text-accent-bright">{copy.heroH1Highlight}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
            {copy.heroHeadline}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/65 sm:text-base">
            {copy.heroLead}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#histoire" size="lg" className="w-full sm:w-auto">
              {copy.heroCta1}
              <ArrowUpRight size={17} className="rtl-flip" />
            </Button>
            <Button
              href="#fondateurs"
              variant="outlineLight"
              size="lg"
              className="w-full sm:w-auto"
            >
              {copy.heroCta2}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-cream/15 pt-7 sm:grid-cols-4">
            {STRIP.map((item) => (
              <div key={item.key}>
                <dt className="sr-only">{copy[item.key]}</dt>
                <dd className="font-display text-3xl leading-none tracking-tight text-cream sm:text-4xl">
                  {item.value}
                </dd>
                <p className="mt-2 text-xs leading-snug text-cream/65">{copy[item.key]}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
