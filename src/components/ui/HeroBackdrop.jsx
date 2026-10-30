"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

const WAVES = [
  "M0 300 C 220 210 420 390 640 300 S 1080 210 1280 300 S 1540 380 1600 300",
  "M0 340 C 260 420 460 250 720 330 S 1140 420 1340 330 S 1560 260 1600 340",
  "M0 260 C 200 300 380 180 620 260 S 1060 340 1300 260 S 1520 190 1600 260",
];

/**
 * Hero atmosphere: drifting aurora fields, fine zellige linework and slow wave
 * lines. All motion is transform-only and pauses when the hero leaves the
 * viewport.
 */
export default function HeroBackdrop({ className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "10% 0px 10% 0px" });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        !inView && "is-paused",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_72%_8%,#123f35_0%,#0a241e_46%,#07110e_78%)]" />

      <div className="drift absolute -left-[12%] top-[6%] h-[42rem] w-[42rem] rounded-full bg-brand/20 blur-[140px]" />
      <div className="drift drift--slow drift--reverse absolute -right-[8%] top-[22%] h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-[150px]" />
      <div className="absolute bottom-[-18%] left-[38%] h-[28rem] w-[28rem] rounded-full bg-deep/80 blur-[120px]" />

      <div className="absolute inset-0 zellige opacity-40" />

      <div className="absolute inset-x-0 top-[18%] h-[46%] opacity-[0.55]">
        <div className="wave-track flex h-full w-[200%]">
          {[0, 1].map((copy) => (
            <svg
              key={copy}
              viewBox="0 0 1600 600"
              preserveAspectRatio="none"
              className="h-full w-1/2 shrink-0"
              fill="none"
            >
              {WAVES.map((path, index) => (
                <path
                  key={path}
                  d={path}
                  stroke="#3ad9bf"
                  strokeOpacity={0.22 - index * 0.05}
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#07110e] via-[#07110e]/60 to-transparent" />
    </div>
  );
}
