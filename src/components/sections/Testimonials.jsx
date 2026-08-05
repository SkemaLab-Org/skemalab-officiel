"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import useCarousel from "@/hooks/useCarousel";

export default function Testimonials() {
  const { index, setIndex, reduceMotion } = useCarousel(testimonials.length, {
    intervalMs: 5600,
  });

  const item = testimonials[index];

  return (
    <section className="relative overflow-hidden bg-surface py-16 sm:py-24 lg:py-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-35" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-brand/8 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-8">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Témoignages"
            title="La confiance se construit sur les résultats."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-10 overflow-hidden rounded-[3px] border border-line bg-page px-5 py-8 shadow-[0_6px_20px_rgba(11,14,20,0.03)] sm:mt-14 sm:px-12 sm:py-16 dark:shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
            <div className="absolute left-0 top-0 h-full w-[3px] bg-brand" />
            <Quote className="mx-auto mb-5 text-brand/25 sm:mb-8" size={36} strokeWidth={1.4} />

            <div className="relative" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={item.name}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -20 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-base leading-[1.65] text-fg/80 sm:text-[1.2rem] md:text-[1.45rem]">
                    “{item.quote}”
                  </p>
                  <footer className="mt-7 sm:mt-10">
                    <div className="mx-auto mb-3 h-[2px] w-10 rounded-[3px] bg-brand sm:mb-4" />
                    <p className="text-sm font-semibold tracking-tight text-fg sm:text-base">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-muted sm:mt-1.5">{item.role}</p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 flex items-center justify-center gap-1 sm:mt-8">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Témoignage de ${t.name}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
              className="flex h-11 w-11 touch-manipulation items-center justify-center"
            >
              <span
                className={`rounded-[3px] transition-all duration-300 ${
                  i === index ? "h-2.5 w-8 bg-brand" : "h-2.5 w-2.5 bg-line hover:bg-muted/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
