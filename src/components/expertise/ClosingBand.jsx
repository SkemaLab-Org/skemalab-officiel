"use client";

import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";

export default function ClosingBand() {
	const { t } = useI18n();
	const copy = t.expertisePage.closing;

	return (
		<section
			className="relative isolate zellige-spot zellige-spot--center zellige-spot--large bg-[#07110e] text-cream"
		>
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute -left-24 top-0 h-[32rem] w-[32rem] rounded-full bg-brand/15 blur-[140px]" />
				<div className="absolute -right-16 bottom-0 h-[26rem] w-[26rem] rounded-full bg-accent-bright/10 blur-[130px]" />
			</div>
			<div className="shell relative z-10">
				<Reveal>
					<div className="relative mx-auto max-w-4xl border border-[rgba(242,237,226,0.12)] bg-[#0b1b16]/70 p-8 backdrop-blur-md sm:p-14 lg:p-16 text-center shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
						<div className="mb-4 inline-flex items-center gap-3 mx-auto">
							<span className="status-dot shrink-0" aria-hidden="true" />
							<span className="label-mono text-accent-bright tracking-widest">
								{copy.eyebrow}
							</span>
						</div>

						<h2 className="section-title mx-auto mt-4 max-w-[24ch] text-cream">
							{copy.title}
						</h2>

						<p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base">
							{copy.text}
						</p>

						<div className="mt-10">
							<Button href="/#contact" size="lg" className="w-full sm:w-auto">
								{copy.cta}
							</Button>
						</div>

						<div className="mt-10 ledger-rule">
							<span className="label-mono text-cream/50">
								{copy.ruleLabel}
							</span>
							<span className="h-4 w-px bg-accent/50 flex-1" aria-hidden="true" />
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
