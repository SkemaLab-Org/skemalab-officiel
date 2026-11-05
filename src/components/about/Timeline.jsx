"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import studioImage from "@/assets/home-imgs/studio-team.webp";

function MilestoneCard( { milestone, index, total, progress } ) {
	const above = index % 2 === 0;
	const isFirstMilestone = index === 0;
	const start = 0.16 + ( index / total ) * 0.76;
	const end = Math.min( 1, start + 0.12 );
	const reveal = useTransform(
		progress,
		index === 0 ? [ 0, 1 ] : [ start, end ],
		index === 0 ? [ 1, 1 ] : [ 0, 1 ],
	);
	const contentY = useTransform( reveal, [ 0, 1 ], [ 18, 0 ] );

		return (
		<div className="relative h-[82svh] w-[72vw] shrink-0 sm:w-[52vw] lg:w-[35vw]">
			<motion.span
				aria-hidden="true"
				className="absolute start-1/2 top-1/2 z-10 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/70 bg-[#07110e] shadow-[0_0_0_5px_rgba(58,217,191,0.08),0_0_24px_rgba(58,217,191,0.35)] sm:h-7 sm:w-7"
			/>
			<motion.span
				aria-hidden="true"
				className="absolute start-1/2 top-1/2 z-20 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-bright shadow-[0_0_12px_rgba(58,217,191,0.9)] sm:h-2.5 sm:w-2.5"
				style={ { scale: reveal } }
			/>
			<motion.span
				aria-hidden="true"
				className={
					above
						? "absolute start-1/2 bottom-[calc(50%+0.875rem)] h-4 w-[2px] origin-bottom bg-gradient-to-t from-accent/80 to-accent/15"
						: "absolute start-1/2 top-[calc(50%+0.875rem)] h-4 w-[2px] origin-top bg-gradient-to-b from-accent/80 to-accent/15"
				}
				style={ { scaleY: reveal, opacity: reveal } }
			/>

			<motion.article
				dir="auto"
				className={ `${ above
					? "absolute inset-x-0 bottom-[calc(50%+2.5rem)]"
					: "absolute inset-x-0 top-[calc(50%+2.5rem)]"
					} ${ isFirstMilestone ? "" : "max-h-[46%] overflow-hidden" } border-s border-accent/35 ps-4 sm:ps-6` }
				style={ { opacity: reveal, y: contentY } }
			>
				<div className="flex flex-wrap items-center gap-x-3 gap-y-2">
					<span className="font-display text-3xl leading-none tracking-tight text-accent sm:text-4xl">
						{ milestone.year }
					</span>
					<span className="label-mono border border-line px-2 py-1 text-muted">
						{ milestone.period }
					</span>
				</div>
				<h3 className="mt-3 font-display text-lg leading-tight tracking-tight text-fg sm:text-xl lg:text-2xl">
					{ milestone.title }
				</h3>
				<p className="mt-2 line-clamp-2 text-xs font-medium leading-relaxed text-accent/90 sm:text-sm">
					{ milestone.subtitle }
				</p>
				<p
					className={
						index === 0
							? "mt-2 text-xs leading-relaxed text-muted sm:text-sm"
							: "mt-2 line-clamp-3 text-xs leading-relaxed text-muted sm:text-sm lg:line-clamp-4"
					}
				>
					{ milestone.description }
				</p>
				<p className="mt-3 line-clamp-2 text-xs font-medium leading-relaxed text-fg/80 sm:text-sm">
					<span
						aria-hidden="true"
						className="me-2 inline-block h-px w-4 align-middle bg-accent"
					/>
					{ milestone.highlight }
				</p>
			</motion.article>
		</div>
	);
}

