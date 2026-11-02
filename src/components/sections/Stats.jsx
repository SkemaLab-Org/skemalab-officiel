"use client";

import { useI18n } from "@/components/I18nProvider";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import BandHeader from "@/components/ui/BandHeader";

export default function Stats() {
	const { t } = useI18n();

	return (
		<section
			aria-label={ t.statsSection.title }
			className="bg-surface zellige-spot zellige-spot--bottom-start zellige-spot--small py-12 sm:py-16"
		>
			<div className="shell">
				<BandHeader
					index="04"
					label={ t.statsSection.eyebrow }
					title={ t.statsSection.title }
					description={ t.statsSection.description }
				/>
				<div className="mt-10 grid grid-cols-2 text-center gap-px border-y border-line bg-line sm:mt-12 min-[1000px]:grid-cols-4">
					{ t.statsList.map( ( stat, index ) => (
						<Reveal
							key={ stat.label }
							delay={ index * 0.05 }
							className="h-full bg-page group"
						>
							<div className="flex h-full flex-col justify-between gap-4 px-4 py-6 transition-colors duration-300 group-hover:bg-surface-2/35 sm:gap-8 sm:px-6 sm:py-10 min-[1000px]:px-8 min-[1000px]:py-12">
								<span className="label-mono text-muted flex items-center justify-center gap-1.5">
									<span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
									<span>KPI</span>
								</span>

								<div>
									<p className="font-display text-[clamp(2rem,7.5vw,3.6rem)] font-light leading-none tracking-[-0.03em]">
										<CountUp
											value={ stat.value }
											suffix={ stat.suffix }
											className="text-accent"
											suffixClassName="text-fg"
										/>
									</p>
									<p className="mx-auto mt-2.5 max-w-[16rem] text-[12px] leading-snug text-muted sm:mt-4 sm:text-[13px]">
										{ stat.label }
									</p>
								</div>
							</div>
						</Reveal>
					) ) }
				</div>
			</div>
		</section>
	);
}
