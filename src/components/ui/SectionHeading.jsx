import clsx from "clsx";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  return (
    <div className={clsx(align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={clsx(
            "eyebrow text-brand",
            align === "center" && "justify-center",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "mt-4 max-w-3xl text-[clamp(1.55rem,5vw,3.15rem)] font-semibold leading-[1.1] tracking-tight text-balance text-fg sm:mt-5",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
