"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import BrandMark from "@/components/BrandMark";
import { MoroccanZelligeLattice } from "@/components/ui/MoroccanPattern";
import aboutImage from "@/assets/home-imgs/home-about.webp";

export default function AboutIntro() {
  const { t } = useI18n();
  const copy = t.aboutIntro;

  return (
    <section id="skemalab" className="relative isolate overflow-hidden border-b border-line bg-surface py-16 sm:py-24 lg:py-32">
      <MoroccanZelligeLattice opacity={ 0.055 } strokeColor="#089587" size={ 92 } />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-brand/10 blur-[100px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-20">
        <div className="relative order-2 mx-auto w-full max-w-xl lg:order-1">
          <div className="absolute -inset-3 rotate-[-2deg] border border-brand/30 sm:-inset-5" />
          <div className="relative overflow-hidden rounded-sm bg-deep shadow-2xl">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-deep/75 via-transparent to-deep/10" />
            <Image src={ aboutImage } alt={ copy.imageAlt } width={ 1200 } height={ 900 } className="aspect-[5/4] w-full object-cover" sizes="(max-width: 1024px) 100vw, 48vw" />
            <div className="absolute bottom-5 left-5 z-20 flex items-center gap-3 rounded-sm border border-white/20 bg-deep/75 px-4 py-3 text-white backdrop-blur-md sm:bottom-7 sm:left-7">
              <span className="grid h-9 w-9 place-items-center border border-brand/60 text-brand" aria-hidden="true">✳</span>
              <span className="text-xs font-medium uppercase tracking-[0.18em]">{ copy.imageCaption }</span>
            </div>
            <span aria-hidden="true" className="absolute right-5 top-5 z-20 h-12 w-12 rotate-45 border border-white/35" />
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="mb-7 flex items-center gap-4">
            <BrandMark as="span" className="h-9 w-auto" />
            <span className="h-px flex-1 bg-line" />
            <span className="h-2 w-2 rotate-45 bg-brand" aria-hidden="true" />
          </div>
          <p className="eyebrow text-brand">{ copy.eyebrow }</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-[1.12] tracking-tight text-fg sm:text-4xl lg:text-5xl">
            { copy.title } <span className="text-brand">{ copy.highlight }</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">{ copy.description }</p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">{ copy.secondary }</p>

          {/* <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3 border-t border-line pt-6 text-sm text-muted">
            <span>{ copy.foundedBy }</span>
            <span className="group/founder relative inline-flex">
              <button type="button" aria-describedby="founder-card" className="font-semibold text-fg underline decoration-brand/50 decoration-2 underline-offset-4 outline-none transition-colors hover:text-brand focus-visible:text-brand">
                Feissal Tarkaoui
              </button>
              <span id="founder-card" role="tooltip" className="pointer-events-none invisible absolute bottom-full left-1/2 z-30 mb-4 flex w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2 translate-y-2 items-center gap-3 rounded-sm border border-brand/25 bg-surface p-3 text-left opacity-0 shadow-2xl transition-all duration-200 group-hover/founder:visible group-hover/founder:translate-y-0 group-hover/founder:opacity-100 group-focus-within/founder:visible group-focus-within/founder:translate-y-0 group-focus-within/founder:opacity-100">
                <Image src="/team/feissal_tarkaoui.jpg" alt="" width={ 64 } height={ 64 } className="h-14 w-14 shrink-0 rounded-sm object-cover" />
                <span className="min-w-0"><span className="block text-sm font-semibold text-fg">Feissal Tarkaoui</span><span className="mt-1 block text-xs leading-5 text-muted">{ copy.founderStatus }</span></span>
              </span>
            </span>
            <span>{ copy.roleSuffix }</span>
          </div> */}

          {/* <a href="#" className="mt-8 inline-flex items-center gap-2 rounded-sm bg-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            { copy.cta }<ArrowUpRight size={ 16 } className="rtl-flip" />
          </a> */}
          <div className="group relative mt-8 inline-flex">
            <p
              className="inline-flex items-center gap-2 rounded-sm bg-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              { copy.cta }
              <ArrowUpRight size={ 16 } className="rtl-flip" />
            </p>

            <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-md border border-green-300 bg-green-100 px-5 py-3 text-sm font-semibold text-green-800 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
              À venir !
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
