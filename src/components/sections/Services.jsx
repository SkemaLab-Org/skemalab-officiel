"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useI18n } from "@/components/I18nProvider";
import LuxuryPictogram from "@/components/ui/LuxuryPictogram";

const AUTO_PLAY_DURATION = 5000;
const COMPACT_SERVICE_LABELS = {
  dev: "Build",
  marketing: "Grow",
  automation: "Automate",
};

export default function Services() {
  const { t, locale, isRTL } = useI18n();
  const services = t.servicesList;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVerticalTabLayout, setIsVerticalTabLayout] = useState(false);
  const tabRefs = useRef([]);
  const activeService = services[activeIndex] || services[0];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % services.length);
    }, AUTO_PLAY_DURATION);

    return () => window.clearInterval(interval);
  }, [services.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateOrientation = () => setIsVerticalTabLayout(mediaQuery.matches);

    updateOrientation();
    mediaQuery.addEventListener("change", updateOrientation);

    return () => mediaQuery.removeEventListener("change", updateOrientation);
  }, []);

  const selectTab = (index, focus = false) => {
    setActiveIndex(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event, index) => {
    let nextIndex;

    const nextKey = isVerticalTabLayout ? "ArrowDown" : "ArrowRight";
    const previousKey = isVerticalTabLayout ? "ArrowUp" : "ArrowLeft";

    if (event.key === nextKey) {
      nextIndex = (index + 1) % services.length;
    } else if (event.key === previousKey) {
      nextIndex = (index - 1 + services.length) % services.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = services.length - 1;
    }

    if (nextIndex !== undefined) {
      event.preventDefault();
      selectTab(nextIndex, true);
    }
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-page py-16 sm:py-24 lg:py-36"
    >
      <div className="pointer-events-none absolute -right-24 top-32 h-96 w-96 rounded-full bg-brand/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-24 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />

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

        <div className="mt-9 grid min-w-0 gap-5 sm:mt-14 sm:gap-6 lg:mt-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-10 xl:gap-14">
          <Reveal>
            <div
              role="tablist"
              aria-label={t.servicesSection.eyebrow}
              aria-orientation={isVerticalTabLayout ? "vertical" : "horizontal"}
              className="grid min-w-0 grid-cols-3 gap-2 sm:flex sm:snap-x sm:snap-mandatory sm:touch-pan-x sm:gap-3 sm:overflow-x-auto sm:overscroll-x-contain sm:pb-3 lg:flex-col lg:justify-center lg:gap-0 lg:overflow-visible lg:overscroll-auto lg:pb-0"
            >
              {services.map((service, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={service.id}
                    ref={(element) => {
                      tabRefs.current[index] = element;
                    }}
                    id={`service-tab-${service.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="service-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectTab(index)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={`group relative flex min-h-16 min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-[4px] border px-1.5 py-2 text-center transition-all duration-300 sm:min-h-0 sm:min-w-[270px] sm:snap-start sm:flex-row sm:items-start sm:justify-start sm:gap-3.5 sm:px-5 sm:py-5 sm:text-start lg:w-full lg:min-w-0 lg:flex-none lg:rounded-none lg:border-x-0 lg:border-b-0 lg:border-t lg:px-6 lg:py-6 lg:first:border-t-0 ${
                      isActive
                        ? "border-brand/35 bg-brand/[0.07] shadow-[0_8px_28px_rgba(8,149,135,0.12)] ring-1 ring-brand/10"
                        : "border-line/70 bg-surface/50 hover:border-brand/25 hover:bg-surface lg:bg-transparent"
                    }`}
                  >
                    {isActive && (
                      <>
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-0 start-0 w-[3px] bg-brand/15"
                        />
                        <motion.span
                          key={`service-progress-${activeIndex}`}
                          aria-hidden="true"
                          className="absolute inset-y-0 start-0 w-[3px] origin-top bg-brand"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{
                            duration: AUTO_PLAY_DURATION / 1000,
                            ease: "linear",
                          }}
                        />
                      </>
                    )}

                    <span className={`shrink-0 rounded-[3px] px-1.5 py-1 font-mono text-[10px] font-medium tracking-[0.08em] transition-colors sm:mt-0.5 sm:text-xs sm:tracking-[0.12em] ${isActive ? "bg-brand/12 text-brand" : "text-muted"}`}>
                      <span className="sm:hidden">{index + 1} {COMPACT_SERVICE_LABELS[service.id] || service.title}</span>
                      <span className="hidden sm:inline">{service.heroLabel}</span>
                    </span>
                    <span className="hidden min-w-0 flex-1 sm:block">
                      <span
                        className={`block text-[11px] font-medium leading-snug transition-colors sm:text-xs ${
                          isActive ? "text-accent" : "text-muted"
                        }`}
                      >
                        {service.subtitle}
                      </span>
                      <span
                        className={`mt-1.5 block text-sm font-semibold leading-snug transition-colors sm:text-base ${
                          isActive ? "text-fg" : "text-fg/75 group-hover:text-fg"
                        }`}
                      >
                        {service.title}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              id="service-panel"
              role="tabpanel"
              aria-labelledby={`service-tab-${activeService.id}`}
              tabIndex={0}
              className="relative isolate min-h-[390px] min-w-0 w-full overflow-hidden rounded-[4px] border border-line bg-surface p-4 shadow-[0_12px_40px_rgba(11,15,14,0.045)] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-brand/50 sm:min-h-[410px] sm:p-7 md:p-9 lg:min-h-[450px] lg:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -end-24 -top-28 -z-10 h-80 w-80 rounded-full bg-brand/10 blur-[95px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -start-16 -z-10 h-64 w-64 rounded-full bg-accent/10 blur-[90px]"
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="flex h-full min-h-[350px] min-w-0 flex-col sm:min-h-[360px]"
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <div className="flex items-center gap-4">
                    <LuxuryPictogram type={activeService.id} size="md" glow={false} />
                    <div className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-[11px] sm:tracking-[0.24em]">
                        {activeService.subtitle}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] text-muted">
                        {activeService.heroLabel}
                      </span>
                    </div>
                  </div>

                  <div className="mt-7 min-w-0 sm:mt-9">
                    <h3 className="break-words text-2xl font-semibold tracking-tight text-fg sm:text-3xl md:text-4xl">
                      {activeService.title}
                    </h3>
                    <p className="mt-3 max-w-2xl break-words text-base font-medium leading-relaxed text-brand sm:mt-4 sm:text-lg">
                      {activeService.heroHeadline}
                    </p>
                    <p className="mt-3 max-w-2xl break-words text-sm leading-relaxed text-muted sm:text-base">
                      {activeService.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-7 sm:pt-9">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-[11px]">
                      {locale === "ar" ? "ما نقدمه" : locale === "en" ? "What we deliver" : "Nos expertises"}
                    </p>
                    <ul className="grid min-w-0 gap-2 sm:grid-cols-2 sm:gap-2.5">
                      {activeService.points.map((point) => (
                        <li
                          key={point}
                          className="flex min-h-11 min-w-0 items-start gap-2.5 rounded-[3px] border border-line/70 bg-page/70 px-3 py-2.5 text-sm leading-relaxed text-fg/90 [overflow-wrap:anywhere]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-brand"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
