"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Code2,
  TrendingUp,
  Cpu,
  Quote,
  CheckCircle2,
  Mail,
  Calendar,
  ChevronRight,
  Workflow,
  Target,
  Users,
} from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/icons/SocialIcons";
import {
  aboutPage,
  aboutContent,
  contactInfo,
  founders,
  timelineMilestones,
  stats,
} from "@/data/content";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CalendlyButton from "@/components/CalendlyButton";
import clsx from "clsx";

/* -------------------------------------------------------------------------- */
/* 1. HERO SECTION                                                            */
/* -------------------------------------------------------------------------- */
export function AboutHero() {
  return (
    <section className="relative flex min-h-[90svh] items-end overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      {/* Background Image & Overlay */ }
      <Image
        src={ aboutPage.heroImage }
        alt="Espace de travail et équipe Skemalab"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-page via-ink/60 to-ink/40" />

      {/* Subtle Glows */ }
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-brand/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-accent/25 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8">
        <Reveal>
          <div className="inline-flex items-center rounded-sm border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            Studio Digital d’Excellence · Essaouira &amp; International
          </div>
        </Reveal>

        <Reveal delay={ 0.08 }>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.2rem,6.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white">
            L’ingénierie digitale &amp; l’intelligence opérationnelle pour{ " " }
            <span className="bg-gradient-to-r from-brand via-white to-brand bg-clip-text text-transparent">
              accélérer votre business.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={ 0.16 }>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
            { aboutPage.headline }
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            { aboutPage.lead }
          </p>
        </Reveal>

        <Reveal delay={ 0.24 }>
          <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
            <Button href="#histoire" variant="primary" className="w-full sm:w-auto">
              Découvrir notre histoire
              <ChevronRight size={ 16 } />
            </Button>
            <Button
              href="#fondateurs"
              variant="ghost"
              className="w-full border-white/20 bg-white/10 text-white hover:border-brand hover:bg-brand/20 hover:text-white sm:w-auto"
            >
              Rencontrer les fondateurs
              <Users size={ 16 } />
            </Button>
          </div>
        </Reveal>

        {/* Quick Highlights Strip */ }
        <Reveal delay={ 0.32 }>
          <div className="mt-12 grid grid-cols-2 gap-3 border-t border-white/15 pt-8 sm:grid-cols-4 sm:gap-6">
            <div className="rounded-[3px] border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white sm:text-3xl">40+</p>
              <p className="mt-1 text-xs text-white/70">Projets livrés avec succès</p>
            </div>
            <div className="rounded-[3px] border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
              <p className="text-2xl font-bold text-brand sm:text-3xl">100%</p>
              <p className="mt-1 text-xs text-white/70">Clients satisfaits</p>
            </div>
            <div className="rounded-[3px] border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
              <p className="text-2xl font-bold text-white sm:text-3xl">3×</p>
              <p className="mt-1 text-xs text-white/70">Accélération des process</p>
            </div>
            <div className="rounded-[3px] border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
              <p className="text-2xl font-bold text-brand sm:text-3xl">18h</p>
              <p className="mt-1 text-xs text-white/70">Économisées / sem. en moy.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION 1 : À PROPOS DE SKEMALAB (Identité, Vision & 3 Piliers)             */
/* -------------------------------------------------------------------------- */
export function AboutIdentity() {
  const { story } = aboutPage;

  const pillarCards = [
    {
      num: "01",
      name: "Build",
      title: "Développement & SaaS Sur-Mesure",
      desc: "Applications web et mobiles, architectures Next.js, plateformes métiers et intégrations d'APIs robustes conçues pour convertir, scaler et durer.",
      icon: Code2,
      tags: [ "Next.js", "React", "APIs & Microservices", "Cloud" ],
      color: "from-brand/20 to-brand/5",
    },
    {
      num: "02",
      name: "Grow",
      title: "Marketing Digital & Acquisition ROI",
      desc: "Stratégies d'acquisition orientées rentabilité directe : SEO technique, tunnels de vente à haute conversion, campagnes ciblées et branding premium.",
      icon: TrendingUp,
      tags: [ "SEO / SEA", "Funnels de vente", "Growth", "Data Analytics" ],
      color: "from-accent/25 to-accent/5",
    },
    {
      num: "03",
      name: "Automate",
      title: "Workflows Intelligents & Agents IA",
      desc: "Suppression radicale des tâches répétitives, interconnexion de vos outils SaaS et intégration d'assistants IA pour démultiplier la productivité.",
      icon: Cpu,
      tags: [ "n8n & Make", "Agents IA & LLMs", "CRM Auto", "Workflows 24/7" ],
      color: "from-brand/25 to-deep/20",
    },
  ];

  return (
    <section id="skemalab" className="relative overflow-hidden bg-page py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-brand/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */ }
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow text-brand">01 — Notre Identité &amp; Vision</p>
            <h2 className="mt-4 text-[clamp(1.85rem,4.8vw,3.2rem)] font-bold leading-[1.12] tracking-tight text-fg">
              Réconcilier le code, la croissance et l’automatisation en un{ " " }
              <span className="text-brand">système unique.</span>
            </h2>
            <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
              { story.paragraphs.map( ( p, idx ) => (
                <p
                  key={ idx }
                  className="text-base leading-relaxed text-muted sm:text-lg"
                >
                  { p }
                </p>
              ) ) }
            </div>

            <div className="mt-8 flex flex-wrap gap-4 border-t border-line pt-6 text-sm text-muted">
              <div className="rounded-[3px] border border-line bg-surface px-4 py-2.5">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted/80">
                  Siège &amp; R&amp;D
                </span>
                <span className="mt-0.5 font-medium text-fg">{ contactInfo.locations[ 0 ] }, { contactInfo.locations[ 1 ] }</span>
              </div>
              <div className="rounded-[3px] border border-line bg-surface px-4 py-2.5">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted/80">
                  Rayonnement
                </span>
                <span className="mt-0.5 font-medium text-fg">Europe · MENA · International</span>
              </div>
              <div className="rounded-[3px] border border-line bg-surface px-4 py-2.5">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted/80">
                  Contact Studio
                </span>
                <a
                  href={ `mailto:${ contactInfo.email }` }
                  className="mt-0.5 font-medium text-fg transition-colors hover:text-brand"
                >
                  { contactInfo.email }
                </a>
              </div>
            </div>
          </Reveal>

          {/* Visual Showcase Graphic */ }
          <Reveal delay={ 0.15 }>
            <div className="relative">
              <div className="absolute -inset-3 hidden rounded-[4px] border border-brand/20 sm:block" />
              <div className="relative overflow-hidden rounded-[3px] border border-line bg-surface shadow-2xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/11]">
                  <Image
                    src={ aboutPage.labImage || aboutContent.image }
                    alt="Laboratoire digital Skemalab"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-[3px] bg-brand/15 text-brand">
                      <Sparkles size={ 16 } />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                        Le Standard SkemaLab
                      </p>
                      <h3 className="text-base font-semibold text-fg">
                        L’Excellence opérationnelle sans compromis
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Nous ne concevons pas des projets jetables. Chaque plateforme et chaque automatisation sont pensées pour devenir un actif pérenne et scalable pour votre entreprise.
                  </p>
                </div>
              </div>

              {/* Decorative Accent Dots */ }
              <div className="absolute -bottom-3 -left-3 hidden h-14 w-14 rounded-[3px] bg-brand/80 sm:block" />
              <div className="absolute -right-3 -top-3 hidden h-10 w-10 rounded-[3px] bg-deep sm:block" />
            </div>
          </Reveal>
        </div>

        {/* The 3 Core Pillars */ }
        <div className="mt-20 sm:mt-28">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow mx-auto justify-center text-brand">
                Méthodologie Fondatrice
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-fg sm:text-3xl md:text-4xl">
                Les 3 leviers fondamentaux de notre studio
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted sm:text-base">
                Conçus pour agir en synergie continue, et non comme des départements cloisonnés.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:gap-8 lg:grid-cols-3">
            { pillarCards.map( ( card, i ) => {
              const IconComp = card.icon;
              return (
                <Reveal key={ card.name } delay={ i * 0.1 }>
                  <div className="group relative flex h-full flex-col justify-between rounded-[3px] border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl sm:p-9">
                    <div
                      className={ clsx(
                        "absolute inset-0 rounded-[3px] bg-gradient-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                        card.color
                      ) }
                    />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[3px] border border-line bg-page text-brand transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                          <IconComp size={ 22 } />
                        </div>
                        <span className="font-mono text-xs font-semibold tracking-wider text-muted">
                          { card.num } — { card.name }
                        </span>
                      </div>

                      <h4 className="mt-6 text-xl font-bold text-fg sm:text-2xl">
                        { card.title }
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        { card.desc }
                      </p>
                    </div>

                    <div className="relative z-10 mt-8 border-t border-line/70 pt-5">
                      <div className="flex flex-wrap gap-1.5">
                        { card.tags.map( ( t ) => (
                          <span
                            key={ t }
                            className="rounded-[2px] border border-line bg-page/80 px-2.5 py-1 text-[11px] font-medium text-muted"
                          >
                            { t }
                          </span>
                        ) ) }
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            } ) }
          </div>
        </div>

        {/* 4 Guiding Principles */ }
        <div className="mt-20 rounded-[3px] border border-line bg-surface p-8 sm:mt-28 sm:p-12 lg:p-16">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow text-brand">Nos Engagements</p>
              <h3 className="mt-3 text-2xl font-bold text-fg sm:text-3xl">
                Les 4 principes non négociables chez SkemaLab
              </h3>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            { aboutPage.principles.map( ( pr, idx ) => (
              <Reveal key={ pr.num } delay={ idx * 0.07 }>
                <div className="relative flex flex-col justify-between border-t-2 border-brand/30 pt-5 transition-all duration-300 hover:border-brand">
                  <div>
                    <span className="font-mono text-xs font-bold text-brand">
                      { pr.num }
                    </span>
                    <h4 className="mt-2 text-base font-semibold text-fg sm:text-lg">
                      { pr.title }
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                      { pr.text }
                    </p>
                  </div>
                </div>
              </Reveal>
            ) ) }
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION 2 : NOTRE HISTOIRE (Timeline & Genèse de Feissal & Marouan)        */
/* -------------------------------------------------------------------------- */
export function AboutTimeline() {
  const [ activeStep, setActiveStep ] = useState( 0 );

  return (
    <section
      id="histoire"
      className="relative overflow-hidden border-y border-line bg-surface py-20 sm:py-28 lg:py-36"
    >
      {/* Ambient background effects */ }
      <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-brand/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Heading */ }
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mx-auto justify-center text-brand">
              02 — Notre Histoire &amp; Genèse
            </p>
            <h2 className="mt-4 text-[clamp(1.85rem,4.8vw,3.2rem)] font-bold leading-[1.12] tracking-tight text-fg">
              Comment l’idée de SkemaLab est née :{ " " }
              <span className="text-brand">de la vision à la réalité.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Découvrez comment <strong className="text-fg">Feissal Tarkaoui</strong> (CEO) et <strong className="text-fg">Marouan Khadiri</strong> (CTO) ont uni leurs expertises pour bâtir un laboratoire digital nouvelle génération.
            </p>
          </div>
        </Reveal>

        {/* Founding Philosophy Callout */ }
        <Reveal delay={ 0.1 }>
          <div className="mt-12 rounded-[3px] border border-brand/30 bg-page/80 p-6 sm:mt-16 sm:p-8 backdrop-blur-sm">
            <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-brand text-white">
                  <Quote size={ 18 } />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                    La Thèse Fondatrice
                  </p>
                  <p className="mt-1 text-sm italic leading-relaxed text-fg sm:text-base">
                    &ldquo;Un site ultra design qui ne génère aucun lead est une perte d’argent. Une campagne d’acquisition brillante sans opérations automatisées crée un goulot d’étranglement. SkemaLab est né pour apporter une solution intégrale et fluide.&rdquo;
                  </p>
                  <p className="mt-2 text-xs font-medium text-muted">
                    — Feissal Tarkaoui &amp; Marouan Khadiri, Fondateurs
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <Button href="#fondateurs" variant="ghost" className="text-xs">
                  Voir leurs profils
                  <ArrowUpRight size={ 14 } />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Interactive Timeline */ }
        <div className="relative mt-16 sm:mt-24">
          {/* Vertical Connecting Line */ }
          <div className="absolute bottom-6 left-4 top-6 w-[2px] bg-gradient-to-b from-brand via-accent to-brand/20 sm:left-1/2 sm:-ml-[1px]" />

          <div className="space-y-12 sm:space-y-16">
            { timelineMilestones.map( ( milestone, idx ) => {
              const isEven = idx % 2 === 0;

              return (
                <Reveal key={ milestone.id } delay={ idx * 0.08 }>
                  <div
                    className={ clsx(
                      "relative flex flex-col items-start sm:flex-row sm:items-center",
                      isEven ? "sm:flex-row-reverse" : ""
                    ) }
                  >
                    {/* Content Card (Left or Right on desktop) */ }
                    <div
                      className={ clsx(
                        "ml-10 w-[calc(100%-2.5rem)] sm:ml-0 sm:w-[calc(50%-2.5rem)]",
                        isEven ? "sm:pl-0 sm:pr-8" : "sm:pl-8 sm:pr-0"
                      ) }
                    >
                      <div
                        onMouseEnter={ () => setActiveStep( idx ) }
                        className={ clsx(
                          "group rounded-[3px] border bg-page p-6 transition-all duration-300 sm:p-8",
                          activeStep === idx
                            ? "border-brand shadow-lg shadow-brand/5 ring-1 ring-brand/30"
                            : "border-line hover:border-brand/40"
                        ) }
                      >
                        {/* Header Badge */ }
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="rounded-[2px] bg-brand/10 px-2.5 py-1 font-mono text-xs font-bold text-brand">
                            { milestone.year } · { milestone.period }
                          </span>
                          <span className="text-[11px] font-medium text-muted">
                            { milestone.tag }
                          </span>
                        </div>

                        {/* Title & Subtitle */ }
                        <h3 className="mt-4 text-lg font-bold text-fg sm:text-xl">
                          { milestone.title }
                        </h3>
                        <p className="mt-1 text-xs font-medium text-accent">
                          { milestone.subtitle }
                        </p>

                        {/* Description */ }
                        <p className="mt-4 text-sm leading-relaxed text-muted">
                          { milestone.description }
                        </p>

                        {/* Milestone Key Impact Tag */ }
                        <div className="mt-5 flex items-center gap-2 rounded-[2px] border border-line bg-surface px-3 py-2 text-xs">
                          <CheckCircle2 size={ 15 } className="shrink-0 text-brand" />
                          <span className="font-medium text-fg">{ milestone.highlight }</span>
                        </div>
                      </div>
                    </div>

                    {/* Milestone Center Node / Icon */ }
                    <div className="absolute left-4 -ml-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand bg-surface text-brand shadow-md transition-transform duration-300 sm:left-1/2 sm:-ml-4 group-hover:scale-110">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                    </div>
                  </div>
                </Reveal>
              );
            } ) }
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION 3 : PRÉSENTATION DE L'ÉQUIPE (Feissal, Marouan & Adam)              */
/* -------------------------------------------------------------------------- */
function FounderCta( { founder } ) {
  if ( founder.id === "feissal-tarkaoui" ) {
    return (
      <CalendlyButton className="px-4 py-2 text-xs md:w-full">
        Planifier un échange
      </CalendlyButton>
    );
  }

  return (
    <Button
      href="/#contact"
      variant="ghost"
      className="min-h-10 px-4 py-2 text-xs md:w-full"
    >
      { founder.id === "adam-khairi"
        ? "Discuter de votre produit"
        : "Échanger sur l’architecture" }
      <ArrowUpRight size={ 14 } />
    </Button>
  );
}

export function AboutFounders() {
  return (
    <section
      id="fondateurs"
      className="relative overflow-hidden bg-page py-20 sm:py-28 lg:py-36"
    >
      {/* Background glow effects */ }
      <div className="pointer-events-none absolute right-10 top-1/4 h-96 w-96 rounded-full bg-brand/10 blur-[130px]" />
      <div className="pointer-events-none absolute left-10 bottom-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */ }
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mx-auto justify-center text-brand">
              03 — Direction &amp; Leadership
            </p>
            <h2 className="mt-4 text-[clamp(1.85rem,4.8vw,3.2rem)] font-bold leading-[1.12] tracking-tight text-fg">
              Les esprits derrière <span className="text-brand">SkemaLab.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Une complémentarité rare et décisive entre vision stratégique d’entreprise et excellence d’ingénierie logicielle.
            </p>
          </div>
        </Reveal>

        {/* Founders Grid */ }
        <div className="mt-16 grid gap-8 sm:mt-20 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          { founders.map( ( founder, i ) => (
            <Reveal
              key={ founder.id }
              delay={ i * 0.12 }
              className={
                i === founders.length - 1
                  ? "md:col-span-2 md:mx-auto md:w-[calc(50%_-_1rem)] xl:col-span-1 xl:mx-0 xl:w-full"
                  : ""
              }
            >
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-surface transition-all duration-300 hover:border-brand/50 hover:shadow-2xl">
                {/* Top Glowing Accent Line */ }
                <div className="h-1.5 w-full bg-gradient-to-r from-brand via-accent to-deep" />

                <div className="flex flex-1 flex-col p-6 sm:p-8 xl:p-7">
                  {/* Founder Profile Header */ }
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6 md:flex-col md:items-start">
                    {/* Photo with Glowing Frame */ }
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[3px] border-2 border-brand/30 sm:h-32 sm:w-32 md:h-36 md:w-36">
                      <Image
                        src={ founder.image }
                        alt={ founder.name }
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 144px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    <div className="min-w-0">
                      <div className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-semibold text-brand">
                        { founder.role }
                      </div>

                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl md:text-2xl">
                        { founder.name }
                      </h3>
                      <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-accent sm:text-sm md:text-xs">
                        { founder.title }
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs text-muted">
                          <Target size={ 13 } className="text-brand" />
                          { founder.focusArea }
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio, Quote & Expertise (grows to align the CTA row) */ }
                  <div className="mt-6 flex-1">
                    {/* Bio Paragraph */ }
                    <p className="text-sm leading-relaxed text-muted sm:text-base md:text-sm">
                      { founder.bio }
                    </p>

                    {/* Founder Quote */ }
                    <div className="mt-6 rounded-[3px] border-l-2 border-brand bg-page/90 p-4">
                      <p className="text-xs italic leading-relaxed text-fg sm:text-sm">
                        &ldquo;{ founder.quote }&rdquo;
                      </p>
                    </div>

                    {/* Expertise Tags */ }
                    <div className="mt-6">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted/90">
                        Domaines d’intervention :
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2 md:gap-1.5">
                        { founder.expertise.map( ( exp ) => (
                          <span
                            key={ exp }
                            className="max-w-full rounded-[2px] border border-line bg-page px-2.5 py-1 text-xs font-medium leading-snug text-fg md:px-2 md:py-0.5 md:text-[11px]"
                          >
                            { exp }
                          </span>
                        ) ) }
                      </div>
                    </div>
                  </div>

                  {/* Founder Contact / Actions */ }
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 md:mt-7 md:flex-col md:items-stretch md:gap-3">
                    <div className="flex items-center gap-2.5">
                      <a
                        href={ founder.social.linkedin }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={ `LinkedIn de ${ founder.name }` }
                        className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-line bg-page text-muted transition-colors hover:border-brand hover:bg-brand hover:text-white"
                      >
                        <LinkedInIcon className="h-4 w-4" />
                      </a>
                      { founder.social.github && (
                        <a
                          href={ founder.social.github }
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={ `GitHub de ${ founder.name }` }
                          className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-line bg-page text-muted transition-colors hover:border-brand hover:bg-brand hover:text-white"
                        >
                          <GitHubIcon className="h-4 w-4" />
                        </a>
                      ) }
                      <a
                        href={ `mailto:${ founder.social.email }` }
                        aria-label={ `Email direct à ${ founder.name }` }
                        className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-line bg-page text-muted transition-colors hover:border-brand hover:bg-brand hover:text-white"
                      >
                        <Mail size={ 16 } />
                      </a>
                    </div>

                    <div className="md:w-full">
                      <FounderCta founder={ founder } />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ) ) }
        </div>

        {/* Dual Leadership Synergy Banner */ }
        <Reveal delay={ 0.25 }>
          <div className="mt-16 rounded-[4px] border border-brand/30 bg-surface p-8 shadow-xl sm:mt-20 sm:p-12 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 font-mono text-xs font-semibold text-brand">
                  <Workflow size={ 14 } />
                  La Force du Binôme
                </span>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                  Pourquoi l’alliance Feissal, Marouan et Adam fait toute la différence.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  Dans la plupart des agences traditionnelles, la stratégie commerciale et le développement technique ne se parlent pas. Chez SkemaLab, le CEO et le CTO collaborent main dans la main sur chaque projet.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={ 16 } className="mt-1 shrink-0 text-brand" />
                    <p className="text-xs text-muted sm:text-sm">
                      <strong className="text-fg">Zéro décalage</strong> entre promesse commerciale et faisabilité technique.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={ 16 } className="mt-1 shrink-0 text-brand" />
                    <p className="text-xs text-muted sm:text-sm">
                      <strong className="text-fg">Architecture pensée ROI</strong> dès la première ligne de code.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={ 16 } className="mt-1 shrink-0 text-brand" />
                    <p className="text-xs text-muted sm:text-sm">
                      <strong className="text-fg">Automatisation native</strong> pour économiser des dizaines d’heures.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={ 16 } className="mt-1 shrink-0 text-brand" />
                    <p className="text-xs text-muted sm:text-sm">
                      <strong className="text-fg">Interlocuteurs directs</strong> fondateurs sur les décisions clés.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[3px] border border-line bg-page p-6 sm:p-8 lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  L’Engagement SkemaLab
                </p>
                <p className="mt-2 text-base font-semibold text-fg">
                  Discuter directement de votre projet avec notre direction.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Prenez rendez-vous pour un diagnostic stratégique de 30 minutes sans engagement.
                </p>
                <div className="mt-6">
                  <CalendlyButton className="w-full">
                    Prendre rendez-vous avec les fondateurs
                  </CalendlyButton>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION NUMBERS (KPIs & Metrics)                                           */
/* -------------------------------------------------------------------------- */
export function AboutNumbers() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface">
      <div className="relative mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
        { stats.map( ( stat, index ) => (
          <Reveal key={ stat.label } delay={ index * 0.05 } className="h-full">
            <div
              className={ `h-full border-b border-line px-6 py-10 last:border-b-0 sm:px-8 sm:py-12 lg:border-b-0 ${ index % 2 === 0 ? "sm:border-r" : ""
                } ${ index < stats.length - 1 ? "lg:border-r lg:border-line" : "" }` }
            >
              <p className="text-[clamp(2.2rem,6vw,3.5rem)] font-bold leading-none tracking-tight text-fg">
                { stat.value }
                <span className="text-brand">{ stat.suffix }</span>
              </p>
              <p className="mt-3 text-sm font-medium text-muted">{ stat.label }</p>
            </div>
          </Reveal>
        ) ) }
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION CLOSING (Call to Action)                                           */
/* -------------------------------------------------------------------------- */
export function AboutClosing() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <Image
        src={ aboutPage.workspaceImage }
        alt="Espace studio Skemalab"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/60" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-8">
        <Reveal>
          <div className="inline-flex items-center rounded-full border border-brand/40 bg-brand/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Passer à l’action
          </div>
          <h2 className="mt-6 text-[clamp(1.85rem,5.2vw,3.2rem)] font-bold leading-[1.12] tracking-tight text-white">
            { aboutPage.closing }
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Que ce soit pour créer votre nouvelle plateforme, structurer vos tunnels d’acquisition ou automatiser vos process avec l’IA, nous sommes à votre écoute.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <CalendlyButton className="w-full sm:w-auto">
              Planifier un appel découverte
              <Calendar size={ 16 } />
            </CalendlyButton>
            <Button
              href="/#contact"
              variant="ghost"
              className="w-full border-white/30 bg-white/10 text-white hover:border-brand hover:bg-brand/25 hover:text-white sm:w-auto"
            >
              Envoyer un message
              <ArrowUpRight size={ 16 } />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
