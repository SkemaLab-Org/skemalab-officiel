"use client";

import { useI18n } from "@/components/I18nProvider";
import BandHeader from "@/components/ui/BandHeader";
import Reveal from "@/components/motion/Reveal";

export default function FAQ() {
  const { t } = useI18n();
  const copy = t.faqSection;

  return (
    <section id="faq" className="section-y bg-page">
      <div className="shell">
        <Reveal>
          <BandHeader
            index="06"
            label={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
        </Reveal>

        <Reveal delay={0.06} className="mt-12 sm:mt-16">
          <div className="border-t border-line">
            {copy.items.map((item) => (
              <details
                key={item.question}
                className="faq-item group border-b border-line"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 py-[22px] text-[15px] leading-snug text-fg transition-colors hover:text-accent sm:text-base">
                  <span>{item.question}</span>
                  <span aria-hidden="true" className="faq-plus" />
                </summary>
                <p className="max-w-[60ch] pb-[22px] text-sm leading-[1.7] text-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
