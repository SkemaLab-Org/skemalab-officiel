import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { contactInfo, ctaContent } from "@/data/content";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-36">
      <Image
        src={ctaContent.image}
        alt="Skyline urbain — croissance et ambition"
        fill
        quality={70}
        className="object-cover object-center"
        sizes="(max-width: 1280px) 100vw, 1400px"
      />
      <div className="absolute inset-0 bg-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/20 to-ink/25" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow mx-auto justify-center text-accent">
            Prêt à accélérer
          </p>
          <h2 className="mt-4 text-[clamp(1.55rem,5.5vw,3.4rem)] font-semibold leading-[1.1] tracking-tight text-balance text-white sm:mt-6">
            Transformons votre ambition digitale en avantage concurrentiel.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-base md:text-lg">
            Un échange de 30 minutes pour clarifier vos enjeux, identifier les
            leviers rapides et construire une feuille de route concrète.
          </p>
          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-11 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button href="#contact" variant="primary" className="w-full sm:w-auto">
              Demander un devis
              <ArrowUpRight size={16} />
            </Button>
            <Button
              href={`mailto:${contactInfo.email}`}
              variant="ghost"
              className="w-full border-white/30 bg-white/10 text-white hover:border-brand hover:bg-brand/25 hover:text-white sm:w-auto"
            >
              Écrire à l’équipe
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
