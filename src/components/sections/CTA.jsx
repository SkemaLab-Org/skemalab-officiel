"use client";

import { ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/data/content";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";

export default function CTA() {
  const { t } = useI18n();
  const banner = t.ctaBanner;

  return (
    <section className="border-y border-line bg-page py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="label-mono text-muted">{banner.eyebrow}</p>

            <h2 className="landing-display mx-auto mt-6 max-w-[16ch] text-[clamp(2.4rem,7vw,5.4rem)] text-fg">
              {banner.headline}
            </h2>

            <p className="mx-auto mt-6 max-w-[46ch] text-[15px] leading-[1.7] text-muted">
              {banner.description}
            </p>

            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button
                href="#contact"
                size="lg"
                className="w-full rounded-none sm:w-auto"
              >
                {banner.ctaPrimary}
                <ArrowUpRight size={17} className="rtl-flip" />
              </Button>
              <Button
                href={`mailto:${contactInfo.email}`}
                variant="outline"
                size="lg"
                className="w-full rounded-none sm:w-auto"
              >
                {banner.ctaSecondary}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
