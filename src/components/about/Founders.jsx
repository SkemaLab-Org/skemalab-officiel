"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { founders } from "@/data/content";
import Reveal from "@/components/motion/Reveal";
import CalendlyButton from "@/components/CalendlyButton";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Founders() {
	const { t, isRTL } = useI18n();
	const copy = t.aboutPage;
	const reduce = useReducedMotion();
	const profiles = founders
		.map( ( founder ) => ( {
			...founder,
			...copy.foundersList.find( ( profile ) => profile.id === founder.id ),
		} ) )
		.filter( ( profile ) => profile.name );
	const [ activeId, setActiveId ] = useState( profiles[ 0 ]?.id );
	const active = profiles.find( ( profile ) => profile.id === activeId ) || profiles[ 0 ];

	if ( !active ) return null;

	return (
		<section
			id="fondateurs"
			className="section-y relative isolate overflow-hidden bg-[#07110e] text-cream zellige-spot zellige-spot--center zellige-spot--large"
		>
			<div aria-hidden="true" className="pointer-events-none absolute -end-40 top-0 h-[34rem] w-[34rem] rounded-full bg-accent-bright/8 blur-[150px]" />

			<div className="shell relative">
				<div className="grid items-start gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
					<div className="min-w-0">
						<Reveal>
							<p className="label-mono text-accent-bright">{ copy.foundersEyebrow }</p>
							<h2 className="section-title mt-6 max-w-[12ch] text-cream">
								{ copy.foundersTitlePart1 }
								<span className="text-accent-bright">{ copy.foundersTitleHighlight }</span>
							</h2>
							<p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/65 sm:text-base">
								{ copy.foundersSubtitle }
							</p>
						</Reveal>

						<AnimatePresence mode="wait" initial={ false }>
							<motion.div
								key={ active.id }
								initial={ reduce ? false : { opacity: 0, y: 12 } }
								animate={ { opacity: 1, y: 0 } }
								exit={ reduce ? { opacity: 0 } : { opacity: 0, y: -8 } }
								transition={ { duration: DURATION.fast, ease: EASE.out } }
								className="mt-10 border-s border-accent/50 ps-5 sm:ps-6"
								aria-live="polite"
							>
								<p className="label-mono text-accent-bright">{ active.role }</p>
								<h3 className="mt-3 font-display text-xl leading-tight text-cream sm:text-2xl">
									{ active.title }
								</h3>
								<p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base">
									{ active.bio }
								</p>
								<p className="mt-5 text-sm leading-relaxed text-accent-bright/90">
									{ active.quote }
								</p>
								<div className="mt-6 flex flex-wrap items-center gap-4">
									<span className="text-xs leading-relaxed text-cream/55 sm:text-sm">
										<span className="label-mono me-2 text-cream/45">
											{ copy.foundersList[ 0 ].expertiseLabel }
										</span>
										{ active.focusArea }
									</span>
								</div>
								<div className="mt-7 flex flex-wrap items-center gap-3">
									<CalendlyButton className="min-h-11 px-4 text-sm">
										{ active.ctaBtn }
									</CalendlyButton>
									{ active.social?.linkedin ? (
										<a
											href={ active.social.linkedin }
											target="_blank"
											rel="noopener noreferrer"
											aria-label={ `${ active.name } · LinkedIn` }
											className="inline-flex h-11 items-center gap-2 border border-cream/20 px-4 text-sm text-cream/70 transition-colors hover:border-accent-bright hover:text-accent-bright"
										>
											LinkedIn <ArrowUpRight size={ 14 } className={ cn( isRTL && "rtl-flip" ) } aria-hidden="true" />
										</a>
									) : null }
								</div>
							</motion.div>
						</AnimatePresence>
					</div>

					<Reveal delay={ 0.08 } className="min-w-0">
						<div className="team-mosaic grid grid-cols-2 gap-3 md:grid-cols-[1.08fr_0.92fr] md:grid-rows-2 md:h-[clamp(30rem,42vw,38rem)]">
							{ profiles.map( ( profile, index ) => {
								const isActive = profile.id === active.id;
								return (
									<motion.button
										key={ profile.id }
										type="button"
										initial={ reduce ? false : { opacity: 0, y: 26 } }
										whileInView={ { opacity: 1, y: 0 } }
										viewport={ { once: true, amount: 0.25 } }
										whileHover={ reduce ? undefined : { y: -5 } }
										transition={ { duration: 0.55, delay: reduce ? 0 : index * 0.08, ease: EASE.out } }
										aria-pressed={ isActive }
										aria-label={ `${ profile.name }, ${ profile.role }` }
										onMouseEnter={ () => setActiveId( profile.id ) }
										onFocus={ () => setActiveId( profile.id ) }
										onClick={ () => setActiveId( profile.id ) }
										className={ cn(
											"group relative aspect-[4/5] min-h-0 overflow-hidden border bg-surface text-start transition-[border-color,box-shadow] duration-500 md:aspect-auto",
											index === 0 && "md:row-span-2",
											isActive
												? "border-accent-bright/80 shadow-[0_0_32px_rgba(58,217,191,0.18)]"
												: "border-cream/10 hover:border-accent-bright/50",
										) }
									>
										<Image
											src={ profile.image }
											alt={ profile.name }
											fill
											sizes="(max-width: 768px) 48vw, 28vw"
											priority={ index === 0 }
											className={ cn(
												"object-cover object-center transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03]",
												isActive
													? "grayscale-0 saturate-100"
													: "grayscale saturate-0 brightness-[0.72] group-hover:grayscale-0 group-hover:saturate-100 group-hover:brightness-100",
											) }
										/>
										<span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#07110e]/90 via-[#07110e]/10 to-transparent" />
										<span className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
											<span className={ cn( "block font-display text-lg leading-tight sm:text-xl", isActive ? "text-cream" : "text-cream/80" ) }>
												{ profile.name }
											</span>
											<span className="mt-1 block text-xs text-cream/60 sm:text-sm">
												{ profile.role }
											</span>
										</span>
										{ isActive ? (
											<span aria-hidden="true" className="absolute end-4 top-4 h-2 w-2 rounded-full bg-accent-bright shadow-[0_0_14px_rgba(58,217,191,0.85)]" />
										) : null }
									</motion.button>
								);
							} ) }
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
