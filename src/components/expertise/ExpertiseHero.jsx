"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";

export default function ExpertiseHero() {
	const { t } = useI18n();
	const copy = t.expertisePage.hero;

	return (
		<section
			id="expertise-hero"
			className="relative isolate bg-[#07110e] text-cream min-h-[75svh]"
		>
			<div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#0b1b16_0%,#07110e_60%)]" />
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute -left-24 top-0 h-[32rem] w-[32rem] rounded-full bg-brand/15 blur-[140px]" />
			</div>
			<div className="zellige-spot zellige-spot--top-end zellige-spot--small">
				<div className="shell relative z-10 flex min-h-[75svh] flex-col justify-center py-24 sm:py-32 lg:py-40">
					<Reveal>
						<div className="ledger-rule">
							<span className="label-mono text-cream/65">
								{copy.badge}
							</span>
							<span className="label-mono text-cream/65">
								{copy.label}
							</span>
						</div>
					</Reveal>

					<Reveal delay={0.1}>
						<h1 className="display-xl mt-8 text-cream">
							{copy.h1Part1}
							<span className="text-accent-bright">
								{copy.h1Highlight}
							</span>
						</h1>
					</Reveal>

					<Reveal delay={0.18}>
						<p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
							{copy.lede}
						</p>
						<p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/65 sm:text-base">
							{copy.lead}
						</p>
					</Reveal>

					<Reveal delay={0.26}>
						<div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
							<Button
								href="#cooperatives"
								size="lg"
								className="w-full sm:w-auto"
							>
								{copy.cta1}
								<ArrowUpRight size={17} className="rtl-flip" />
							</Button>
							<Button
								href="/#contact"
								variant="outlineLight"
								size="lg"
								className="w-full sm:w-auto"
							>
								{copy.cta2}
							</Button>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
