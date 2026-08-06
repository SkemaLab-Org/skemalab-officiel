"use client";

import { Moon, Sun } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      title={isDark ? "Mode clair" : "Mode sombre"}
      className={clsx(
        "flex h-11 w-11 items-center justify-center rounded-[3px] border transition-all duration-300",
        className ||
          "border-line bg-surface text-fg hover:border-brand hover:text-brand",
      )}
    >
      {isDark ? (
        <Sun size={17} strokeWidth={1.75} />
      ) : (
        <Moon size={17} strokeWidth={1.75} />
      )}
    </button>
  );
}
