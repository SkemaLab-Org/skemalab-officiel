"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { contactInfo } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import aboutImage from "@/assets/home-imgs/home-about.webp";

export default function Identity() {
	const { t } = useI18n();
	const copy = t.aboutPage;

	return (
		<section id="skemalab" className="section-y relative overflow-hidden bg-page zellige-spot zellige-spot--top-end">
			<div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-brand/8 blur-[150px]" />

			<div className="shell relative">
				<Reveal>
					<SectionHeader
						label={copy.identityEyebrow}
						title={copy.identityTitle}
					/>
				</Reveal>

				<div className="mt-12 grid items-start gap-10 sm:mt-16 lg:items-stretch lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
					<div className="min-w-0">
						<Reveal delay={0.06}>
							<p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
								{copy.identityBody[0]}
							</p>
							<p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
								{copy.identityBody[1]}
							</p>

							<dl className="mt-8">
								<div className="grid gap-1 border-t border-line px-2 py-4 sm:grid-cols-[0.4fr_1fr] sm:items-baseline sm:gap-6">
									<dt className="label-mono text-muted">{copy.hqLabel}</dt>
									<dd className="text-sm leading-relaxed text-fg/85">{contactInfo.locations.join(" · ")}</dd>
								</div>
								<div className="grid gap-1 border-t border-line px-2 py-4 sm:grid-cols-[0.4fr_1fr] sm:items-baseline sm:gap-6">
									<dt className="label-mono text-muted">{copy.scopeLabel}</dt>
									<dd className="text-sm leading-relaxed text-fg/85">{copy.scopeValue}</dd>
								</div>
							</dl>

							<Link href="/#contact" className="link-underline mt-5 inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent">
								{t.ctaBanner.ctaPrimary}
								<ArrowUpRight size={15} className="rtl-flip" aria-hidden="true" />
							</Link>
						</Reveal>
					</div>

					<Reveal delay={0.1} className="group relative flex min-h-[22rem] items-end px-2 pb-2 pt-4 sm:px-3 sm:pb-3 lg:h-full lg:min-h-[30rem]">
						<div
							aria-hidden="true"
							className="absolute inset-4 translate-x-1.5 translate-y-1.5 rotate-2 border border-accent/55 bg-[linear-gradient(135deg,rgba(58,217,191,0.16),rgba(7,17,14,0.08))] shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:rotate-1"
							style={{ clipPath: "polygon(0 0, 88% 0, 100% 12%, 100% 100%, 12% 100%, 0 88%)" }}
						/>
						<div
							className="group relative aspect-[5/4] w-full bg-accent/65 p-[2px] shadow-[0_18px_55px_rgba(0,0,0,0.3)] lg:aspect-auto lg:h-full"
							style={{ clipPath: "polygon(0 0, 88% 0, 100% 12%, 100% 100%, 12% 100%, 0 88%)" }}
						>
							<div className="relative h-full w-full overflow-hidden bg-deep" style={{ clipPath: "polygon(0 0, 88% 0, 100% 12%, 100% 100%, 12% 100%, 0 88%)" }}>
								<Parallax offset={22} className="absolute inset-[-8%]">
									<Image
										src={aboutImage}
										alt={t.aboutHome.imageAlt}
										fill
										sizes="(max-width: 1024px) 100vw, 52vw"
										className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
									/>
								</Parallax>
								<div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,rgba(31,151,115,0.22),transparent_48%),linear-gradient(to_top,rgba(7,17,14,0.9),transparent_64%)]" />
								<div aria-hidden="true" className="absolute inset-3 border border-white/20 sm:inset-4" />
								<p className="label-mono absolute end-6 top-6 border border-white/15 bg-[#07110e]/35 px-3 py-2 text-cream/80 backdrop-blur-sm sm:end-8 sm:top-8">SKEMALAB · ESSAOUIRA</p>
								<div className="absolute inset-x-6 bottom-7 border-s-2 border-accent ps-4 sm:inset-x-8 sm:bottom-9">
									<p className="label-mono text-accent-bright">{copy.standardBadge}</p>
									<p className="mt-2 max-w-md font-display text-xl leading-tight text-cream sm:text-2xl">
										{copy.standardTitle}
									</p>
								</div>
							</div>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