export default function Timeline() {
	const { t } = useI18n();
	const copy = t.aboutPage;
	const reduce = useReducedMotion();
	const sectionRef = useRef( null );
	const trackRef = useRef( null );
	const [ travel, setTravel ] = useState( 0 );
	const milestones = copy.milestones;

	const { scrollYProgress } = useScroll( {
		target: sectionRef,
		offset: [ "start start", "end end" ],
	} );
	const trackX = useTransform( scrollYProgress, [ 0, 1 ], [ 0, -travel ] );
	const progressScale = useTransform( scrollYProgress, [ 0.16, 1 ], [ 0, 1 ] );

	useEffect( () => {
		if ( reduce ) return undefined;
		const track = trackRef.current;
		if ( !track ) return undefined;

		const measure = () => {
			const viewportWidth =
				document.documentElement.clientWidth || window.innerWidth;
			setTravel( Math.max( 0, track.scrollWidth - viewportWidth ) );
		};

		measure();
		const observer = new ResizeObserver( measure );
		observer.observe( track );
		window.addEventListener( "resize", measure );

		return () => {
			observer.disconnect();
			window.removeEventListener( "resize", measure );
		};
	}, [ reduce, milestones.length ] );

	const heading = (
		<>
			{ copy.timelineTitlePart1 }
			<span className="text-accent">{ copy.timelineTitleHighlight }</span>
		</>
	);

	if ( reduce ) {
		return (
			<section
				id="histoire"
				className="section-y relative overflow-hidden bg-surface zellige-spot zellige-spot--mid-start zellige-spot--small"
			>
				<div className="shell relative">
					<SectionHeader
						label={ copy.timelineEyebrow }
						title={ heading }
						description={ copy.timelineDescription }
					/>
					<div className="mt-8 grid gap-5 border border-line bg-page p-4 sm:mt-10 sm:p-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
						<div
							className="relative aspect-[16/8] overflow-hidden border border-accent/40 bg-deep shadow-[0_16px_40px_rgba(0,0,0,0.22)]"
							style={ {
								clipPath:
									"polygon(0 0, 94% 0, 100% 14%, 100% 100%, 6% 100%, 0 86%)",
							} }
						>
							<Image
								src={ studioImage }
								alt={ t.aboutHome.secondImageAlt }
								fill
								sizes="(max-width: 768px) 100vw, 34vw"
								className="object-cover"
							/>
							<div
								aria-hidden="true"
								className="absolute inset-0 bg-[linear-gradient(135deg,rgba(58,217,191,0.16),transparent_52%),linear-gradient(to_top,rgba(7,17,14,0.82),transparent_72%)]"
							/>
						</div>
						<div>
							<p className="label-mono text-accent">{ copy.thesisEyebrow }</p>
							<p className="mt-3 max-w-3xl text-sm leading-relaxed text-fg/85 sm:text-base">
								{ copy.thesisQuote }
							</p>
							<p className="mt-3 text-xs text-muted">{ copy.thesisAuthors }</p>
						</div>
					</div>
					<div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5">
						{ milestones.map( ( milestone ) => (
							<article
								key={ milestone.id }
								className="border border-line bg-page p-5 sm:p-7"
							>
								<p className="label-mono text-accent">
									{ milestone.year } · { milestone.period }
								</p>
								<h3 className="mt-3 font-display text-xl leading-tight text-fg">
									{ milestone.title }
								</h3>
								<p className="mt-2 text-sm font-medium text-accent/85">
									{ milestone.subtitle }
								</p>
								<p className="mt-3 text-sm leading-relaxed text-muted">
									{ milestone.description }
								</p>
								<p className="mt-4 border-s border-accent/60 ps-3 text-sm text-fg/80">
									{ milestone.highlight }
								</p>
							</article>
						) ) }
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			ref={ sectionRef }
			id="histoire"
			className="storyline-section relative bg-surface zellige-spot zellige-spot--mid-start zellige-spot--small"
			style={ { height: `calc(100svh + ${ travel }px)` } }
		>
			<div className="pt-12 sticky top-0 hidden h-svh overflow-hidden min-[1100px]:block">
				<motion.div
					ref={ trackRef }
					className="storyline-track relative flex h-full w-max items-center gap-[8vw] px-[8vw]"
					style={ { x: trackX } }
				>
					<div
						dir={ t.locale === "ar" ? "rtl" : "ltr" }
						className="w-[76vw] shrink-0 sm:w-[55vw] lg:w-[39vw]"
					>
						<p className="label-mono text-accent">{ copy.timelineEyebrow }</p>
						<h2 className="section-title mt-5 max-w-[18ch] text-fg">
							{ heading }
						</h2>
						<p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
							{ copy.timelineDescription }
						</p>
						<div
							className="relative mt-6 aspect-[16/8] bg-accent/45 p-px shadow-[0_18px_48px_rgba(0,0,0,0.28)] sm:mt-8"
							style={ {
								clipPath:
									"polygon(0 0, 94% 0, 100% 14%, 100% 100%, 6% 100%, 0 86%)",
							} }
						>
							<div
								className="relative h-full w-full overflow-hidden bg-deep"
								style={ {
									clipPath:
										"polygon(0 0, 94% 0, 100% 14%, 100% 100%, 6% 100%, 0 86%)",
								} }
							>
								<Image
									src={ studioImage }
									alt={ t.aboutHome.secondImageAlt }
									fill
									sizes="(max-width: 768px) 76vw, 39vw"
									className="object-cover transition-transform duration-700 hover:scale-[1.04]"
								/>
								<div
									aria-hidden="true"
									className="absolute inset-0 bg-[linear-gradient(135deg,rgba(58,217,191,0.2),transparent_52%),linear-gradient(to_top,rgba(7,17,14,0.82),transparent_72%)]"
								/>
								<p className="label-mono absolute inset-x-5 bottom-5 text-cream/85">
									SkemaLab · Essaouira
								</p>
							</div>
						</div>
						<p className="mt-4 line-clamp-2 max-w-xl text-xs leading-relaxed text-muted sm:text-sm">
							{ copy.thesisQuote }
						</p>
						<Button
							href="#fondateurs"
							variant="outline"
							size="sm"
							className="mt-5 border-line-strong text-fg hover:border-accent hover:text-accent"
						>
							{ copy.seeProfiles }
							<ArrowUpRight size={ 14 } className="rtl-flip" />
						</Button>
					</div>

					<div className="relative flex h-[82svh] w-max shrink-0 items-center gap-[6vw]">
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-[2px] bg-gradient-to-r from-accent/5 via-accent/25 to-accent/5"
						/>
						<motion.div
							aria-hidden="true"
							className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-[3px] origin-left bg-accent-bright shadow-[0_0_14px_rgba(58,217,191,0.65)]"
							style={ { scaleX: progressScale } }
						/>
						<span
							aria-hidden="true"
							className="pointer-events-none absolute start-0 top-1/2 z-[1] h-2 w-2 -translate-y-1/2 rounded-full border border-accent/50 bg-surface"
						/>
						<span
							aria-hidden="true"
							className="pointer-events-none absolute end-0 top-1/2 z-[1] h-2 w-2 -translate-y-1/2 rounded-full border border-accent/50 bg-surface"
						/>
						{ milestones.map( ( milestone, index ) => (
							<MilestoneCard
								key={ milestone.id }
								milestone={ milestone }
								index={ index }
								total={ milestones.length }
								progress={ scrollYProgress }
							/>
						) ) }
					</div>
				</motion.div>
			</div>
		<div className="shell section-y relative min-[1100px]:hidden">
				<SectionHeader
					label={ copy.timelineEyebrow }
					title={ heading }
					description={ copy.timelineDescription }
				/>
				<div className="mt-8 grid gap-5 border border-line bg-page p-4 sm:mt-10 sm:p-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
					<div
						className="relative aspect-[16/10] overflow-hidden border border-accent/40 bg-deep shadow-[0_16px_40px_rgba(0,0,0,0.22)] sm:aspect-[16/9]"
						style={ {
							clipPath:
								"polygon(0 0, 94% 0, 100% 14%, 100% 100%, 6% 100%, 0 86%)",
						} }
					>
						<Image
							src={ studioImage }
							alt={ t.aboutHome.secondImageAlt }
							fill
							sizes="(max-width: 768px) 100vw, 34vw"
							className="object-cover"
						/>
						<div
							aria-hidden="true"
							className="absolute inset-0 bg-[linear-gradient(135deg,rgba(58,217,191,0.16),transparent_52%),linear-gradient(to_top,rgba(7,17,14,0.82),transparent_72%)]"
						/>
					</div>
					<div>
						<p className="label-mono text-accent">{ copy.thesisEyebrow }</p>
						<p className="mt-3 text-sm leading-relaxed text-fg/85 sm:text-base">
							{ copy.thesisQuote }
						</p>
						<p className="mt-3 text-xs text-muted">{ copy.thesisAuthors }</p>
					</div>
				</div>
				<ol className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 sm:gap-5 xl:gap-6">
					{ milestones.map( ( milestone ) => (
						<li
							key={ milestone.id }
							className="border border-line bg-page p-5 sm:p-6"
						>
							<p className="label-mono text-accent">
								{ milestone.year } · { milestone.period }
							</p>
							<h3 className="mt-3 font-display text-xl leading-tight text-fg sm:text-2xl">
								{ milestone.title }
							</h3>
							<p className="mt-2 text-sm font-medium leading-relaxed text-accent/85">
								{ milestone.subtitle }
							</p>
							<p className="mt-3 text-sm leading-relaxed text-muted">
								{ milestone.description }
							</p>
							<p className="mt-4 border-s border-accent/60 ps-3 text-sm leading-relaxed text-fg/80">
								{ milestone.highlight }
							</p>
						</li>
					) ) }
				</ol>
			</div>
		</section>
	);
}
