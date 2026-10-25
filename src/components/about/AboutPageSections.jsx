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
  Calendar,
  ChevronRight,
  Workflow,
  Users,
} from "lucide-react";
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
import { MoroccanZelligeLattice, MoroccanCornerOrnament } from "@/components/ui/MoroccanPattern";
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
export function AboutFounders() {
  const [ selectedFounderId, setSelectedFounderId ] = useState( founders[ 0 ]?.id ?? null );
  const activeFounder = founders.find( ( founder ) => founder.id === selectedFounderId ) || founders[ 0 ];
  const activeFounderNumber = String( Math.max( founders.findIndex( ( founder ) => founder.id === activeFounder.id ) + 1, 1 ) ).padStart( 2, "0" );

  return (
    <section
      id="fondateurs"
      className="relative overflow-hidden bg-gradient-to-br from-[#193f39] via-[#214a43] to-[#183a35] py-20 text-white sm:py-28 lg:py-36"
    >
      <MoroccanZelligeLattice opacity={ 0.055 } strokeColor="#089587" size={ 118 } fadeMask />
      <div className="pointer-events-none absolute right-10 top-1/4 h-96 w-96 rounded-full bg-brand/8 blur-[130px]" />
      <div className="pointer-events-none absolute left-10 bottom-1/4 h-96 w-96 rounded-full bg-accent/8 blur-[130px]" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
        <Reveal className="text-center lg:col-span-2">
          <p className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand sm:text-xs">
            <span className="h-1.5 w-1.5 rotate-45 bg-brand" />03 — Direction &amp; Leadership
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-[clamp(1.7rem,3.5vw,2.8rem)] font-semibold leading-tight tracking-tight text-white">
            Les esprits derrière <span className="text-brand">SkemaLab.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
            Une équipe de stratèges et d’ingénieurs qui unit vision business, architecture technique et exécution produit.
          </p>
        </Reveal>

        <Reveal className="flex flex-col justify-center py-2 lg:py-8">
          <div className="relative border-y border-white/15 py-6 sm:py-8" aria-live="polite">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                <span className="h-1.5 w-1.5 rotate-45 bg-brand" />Profil de l’équipe
              </p>
              <span className="font-mono text-xs tracking-[0.16em] text-white/55">{ activeFounderNumber } <span className="text-white/30">/ { String( founders.length ).padStart( 2, "0" ) }</span></span>
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{ activeFounder.name }</h3>
            <p className="mt-1 text-sm font-medium leading-6 text-white/60">{ activeFounder.title }</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/75">{ activeFounder.shortBio }</p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
              <div className="min-w-0 border border-white/15 bg-white/[0.06] px-3.5 py-3 sm:px-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/50 sm:text-[10px]">Poste</p>
                <p className="mt-1.5 truncate text-xs font-semibold text-brand sm:text-sm">{ activeFounder.role }</p>
              </div>
              <div className="min-w-0 border border-white/15 bg-white/[0.06] px-3.5 py-3 sm:px-4">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/50 sm:text-[10px]">Expertise</p>
                <p className="mt-1.5 truncate text-xs font-semibold text-white/90 sm:text-sm">{ activeFounder.focusArea }</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CalendlyButton className="min-h-12 rounded-full bg-brand px-6 font-semibold text-deep shadow-[0_8px_28px_rgba(8,149,135,0.18)] transition-all hover:-translate-y-0.5 hover:bg-white">
              Réserver une consultation gratuite
            </CalendlyButton>
            <a
              href={ activeFounder.social.linkedin }
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ `Profil LinkedIn de ${ activeFounder.name }` }
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white/80 transition-colors hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                <path d="M5.2 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM3.7 8.5h3v11h-3v-11Zm5 0h2.9V10h.1c.4-.8 1.4-1.8 3-1.8 3.2 0 3.8 2.1 3.8 4.8v6.5h-3v-5.8c0-1.4 0-3.1-1.9-3.1s-2.1 1.5-2.1 3v5.9h-3v-11Z" />
              </svg>
            </a>
          </div>
        </Reveal>

        <Reveal delay={ 0.12 } className="min-w-0">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-rows-[18rem_18rem]">
            { founders.map( ( founder ) => {
              const isCeo = founder.id === "feissal-tarkaoui";
              const selected = selectedFounderId === founder.id;
              return (
                <article
                  key={ founder.id }
                  className={ `relative isolate overflow-hidden border border-white/15 bg-deep ${ isCeo ? "h-[36.75rem] sm:row-span-2" : "h-[18rem]" }` }
                >
                  <button
                    type="button"
                    aria-label={ `Afficher le profil de ${ founder.name }` }
                    aria-pressed={ selected }
                    onPointerEnter={ () => setSelectedFounderId( founder.id ) }
                    onPointerDown={ () => setSelectedFounderId( founder.id ) }
                    onFocus={ () => setSelectedFounderId( founder.id ) }
                    onClick={ () => setSelectedFounderId( founder.id ) }
                    className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand"
                  />
                  <Image
                    src={ founder.image }
                    alt={ founder.name }
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                    className={ `object-cover object-center transition-[filter] duration-700 ${ selected ? "grayscale-0" : "grayscale contrast-125" }` }
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-deep via-deep/10 to-transparent" />
                  <span aria-hidden="true" className={ `pointer-events-none absolute inset-0 z-[2] bg-ink transition-opacity duration-500 ${ selected ? "opacity-0" : "opacity-60" }` } />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
                    <span className="mb-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                      <span className="h-1.5 w-1.5 rotate-45 bg-brand" />{ founder.role }
                    </span>
                    <span className="block text-2xl font-semibold tracking-tight text-white sm:text-3xl">{ founder.name }</span>
                    <span className="mt-1 block max-w-sm text-xs leading-5 text-white/70 sm:text-sm">{ founder.title }</span>
                  </span>
                </article>
              );
            } ) }
          </div>
        </Reveal>
        {/*
          Section « La Force du Binôme » masquée temporairement.
          Pour la réactiver, retirer le commentaire autour du bloc <Reveal> ci-dessous.
        <Reveal delay={ 0.25 } className="lg:col-span-2">
          <div className="relative mx-auto mt-16 max-w-7xl overflow-hidden rounded-[4px] border border-line bg-surface/90 p-8 shadow-xl backdrop-blur-sm sm:mt-20 sm:p-12 lg:p-14">
            <MoroccanCornerOrnament className="pointer-events-none absolute right-3 top-3 text-brand/45" size={ 56 } />
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
        */}
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
