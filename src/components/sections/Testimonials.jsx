"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import useCarousel from "@/hooks/useCarousel";
import { MoroccanZelligeLattice, MoroccanCornerOrnament } from "@/components/ui/MoroccanPattern";

export default function Testimonials() {
  const { t, locale } = useI18n();
  const testimonialsList = t.testimonialsSection.list;
  const { index, setIndex, reduceMotion } = useCarousel(testimonialsList.length, {
    intervalMs: 5600,
  });

  const item = testimonialsList[index];

  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-28 lg:py-36">
      {/* Moroccan Subtle Lattice */}
      <MoroccanZelligeLattice
        opacity={0.04}
        strokeColor="#089587"
        size={90}
        fadeMask={true}
      />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-brand/8 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={
              locale === "ar"
                ? "شهادات الشركاء والعملاء"
                : t.testimonialsSection.eyebrow
            }
            title={t.testimonialsSection.title}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-10 overflow-hidden rounded-[4px] border border-line bg-page px-6 py-10 shadow-[0_8px_30px_rgba(11,14,20,0.03)] sm:mt-14 sm:px-14 sm:py-16 dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
            {/* Moroccan Architectural Corner Ornaments */}
            <MoroccanCornerOrnament
              className="absolute left-2 top-2 opacity-25"
              size={24}
              color="#089587"
            />
            <MoroccanCornerOrnament
              className="absolute right-2 top-2 rotate-90 opacity-25"
              size={24}
              color="#089587"
            />

            <div className="absolute left-0 top-0 h-full w-[3px] bg-brand" />
            <Quote className="mx-auto mb-5 text-brand/30 sm:mb-8" size={38} strokeWidth={1.3} />

            <div className="relative" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={item.name}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -18 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-base font-medium leading-[1.7] text-fg/85 sm:text-[1.22rem] md:text-[1.45rem]">
                    “{item.quote}”
                  </p>
                  <footer className="mt-7 sm:mt-10">
                    <div className="mx-auto mb-3 flex items-center justify-center gap-2">
                      <span className="h-1 w-1 rotate-45 bg-brand" />
                      <div className="h-[2px] w-10 rounded-[1px] bg-brand sm:w-12" />
                      <span className="h-1 w-1 rotate-45 bg-brand" />
                    </div>
                    <p className="text-sm font-bold tracking-tight text-fg sm:text-base">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-muted sm:mt-1.5 sm:text-sm">{item.role}</p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 flex items-center justify-center gap-1.5 sm:mt-8">
          {testimonialsList.map((entry, i) => (
            <button
              key={entry.name}
              type="button"
              aria-label={`${t.testimonialsSection.eyebrow} : ${entry.name}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className="flex h-11 w-11 touch-manipulation items-center justify-center"
            >
              <span
                className={`rounded-[2px] transition-all duration-300 ${
                  i === index ? "h-2 w-8 bg-brand" : "h-2 w-2 bg-line hover:bg-muted/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
