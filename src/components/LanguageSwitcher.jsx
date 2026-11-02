"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useI18n } from "@/components/I18nProvider";
import { cn } from "@/lib/utils";

function FlagIcon({ loc, className = "h-3.5 w-5" }) {
  if (!loc.flagImg) {
    return (
      <span className={cn("leading-none", className)} role="img" aria-label={loc.name}>
        {loc.flag}
      </span>
    );
  }
  return (
    <span
      role="img"
      aria-label={loc.name}
      style={{ backgroundImage: `url(${loc.flagImg})` }}
      className={cn(
        "block shrink-0 rounded-[2px] bg-cover bg-center ring-1 ring-cream/20",
        className,
      )}
    />
  );
}

export default function LanguageSwitcher({
  className = "",
  isMobile = false,
  onDark = true,
}) {
  const { locale, setLocale, locales, isRTL } = useI18n();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(null);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const current = locales[locale] || locales.fr;

  const updatePos = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewportH = document.documentElement.clientHeight;
    const viewportW = document.documentElement.clientWidth;
    const spaceBelow = viewportH - rect.bottom;
    const flipUp = spaceBelow < 240 && rect.top > spaceBelow;
    setPos({
      top: flipUp ? null : rect.bottom + 8,
      bottom: flipUp ? viewportH - rect.top + 8 : null,
      left: rect.left,
      right: viewportW - rect.right,
    });
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const handleClickOutside = (event) => {
      const inTrigger = containerRef.current?.contains(event.target);
      const inList = listRef.current?.contains(event.target);
      if (!inTrigger && !inList) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handleReposition = () => updatePos();

    updatePos();
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [open, updatePos]);

  const handleSelect = (code, enabled) => {
    if (!enabled) return;
    setLocale(code);
    setOpen(false);
  };

  if (isMobile) {
    return (
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <span className="label-mono text-muted">{isRTL ? "اللغة" : "Langue"}</span>
          <span className="flex items-center gap-1.5 text-xs text-accent">
            <FlagIcon loc={current} className="h-3 w-[18px]" />
            {current.short}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(locales).map((loc) => {
            const isSelected = loc.code === locale;
            const isEnabled = loc.enabled;

            return (
              <button
                key={loc.code}
                type="button"
                disabled={!isEnabled}
                onClick={() => handleSelect(loc.code, isEnabled)}
                className={cn(
                  "flex min-h-12 items-center justify-between rounded-none border px-3 py-2 text-sm transition-colors",
                  isSelected
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : isEnabled
                      ? "border-line-strong text-muted hover:border-accent/50 hover:text-fg"
                      : "cursor-not-allowed border-line text-muted/70",
                )}
              >
                <span className="flex items-center gap-2">
                  <FlagIcon loc={loc} className="h-3.5 w-5" />
                  <span className="text-xs font-medium">{loc.short}</span>
                </span>

                {isSelected ? (
                  <Check size={14} className="shrink-0" />
                ) : !isEnabled ? (
                  <span className="text-[9px] uppercase tracking-wider">
                    {isRTL ? loc.badgeAr : loc.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const dropdown =
    open && pos
      ? createPortal(
          <motion.div
            ref={listRef}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            role="listbox"
            dir={isRTL ? "rtl" : "ltr"}
            style={{
              position: "fixed",
              top: pos.top ?? undefined,
              bottom: pos.bottom ?? undefined,
              ...(isRTL ? { left: pos.left } : { right: pos.right }),
            }}
            className="z-[110] w-48 rounded-none border border-line-strong bg-surface p-1.5 text-fg shadow-none"
          >
            {Object.values(locales).map((loc) => {
              const isSelected = loc.code === locale;
              const isEnabled = loc.enabled;

              return (
                <button
                  key={loc.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  aria-label={loc.name}
                  disabled={!isEnabled}
                  onClick={() => handleSelect(loc.code, isEnabled)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-none px-2.5 py-2 text-xs transition-colors",
                    isSelected
                      ? "bg-accent/10 text-accent"
                      : isEnabled
                        ? "text-muted hover:bg-line-soft hover:text-fg"
                        : "cursor-not-allowed text-muted/70",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <FlagIcon loc={loc} className="h-3.5 w-5" />
                    <span className="tracking-wide">{loc.short}</span>
                  </span>

                  {isSelected ? (
                    <Check size={14} className="shrink-0" />
                  ) : !isEnabled ? (
                    <span className="text-[9px] uppercase tracking-wider">
                      {isRTL ? loc.badgeAr : loc.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </motion.div>,
          document.body,
        )
      : null;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={isRTL ? "تغيير اللغة" : "Changer de langue"}
        className={cn(
          "flex h-11 items-center justify-center gap-2 rounded-none border px-3 transition-colors",
          onDark
            ? "border-cream/20 text-cream/80 hover:border-accent-bright hover:text-accent-bright"
            : "border-line-strong text-muted hover:border-accent hover:text-accent dark:border-cream/20 dark:text-cream/80 dark:hover:border-accent-bright dark:hover:text-accent-bright",
        )}
      >
        <FlagIcon loc={current} className="h-4 w-[22px]" />
        <span className="label-mono hidden xl:block">{current.short}</span>
      </button>

      {dropdown}
    </div>
  );
}
