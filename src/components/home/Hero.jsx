"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useI18n } from "@/components/I18nProvider";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";
import Button from "@/components/ui/Button";
import { MoroccanZelligeLattice } from "@/components/ui/MoroccanPattern";
import RibbonCanvas from "@/components/home/RibbonCanvas";
import useMediaQuery from "@/components/home/useMediaQuery";
import { HERO_REVEAL_MS, INTRO_SESSION_KEY } from "@/components/home/intro";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PIN_QUERY = "(min-width: 1024px)";

function GlyphReveal( { text, ready, isRTL, reduce } ) {
  if ( reduce ) return text;

  const words = text.split( " " );
  let glyphIndex = 0;

  return words.map( ( word, wordIndex ) => {
    const pieces = isRTL ? [ word ] : Array.from( word );

    return (
      <span key={ `${ word }-${ wordIndex }` } className="inline-block whitespace-nowrap">
        { pieces.map( ( piece, pieceIndex ) => {
          const delay = glyphIndex * 0.042;
          glyphIndex += 1;

          return (
            <span
              key={ `${ piece }-${ pieceIndex }` }
              className="inline-block overflow-hidden pb-[0.1em] align-bottom -mb-[0.1em]"
            >
              <motion.span
                className="inline-block"
                initial={ { y: "112%" } }
                animate={ ready ? { y: "0%" } : { y: "112%" } }
                transition={ { duration: 0.78, ease: EASE.out, delay } }
              >
                { piece }
              </motion.span>
            </span>
          );
        } ) }
        { wordIndex < words.length - 1 ? (
          <span className="inline-block whitespace-pre"> </span>
        ) : null }
      </span>
    );
  } );
}

function subscribe() {
  return () => { };
}

function getSeenSnapshot() {
  try {
    return window.sessionStorage.getItem( INTRO_SESSION_KEY ) === "1";
  } catch {
    return false;
  }
}

/* The overlay is server-rendered as "already seen", so the hero headline is
   available immediately on the first paint and after hydration for all
   returning visitors. */
function getServerSeenSnapshot() {
  return true;
}

export default function Hero() {
  const { t, isRTL } = useI18n();
  const reduce = usePrefersReducedMotion();
  const seen = useSyncExternalStore(
    subscribe,
    getSeenSnapshot,
    getServerSeenSnapshot,
  );
  const [ revealed, setRevealed ] = useState( false );
  const lampRef = useRef( null );

  useEffect( () => {
    if ( reduce || seen ) return undefined;

    const timer = window.setTimeout( () => setRevealed( true ), HERO_REVEAL_MS );
    return () => window.clearTimeout( timer );
  }, [ reduce, seen ] );

  const ready = reduce === true || seen || revealed;

  /* The lamp follows the pointer through CSS variables only, so moving the
     mouse never re-renders React. Touch devices and reduced motion keep the
     hero as-is. */
  const moveLamp = ( event ) => {
    if ( reduce || event.pointerType === "touch" ) return;
    const node = lampRef.current;
    if ( !node ) return;
    const box = node.getBoundingClientRect();
    node.style.setProperty( "--mx", `${ event.clientX - box.left }px` );
    node.style.setProperty( "--my", `${ event.clientY - box.top }px` );
    node.dataset.lit = "true";
  };

  const parkLamp = () => {
    if ( lampRef.current ) delete lampRef.current.dataset.lit;
  };

  /* Desktop pins the hero for one extra viewport while its content recedes,
     so the About band can slide over it. Mobile and reduced motion keep the
     plain, static hero. */
  const heroRef = useRef( null );
  const isDesktop = useMediaQuery( PIN_QUERY );
  const canPin = isDesktop && !reduce;

  const { scrollYProgress } = useScroll( {
    target: heroRef,
    offset: [ "start start", "end start" ],
  } );
  const smooth = useSpring( scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.35,
    restDelta: 0.001,
  } );
  const contentOpacity = useTransform( smooth, [ 0, 0.42 ], [ 1, 0 ] );
  const contentY = useTransform( smooth, [ 0, 1 ], [ 0, -80 ] );
  const contentScale = useTransform( smooth, [ 0, 1 ], [ 1, 0.965 ] );
  const fieldScale = useTransform( smooth, [ 0, 1 ], [ 1, 1.08 ] );

  return (
    <section
      ref={ heroRef }
      data-zellige="custom"
      aria-labelledby="hero-title"
      dir={ isRTL ? "rtl" : "ltr" }
      onPointerMove={ moveLamp }
      onPointerLeave={ parkLamp }
      onPointerCancel={ parkLamp }
      className={ cn(
        "relative isolate bg-[#07110e] text-cream",
        canPin && "lg:h-[190vh]",
      ) }
    >
      <div
        className={ cn(
          "relative flex flex-col overflow-hidden",
          canPin ? "lg:sticky lg:top-0 lg:h-svh" : "min-h-[100svh]",
        ) }
      >
      <motion.div
        style={ canPin ? { scale: fieldScale } : undefined }
        className="absolute inset-0 -z-20"
      >
        <RibbonCanvas className="absolute inset-0" />
      </motion.div>

      <div aria-hidden="true" className="hero-veil pointer-events-none absolute inset-0 -z-10" />

      <MoroccanZelligeLattice
        idPrefix="hero-lattice"
        opacity={ 0.24 }
        strokeColor="rgba(197,168,128,0.55)"
        strokeWidth={ 0.8 }
        size={ 128 }
        fadeMask={ false }
        className="-z-10"
      />

      <div
        ref={ lampRef }
        aria-hidden="true"
        className="hero-lamp pointer-events-none absolute inset-0 -z-10"
      />

      <motion.div
        style={
          canPin
            ? { opacity: contentOpacity, y: contentY, scale: contentScale }
            : undefined
        }
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-[clamp(20px,5vw,64px)] pb-16 pt-62 sm:pb-20 lg:pb-24"
      >
        <motion.div
          initial={ reduce ? false : { opacity: 0 } }
          animate={ { opacity: 1 } }
          transition={ {
            duration: reduce ? 0 : 0.8,
            delay: reduce ? 0 : 0.18,
            ease: EASE.out,
          } }
          className="flex items-center gap-45 mono-label text-cream/55"
        >
          <span>{ t.home.heroMetaLeft }</span>
          <span className="hidden sm:block">{ t.home.heroMetaRight }</span>
          <span className="hidden md:block">{ t.common.tagline }</span>
        </motion.div>

        <h1
          id="hero-title"
          aria-label={ t.hero.headline }
          className="display-hero mt-8 max-w-[17ch] text-balance sm:mt-10 rtl:max-w-none rtl:leading-[1.18] rtl:tracking-normal"
        >
          <span aria-hidden="true">
            <GlyphReveal
              text={ t.hero.headline }
              ready={ ready }
              isRTL={ isRTL }
              reduce={ reduce === true }
            />
          </span>
        </h1>

        <motion.div
          initial={ reduce ? false : { opacity: 0, y: 12 } }
          animate={ ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 } }
          transition={ {
            duration: reduce ? 0 : 0.7,
            ease: EASE.out,
            delay: reduce ? 0 : 0.18,
          } }
          className="mt-8 grid gap-7 pt-5 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-14"
        >
          <p className="max-w-[38ch] text-sm leading-[1.8] text-cream/65 sm:text-base">
            { t.hero.subheading }
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button href="#contact" size="md">
              { t.hero.ctaPrimary }
              <ArrowUpRight size={ 16 } className="rtl-flip" aria-hidden="true" />
            </Button>
            <Button href="#services" variant="outlineLight" size="md">
              { t.hero.ctaAll }
            </Button>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}
