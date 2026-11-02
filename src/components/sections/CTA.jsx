"use client";

import { ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/data/content";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import Button from "@/components/ui/Button";

export default function CTA() {
	const { t } = useI18n();
	const banner = t.ctaBanner;

	return (
		<section className="relative isolate zellige-spot zellige-spot--center zellige-spot--large bg-[#07110e] py-20 text-cream sm:py-24 lg:py-28">
			{/* Ambient glows */}
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute -left-24 top-0 h-[32rem] w-[32rem] rounded-full bg-brand/15 blur-[140px]" />
				<div className="absolute -right-16 bottom-0 h-[26rem] w-[26rem] rounded-full bg-accent-bright/10 blur-[130px]" />
			</div>

			<div className="shell relative z-10">
				<Reveal>
					<div className="relative mx-auto max-w-4xl border border-[rgba(242,237,226,0.12)] bg-[#0b1b16]/70 p-8 backdrop-blur-md sm:p-14 lg:p-16 text-center shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
						{/* Precision corner marks */}
						<span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 text-[11px] text-muted/30 font-mono">+</span>
						<span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 text-[11px] text-muted/30 font-mono">+</span>
						<span aria-hidden="true" className="pointer-events-none absolute left-3 bottom-3 text-[11px] text-muted/30 font-mono">+</span>
						<span aria-hidden="true" className="pointer-events-none absolute right-3 bottom-3 text-[11px] text-muted/30 font-mono">+</span>

						<div className="mb-4 inline-flex items-center gap-3">
							<span className="section-index border-accent-bright/40 bg-accent-bright/10 text-accent-bright" aria-hidden="true">07</span>
							<span className="h-4 w-px bg-accent-bright/60" aria-hidden="true" />
							<span className="status-dot shrink-0" aria-hidden="true" />
							<span className="label-mono text-accent-bright tracking-widest">
								{banner.eyebrow}
							</span>
						</div>

						<h2 className="section-title mx-auto mt-4 max-w-[24ch] text-cream">
							{banner.headline}
						</h2>

						<p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base">
							{banner.description}
						</p>

						<div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
							<Magnetic className="w-full justify-center sm:w-auto">
								<Button
									href="#contact"
									size="lg"
									className="w-full sm:w-auto"
								>
									{banner.ctaPrimary}
									<ArrowUpRight size={17} className="rtl-flip" />
								</Button>
							</Magnetic>
							<Button
								href={`mailto:${contactInfo.email}`}
								variant="outlineLight"
								size="lg"
								className="w-full sm:w-auto"
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
