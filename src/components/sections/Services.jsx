"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useI18n } from "@/components/I18nProvider";
import BandHeader from "@/components/ui/BandHeader";
import TileCanvas from "@/components/canvas/TileCanvas";

/**
 * Stage 5 · Services (Architecture Stage)
 * Pinned sticky stage where scrolling cycles through the 3 service pillars
 * with active card highlighting and bottom meter progression.
 */
export default function Services() {
	const { t, isRTL } = useI18n();
	const reduce = useReducedMotion();
	const services = t.servicesList;
	const copy = t.servicesSection;

	const [activeCard, setActiveCard] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (reduce) return undefined;
		const stageEl = document.getElementById("services-stage");
		if (!stageEl) return undefined;

		let raf = 0;
		function sync() {
			const val = parseFloat(stageEl.style.getPropertyValue("--p"));
			if (!isNaN(val)) {
				setProgress(val);
				const idx = val < 0.35 ? 0 : val < 0.7 ? 1 : 2;
				setActiveCard(idx);
			}
			raf = requestAnimationFrame(sync);
		}
		raf = requestAnimationFrame(sync);
		return () => {
			if (raf) cancelAnimationFrame(raf);
		};
	}, [reduce]);

	/* ── Flat layout: mobile (<900 px) + reduced-motion ── */
	const flatCards = (
		<section id="services" className="section-y bg-page min-[900px]:hidden">
			<div className="shell">
				<BandHeader
					index="01"
					label={copy.eyebrow}
					title={
						<>
							{copy.titlePart1}
							{copy.titleHighlight}
						</>
					}
					description={copy.description}
				/>
				<div className="mt-10 flex flex-col divide-y divide-line border-y border-line">
					{services.map((service, index) => (
						<article key={service.id} className="flex flex-col bg-page py-7">
							<div className="flex items-start justify-between gap-6">
								<TileCanvas
									variant={service.id}
									className="max-w-[160px] flex-1"
								/>
								<span className="label-mono shrink-0 text-muted">
									{String(index + 1).padStart(2, "0")}
								</span>
							</div>
							<h3 className="mt-6 text-[17px] font-medium leading-snug text-fg">
								{service.title}
							</h3>
							<p className="mt-2 text-sm leading-[1.62] text-muted">
								{service.description}
							</p>
							<p className="label-mono mt-4 mb-5 leading-[1.7] text-muted">
								{service.points.slice(0, 3).join(" · ")}
							</p>
							<a
								href="#contact"
								className="mt-auto inline-flex items-center gap-2 border-t border-line pt-4 text-[13px] text-fg transition-colors hover:text-accent"
							>
								{copy.tileCta}
								<ArrowUpRight size={14} aria-hidden="true" className="rtl-flip" />
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);

	if (reduce) return flatCards;


	return (
		<>
			{/* Mobile flat cards — hidden on desktop */}
			{flatCards}

			{/* Desktop pinned scroll-through — hidden on mobile */}
			<section className="stage hidden min-[900px]:block" id="services-stage">
				<span id="services" aria-hidden="true" className="block h-0" />
				<div className="pin">
					<div className="wrap w-full max-w-6xl mx-auto px-6 sm:px-8">
						<div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 border-b border-line pb-4">
							<div className="flex items-center gap-3">
								<span className="label-mono text-accent">01</span>
								<span className="label-mono text-fg/75">{copy.eyebrow}</span>
							</div>
							<h2 className="font-display text-xl sm:text-2xl font-light tracking-[-0.02em] text-fg">
								{copy.titlePart1}
								<span className="text-accent">{copy.titleHighlight}</span>
							</h2>
						</div>

						<div className="grid grid-cols-3 gap-px border-y border-line bg-line">
							{services.map((service, index) => {
								const isCurrent = index === activeCard;
								return (
									<article
										key={service.id}
										onClick={() => {
											const stageEl = document.getElementById("services-stage");
											if (!stageEl) return;
											const r = stageEl.getBoundingClientRect();
											const travel = r.height - window.innerHeight;
											const targets = [0.15, 0.52, 0.88];
											window.scrollTo({
												top: window.scrollY + r.top + travel * targets[index],
												behavior: "smooth",
											});
										}}
										className={`flex flex-col bg-surface px-8 py-8 transition-all duration-300 cursor-pointer border-t-2 ${
											isCurrent
												? "border-accent bg-surface-2/60 opacity-100"
												: "border-transparent opacity-65 hover:opacity-95"
										}`}
									>
										<div className="flex items-start justify-between gap-6">
											<TileCanvas
												variant={service.id}
												className="max-w-[170px] flex-1"
											/>
											<span
												className={`label-mono shrink-0 transition-colors ${
													isCurrent
														? "text-accent font-mono font-medium"
														: "text-muted"
												}`}
											>
												{String(index + 1).padStart(2, "0")}
											</span>
										</div>

										<h3 className="mt-5 min-h-[2.4em] text-[17px] font-medium leading-snug text-fg">
											{service.title}
										</h3>

										<p className="mt-2 line-clamp-3 min-h-[4rem] text-xs sm:text-sm leading-[1.62] text-muted">
											{service.description}
										</p>

										<p className="label-mono mt-4 mb-5 text-[11px] leading-[1.7] text-muted line-clamp-1">
											{service.points.slice(0, 3).join(" · ")}
										</p>

										<a
											href="#contact"
											className="mt-auto inline-flex items-center gap-2 border-t border-line pt-3 text-[13px] text-fg transition-colors hover:text-accent"
										>
											{copy.tileCta}
											<ArrowUpRight size={14} aria-hidden="true" className="rtl-flip" />
										</a>
									</article>
								);
							})}
						</div>

						{/* Bottom Stage Progress Meter */}
						<div
							className="relative mt-6 h-[2px] w-full bg-line-soft overflow-hidden"
							role="progressbar"
							aria-valuenow={Math.round(progress * 100)}
							aria-valuemin={0}
							aria-valuemax={100}
						>
							<i
								className="block h-[2px] bg-accent transition-[width] duration-75 ease-out"
								style={{
									width: `${progress * 100}%`,
									float: isRTL ? "right" : "left",
								}}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
