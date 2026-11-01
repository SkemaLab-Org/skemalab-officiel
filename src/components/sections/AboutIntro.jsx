"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import aboutImage from "@/assets/home-imgs/home-about.webp";

export default function AboutIntro() {
  const { t, isRTL } = useI18n();
  const copy = t.aboutIntro;

  return (
    <section id="skemalab" className="relative overflow-hidden bg-surface text-fg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-brand/8 blur-[150px]"
      />
      <div className="shell relative z-10 py-16 sm:py-24 lg:py-32">
        <div
          className="grid items-center gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:grid-cols-[1.2fr_0.8fr] xl:gap-16"
          dir="ltr"
        >
          <Reveal className="relative min-w-0">
            <figure className="group relative m-0 px-2 py-5 sm:px-4 sm:py-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-5 -rotate-[2.8deg] border border-[#c5a880]/70 bg-[#c5a880]/[0.04] shadow-[0_24px_70px_rgba(0,0,0,0.2)] transition-transform duration-700 ease-out group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:-rotate-[1.2deg] sm:inset-8"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 rotate-[1.8deg] border border-cream/35 bg-cream/[0.025] transition-transform duration-700 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-[0.6deg] sm:inset-6"
              />
              <div className="relative -rotate-[0.5deg] border border-cream/25 bg-[#07110e] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.32)] transition-transform duration-700 ease-out group-hover:-translate-y-0.5 group-hover:rotate-0 sm:p-3">
                <Image
                  src={ aboutImage }
                  alt={ copy.imageAlt }
                  width={ 2304 }
                  height={ 1536 }
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="block h-auto w-full"
                />
                <figcaption className="flex items-center justify-between gap-4 border-t border-cream/15 px-2 pb-1 pt-3 sm:px-3 sm:pt-4">
                  <span className="label-mono text-cream/75">{ copy.imageCaption }</span>
                  <span className="flex items-center gap-2 label-mono text-cream/55">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rotate-45 bg-[#c5a880]"
                    />
                    SKEMALAB
                  </span>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          <div className="flex min-w-0 flex-col justify-center" dir={ isRTL ? "rtl" : "ltr" }>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-accent" aria-hidden="true" />
                <p className="label-mono text-accent">{ copy.eyebrow }</p>
              </div>
              <h2 className="mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.15rem,3.4vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.035em] rtl:max-w-none rtl:leading-[1.2] rtl:tracking-normal">
                { copy.title } <span className="text-accent">{ copy.highlight }</span>
              </h2>
            </Reveal>

            <Reveal delay={ 0.1 }>
              <p className="mt-6 max-w-[38rem] text-base leading-[1.8] text-muted sm:text-lg">
                { copy.description }
              </p>
            </Reveal>

            <Reveal delay={ 0.16 }>
              <p className="mt-5 max-w-[38rem] border-s border-line-strong ps-5 text-sm leading-[1.8] text-muted sm:mt-6 sm:text-base">
                { copy.secondary }
              </p>
            </Reveal>

            <Reveal delay={ 0.22 }>
              <div className="mt-8 flex items-center gap-4 sm:mt-10">
                <div className="group relative inline-flex">
                  <Button
                    disabled
                    variant="secondary"
                    size="md"
                    className="disabled:pointer-events-auto disabled:opacity-100"
                  >
                    { copy.cta }
                    <ArrowUpRight size={ 16 } className="rtl-flip" aria-hidden="true" />
                  </Button>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 translate-y-1 rounded-sm border border-accent/30 bg-surface-2 px-3 py-1.5 label-mono whitespace-nowrap text-accent opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    { copy.comingSoon }
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
