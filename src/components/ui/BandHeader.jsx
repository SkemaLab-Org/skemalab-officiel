import { cn } from "@/lib/utils";

/**
 * Landing-only band header. A mono eyebrow rides a hairline, then a two-column
 * head: statement on the left, lede on the right.
 */
export default function BandHeader({
	index,
	label,
	title,
	description,
	className,
}) {
	return (
		<header className={cn("w-full", className)}>
			<div className="flex items-center gap-4">
				<div className="label-mono flex items-center gap-2 shrink-0">
					{index ? (
						<span className="font-mono text-accent font-medium tracking-wider">
							{index}
						</span>
					) : null}
					{index ? <span className="text-muted/40" aria-hidden="true">/</span> : null}
					<span className="text-fg/80">{label}</span>
				</div>
				<span
					aria-hidden="true"
					className="h-px flex-1 bg-gradient-to-r from-line via-line-soft to-transparent"
				/>
			</div>

			<div className="mt-8 grid gap-6 sm:mt-10 min-[820px]:grid-cols-[1.25fr_0.75fr] min-[820px]:items-end min-[820px]:gap-12">
				<h2 className="landing-display max-w-[20ch] text-[clamp(2rem,4.6vw,3.6rem)] text-fg">
					{title}
				</h2>
				{description ? (
					<p className="max-w-[46ch] text-[15px] leading-[1.7] text-muted min-[820px]:pb-1.5">
						{description}
					</p>
				) : null}
			</div>
		</header>
	);
}
