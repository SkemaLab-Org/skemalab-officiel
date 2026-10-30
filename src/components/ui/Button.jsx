import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex touch-manipulation items-center justify-center gap-2 rounded-md text-center font-medium transition-[color,background-color,border-color,transform,opacity] duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand text-on-brand hover:bg-accent",
        secondary:
          "border border-line-strong bg-transparent text-fg hover:border-accent hover:text-accent",
        ghost: "bg-transparent text-muted hover:text-fg",
        light: "bg-cream text-ink hover:bg-accent hover:text-on-brand",
        outlineLight:
          "border border-cream/30 bg-cream/5 text-cream backdrop-blur-sm hover:border-accent hover:text-accent",
      },
      size: {
        sm: "min-h-10 px-4 py-2 text-[13px]",
        md: "min-h-12 px-6 py-3 text-sm",
        lg: "min-h-14 px-8 py-3.5 text-[15px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type,
  onClick,
  disabled = false,
  loading = false,
  ...rest
}) {
  const classes = cn(buttonVariants({ variant, size }), className);
  const content = (
    <>
      {loading ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : null}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
}

export { buttonVariants };
