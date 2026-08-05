import clsx from "clsx";

export default function BrandMark({
  className = "",
  href = "/",
  onClick,
  as = "a",
}) {
  const classes = clsx("font-semibold tracking-tight text-fg", className);
  const mark = (
    <>
      Skema
      <span
        className={clsx(
          "text-brand",
          as === "a" && "transition-colors duration-300 group-hover:text-accent",
        )}
      >
        lab
      </span>
    </>
  );

  if (as === "span") {
    return <span className={classes}>{mark}</span>;
  }

  return (
    <a href={href} onClick={onClick} className={clsx("group", classes)}>
      {mark}
    </a>
  );
}
