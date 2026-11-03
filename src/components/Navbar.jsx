"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/components/I18nProvider";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CalendlyButton = dynamic( () => import( "@/components/CalendlyButton" ), {
	ssr: false,
	loading: () => (
		<span className="inline-flex min-h-11 items-center justify-center rounded-none bg-brand px-5 text-[13px] font-medium text-on-brand opacity-80">
			RDV
		</span>
	),
} );

const MENU_ID = "mobile-nav-menu";
const SECTION_IDS = [ "services", "method", "projets", "agence", "contact" ];
const FOCUSABLE =
	'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Pages whose hero is an always-dark brand surface. The header keeps its
// cream-on-dark treatment there regardless of the active theme; every other
// route follows the theme through the `dark` class so it matches before
// hydration.
const DARK_HERO_ROUTES = new Set( [ "/", "/our-story" ] );

export default function Navbar() {
	const { t } = useI18n();
	const pathname = usePathname();
	const navLinks = t.nav;
	const darkSurface = DARK_HERO_ROUTES.has( pathname );

	const [ scrolled, setScrolled ] = useState( false );
	const [ hidden, setHidden ] = useState( false );
	const [ open, setOpen ] = useState( false );
	const [ active, setActive ] = useState( "" );
	const [ trackedPathname, setTrackedPathname ] = useState( pathname );

	// A new route starts at the top, so the header must be available again.
	// Adjusting state during render is React's recommended pattern for reacting
	// to a prop change without an extra effect pass.
	if ( trackedPathname !== pathname ) {
		setTrackedPathname( pathname );
		setHidden( false );
	}
	const menuButtonRef = useRef( null );
	const panelRef = useRef( null );
	const closeButtonRef = useRef( null );

	const { scrollYProgress } = useScroll();
	const progress = useSpring( scrollYProgress, {
		stiffness: 120,
		damping: 30,
		mass: 0.2,
	} );

	useEffect( () => {
		let last = window.scrollY;
		let direction = 0;
		let frame = 0;

		// The header only hides once the visitor has committed to scrolling down,
		// and only reappears after a clear upward intent. Without this hysteresis
		// trackpad jitter and iOS rubber-banding make it peek in and out.
		const HIDE_AFTER = 180;
		const DIRECTION_THRESHOLD = 10;

		const onScroll = () => {
			if ( frame ) return;
			frame = requestAnimationFrame( () => {
				const y = Math.max( 0, window.scrollY );
				const delta = y - last;

				setScrolled( y > 24 );

				if ( y <= 24 ) {
					direction = 0;
					setHidden( false );
				} else if ( delta !== 0 ) {
					direction =
						Math.sign( delta ) === Math.sign( direction )
							? direction + delta
							: delta;

					if ( direction > DIRECTION_THRESHOLD && y > HIDE_AFTER ) {
						setHidden( true );
					} else if ( direction < -DIRECTION_THRESHOLD ) {
						setHidden( false );
					}
				}

				last = y;
				frame = 0;
			} );
		};

		onScroll();
		window.addEventListener( "scroll", onScroll, { passive: true } );
		return () => {
			window.removeEventListener( "scroll", onScroll );
			if ( frame ) cancelAnimationFrame( frame );
		};
	}, [] );

	useEffect( () => {
		if ( pathname !== "/" ) return undefined;

		const elements = SECTION_IDS.map( ( id ) =>
			document.getElementById( id ),
		).filter( Boolean );
		if ( !elements.length ) return undefined;

		const observer = new IntersectionObserver(
			( entries ) => {
				entries.forEach( ( entry ) => {
					if ( entry.isIntersecting ) setActive( `/#${ entry.target.id }` );
				} );
			},
			{ rootMargin: "-45% 0px -50% 0px", threshold: 0 },
		);

		elements.forEach( ( element ) => observer.observe( element ) );
		return () => observer.disconnect();
	}, [ pathname ] );

	useEffect( () => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [ open ] );

	useEffect( () => {
		if ( !open ) return undefined;
		const onKey = ( event ) => {
			if ( event.key === "Escape" ) {
				setOpen( false );
				queueMicrotask( () => menuButtonRef.current?.focus() );
				return;
			}
			if ( event.key !== "Tab" || !panelRef.current ) return;
			const nodes = Array.from( panelRef.current.querySelectorAll( FOCUSABLE ) );
			if ( !nodes.length ) return;
			const first = nodes[ 0 ];
			const last = nodes[ nodes.length - 1 ];
			if ( event.shiftKey && document.activeElement === first ) {
				event.preventDefault();
				last.focus();
			} else if ( !event.shiftKey && document.activeElement === last ) {
				event.preventDefault();
				first.focus();
			}
		};
		window.addEventListener( "keydown", onKey );
		return () => window.removeEventListener( "keydown", onKey );
	}, [ open ] );

	useEffect( () => {
		const onResize = () => {
			if ( window.innerWidth >= 1100 ) setOpen( false );
		};
		window.addEventListener( "resize", onResize );
		return () => window.removeEventListener( "resize", onResize );
	}, [] );

	useEffect( () => {
		if ( open ) queueMicrotask( () => closeButtonRef.current?.focus() );
	}, [ open ] );

	const closeMenu = useCallback( () => {
		setOpen( false );
		queueMicrotask( () => menuButtonRef.current?.focus() );
	}, [] );

	const mobileMenu =
		typeof document !== "undefined"
			? createPortal(
				<AnimatePresence>
					{ open ? (
						<motion.div
							id={ MENU_ID }
							ref={ panelRef }
							role="dialog"
							aria-modal="true"
							aria-label={ t.common.menuLabel }
							className="fixed inset-0 z-[95] flex flex-col bg-page text-fg min-[1100px]:hidden"
							initial={ { opacity: 0 } }
							animate={ { opacity: 1 } }
							exit={ { opacity: 0 } }
							transition={ { duration: 0.25 } }
						>
							<div className="relative flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
								<BrandMark onClick={ closeMenu } className="h-7" />
								<button
									ref={ closeButtonRef }
									type="button"
									aria-label={ t.common.closeMenu }
									className="flex h-11 w-11 items-center justify-center rounded-none border border-line-strong text-fg transition-colors hover:border-accent hover:text-accent"
									onClick={ closeMenu }
								>
									<X size={ 18 } />
								</button>
							</div>

							<div className="relative flex flex-1 flex-col overflow-y-auto px-5 py-8">
								<nav className="flex flex-col" aria-label="Mobile">
									{ navLinks.map( ( link, index ) => (
										<motion.a
											key={ link.href }
											href={ link.href }
											onClick={ closeMenu }
											className="group flex min-h-16 items-center justify-between gap-4 border-b border-line py-4"
											initial={ { opacity: 0, y: 14 } }
											animate={ { opacity: 1, y: 0 } }
											transition={ {
												delay: 0.05 + index * 0.05,
												ease: EASE.out,
												duration: 0.45,
											} }
										>
											<span className="flex items-baseline gap-4">
												<span className="label-mono text-muted">
													0{ index + 1 }
												</span>
												<span className="font-display text-3xl tracking-tight text-fg">
													{ link.label }
												</span>
											</span>
											<ArrowUpRight
												size={ 20 }
												className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl-flip"
											/>
										</motion.a>
									) ) }
								</nav>

								<div className="mt-8">
									<LanguageSwitcher isMobile />
								</div>

								<div className="mt-auto space-y-4  pt-6">
									<CalendlyButton
										className="w-full rounded-none"
										onBeforeOpen={ closeMenu }
									>
										{ t.common.bookingCta }
									</CalendlyButton>
									<p className="text-center text-xs text-muted">
										{ t.common.tagline }
									</p>
								</div>
							</div>
						</motion.div>
					) : null }
				</AnimatePresence>,
				document.body,
			)
			: null;

	return (
		<>
			<motion.header
				className={ cn(
					"fixed inset-x-0 top-0 z-[80] will-change-transform transition-colors duration-300",
					darkSurface ? "text-cream" : "text-fg dark:text-cream",
					scrolled
						? darkSurface
							? "border-b border-cream/10 bg-[#07110e]/85 backdrop-blur-xl"
							: "border-b border-line bg-page/85 backdrop-blur-xl dark:border-cream/10 dark:bg-[#07110e]/85"
						: "bg-transparent",
				) }
				animate={ { y: hidden && !open ? "-100%" : "0%" } }
				transition={ { duration: 0.4, ease: EASE.out } }
			>
				<div className="shell flex h-16 items-center justify-between gap-4 min-[1100px]:h-20">
					<div className="flex min-w-0 items-center gap-5">
						<BrandMark
							tone={ darkSurface ? "dark" : "auto" }
							className="h-7 lg:h-8"
							priority
						/>
					</div>

					<nav
						className="hidden items-center gap-1 min-[1100px]:flex"
						aria-label="Principale"
					>
						{ navLinks.map( ( link ) => {
							const isActive =
								( pathname === "/" && active === link.href ) ||
								( pathname === "/our-story" && link.href === "/our-story" );
							return (
								<Link
									key={ link.href }
									href={ link.href }
									aria-current={ isActive ? "true" : undefined }
									className={ cn(
										"label-mono relative whitespace-nowrap px-2 py-2 transition-colors duration-300 xl:px-3",
										darkSurface
											? isActive
												? "text-cream"
												: "text-cream/65 hover:text-cream"
											: isActive
												? "text-fg dark:text-cream"
												: "text-muted hover:text-fg dark:text-cream/65 dark:hover:text-cream",
									) }
								>
									{ link.label }
									{ isActive ? (
										<motion.span
											layoutId="nav-active"
											className={ cn(
												"absolute inset-x-2 -bottom-0.5 h-px",
												darkSurface
													? "bg-accent-bright"
													: "bg-accent dark:bg-accent-bright",
											) }
											transition={ { duration: 0.4, ease: EASE.out } }
										/>
									) : null }
								</Link>
							);
						} ) }
					</nav>

					<div className="hidden items-center gap-2 min-[1100px]:flex">
						<LanguageSwitcher onDark={ darkSurface } />
						<ThemeToggle onDark={ darkSurface } />
						<CalendlyButton className="min-h-10 rounded-none px-4 py-2 text-[13px]">
							{ t.common.bookingCta }
						</CalendlyButton>
					</div>

					<div className="flex items-center gap-2 min-[1100px]:hidden">
						<ThemeToggle onDark={ darkSurface } />
						<button
							ref={ menuButtonRef }
							type="button"
							aria-label={ t.common.openMenu }
							aria-expanded={ open }
							aria-controls={ MENU_ID }
							className={ cn(
								"flex h-11 w-11 items-center justify-center rounded-none border transition-colors",
								darkSurface
									? "border-cream/20 text-cream hover:border-accent-bright hover:text-accent-bright"
									: "border-line-strong text-fg hover:border-accent hover:text-accent dark:border-cream/20 dark:text-cream dark:hover:border-accent-bright dark:hover:text-accent-bright",
							) }
							onClick={ () => setOpen( true ) }
						>
							<Menu size={ 18 } />
						</button>
					</div>
				</div>

				<motion.div
					aria-hidden="true"
					className={ cn(
						"absolute inset-x-0 bottom-0 h-px origin-left",
						darkSurface
							? "bg-accent-bright/70"
							: "bg-accent/80 dark:bg-accent-bright/70",
					) }
					style={ { scaleX: progress } }
				/>
			</motion.header>
			{ mobileMenu }
		</>
	);
}
