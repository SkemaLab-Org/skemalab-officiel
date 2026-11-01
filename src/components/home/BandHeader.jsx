"use client";

import Reveal from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export default function BandHeader( {
  eyebrow,
  index,
  title,
  titleId,
  description,
  action,
  className,
  titleClassName,
} ) {
  return (
    <header className={ cn( "relative", className ) }>
      <Reveal>
        <div className="flex items-center gap-4 pt-3">
          <span className="mono-label shrink-0 text-muted">{ eyebrow }</span>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
          <span className="mono-label shrink-0 text-muted tabular-nums">{ index }</span>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-16">
        <Reveal delay={ 0.04 }>
          <h2
            id={ titleId }
            className={ cn( "display-band max-w-[21ch] text-fg", titleClassName ) }
          >
            { title }
          </h2>
        </Reveal>

        { description || action ? (
          <Reveal delay={ 0.08 } className="lg:pb-1">
            { description ? (
              <p className="max-w-[38ch] text-sm leading-[1.8] text-muted sm:text-base">
                { description }
              </p>
            ) : null }
            { action ? <div className="mt-6">{ action }</div> : null }
          </Reveal>
        ) : null }
      </div>
    </header>
  );
}
