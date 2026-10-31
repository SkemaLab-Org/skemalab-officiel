"use client";

import { useEffect, useRef } from "react";
import {
  MotionConfig,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { LABEL, SERVICE_KEYS } from "./copy";
import { Cta, cn, heroCtx, lineGrid } from "./shared";

const SWEEP = [0.65, 0, 0.25, 1];

const H1 =
  "col-start-1 row-start-1 max-w-[15ch] text-balance font-display text-[clamp(2.75rem,7.2vw,7.5rem)] font-medium leading-[0.98] tracking-[-0.035em] rtl:max-w-none rtl:leading-[1.25] rtl:tracking-normal";

/** The flowing lines of the current site, kept as a quiet texture. */
const WAVES = [
  "M620 600 C900 650 980 220 1440 300",
  "M640 635 C930 665 1040 255 1440 345",
  "M660 670 C960 680 1100 290 1440 390",
  "M680 705 C990 700 1150 325 1440 435",
];

function Waves({ stroke, style }) {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMid slice"
      className="absolute inset-0 size-full max-md:hidden rtl:-scale-x-100"
      style={style}
    >
      {WAVES.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </motion.svg>
  );
}

export default function HeroScan({ locale = "fr" }) {
  const { t, rtl, dir } = heroCtx(locale);
  const reduce = useReducedMotion();
  const headRef = useRef(null);

  const scan = useMotionValue(0); // intro sweep, 0 → 1
  const gx = useMotionValue(-999); // torch in section space
  const gy = useMotionValue(-999);
  const hx = useMotionValue(-999); // torch in headline space
  const hy = useMotionValue(-999);

  useEffect(() => {
    if (reduce) {
      scan.set(1);
      return undefined;
    }
    const controls = animate(scan, 1, {
      duration: 1.8,
      delay: 0.3,
      ease: SWEEP,
    });
    return () => controls.stop();
  }, [scan, reduce]);

  const clip = useTransform(scan, (p) => {
    if (p >= 1) return "none";
    const hidden = (1 - p) * 100;
    return rtl
      ? `inset(-0.3em 0 -0.3em ${hidden}%)`
      : `inset(-0.3em ${hidden}% -0.3em 0)`;
  });
  const beam = useTransform(scan, (p) => `${p * 100}%`);
  const beamOpacity = useTransform(scan, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);
  const gridLit = useMotionTemplate`radial-gradient(320px circle at ${gx}px ${gy}px, #000, transparent 70%)`;
  const textLit = useMotionTemplate`radial-gradient(220px circle at ${hx}px ${hy}px, #000, transparent 72%)`;

  const move = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    gx.set(event.clientX - box.left);
    gy.set(event.clientY - box.top);
    const head = headRef.current?.getBoundingClientRect();
    if (head) {
      hx.set(event.clientX - head.left);
      hy.set(event.clientY - head.top);
    }
  };
  const off = () => {
    gx.set(-999);
    gy.set(-999);
    hx.set(-999);
    hy.set(-999);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        dir={dir}
        aria-labelledby="hero-scan-title"
        onPointerMove={move}
        onPointerLeave={off}
        className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#07110e] text-cream"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_20%_45%,rgba(8,149,135,0.2),transparent)] rtl:-scale-x-100" />
          <div
            className="absolute inset-0"
            style={lineGrid("rgba(242,237,226,0.045)")}
          />
          <Waves stroke="rgba(58,217,191,0.16)" />
          <motion.div
            className="absolute inset-0"
            style={{
              ...lineGrid("rgba(58,217,191,0.3)"),
              maskImage: gridLit,
              WebkitMaskImage: gridLit,
            }}
          />
          <Waves
            stroke="#3ad9bf"
            style={{ maskImage: gridLit, WebkitMaskImage: gridLit }}
          />
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-12 pt-32 sm:px-8">
          <div ref={headRef} className="relative grid w-fit max-w-full">
            <motion.h1
              id="hero-scan-title"
              style={{ clipPath: clip }}
              className={H1}
            >
              {t.scan.title}
            </motion.h1>
            <motion.div
              aria-hidden="true"
              style={{
                clipPath: clip,
                maskImage: textLit,
                WebkitMaskImage: textLit,
              }}
              className={cn(
                H1,
                "pointer-events-none select-none text-accent-bright [text-shadow:0_0_40px_rgba(58,217,191,0.5)]",
              )}
            >
              {t.scan.title}
            </motion.div>
            <motion.span
              aria-hidden="true"
              style={
                rtl
                  ? { right: beam, opacity: beamOpacity }
                  : { left: beam, opacity: beamOpacity }
              }
              className="pointer-events-none absolute -inset-y-6 w-px bg-accent-bright shadow-[0_0_28px_6px_rgba(58,217,191,0.5)]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.9 }}
            className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-pretty text-lg leading-relaxed text-cream/65">
              {t.scan.sub}
            </p>
            <Cta t={t} />
          </motion.div>
        </div>

        <motion.nav
          aria-label={t.cta.all}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.9 }}
          className="mx-auto grid w-full max-w-7xl px-5 pb-10 sm:px-8 md:grid-cols-3 md:gap-6"
        >
          {SERVICE_KEYS.map((key) => (
            <a
              key={key}
              href="#services"
              className="group border-t border-cream/15 py-5 transition-colors hover:border-accent-bright"
            >
              <span className="block text-lg font-semibold">{LABEL[key]}</span>
              <span className="mt-1 block text-sm text-cream/65 transition-colors group-hover:text-cream/85">
                {t.services[key].title}
              </span>
            </a>
          ))}
        </motion.nav>
      </section>
    </MotionConfig>
  );
}
