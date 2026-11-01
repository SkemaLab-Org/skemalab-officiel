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
        <span className="label-mono shrink-0 text-muted">
          {index ? `${index} · ` : null}
          {label}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
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
