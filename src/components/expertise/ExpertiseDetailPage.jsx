"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";

export default function ExpertiseDetailPage({ id }) {
	const { t } = useI18n();
	const sector = t.expertisePage.sectors.find( ( item ) => item.id === id );
	if ( !sector ) return null;

	return (
		<>
			<section className="relative overflow-hidden bg-[#07110e] pb-20 pt-32 text-cream sm:pb-28 sm:pt-40">
				<div className="pointer-events-none absolute -end-24 top-24 h-72 w-72 rounded-full border border-accent-bright/15 sm:h-96 sm:w-96" />
				<div className="pointer-events-none absolute -end-12 top-36 h-48 w-48 rounded-full border border-accent-bright/10 sm:h-64 sm:w-64" />
				<div className="shell relative">
					<Link href="/" className="label-mono inline-flex items-center gap-2 text-cream/60 transition-colors hover:text-accent-bright">
						<ArrowLeft size={ 14 } className="rtl-flip" aria-hidden="true" />
						{ t.expertisePage.hero.badge }
					</Link>
					<div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end lg:gap-16">
						<div className="max-w-4xl">
							<p className="label-mono text-accent-bright">{ sector.index } / 03 · { t.expertisePage.hero.label }</p>
							<h1 className="mt-5 font-display text-5xl leading-[0.98] tracking-tight sm:text-7xl">{ sector.name }</h1>
							<p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/70 sm:text-xl">{ sector.promise }</p>
						</div>
						<div className="border-s border-accent-bright/50 ps-5 text-sm leading-relaxed text-cream/55">
							<span className="label-mono mb-3 block text-accent-bright">{ t.expertisePage.intro.eyebrow }</span>
							{ t.expertisePage.intro.description }
						</div>
					</div>
					<div className="mt-12 h-px w-full bg-cream/15"><span className="block h-px w-20 bg-accent-bright" /></div>
				</div>
			</section>
			<section className="section-y bg-page">
				<div className="shell">
					<div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
						<div>
							<p className="label-mono text-accent">{ sector.index } — { t.expertisePage.ui.capabilities }</p>
							<h2 className="section-title mt-5 max-w-md text-fg">{ t.expertisePage.ui.capabilityHeading }</h2>
						</div>
						<div>
							<p className="max-w-2xl text-lg leading-relaxed text-muted">{ sector.paragraphs[0] }</p>
							<p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">{ sector.paragraphs[1] }</p>
						</div>
					</div>
					<div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
						{ sector.capabilities.map( ( capability, index ) => (
							<div key={ capability } className="min-h-36 bg-page p-6 sm:p-7">
								<span className="label-mono text-accent/70">{ sector.index }.{ String( index + 1 ).padStart( 2, "0" ) }</span>
								<h3 className="mt-8 max-w-[18ch] font-display text-xl leading-snug text-fg">{ capability }</h3>
							</div>
						) ) }
					</div>
				</div>
			</section>
			<section className="section-y bg-surface">
				<div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
					<div>
						<p className="label-mono text-accent">{ t.expertisePage.ui.outcomes }</p>
						<h2 className="section-title mt-5 max-w-lg text-fg">{ t.expertisePage.ui.outcomeHeading }</h2>
					</div>
					<ul className="divide-y divide-line border-y border-line">
					{ sector.outcomes.map( ( outcome ) => (
							<li key={ outcome } className="flex items-start gap-4 py-5 text-base leading-relaxed text-fg/85 sm:text-lg">
								<span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/30 text-accent"><Check size={ 13 } aria-hidden="true" /></span>
								<span>{ outcome }</span>
							</li>
						) ) }
					</ul>
				</div>
			</section>
			<section className="bg-[#07110e] py-16 text-cream sm:py-20">
				<div className="shell flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
					<div>
						<p className="label-mono text-accent-bright">{ t.expertisePage.closing.eyebrow }</p>
						<h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight sm:text-4xl">{ t.expertisePage.closing.title }</h2>
					</div>
					<Link href="/#contact" className="inline-flex min-h-12 items-center gap-3 bg-accent-bright px-5 text-sm font-semibold text-[#07110e] transition-transform hover:-translate-y-0.5">
						{ sector.cta } <ArrowUpRight size={ 16 } className="rtl-flip" aria-hidden="true" />
					</Link>
				</div>
			</section>
			<nav aria-label={ t.expertisePage.hero.badge } className="bg-page py-8">
				<div className="shell flex flex-wrap gap-3">
					{ t.expertisePage.sectors.filter( ( item ) => item.id !== id ).map( ( item ) => (
						<Link key={ item.id } href={ `/expertise/${ item.id }` } className="border border-line px-4 py-3 text-sm text-muted transition-colors hover:border-accent hover:text-fg">{ item.name }</Link>
					) ) }
				</div>
			</nav>
		</>
	);
}
