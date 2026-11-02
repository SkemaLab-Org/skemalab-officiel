"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className = "", onDark = true }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      title={isDark ? "Mode clair" : "Mode sombre"}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-none border transition-colors",
        onDark
          ? "border-cream/20 text-cream/80 hover:border-accent-bright hover:text-accent-bright"
          : "border-line-strong text-muted hover:border-accent hover:text-accent dark:border-cream/20 dark:text-cream/80 dark:hover:border-accent-bright dark:hover:text-accent-bright",
        className,
      )}
    >
      {isDark ? (
        <Sun size={17} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Moon size={17} strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}
