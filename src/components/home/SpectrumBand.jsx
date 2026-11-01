"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useI18n } from "@/components/I18nProvider";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";
import BandHeader from "@/components/home/BandHeader";
import SpectrumCanvas, { BAR_COUNT } from "@/components/home/SpectrumCanvas";
import useMediaQuery from "@/components/home/useMediaQuery";
import { cn } from "@/lib/utils";

const PIN_QUERY = "(min-width: 1024px)";

/* Desktop pins the spectrum and sweeps the active channel across the whole
   signal field as the visitor scrolls. Mobile and reduced-motion visitors get
   the same field as a calm, static readout. */
export default function SpectrumBand() {
  const { t, isRTL } = useI18n();
  const copy = t.home.spectrum;
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery(PIN_QUERY);
  const canPin = isDesktop && !reduced;

  const channels = Array.isArray(copy.channels) ? copy.channels : [];
  const [active, setActive] = useState(0);
  const shown = canPin && channels.length ? Math.min(active, channels.length - 1) : 0;
  const activeChannel = channels[shown] ?? {
    name: copy.activeName,
    value: copy.readoutValue,
  };

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0005,
  });
  const center = useTransform(smooth, [0, 1], [8, BAR_COUNT - 9]);

  useMotionValueEvent(smooth, "change", (value) => {
    if (!canPin || channels.length === 0) return;
    const last = channels.length - 1;
    const next = Math.min(
      last,
      Math.max(0, Math.round(value * last)),
    );
    setActive((current) => (current === next ? current : next));
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="spectrum-title"
      className={cn(
        "relative bg-surface",
        canPin && "lg:h-[240vh]",
      )}
    >
      <div
        className={cn(
          canPin && "lg:sticky lg:top-0 lg:h-svh lg:overflow-hidden",
        )}
      >
        <div className="shell band-y lg:flex lg:h-full lg:flex-col lg:justify-center lg:py-0 lg:pt-20 lg:pb-6">
          <BandHeader
            eyebrow={copy.eyebrow}
            index="03"
            title={copy.title}
            titleId="spectrum-title"
            description={copy.lede}
            titleClassName={cn(
              canPin && "lg:max-w-[24ch] lg:text-[clamp(1.9rem,3vw,2.7rem)]",
            )}
          />

          <div
            className={cn(
              "relative mt-10 aspect-[16/8] overflow-hidden border border-line bg-page sm:mt-12 sm:aspect-[16/6]",
              canPin &&
                "lg:mt-8 lg:aspect-auto lg:h-[clamp(11rem,32svh,20rem)] lg:flex-none",
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 px-3 py-2 mono-label text-muted"
            >
              <span>0</span>
              <span className="truncate text-accent">{activeChannel.name}</span>
              <span>{BAR_COUNT}</span>
            </span>

            <SpectrumCanvas
              center={canPin ? center : null}
              className="absolute inset-0 h-full w-full"
            />
          </div>

          {canPin ? (
            <div className="mt-6">
              <div className="flex items-end justify-between gap-8">
                <div className="min-w-0">
                  <p className="mono-label flex items-center gap-2 text-muted">
                    <span
                      aria-hidden="true"
                      className="live-dot h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    {copy.activeLabel}
                  </p>
                  <p className="mt-2 truncate font-display text-[clamp(1.35rem,2.2vw,1.9rem)] leading-tight tracking-tight text-fg">
                    {activeChannel.name}
                  </p>
                </div>

                <div className="shrink-0 text-end">
                  <p className="mono-label text-muted">{copy.readoutLabel}</p>
                  <p className="mt-1 font-display text-[clamp(2.2rem,4.2vw,3.4rem)] leading-none tracking-tight text-accent tabular-nums">
                    {activeChannel.value}
                  </p>
                </div>
              </div>

              <div className="mt-5 h-px w-full overflow-hidden bg-line">
                <motion.span
                  aria-hidden="true"
                  style={{
                    scaleX: smooth,
                    transformOrigin: isRTL ? "right center" : "left center",
                  }}
                  className="block h-full w-full bg-accent"
                />
              </div>

              <ol className="mt-4 grid grid-cols-4 gap-px bg-line">
                {channels.map((channel, index) => (
                  <li
                    key={channel.key ?? channel.name}
                    aria-current={index === shown ? "true" : undefined}
                    className={cn(
                      "bg-surface px-3 py-3 transition-colors duration-300",
                      index === shown ? "text-accent" : "text-muted",
                    )}
                  >
                    <span className="mono-label tabular-nums opacity-70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-1 text-[13px] leading-snug">{channel.name}</p>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {channels.map((channel, index) => (
                  <div
                    key={channel.key ?? channel.name}
                    className="bg-surface px-4 py-4"
                  >
                    <span className="mono-label tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm leading-snug text-fg">
                      {channel.name}
                    </p>
                    <p className="mt-2 font-display text-lg leading-none tracking-tight text-accent tabular-nums">
                      {channel.value}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 mono-label text-muted">
                <span>{copy.legend}</span>
                <span className="inline-flex items-center gap-2 text-accent">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rotate-45 bg-accent"
                  />
                  72
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
