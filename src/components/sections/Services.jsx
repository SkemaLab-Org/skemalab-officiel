"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import BandHeader from "@/components/ui/BandHeader";
import TileCanvas from "@/components/canvas/TileCanvas";
import Reveal from "@/components/motion/Reveal";

export default function Services() {
  const { t } = useI18n();
  const services = t.servicesList;
  const copy = t.servicesSection;

  return (
    <section id="services" className="section-y bg-page">
      <div className="shell">
        <Reveal>
          <BandHeader
            index="01"
            label={copy.eyebrow}
            title={
              <>
                {copy.titlePart1}
                {copy.titleHighlight}
              </>
            }
            description={copy.description}
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 gap-px border-y border-line bg-line min-[900px]:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="flex flex-col bg-page px-6 py-7 sm:px-8 sm:py-9"
              >
                <div className="flex items-start justify-between gap-6">
                  <TileCanvas
                    variant={service.id}
                    className="max-w-[190px] flex-1"
                  />
                  <span className="label-mono shrink-0 text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-7 min-h-[2.6em] text-[17px] font-medium leading-snug text-fg">
                  {service.title}
                </h3>

                <p className="mt-3 line-clamp-3 min-h-[4.4rem] text-sm leading-[1.62] text-muted">
                  {service.description}
                </p>

                <p className="label-mono mt-5 mb-6 leading-[1.7] text-muted">
                  {service.points.slice(0, 3).join(" · ")}
                </p>

                <a
                  href="#contact"
                  className="mt-auto inline-flex items-center gap-2 border-t border-line pt-4 text-[13px] text-fg transition-colors hover:text-accent"
                >
                  {copy.tileCta}
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="rtl-flip"
                  />
                </a>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
