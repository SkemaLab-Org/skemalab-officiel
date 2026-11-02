"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useI18n } from "@/components/I18nProvider";
import IntroStage from "@/components/IntroStage";
import RibbonField from "@/components/canvas/RibbonField";
import Button from "@/components/ui/Button";
import { shouldRunIntro } from "@/lib/intro";

const segmenter =
	typeof Intl !== "undefined" && Intl.Segmenter
		? new Intl.Segmenter( undefined, { granularity: "grapheme" } )
		: null;

function splitWord( word ) {
	if ( segmenter ) {
		return Array.from( segmenter.segment( word ), ( part ) => part.segment );
	}
	return Array.from( word );
}

const GLYPH_DURATION = "900ms";
const GLYPH_EASE = "cubic-bezier(.16,1,.3,1)";

export default function Hero() {
	const { t, isRTL } = useI18n();
	const reduce = useReducedMotion();
	const [ intro, setIntro ] = useState( false );
	const [ revealed, setRevealed ] = useState( true );

	useEffect( () => {
		if ( shouldRunIntro() ) {
			const id = requestAnimationFrame( () => {
				setIntro( true );
				setRevealed( false );
			} );
			return () => cancelAnimationFrame( id );
		}
	}, [] );

	const containerRef = useRef( null );
	const headline = t.hero.headline;
	const words = useMemo(
		() =>
			headline
				.split( " " )
				.filter( Boolean )
				.map( ( word ) => splitWord( word ) ),
		[ headline ],
	);

	const pillarLabels = t.hero.pillars.map( ( pillar ) => pillar.label ).join( " · " );

	const contentStyle = ( delay ) => ( {
		opacity: revealed ? 1 : 0,
		transform: revealed ? "none" : "translateY(20px)",
		transition: reduce
			? "none"
			: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${ delay }ms, transform 0.9s cubic-bezier(.16,1,.3,1) ${ delay }ms`,
	} );

	let glyphIndex = -1;

	return (
		<>
			{ intro ? <IntroStage onDone={ () => setRevealed( true ) } /> : null }

			<section
				ref={ containerRef }
				className="stage dark bg-[#07110e] text-cream"
				id="hero"
			>
				<div className="pin">
					<RibbonField />

					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(7,17,14,0.94)_0%,rgba(7,17,14,0.68)_42%,rgba(7,17,14,0)_76%)]"
					/>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_32%,rgba(7,17,14,0.62)_100%)]"
					/>

					<div className="hero-inner shell relative z-10 flex flex-1 flex-col justify-end pb-8 pt-24 sm:pb-10 sm:pt-28">
						<div
							style={ contentStyle( 0 ) }
							className="hero-meta flex flex-col gap-2 pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
						>
							<span className="label-mono text-[#f2ede2]/75">
								{ t.hero.eyebrow }
							</span>
							<div className="flex flex-wrap items-center gap-x-6 gap-y-2">
								<span className="label-mono text-[#f2ede2]/75">
									{ t.hero.location }
								</span>
								<span className="label-mono text-[#f2ede2]/75">
									{ pillarLabels }
								</span>
							</div>
						</div>

						<h1
							id="hero-title"
							aria-label={ headline }
							style={ contentStyle( reduce ? 0 : 60 ) }
							className={
								isRTL
									? "mt-8 max-w-[14ch] font-display text-[clamp(2.5rem,6.5vw,6rem)] font-light leading-[1.15] tracking-normal text-balance text-white"
									: "mt-8 max-w-[15ch] font-display text-[clamp(3rem,8vw,8rem)] font-light leading-[0.9] tracking-[-0.05em] text-white"
							}
						>
							{ isRTL ? (
								<span aria-hidden="true">{ headline }</span>
							) : (
								words.map( ( glyphs, wordIndex ) => (
									<span
										key={ `${ glyphs.join( "" ) }-${ wordIndex }` }
										aria-hidden="true"
										className="me-[0.22em] inline-block whitespace-nowrap"
									>
										{ glyphs.map( ( glyph ) => {
											glyphIndex += 1;
											const delay = 80 + glyphIndex * 42;
											return (
												<span
													key={ `${ glyph }-${ glyphIndex }` }
													className="inline-block"
													style={ {
														opacity: revealed ? 1 : 0,
														transform: revealed ? "none" : "translateY(0.32em)",
														transition: reduce
															? "none"
															: `opacity ${ GLYPH_DURATION } ${ GLYPH_EASE } ${ delay }ms, transform ${ GLYPH_DURATION } ${ GLYPH_EASE } ${ delay }ms`,
													} }
												>
													{ glyph }
												</span>
											);
										} ) }
									</span>
								) )
							) }
						</h1>

						<div
							style={ contentStyle( reduce ? 0 : 340 ) }
							className="mt-8 flex flex-col gap-6 sm:mt-10 lg:flex-row lg:items-end lg:justify-between"
						>
							<p className="max-w-[38ch] text-[15px] leading-[1.7] text-[#a2b8b1]">
								{ t.hero.subheading }
							</p>
							<div className="flex flex-wrap items-center gap-3">
								<Button href="#contact" className="rounded-none">
									{ t.hero.ctaPrimary }
								</Button>
								<Button
									href="#services"
									variant="outline"
									className="rounded-none border-[rgba(242,237,226,0.3)] text-[#f2ede2] hover:border-[#3ad9bf] hover:text-[#3ad9bf]"
								>
									{ t.hero.ctaAll }
								</Button>
							</div>
						</div>

						<nav
							aria-label={ t.hero.ctaAll }
							style={ contentStyle( reduce ? 0 : 420 ) }
							className="mt-10 grid grid-cols-3"
						>
							{ t.hero.pillars.map( ( pillar ) => (
								<a
									key={ pillar.id }
									href="#services"
									className="group flex min-w-0 flex-col gap-1.5 py-5 pe-4"
								>
									<span className="label-mono text-[#f2ede2]/75 transition-colors group-hover:text-[#3ad9bf]">
										{ pillar.label }
									</span>
									<span className="hidden truncate text-sm text-[#a2b8b1] transition-colors group-hover:text-[#f2ede2] sm:block">
										{ pillar.title }
									</span>
								</a>
							) ) }
						</nav>
					</div>

					<div
						aria-hidden="true"
						className="hero-alt shell pointer-events-none"
					>
						<span className="label-mono mb-3 block text-[#3ad9bf]">
							{ t.hero.altEyebrow || "Sans templates, sans compromis" }
						</span>
						<h2 className="max-w-[26ch] font-display text-[clamp(1.8rem,4.2vw,3.4rem)] font-light leading-[1.06] tracking-[-0.035em] text-[#f2ede2]">
							{ t.hero.altHeadline ||
								"Chaque ligne de code, chaque campagne et chaque workflow sont conçus sur mesure pour votre rentabilité." }
						</h2>
					</div>

					<span className="scroll-hint label-mono text-[#a2b8b1]">
						{ t.hero.scrollHint || "Scroll" }
					</span>
				</div>
			</section>
		</>
	);
}
