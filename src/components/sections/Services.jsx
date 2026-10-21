"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/components/I18nProvider";
import { MoroccanZelligeLattice, MoroccanCornerOrnament } from "@/components/ui/MoroccanPattern";
import LuxuryPictogram from "@/components/ui/LuxuryPictogram";

export default function Services() {
  const { t, locale } = useI18n();
  const services = t.servicesList;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-page py-20 sm:py-28 lg:py-40"
    >
      {/* Moroccan Architectural Background Pattern */}
      <MoroccanZelligeLattice
        opacity={0.05}
        strokeColor="#089587"
        size={120}
        fadeMask={true}
      />
      <div className="pointer-events-none absolute -right-24 top-32 h-96 w-96 rounded-full bg-brand/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-24 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />

      {/* Static Bilingual Moroccan Watermark in Background (No parallax) */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-16 select-none overflow-hidden text-center opacity-[0.035] dark:opacity-[0.05]"
        aria-hidden="true"
      >
        <span className="font-sans text-[clamp(4rem,14vw,11rem)] font-black uppercase tracking-[0.25em] text-fg">
          {locale === "ar" ? "خدمات سكيما لاب" : "SKEMALAB · SERVICES"}
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={
              locale === "ar"
                ? "خبراتنا وهندستنا · تكنولوجيا ومبيعات"
                : t.servicesSection.eyebrow
            }
            title={
              <>
                {t.servicesSection.titlePart1}
                <span className="text-accent">{t.servicesSection.titleHighlight}</span>
              </>
            }
            description={t.servicesSection.description}
          />
        </Reveal>

        <div className="relative mt-12 sm:mt-16 md:mt-24 md:pl-2">
          {/* Vertical Architectural Guide Rail */}
          <div className="services-rail" aria-hidden />

          <div className="space-y-8 sm:space-y-10 md:space-y-14">
            {services.map((service, index) => {
              return (
                <Reveal key={service.id} delay={index * 0.08}>
                  <article className="group relative grid grid-cols-[2.4rem_minmax(0,1fr)] gap-3.5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 md:grid-cols-[3.6rem_minmax(0,1fr)] md:gap-8">
                    {/* Moroccan Step Octagram Medallion */}
                    <div className="relative z-10 flex flex-col items-center pt-6 sm:pt-8">
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-[3px] border border-line bg-surface text-xs font-semibold text-fg shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:border-brand group-hover:bg-brand group-hover:text-white sm:h-12 sm:w-12 sm:text-sm md:h-14 md:w-14">
                        <span className="font-mono">0{index + 1}</span>
                        {/* Micro Moroccan 8-star indicator */}
                        <span className="absolute -bottom-1 h-1 w-1 rotate-45 bg-brand opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </div>

                    {/* Luxury Service Card */}
                    <div className="relative min-w-0 overflow-hidden rounded-[4px] border border-line bg-surface/90 shadow-[0_4px_20px_rgba(11,15,14,0.03)] backdrop-blur-sm transition-all duration-500 group-hover:border-brand/40 group-hover:shadow-[0_12px_36px_rgba(8,149,135,0.12)] dark:bg-surface/75 dark:group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.35)]">
                      {/* Moroccan Architectural Corner Filigree */}
                      <MoroccanCornerOrnament
                        className="absolute right-2 top-2 opacity-30 transition-opacity duration-500 group-hover:opacity-80"
                        size={28}
                        color="#089587"
                      />

                      <div className="grid lg:grid-cols-[1.18fr_0.82fr]">
                        <div className="flex flex-col justify-between p-5 sm:p-7 md:p-9 lg:p-11">
                          <div>
                            {/* Pictogram & Subtitle Header */}
                            <div className="mb-4 flex flex-wrap items-center gap-3 sm:mb-6 sm:gap-4">
                              <LuxuryPictogram
                                type={service.id}
                                size="md"
                                glow={false}
                              />
                              <div>
                                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-[11px] sm:tracking-[0.26em]">
                                  {service.subtitle}
                                </span>
                                <span className="font-mono text-[11px] text-muted">
                                  {service.heroLabel}
                                </span>
                              </div>
                            </div>

                            <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl md:text-[1.95rem]">
                              {service.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.98rem]">
                              {service.description}
                            </p>

                            {/* Service Capabilities Grid */}
                            <ul className="mt-6 grid gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
                              {service.points.map((point) => (
                                <li
                                  key={point}
                                  className="flex items-start gap-2.5 rounded-[3px] border border-transparent bg-page/75 px-3 py-2.5 text-sm text-fg/90 transition-all duration-300 group-hover:border-line sm:px-3.5"
                                >
                                  {/* Moroccan diamond bullet */}
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 rounded-[0.5px] bg-brand" />
                                  <span className="min-w-0 font-medium">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-7 flex items-center justify-between border-t border-line/60 pt-5 sm:mt-9 sm:pt-6">
                            <a
                              href="#contact"
                              className="group/link inline-flex min-h-11 items-center gap-2.5 text-sm font-semibold text-brand transition-all duration-300 hover:text-accent"
                            >
                              <span>{t.servicesSection.talkWithExpert}</span>
                              <ArrowUpRight
                                size={16}
                                className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 rtl-flip"
                              />
                            </a>
                            <span className="text-[11px] font-medium uppercase tracking-wider text-muted/60">
                              SkemaLab Studio
                            </span>
                          </div>
                        </div>

                        {/* Image Showcase with Moroccan Brand Gradient */}
                        <div className="relative min-h-[220px] overflow-hidden border-t border-line bg-page sm:min-h-[260px] lg:min-h-full lg:border-l lg:border-t-0">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-fill"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                          />

                          {/* Moroccan Architectural Tag Overlay */}
                          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                            <span className="inline-flex items-center gap-2 rounded-[3px] border border-white/30 bg-[#0f2e2a]/80 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-md">
                              <span className="h-1.5 w-1.5 rotate-45 bg-brand" />
                              {service.heroLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Active Hover Accent Strip */}
                      <div className="h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-brand via-accent to-brand transition-transform duration-500 group-hover:scale-x-100" />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
