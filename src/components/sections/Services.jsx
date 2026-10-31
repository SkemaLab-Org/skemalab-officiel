"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import SectionHeader from "@/components/ui/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import Spotlight from "@/components/ui/Spotlight";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { DURATION, EASE } from "@/lib/motion";

export default function Services() {
  const { t } = useI18n();
  const services = t.servicesList;
  const copy = t.servicesSection;

  return (
    <section id="services" className="section-y relative overflow-hidden bg-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-accent/6 blur-[140px]"
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeader
            label={copy.eyebrow}
            index="02"
            title={
              <>
                {copy.titlePart1}
                <span className="text-accent">{copy.titleHighlight}</span>
              </>
            }
            description={copy.description}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <Tabs
            defaultValue={services[0].id}
            orientation="vertical"
            className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12"
          >
            <TabsList aria-label={copy.eyebrow} className="lg:border-t">
              {services.map((service, index) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="group gap-5 py-5 lg:py-7"
                >
                  <span className="label-mono text-muted transition-colors group-data-[state=active]:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="label-mono block text-muted">
                      {service.subtitle}
                    </span>
                    <span className="mt-1.5 block font-display text-xl leading-tight tracking-tight text-fg sm:text-2xl">
                      {service.title}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-muted transition-all duration-300 group-data-[state=active]:text-accent rtl-flip"
                  />
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: DURATION.base, ease: EASE.out }}
                >
                  <Spotlight className="relative flex min-h-[28rem] flex-col overflow-hidden rounded-lg border border-line bg-surface p-6 sm:p-9 lg:p-12">
                    <div className="flex items-center justify-between gap-4">
                      <span className="label-mono text-accent">{service.heroLabel}</span>
                      <span className="label-mono text-muted">
                        {service.id.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="display-md mt-8 max-w-[24ch]">{service.title}</h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-fg/85 sm:text-lg">
                      {service.heroHeadline}
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                      {service.description}
                    </p>

                    <div className="mt-auto pt-10">
                      <p className="label-mono text-muted">{copy.eyebrow}</p>
                      <ul className="mt-4 grid gap-x-8 gap-y-0 sm:grid-cols-2">
                        {service.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 border-t border-line py-3 text-sm leading-relaxed text-fg/85"
                          >
                            <Check
                              size={15}
                              strokeWidth={2}
                              aria-hidden="true"
                              className="mt-0.5 shrink-0 text-accent"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8">
                      <Button href="#contact" variant="secondary" size="sm">
                        {copy.talkWithExpert}
                        <ArrowUpRight size={15} className="rtl-flip" />
                      </Button>
                    </div>
                  </Spotlight>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
