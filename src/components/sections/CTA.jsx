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
		<section className="relative bg-[#07110e] py-16 text-cream sm:py-20 lg:py-24">
			{/* Ambient glows */}
			<div aria-hidden="true" className="pointer-events-none absolute inset-0">
				<div className="absolute -left-24 top-0 h-[32rem] w-[32rem] rounded-full bg-brand/20 blur-[130px]" />
				<div className="absolute -right-16 bottom-0 h-[24rem] w-[24rem] rounded-full bg-accent-bright/12 blur-[120px]" />
			</div>
			<div className="shell relative z-10">
				<Reveal>
					<div className="relative mx-auto max-w-3xl text-center">
						<p className="label-mono text-accent-bright">{banner.eyebrow}</p>

						<h2 className="display-lg mx-auto mt-6 max-w-[24ch] text-cream">
							{banner.headline}
						</h2>

						<p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/65 sm:text-base">
							{banner.description}
						</p>

						<div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
							<Magnetic className="w-full justify-center sm:w-auto">
								<Button
									href="#contact"
									size="lg"
									className="w-full rounded-none sm:w-auto"
								>
									{banner.ctaPrimary}
									<ArrowUpRight size={17} className="rtl-flip" />
								</Button>
							</Magnetic>
							<Button
								href={`mailto:${contactInfo.email}`}
								variant="outlineLight"
								size="lg"
								className="w-full rounded-none sm:w-auto"
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
