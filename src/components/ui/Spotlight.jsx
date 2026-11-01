"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Cursor-aware highlight. Pointer position is written straight to CSS vars. */
export default function Spotlight({ children, className, as = "div", ...rest }) {
  const ref = useRef(null);
  const Component = as;

  const onPointerMove = (event) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <Component
      ref={ref}
      className={cn("spotlight", className)}
      onPointerMove={onPointerMove}
      {...rest}
    >
      {children}
    </Component>
  );
}
