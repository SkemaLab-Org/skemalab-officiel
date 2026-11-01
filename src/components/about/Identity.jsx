"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { aboutContent, aboutPage, contactInfo } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import { DURATION, EASE, VIEWPORT } from "@/lib/motion";

export default function Identity() {
  const { t } = useI18n();
  const copy = t.aboutPage;
  const reduce = useReducedMotion();

  return (
    <section id="skemalab" className="section-y relative overflow-hidden bg-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-brand/8 blur-[150px]"
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeader
            label={copy.identityEyebrow}
            title={
              <>
                {copy.identityTitlePart1}
                <span className="text-accent">{copy.identityTitleHighlight}</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-16">
          <div className="min-w-0">
            <Reveal delay={0.06}>
              <div className="space-y-4">
                {aboutPage.story.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-muted sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <dl className="mt-8 border-t border-line">
                {[
                  [copy.hqLabel, contactInfo.locations.join(" · ")],
                  [copy.scopeLabel, copy.scopeValue],
                  [
                    copy.studioContact,
                    <a
                      key="email"
                      href={`mailto:${contactInfo.email}`}
                      className="link-underline text-fg hover:text-accent"
                    >
                      {contactInfo.email}
                    </a>,
                  ],
                ].map(([term, value]) => (
                  <div
                    key={term}
                    className="grid gap-1 border-b border-line py-4 sm:grid-cols-[0.4fr_1fr] sm:items-baseline sm:gap-6"
                  >
                    <dt className="label-mono text-muted">{term}</dt>
                    <dd className="text-sm leading-relaxed text-fg/85">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="min-w-0">
            <motion.div
              initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
              whileInView={reduce ? undefined : { clipPath: "inset(0 0 0% 0)" }}
              viewport={VIEWPORT}
              transition={{ duration: DURATION.slow, ease: EASE.out }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-deep"
            >
              <Parallax offset={24} className="h-full">
                <Image
                  src={aboutPage.labImage || aboutContent.image}
                  alt="Laboratoire digital Skemalab"
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="scale-[1.08] object-cover"
                />
              </Parallax>
            </motion.div>

            <div className="mt-6 rounded-lg border border-line bg-surface p-6 sm:p-8">
              <p className="label-mono text-accent">{copy.standardBadge}</p>
              <h3 className="mt-3 font-display text-xl leading-tight tracking-tight sm:text-2xl">
                {copy.standardTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {copy.standardText}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-24">
          <Reveal>
            <SectionHeader
              label={copy.methodEyebrow}
              title={copy.methodTitle}
              description={copy.methodSubtitle}
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:gap-6 lg:grid-cols-3">
            {copy.pillars.map((pillar, index) => (
              <Reveal key={pillar.num} delay={index * 0.06}>
                <article className="flex h-full flex-col justify-between rounded-lg border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong sm:p-8">
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="label-mono text-accent">
                        {pillar.num} — {pillar.name}
                      </span>
                    </div>
                    <h4 className="mt-5 font-display text-xl leading-tight tracking-tight sm:text-2xl">
                      {pillar.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {pillar.desc}
                    </p>
                  </div>

                  <ul className="mt-8 flex flex-wrap gap-2 border-t border-line pt-5">
                    {pillar.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-16 rounded-lg border border-line bg-surface p-6 sm:mt-24 sm:p-10 lg:p-14">
            <div className="max-w-2xl">
              <p className="label-mono text-accent">{copy.commitmentsEyebrow}</p>
              <h3 className="mt-4 display-md">{copy.commitmentsTitle}</h3>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {copy.principles.map((principle) => (
                <div key={principle.num} className="border-t border-line pt-5">
                  <span className="label-mono text-accent">{principle.num}</span>
                  <h4 className="mt-3 text-base font-semibold leading-snug">
                    {principle.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {principle.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/#contact"
                className="link-underline text-sm text-fg hover:text-accent"
              >
                {t.ctaBanner.ctaPrimary}
                <ArrowUpRight size={15} className="rtl-flip" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
