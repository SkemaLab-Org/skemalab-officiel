"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import BandHeader from "@/components/ui/BandHeader";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Projects() {
	const { t } = useI18n();
	const copy = t.projectsSection;
	const goals = copy.list;
	const [ activeIndex, setActiveIndex ] = useState( 0 );
	const activeGoal = goals[ activeIndex ] || goals[ 0 ];
	const reduce = useReducedMotion();
	return (
		<section id="projets" className="section-y bg-page">
			<div className="shell">
				<Reveal>
					<BandHeader
						index="03"
						label={ copy.eyebrow }
						title={ copy.title }
						description={ copy.description }
					/>
				</Reveal>

				<div className="mt-12 sm:mt-16 grid gap-10 min-[900px]:grid-cols-[0.95fr_1.05fr] min-[900px]:items-start min-[900px]:gap-14">
					<Reveal>
						<div
							role="group"
							aria-label={ copy.eyebrow }
							className=""
						>
							{ goals.map( ( goal, index ) => {
								const active = index === activeIndex;
								return (
									<button
										key={ goal.goal }
										type="button"
										aria-pressed={ active }
										onClick={ () => setActiveIndex( index ) }
										className={ cn(
											"group flex w-full items-center gap-4 border-b border-line py-4 text-start transition-colors duration-300 sm:py-5",
											active ? "text-fg" : "text-muted hover:text-fg",
										) }
									>
										<span
											className={ cn(
												"label-mono w-6 shrink-0 transition-colors",
												active ? "text-fg" : "text-muted",
											) }
										>
											{ String( index + 1 ).padStart( 2, "0" ) }
										</span>
										<span className="min-w-0 flex-1">
											<span className="block text-sm font-medium leading-snug sm:text-base">
												{ goal.goal }
											</span>
											<span className="mt-0.5 block text-xs text-muted">
												{ goal.category }
											</span>
										</span>
										<ArrowUpRight
											size={ 16 }
											aria-hidden="true"
											className={ cn(
												"shrink-0 transition-transform duration-300 rtl-flip",
												active
													? "text-fg group-hover:-translate-y-0.5"
													: "text-muted",
											) }
										/>
									</button>
								);
							} ) }
						</div>
					</Reveal>

					<Reveal delay={ 0.08 }>
						<div
							aria-live="polite"
							className="relative min-h-[22rem] overflow-hidden border border-line bg-page p-6 sm:min-h-[24rem] sm:p-10"
						>
							<span
								aria-hidden="true"
								className="pointer-events-none absolute bottom-5 end-7 font-display text-[4.5rem] font-light leading-none tracking-[-0.05em] text-fg/[0.06] sm:text-[5.5rem]"
							>
								{ String( activeIndex + 1 ).padStart( 2, "0" ) }
							</span>

							<AnimatePresence mode="wait" initial={ false }>
								<motion.div
									key={ activeGoal.goal }
									initial={ reduce ? false : { opacity: 0, y: 14 } }
									animate={ { opacity: 1, y: 0 } }
									exit={ reduce ? { opacity: 0 } : { opacity: 0, y: -10 } }
									transition={ { duration: DURATION.base, ease: EASE.out } }
									className="relative flex h-full flex-col"
								>
									<span className="label-mono text-muted">
										{ activeGoal.category }
									</span>

									<h3 className="landing-display mt-6 max-w-[20ch] text-[clamp(1.6rem,2.6vw,2.2rem)] text-fg">
										{ activeGoal.goal }
									</h3>
									<p className="mt-4 max-w-[38ch] text-sm leading-[1.7] text-muted">
										{ activeGoal.description }
									</p>

									<div className="mt-auto pt-10">
										<Button href="#contact" size="sm" className="rounded-none">
											{ copy.similarProject }
											<ArrowUpRight size={ 15 } className="rtl-flip" />
										</Button>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
