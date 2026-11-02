"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useI18n } from "@/components/I18nProvider";
import { useTheme } from "@/components/ThemeProvider";
import BandHeader from "@/components/ui/BandHeader";

export default function Process() {
	const { t } = useI18n();
	const { theme } = useTheme();
	const reduce = useReducedMotion();
	const isDark = theme !== "light";
	const copy = t.processSection;
	const steps = copy.steps;

	const canvasRef = useRef( null );
	const [ phase, setPhase ] = useState( 0 );
	const [ progress, setProgress ] = useState( 0 );
	const phaseRef = useRef( phase );
	useEffect( () => {
		phaseRef.current = phase;
	}, [ phase ] );

	useEffect( () => {
		if ( reduce ) return undefined;
		const engEl = document.getElementById( "engine" );
		if ( !engEl ) return undefined;

		// The pinned engine stage only renders on desktop; mobile uses the flat list.
		const mq = window.matchMedia( "(min-width: 900px)" );
		let raf = 0;

		function sync() {
			const r = engEl.getBoundingClientRect();
			const travel = Math.max( 1, r.height - window.innerHeight );
			const p = Math.max( 0, Math.min( 1, -r.top / travel ) );
			setProgress( p );

			const ph = p < 0.32 ? 0 : p < 0.58 ? 1 : p < 0.82 ? 2 : 3;
			setPhase( ph );
			raf = requestAnimationFrame( sync );
		}

		function start() {
			if ( raf || !mq.matches ) return;
			raf = requestAnimationFrame( sync );
		}

		function stop() {
			if ( raf ) cancelAnimationFrame( raf );
			raf = 0;
		}

		start();
		const onChange = () => ( mq.matches ? start() : stop() );
		mq.addEventListener( "change", onChange );
		return () => {
			stop();
			mq.removeEventListener( "change", onChange );
		};
	}, [ reduce ] );
	const activeStep = steps[ phase ] || steps[ 0 ];
	const stepNumber = String( phase + 1 ).padStart( 2, "0" );

	const statusText =
		progress < 0.05
			? copy.statusIdle || "Faites défiler pour exécuter la méthode"
			: copy.statusSteps?.[ phase ] || activeStep.text;

	// Interactive 2D canvas drawing 4 procedural phases
	useEffect( () => {
		const canvas = canvasRef.current;
		if ( !canvas || reduce ) return undefined;
		const ctx = canvas.getContext( "2d" );
		if ( !ctx ) return undefined;

		let raf = 0;
		let mounted = true;

		// Only animate while the pinned engine stage is actually visible.
		const mq = window.matchMedia( "(min-width: 900px)" );

		const fit = () => {
			const dpr = Math.min( window.devicePixelRatio || 1, 2 );
			const rect = canvas.getBoundingClientRect();
			const w = Math.max( 1, Math.round( rect.width * dpr ) );
			const h = Math.max( 1, Math.round( rect.height * dpr ) );
			if ( canvas.width !== w || canvas.height !== h ) {
				canvas.width = w;
				canvas.height = h;
			}
			return dpr;
		};

		let dpr = 1;
		const onResize = () => {
			if ( !mq.matches ) return;
			dpr = fit();
		};
		window.addEventListener( "resize", onResize, { passive: true } );

		let startedAt = 0;

		const render = ( now ) => {
			if ( !mounted ) return;
			if ( !startedAt ) startedAt = now;
			const t = ( now - startedAt ) * 0.001;

			const w = canvas.width;
			const h = canvas.height;
			ctx.clearRect( 0, 0, w, h );
			const colors = isDark
				? {
					accent: "rgba(58, 217, 191, 0.95)",
					accentFill: "rgba(58, 217, 191, 0.8)",
					accentFaint: "rgba(58, 217, 191, 0.35)",
					guide: "rgba(242, 237, 226, 0.1)",
					dot: "#5eead4",
				}
				: {
					accent: "rgba(10, 107, 94, 0.95)",
					accentFill: "rgba(10, 107, 94, 0.8)",
					accentFaint: "rgba(10, 107, 94, 0.35)",
					guide: "rgba(8, 28, 23, 0.12)",
					dot: "#085e52",
				};

			const curPhase = phaseRef.current;
			// Phase 0: Diagnostic — Telemetry signal & high-precision audit waveform
			if ( curPhase === 0 ) {
				ctx.fillStyle = colors.accentFill;
				ctx.lineWidth = Math.max( 1.5, 2 * dpr );

				ctx.beginPath();
				for ( let i = 0; i <= w; i += 4 * dpr ) {
					const u = i / w;
					const env = Math.sin( u * Math.PI );
					const y =
						h / 2 +
						Math.sin( u * 18 + t * 2.2 ) * ( h * 0.28 ) * env +
						Math.sin( u * 42 - t * 3.1 ) * ( h * 0.08 ) * env;
					if ( i === 0 ) ctx.moveTo( i, y );
					else ctx.lineTo( i, y );
				}
				ctx.stroke();

				// Scanning vertical probe bar
				const probeX = ( ( t * 0.35 ) % 1 ) * w;
				ctx.strokeStyle = colors.accentFaint;
				ctx.lineWidth = 1 * dpr;
				ctx.beginPath();
				ctx.moveTo( probeX, 0 );
				ctx.lineTo( probeX, h );
				ctx.stroke();

				// Telemetry dots
				ctx.fillStyle = colors.accent;
				for ( let k = 0; k < 6; k += 1 ) {
					const px = ( ( k * 0.17 + t * 0.1 ) % 1 ) * w;
					const py =
						h / 2 +
						Math.sin( ( px / w ) * 18 + t * 2.2 ) *
						( h * 0.28 ) *
						Math.sin( ( px / w ) * Math.PI );
					ctx.beginPath();
					ctx.arc( px, py, 3.5 * dpr, 0, Math.PI * 2 );
					ctx.fill();
				}
			} else if ( curPhase === 1 ) {
				const cols = 6;
				const rows = 4;
				const cellW = w / cols;
				const cellH = h / rows;

				ctx.lineWidth = Math.max( 1, 1.2 * dpr );

				// Connected grid lines
				for ( let r = 0; r < rows; r += 1 ) {
					for ( let c = 0; c < cols; c += 1 ) {
						const cx = c * cellW + cellW * 0.5;
						const cy = r * cellH + cellH * 0.5;
						const pulse = Math.sin( t * 1.8 + c * 0.6 + r * 0.9 ) * 0.5 + 0.5;

						// Horizontal & vertical interconnects
						if ( c < cols - 1 ) {
							ctx.strokeStyle = isDark
								? `rgba(58, 217, 191, ${ 0.1 + pulse * 0.35 })`
								: `rgba(10, 107, 94, ${ 0.12 + pulse * 0.4 })`;
							ctx.beginPath();
							ctx.moveTo( cx, cy );
							ctx.lineTo( cx + cellW, cy );
							ctx.stroke();
						}
						if ( r < rows - 1 ) {
							ctx.strokeStyle = isDark
								? `rgba(58, 217, 191, ${ 0.1 + ( 1 - pulse ) * 0.35 })`
								: `rgba(10, 107, 94, ${ 0.12 + ( 1 - pulse ) * 0.4 })`;
							ctx.beginPath();
							ctx.moveTo( cx, cy );
							ctx.lineTo( cx, cy + cellH );
							ctx.stroke();
						}

						// Node box
						ctx.fillStyle = isDark
							? `rgba(58, 217, 191, ${ 0.12 + pulse * 0.4 })`
							: `rgba(10, 107, 94, ${ 0.1 + pulse * 0.35 })`;
						ctx.fillRect( cx - 8 * dpr, cy - 8 * dpr, 16 * dpr, 16 * dpr );

						ctx.strokeStyle = isDark
							? `rgba(58, 217, 191, ${ 0.4 + pulse * 0.5 })`
							: `rgba(10, 107, 94, ${ 0.45 + pulse * 0.5 })`;
						ctx.strokeRect( cx - 8 * dpr, cy - 8 * dpr, 16 * dpr, 16 * dpr );
					}
				}
			}
			// Phase 2: Exécution — 3 parallel delivery sprint lanes (Build, Grow, Automate)
			else if ( curPhase === 2 ) {
				const lanes = 3;
				const laneH = h / ( lanes + 1 );

				for ( let s = 0; s < lanes; s += 1 ) {
					const yCenter = laneH * ( s + 1 );
					const speed = 1.6 + s * 0.45;
					const freq = 12 + s * 4;

					// Lane guide
					ctx.strokeStyle = colors.guide;
					ctx.lineWidth = 1 * dpr;
					ctx.beginPath();
					ctx.moveTo( 0, yCenter );
					ctx.lineTo( w, yCenter );
					ctx.stroke();

					// Active wave for this lane
					ctx.strokeStyle = isDark
						? `rgba(58, 217, 191, ${ 0.5 + s * 0.22 })`
						: `rgba(10, 107, 94, ${ 0.55 + s * 0.22 })`;
					ctx.lineWidth = Math.max( 1.5, 2 * dpr );
					ctx.beginPath();
					for ( let px = 0; px <= w; px += 4 * dpr ) {
						const u = px / w;
						const y = yCenter + Math.sin( u * freq + t * speed ) * ( laneH * 0.32 );
						if ( px === 0 ) ctx.moveTo( px, y );
						else ctx.lineTo( px, y );
					}
					ctx.stroke();

					// Flowing delivery packets
					const packetX = ( ( t * 0.25 * ( s + 1 ) ) % 1 ) * w;
					const packetY =
						yCenter +
						Math.sin( ( packetX / w ) * freq + t * speed ) * ( laneH * 0.32 );
					ctx.fillStyle = colors.dot;
					ctx.beginPath();
					ctx.arc( packetX, packetY, 4.5 * dpr, 0, Math.PI * 2 );
					ctx.fill();
				}
			}
			// Phase 3: Optimisation — Circular telemetry radar & continuous feedback loop
			else {
				const cx = w / 2;
				const cy = h / 2;
				const radius = Math.min( w, h ) * 0.34;

				// Outer reference orbit
				ctx.strokeStyle = colors.accentFaint;
				ctx.lineWidth = 1 * dpr;
				ctx.beginPath();
				ctx.arc( cx, cy, radius, 0, Math.PI * 2 );
				ctx.stroke();

				ctx.beginPath();
				ctx.arc( cx, cy, radius * 0.62, 0, Math.PI * 2 );
				ctx.stroke();

				// Rotating radar sweep
				const angle = ( t * 1.4 ) % ( Math.PI * 2 );
				ctx.strokeStyle = colors.accent;
				ctx.lineWidth = Math.max( 1.8, 2.4 * dpr );
				ctx.beginPath();
				ctx.arc( cx, cy, radius, angle - 1.2, angle );
				ctx.stroke();

				// Sweep needle
				ctx.strokeStyle = colors.accent;
				ctx.beginPath();
				ctx.moveTo( cx, cy );
				ctx.lineTo(
					cx + Math.cos( angle ) * radius,
					cy + Math.sin( angle ) * radius,
				);
				ctx.stroke();

				// Orbiting feedback satellite node
				const satX = cx + Math.cos( angle ) * radius;
				const satY = cy + Math.sin( angle ) * radius;
				ctx.fillStyle = colors.dot;
				ctx.beginPath();
				ctx.arc( satX, satY, 4 * dpr, 0, Math.PI * 2 );
				ctx.fill();

				// Center hub
				ctx.fillStyle = colors.accent;
				ctx.beginPath();
				ctx.arc( cx, cy, 5 * dpr, 0, Math.PI * 2 );
				ctx.fill();
			}

			raf = requestAnimationFrame( render );
		};

		function start() {
			if ( raf || !mounted || !mq.matches ) return;
			dpr = fit();
			raf = requestAnimationFrame( render );
		}

		function stop() {
			if ( raf ) cancelAnimationFrame( raf );
			raf = 0;
		}

		const onChange = () => ( mq.matches ? start() : stop() );
		mq.addEventListener( "change", onChange );
		start();

		return () => {
			mounted = false;
			stop();
			window.removeEventListener( "resize", onResize );
			mq.removeEventListener( "change", onChange );
		};
	}, [ reduce, isDark ] );

	if ( reduce ) {
		return (
			<section id="method" className="section-y bg-surface zellige-spot zellige-spot--top-start zellige-spot--small">
				<div className="shell">
					<BandHeader
						index="02"
						label={ copy.eyebrow }
						title={ copy.title }
						description={ copy.description }
					/>
					<ol className="mt-12 grid list-none grid-cols-1 gap-px border-y border-line bg-line p-0 sm:mt-16 min-[560px]:grid-cols-2 min-[1000px]:grid-cols-4">
						{ steps.map( ( step, index ) => (
							<li
								key={ step.step }
								className="flex flex-col bg-surface px-6 py-7 sm:px-7 sm:py-8"
							>
								<div className="flex items-baseline justify-between gap-4">
									<span className="label-mono text-muted">{ step.step }</span>
									<span className="label-mono text-muted" aria-hidden="true">
										{ String( index + 1 ).padStart( 2, "0" ) } /{ " " }
										{ String( steps.length ).padStart( 2, "0" ) }
									</span>
								</div>
								<h3 className="mt-6 font-display text-[21px] leading-tight tracking-[-0.01em] text-fg">
									{ step.title }
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-muted">
									{ step.text }
								</p>
							</li>
						) ) }
					</ol>
				</div>
			</section>
		);
	}

	/* ── Flat layout: mobile (<900 px) ── */
	const flatSteps = (
		<section className="section-y bg-surface zellige-spot zellige-spot--top-start zellige-spot--small min-[900px]:hidden">
			<div className="shell">
				<BandHeader
					index="02"
					label={ copy.eyebrow }
					title={ copy.title }
					description={ copy.description }
				/>
				<ol className="mt-10 flex list-none flex-col divide-y divide-line border-y border-line p-0">
					{ steps.map( ( step, index ) => (
						<li key={ step.step } className="flex flex-col py-7">
							<div className="flex items-baseline justify-between gap-4">
								<span className="label-mono text-accent">{ step.step }</span>
								<span className="label-mono text-muted" aria-hidden="true">
									{ String( index + 1 ).padStart( 2, "0" ) } /{ " " }
									{ String( steps.length ).padStart( 2, "0" ) }
								</span>
							</div>
							<h3 className="mt-4 font-display text-[21px] leading-tight tracking-[-0.01em] text-fg">
								{ step.title }
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted">
								{ step.text }
							</p>
						</li>
					) ) }
				</ol>
			</div>
		</section>
	);

	return (
		<>
			<span id="method" aria-hidden="true" className="block h-0" />

			{/* Mobile flat steps — hidden on desktop */ }
			{ flatSteps }

			{/* Desktop pinned scroll-through — hidden on mobile */ }
			<section className="stage hidden min-[900px]:block" id="engine">
				<div className="pin zellige-spot zellige-spot--mid-end zellige-spot--small">
					<div className="eng">
						<BandHeader
							className="col-span-full mb-[-12px]"
							index="02"
							label={ copy.eyebrow }
							title={ copy.title }
							description={ copy.description }
						/>
						<div className="cues">
							{ steps.map( ( step, index ) => {
								const isOn = index <= phase;
								return (
									<div
										key={ step.step }
										data-cue={ index }
										role="button"
										tabIndex={ 0 }
										onClick={ () => {
											const engineEl = document.getElementById( "engine" );
											if ( !engineEl ) return;
											const r = engineEl.getBoundingClientRect();
											const travel = r.height - window.innerHeight;
											const targets = [ 0.1, 0.45, 0.7, 0.95 ];
											window.scrollTo( {
												top: window.scrollY + r.top + travel * targets[ index ],
												behavior: "smooth",
											} );
										} }
										onKeyDown={ ( e ) => {
											if ( e.key === "Enter" || e.key === " " ) {
												e.preventDefault();
												const engineEl = document.getElementById( "engine" );
												if ( !engineEl ) return;
												const r = engineEl.getBoundingClientRect();
												const travel = r.height - window.innerHeight;
												const targets = [ 0.1, 0.45, 0.7, 0.95 ];
												window.scrollTo( {
													top: window.scrollY + r.top + travel * targets[ index ],
													behavior: "smooth",
												} );
											}
										} }
										className={ `cue ${ isOn ? "on" : "" }` }
									>
										<b className="font-display">{ step.title }</b>
										<span>{ step.text }</span>
									</div>
								);
							} ) }
						</div>

						<div className="eng-stage">
							<canvas ref={ canvasRef } id="engCanvas" aria-hidden="true" />
							<div className="eng-hud">
								<span className="no" id="engNo">
									{ stepNumber }
								</span>
								<span className="label-mono uppercase" id="engName">
									{ activeStep.title }
								</span>
							</div>
							<span className="eng-status" id="engStatus">
								{ statusText }
							</span>
							<i className="eng-meter" />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
