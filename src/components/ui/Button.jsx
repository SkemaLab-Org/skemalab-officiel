import clsx from "clsx";

const variants = {
  primary:
    "bg-brand text-white hover:bg-[#2140ef] shadow-[0_6px_16px_rgba(42,76,255,0.12)]",
  accent:
    "bg-accent text-white hover:bg-[#ef4f2c] shadow-[0_6px_16px_rgba(255,90,54,0.1)]",
  ghost:
    "bg-surface/50 text-fg border border-line hover:border-brand hover:bg-brand/5 hover:text-brand",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type,
  onClick,
  disabled = false,
}) {
  const classes = clsx(
    "inline-flex min-h-11 items-center justify-center gap-2.5 px-5 py-3 text-[13px] font-medium tracking-[0.04em] transition-all duration-300 rounded-[3px] touch-manipulation hover:-translate-y-0.5 active:translate-y-0 sm:px-7 sm:py-3.5 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    className,
  );

  if (type === "submit" || type === "button") {
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={classes}>
        {children}
      </button>
    );
  }

  return (
    <a href={href || "/#contact"} onClick={onClick} className={classes}>
      {children}
    </a>
  );
}
