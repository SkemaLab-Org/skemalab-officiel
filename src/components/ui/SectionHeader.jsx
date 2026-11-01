import { cn } from "@/lib/utils";

/**
 * Section header built on a ledger rail: the label and index sit on the rule,
 * never as a decorative kicker stacked above the heading.
 */
export default function SectionHeader({
  label,
  index,
  title,
  description,
  action,
  align = "left",
  className,
  titleClassName,
}) {
  const centered = align === "center";

  return (
    <header className={cn(centered && "text-center", className)}>
      {(label || index) && (
        <div className={cn("ledger-rule", centered && "justify-center gap-6")}>
          {label ? <span className="label-mono text-accent">{label}</span> : <span />}
          {index ? (
            <span className="label-mono text-muted" aria-hidden="true">
              {index}
            </span>
          ) : null}
        </div>
      )}

      <div
        className={cn(
          "mt-8 grid gap-6 sm:mt-10",
          !centered && description && "lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-12",
          centered && "justify-items-center",
        )}
      >
        <h2
          className={cn(
            "display-lg max-w-[22ch]",
            centered && "mx-auto max-w-[26ch]",
            titleClassName,
          )}
        >
          {title}
        </h2>

        {description ? (
          <div className={cn("max-w-md", centered && "mx-auto")}>
            <p className="text-base leading-relaxed text-muted">{description}</p>
            {action ? <div className="mt-6">{action}</div> : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
