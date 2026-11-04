import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex touch-manipulation items-center justify-center gap-2.5 rounded-none text-center font-medium transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-50 select-none",
	{
		variants: {
			variant: {
				primary:
					"bg-brand text-on-brand hover:bg-accent hover:shadow-[0_0_18px_rgba(58,217,191,0.28)] active:scale-[0.985]",
				secondary:
					"border border-line-strong bg-transparent text-fg hover:border-accent hover:text-accent hover:bg-surface-2/40 active:scale-[0.985]",
				ghost: "bg-transparent text-muted hover:text-fg hover:bg-line-soft",
				light:
					"bg-cream text-ink hover:bg-accent hover:text-on-brand hover:shadow-[0_0_18px_rgba(58,217,191,0.2)] active:scale-[0.985]",
				outline:
					"border border-line-strong bg-transparent text-fg hover:border-accent hover:text-accent hover:bg-surface-2/30 dark:border-cream/30 dark:text-cream dark:hover:border-accent-bright dark:hover:text-accent-bright active:scale-[0.985]",
				outlineLight:
					"border border-cream/30 bg-cream/5 text-cream backdrop-blur-sm hover:border-accent hover:text-accent hover:bg-cream/10 active:scale-[0.985]",
			},
			size: {
				sm: "min-h-10 px-4 py-2 text-[13px] tracking-wide",
				md: "min-h-12 px-6 py-3 text-sm tracking-wide",
				lg: "min-h-14 px-8 py-3.5 text-[15px] tracking-wide",
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
			{loading ? (
				<Loader2 size={16} className="animate-spin" aria-hidden="true" />
			) : null}
			{children}
		</>
	);

	if (href) {
		if (href.startsWith("/") && !href.startsWith("//")) {
			return (
				<Link href={href} onClick={onClick} className={classes} {...rest}>
					{content}
				</Link>
			);
		}

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
