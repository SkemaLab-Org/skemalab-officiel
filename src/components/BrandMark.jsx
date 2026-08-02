import clsx from "clsx";

export default function BrandMark({
  className = "",
  href = "#top",
  onClick,
  as = "a",
}) {
  const classes = clsx(
    "font-semibold tracking-tight text-fg",
    className,
  );

  const content = (
    <>
      Skema<span className="text-brand">lab</span>
    </>
  );

  if (as === "span") {
    return <span className={classes}>{content}</span>;
  }

  return (
    <a href={href} onClick={onClick} className={clsx("group", classes)}>
      Skema
      <span className="text-brand transition-colors duration-300 group-hover:text-accent">
        lab
      </span>
    </a>
  );
}
