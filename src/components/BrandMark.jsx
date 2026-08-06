import Image from "next/image";
import clsx from "clsx";
import logo from "@/assets/logo.webp";

export default function BrandMark({
  className = "",
  href = "/",
  onClick,
  as = "a",
  priority = false,
}) {
  const mark = (
    <Image
      src={logo}
      alt="SkemaLab"
      className={clsx("w-auto object-contain", className || "h-6 sm:h-7")}
      sizes="(max-width: 640px) 120px, 150px"
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
      className="group inline-flex items-center transition-opacity duration-300 hover:opacity-90"
      aria-label="SkemaLab — Accueil"
    >
      {mark}
    </a>
  );
}
