import Image from "next/image";
import logoDark from "@/assets/logo2.png";
import logoLight from "@/assets/logo-light.png";
import { cn } from "@/lib/utils";

/**
 * Bilingual wordmark ("Skema" + "لاب").
 * tone: "dark" for dark surfaces, "light" for light surfaces, "auto" to follow
 * the active theme.
 */
export default function BrandMark({
  className,
  href = "/",
  onClick,
  as = "a",
  priority = false,
  tone = "dark",
  label = "SkemaLab — سكيما لاب",
}) {
  const mark = (
    <span className={cn("inline-flex h-8 items-center", className)}>
      {tone !== "light" ? (
        <Image
          src={logoDark}
          alt={as === "span" ? "" : label}
          priority={priority}
          className={cn(
            "h-full w-auto object-contain",
            tone === "auto" && "hidden dark:block",
          )}
          sizes="(max-width: 640px) 140px, 180px"
        />
      ) : null}
      {tone !== "dark" ? (
        <Image
          src={logoLight}
          alt=""
          aria-hidden="true"
          priority={tone === "light" && priority}
          className={cn(
            "h-full w-auto object-contain",
            tone === "auto" ? "dark:hidden" : "",
          )}
          sizes="(max-width: 640px) 140px, 180px"
        />
      ) : null}
    </span>
  );

  if (as === "span") {
    return <span className="inline-flex items-center">{mark}</span>;
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-flex items-center transition-opacity duration-300 hover:opacity-80"
      aria-label={label}
    >
      {mark}
    </a>
  );
}
