import Image from "next/image";
import clsx from "clsx";
import firstLogo from "@/assets/first-logo.png";

export default function BrandMark({
  className = "",
  href = "/",
  onClick,
  as = "a",
  priority = false,
}) {
  const mark = (
    <Image
      src={firstLogo}
      alt="SkemaLab — سكيما لاب"
      className={clsx(
        "w-auto object-contain transition-all duration-300 drop-shadow-[0_2px_12px_rgba(8,149,135,0.22)]",
        className || "h-7 sm:h-8 md:h-9"
      )}
      sizes="(max-width: 640px) 140px, 180px"
      priority={priority}
    />
  );

  if (as === "span") {
    return <span className="inline-flex items-center">{mark}</span>;
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className="group inline-flex items-center transition-all duration-300 hover:scale-[1.02] hover:opacity-95"
      aria-label="SkemaLab — سكيما لاب"
    >
      {mark}
    </a>
  );
}

