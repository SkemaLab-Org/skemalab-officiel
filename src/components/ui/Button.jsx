import clsx from "clsx";

const variants = {
  primary:
    "bg-brand text-white hover:bg-accent shadow-[0_6px_16px_rgba(8,149,135,0.22)]",
  accent:
    "bg-accent text-white hover:bg-deep shadow-[0_6px_16px_rgba(13,101,92,0.22)]",
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
  ...rest
}) {
  const classes = clsx(
    "inline-flex min-h-11 items-center justify-center gap-2.5 px-5 py-3 text-[13px] font-medium tracking-[0.04em] transition-all duration-300 rounded-[3px] touch-manipulation hover:-translate-y-0.5 active:translate-y-0 sm:px-7 sm:py-3.5 disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    className,
  );

  if (type === "submit" || type === "button") {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <a href={href || "/#contact"} onClick={onClick} className={classes} {...rest}>
      {children}
    </a>
  );
}
