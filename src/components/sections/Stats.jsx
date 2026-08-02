"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { stats } from "@/data/content";
import Reveal from "@/components/ui/Reveal";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;

    const duration = 1500;
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduceMotion]);

  const display = reduceMotion ? value : count;

  return (
    <span ref={ref}>
      {display}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface">
      <div className="absolute inset-0 gradient-mesh opacity-40" />

      <div className="relative mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.07} className="h-full">
            <div
              className={`group relative h-full border-b border-line px-5 py-8 last:border-b-0 sm:px-8 sm:py-12 lg:border-b-0 lg:py-14 ${
                index % 2 === 0 ? "sm:border-r" : ""
              } ${index < stats.length - 1 ? "lg:border-r lg:border-line" : "lg:border-r-0"}`}
            >
              <p className="text-[clamp(2.1rem,7vw,3.75rem)] font-semibold leading-none tracking-tight text-fg transition-transform duration-500 group-hover:translate-x-1">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 max-w-none text-sm leading-snug text-muted sm:mt-4 sm:max-w-[12rem]">
                {stat.label}
              </p>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand transition-all duration-500 group-hover:w-full" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
