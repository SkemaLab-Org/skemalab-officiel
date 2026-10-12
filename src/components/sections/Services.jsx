"use client";

import Image from "next/image";
import { Code2, Megaphone, Workflow, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/components/I18nProvider";

const icons = {
  dev: Code2,
  marketing: Megaphone,
  automation: Workflow,
};

export default function Services() {
  const { t } = useI18n();
  const services = t.servicesList;

  return (
    <section id="services" className="relative overflow-hidden bg-page py-16 sm:py-24 lg:py-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -right-24 top-32 h-80 w-80 rounded-full bg-brand/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={t.servicesSection.eyebrow}
            title={
              <>
                {t.servicesSection.titlePart1}
                <span className="text-accent">{t.servicesSection.titleHighlight}</span>
              </>
            }
            description={t.servicesSection.description}
          />
        </Reveal>

        <div className="relative mt-12 sm:mt-16 md:mt-20 md:pl-2">
          <div className="services-rail" aria-hidden />

          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            {services.map((service, index) => {
              const Icon = icons[service.id] || Code2;

              return (
                <Reveal key={service.id} delay={index * 0.08}>
                  <article className="group relative grid grid-cols-[2.3rem_minmax(0,1fr)] gap-3 sm:grid-cols-[2.8rem_minmax(0,1fr)] sm:gap-4 md:grid-cols-[3.3rem_minmax(0,1fr)] md:gap-8">
                    <div className="relative z-10 flex flex-col items-center pt-6 sm:pt-8">
                      <span className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-line bg-surface text-xs font-semibold text-fg transition-all duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-white sm:h-11 sm:w-11 sm:text-sm md:h-12 md:w-12">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="min-w-0 overflow-hidden rounded-[3px] border border-line bg-surface transition-all duration-500 group-hover:border-brand/40 group-hover:shadow-[0_8px_24px_rgba(11,14,20,0.04)] dark:group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                        <div className="flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10">
                          <div>
                            <div className="mb-4 flex flex-wrap items-center gap-2.5 sm:mb-5 sm:gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-line bg-page text-brand transition-all duration-500 group-hover:border-brand/40 group-hover:bg-brand/10 sm:h-11 sm:w-11">
                                <Icon size={18} strokeWidth={1.7} />
                              </span>
                              <span className="text-[10px] uppercase tracking-[0.18em] text-muted sm:text-[11px] sm:tracking-[0.24em]">
                                {service.subtitle}
                              </span>
                            </div>

                            <h3 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl md:text-[1.85rem]">
                              {service.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                              {service.description}
                            </p>

                            <ul className="mt-5 grid gap-2 sm:mt-7 sm:grid-cols-2 sm:gap-2.5">
                              {service.points.map((point) => (
                                <li
                                  key={point}
                                  className="flex items-start gap-2.5 rounded-[3px] border border-transparent bg-page/70 px-2.5 py-2 text-sm text-fg/85 transition-colors group-hover:border-line sm:px-3 sm:py-2.5"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[3px] bg-accent" />
                                  <span className="min-w-0">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <a
                            href="#contact"
                            className="mt-6 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-medium text-brand transition-all duration-300 group-hover:gap-3 sm:mt-8"
                          >
                            {t.servicesSection.talkWithExpert}
                            <ArrowUpRight size={16} className="rtl-flip" />
                          </a>
                        </div>

                        <div className="relative min-h-[180px] border-t border-line sm:min-h-[220px] lg:min-h-full lg:border-l lg:border-t-0">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-surface/50 via-transparent to-transparent lg:bg-gradient-to-l lg:from-surface/30" />
                          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                            <span className="inline-block rounded-[3px] border border-white/25 bg-ink/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-mist backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[11px]">
                              {service.heroLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="h-[3px] w-full origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
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
