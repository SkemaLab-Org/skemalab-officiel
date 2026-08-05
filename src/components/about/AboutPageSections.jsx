import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { aboutContent, aboutPage, contactInfo, stats } from "@/data/content";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export function AboutHero() {
  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden">
      <Image
        src={aboutPage.heroImage}
        alt="Espace de travail Skemalab"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-ink/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/80">
          À propos
        </p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2rem,6.5vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-white">
          Skema<span className="text-brand">lab</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg md:text-xl">
          {aboutPage.headline}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
          {aboutPage.lead}
        </p>
        <div className="mt-8 sm:mt-10">
          <Button href="/#contact" variant="primary" className="w-full sm:w-auto">
            Discuter d’un projet
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

export function AboutStory() {
  const { story } = aboutPage;

  return (
    <section className="relative overflow-hidden bg-page py-16 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:gap-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <Reveal>
          <p className="eyebrow text-brand">{story.eyebrow}</p>
          <h2 className="mt-4 max-w-xl text-[clamp(1.6rem,4.5vw,2.85rem)] font-semibold leading-[1.12] tracking-tight text-fg">
            {story.title}
          </h2>
          <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
            {story.paragraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="max-w-xl text-sm leading-relaxed text-muted sm:text-base md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-sm text-muted sm:mt-10">
            <p>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-muted/80">
                Base
              </span>
              <span className="mt-1 block text-fg">{contactInfo.locations[0]}</span>
            </p>
            <p>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-muted/80">
                Couverture
              </span>
              <span className="mt-1 block text-fg">{contactInfo.locations[1]}</span>
            </p>
            <p>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-muted/80">
                Contact
              </span>
              <a
                href={`mailto:${contactInfo.email}`}
                className="mt-1 block text-fg transition-colors hover:text-brand"
              >
                {contactInfo.email}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="absolute -inset-3 hidden rounded-[3px] border border-brand/20 sm:block" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] sm:aspect-[5/6]">
              <Image
                src={aboutContent.image}
                alt="Équipe Skemalab en collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-page/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-2 hidden h-16 w-16 rounded-[3px] bg-brand sm:block md:-left-4" />
            <div className="absolute -right-2 -top-4 hidden h-12 w-12 rounded-[3px] bg-accent sm:block md:-right-4" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutPrinciples() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface py-16 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand/8 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <p className="eyebrow text-brand">Principes</p>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.55rem,4.2vw,2.75rem)] font-semibold leading-[1.12] tracking-tight text-fg">
            La façon dont nous travaillons définit la valeur que nous livrons.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 border-t border-line pt-10 sm:mt-16 sm:gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
          {aboutPage.principles.map((item, i) => (
            <Reveal key={item.num} delay={i * 0.06}>
              <article
                className={`py-2 md:py-8 ${
                  i < 2 ? "md:border-b md:border-line" : ""
                }`}
              >
                <p className="font-mono text-xs tracking-wider text-brand">{item.num}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                  {item.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutExpertise() {
  return (
    <section className="relative overflow-hidden bg-page py-16 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <Reveal>
          <p className="eyebrow text-brand">Expertise</p>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.55rem,4.2vw,2.75rem)] font-semibold leading-[1.12] tracking-tight text-fg">
            Trois leviers. Un seul système de croissance.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Build, Grow, Automate — conçus pour se renforcer mutuellement, pas
            pour s’empiler en silos.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-3 lg:gap-12">
          {aboutPage.expertise.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <div className="relative border-t border-brand pt-6">
                <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
                  {item.label}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutNumbers() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface">
      <div className="relative mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.05} className="h-full">
            <div
              className={`h-full border-b border-line px-5 py-8 last:border-b-0 sm:px-8 sm:py-12 lg:border-b-0 ${
                index % 2 === 0 ? "sm:border-r" : ""
              } ${index < stats.length - 1 ? "lg:border-r lg:border-line" : ""}`}
            >
              <p className="text-[clamp(2rem,6vw,3.25rem)] font-semibold leading-none tracking-tight text-fg">
                {stat.value}
                <span className="text-accent">{stat.suffix}</span>
              </p>
              <p className="mt-3 text-sm text-muted">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function AboutClosing() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      <Image
        src={aboutPage.workspaceImage}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/35 to-ink/40" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
            Prochaine étape
          </p>
          <h2 className="mt-5 text-[clamp(1.55rem,5vw,2.85rem)] font-semibold leading-[1.12] tracking-tight text-white">
            {aboutPage.closing}
          </h2>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href="/#contact" variant="primary" className="w-full sm:w-auto">
              Demander un devis
              <ArrowUpRight size={16} />
            </Button>
            <Button
              href="/"
              variant="ghost"
              className="w-full border-white/30 bg-white/10 text-white hover:border-brand hover:bg-brand/25 hover:text-white sm:w-auto"
            >
              Retour à l’accueil
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
