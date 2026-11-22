"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export default function SectorSection({ id, mirror }) {
	const { t } = useI18n();
	const expertise = t.expertisePage;
	const sector = expertise.sectors.find((item) => item.id === id);
	const ui = expertise.ui;

	if (!sector) return null;

	return (
		<section
			id={sector.id}
			className={cn(
				"section-y relative isolate overflow-hidden bg-surface zellige-spot zellige-spot--small",
				mirror ? "zellige-spot--mid-start" : "zellige-spot--mid-end",
			)}
		>
			<div className="shell relative">
				<div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
					<div
						className={cn(
							"min-w-0",
							mirror ? "lg:order-2" : "lg:order-1",
						)}
					>
						<Reveal>
							<div className="ledger-rule">
								<span className="section-index" aria-hidden="true">
									{sector.index}
								</span>
								<span className="h-4 w-px bg-accent/50" aria-hidden="true" />
								<span className="label-mono text-accent">
									{sector.name}
								</span>
							</div>
							<h2 className="section-title mt-6 max-w-[24ch] text-fg">
								{sector.name}
							</h2>
							<p className="mt-4 text-sm font-medium leading-relaxed text-accent/90">
								{sector.promise}
							</p>
							<p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
								{sector.paragraphs[0]}
							</p>
							<p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
								{sector.paragraphs[1]}
							</p>
						</Reveal>
					</div>

					<div
						className={cn(
							"flex-shrink-0 w-full lg:w-[340px]",
							mirror ? "lg:order-1" : "lg:order-2",
						)}
					>
						<Reveal delay={0.1}>
							<div className="border border-line bg-surface-2/40 p-6 sm:p-8">
								<div className="flex items-center gap-2 mb-6">
									<span className="section-index" aria-hidden="true">
										{sector.index}
									</span>
									<span className="h-4 w-px bg-accent/50" aria-hidden="true" />
									<span className="label-mono text-accent">
										{ui.capabilities}
									</span>
								</div>
								<div className="flex flex-wrap gap-2 mb-8">
									{sector.capabilities.map((capability) => (
										<span
											key={capability}
											className="atelier-pill"
										>
											{capability}
										</span>
									))}
								</div>
								<p className="label-mono text-accent mb-3">
									{ui.outcomes}
								</p>
								<ul className="space-y-3 text-sm leading-relaxed text-fg/85">
									{sector.outcomes.map((outcome) => (
										<li key={outcome} className="flex items-start gap-2">
											<span
												className="mt-0.5 me-2 h-px w-3 bg-accent shrink-0"
												aria-hidden="true"
											/>
											{outcome}
										</li>
									))}
								</ul>
							</div>
						</Reveal>
					</div>

					<div className="lg:order-3">
						<Reveal delay={0.2}>
							<Link
								href="/#contact"
								className="link-underline inline-flex items-center gap-2 text-sm font-medium text-fg hover:text-accent"
							>
								{sector.cta}
								<ArrowUpRight size={15} className="rtl-flip" aria-hidden="true" />
							</Link>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	);
}
