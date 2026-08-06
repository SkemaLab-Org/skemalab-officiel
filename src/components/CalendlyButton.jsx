"use client";

import { ArrowUpRight, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCalendly } from "@/components/CalendlyProvider";
import { bookingCta } from "@/data/content";
import { preconnectCalendly } from "@/lib/calendly";

export default function CalendlyButton({
  children = bookingCta.label,
  className = "",
  variant = "primary",
  onBeforeOpen,
}) {
  const { open, openBooking } = useCalendly();

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={(e) => {
        onBeforeOpen?.();
        openBooking(e.currentTarget);
      }}
      onMouseEnter={preconnectCalendly}
      onFocus={preconnectCalendly}
      onTouchStart={preconnectCalendly}
      aria-label={typeof children === "string" ? children : bookingCta.label}
      aria-haspopup="dialog"
      aria-expanded={open}
    >
      <Calendar size={15} strokeWidth={1.75} />
      {children}
      <ArrowUpRight size={15} />
    </Button>
  );
}
