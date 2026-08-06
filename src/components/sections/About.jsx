"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { aboutContent } from "@/data/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function About() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-10%", "10%"]);

  return (
    <section id="agence" ref={ref} className="relative overflow-hidden bg-page py-16 sm:py-24 lg:py-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-35" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:gap-14 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative mx-auto w-full max-w-md px-1 sm:max-w-none sm:px-3 lg:mx-0">
            <div className="absolute inset-0 rounded-[3px] border border-brand/25 sm:-inset-3" />
            <div className="absolute -bottom-3 -right-3 hidden h-20 w-20 rounded-[3px] bg-accent/90 sm:block sm:h-28 sm:w-28 md:-bottom-4 md:-right-4" />
            <div className="absolute -left-3 -top-3 hidden h-14 w-14 rounded-[3px] bg-deep/90 sm:block sm:h-20 sm:w-20 md:-left-4 md:-top-4" />

            <div className="relative overflow-hidden rounded-[3px]">
              <div className="relative aspect-[5/6] overflow-hidden sm:aspect-[4/5]">
                <motion.div className="absolute inset-[-14%]" style={{ y }}>
                  <Image
                    src={aboutContent.image}
                    alt="Équipe Skemalab en collaboration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-page/80 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-3 left-3 right-3 rounded-[3px] border border-line bg-surface/90 p-3.5 backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-5 sm:p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent sm:text-[11px] sm:tracking-[0.24em]">
                  Notre promesse
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-fg/90 sm:mt-2 sm:text-sm">
                  Pas de projets décoratifs. Des systèmes digitaux qui créent
                  de la valeur mesurable.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="min-w-0">
          <Reveal>
            <SectionHeading
              eyebrow="L’agence"
              title="Votre partenaire de croissance digitale."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 text-sm leading-relaxed text-muted sm:mt-6 sm:text-base md:text-lg">
              Skemalab accompagne les entreprises ambitieuses dans leur
              transformation digitale. Nous allions stratégie business,
              excellence technique et automatisation intelligente pour bâtir
              des leviers de performance durables.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
              Que vous lanciez un produit, accélériez votre acquisition ou
              industrialisiez vos process internes, nous concevons une solution
              claire, exécutable et orientée résultats.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-7 grid gap-2.5 sm:mt-9 sm:grid-cols-2 sm:gap-3">
              {aboutContent.pillars.map(([title, text]) => (
                <div
                  key={title}
                  className="group rounded-[3px] border border-line bg-surface p-4 transition-all duration-300 hover:border-brand/40 sm:p-5"
                >
                  <div className="mb-2.5 h-[2px] w-8 rounded-[3px] bg-brand transition-all duration-300 group-hover:w-12 sm:mb-3" />
                  <p className="text-sm font-medium text-fg">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-7 sm:mt-9">
              <Button href="#contact" variant="accent" className="w-full sm:w-auto">
                Parler à un expert
                <ArrowUpRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
