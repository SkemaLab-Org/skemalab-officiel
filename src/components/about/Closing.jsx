"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import CalendlyButton from "@/components/CalendlyButton";
import Button from "@/components/ui/Button";

export default function Closing() {
  const { t } = useI18n();
  const copy = t.aboutPage;

  return (
    <section className="relative bg-page py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <Reveal>
          <div className="beam-frame relative isolate overflow-hidden rounded-lg bg-[#07110e] px-6 py-16 text-cream sm:px-12 sm:py-24">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="zellige absolute inset-0 opacity-30" />
              <div className="absolute -left-24 top-0 h-[24rem] w-[24rem] rounded-full bg-brand/20 blur-[130px]" />
              <div className="absolute -right-16 bottom-0 h-[20rem] w-[20rem] rounded-full bg-accent-bright/12 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-3xl text-center">
              <p className="label-mono text-accent-bright">{copy.closingEyebrow}</p>

              <h2 className="display-lg mx-auto mt-6 max-w-[26ch] text-cream">
                {copy.closingTitle}
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/65 sm:text-base">
                {copy.closingText}
              </p>

              <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Magnetic className="w-full justify-center sm:w-auto">
                  <CalendlyButton className="w-full sm:w-auto">
                    {copy.closingBtn1}
                  </CalendlyButton>
                </Magnetic>
                <Button
                  href="/#contact"
                  variant="outlineLight"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {copy.closingBtn2}
                  <ArrowUpRight size={17} className="rtl-flip" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
