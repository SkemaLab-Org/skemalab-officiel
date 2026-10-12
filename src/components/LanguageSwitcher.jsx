"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";
import clsx from "clsx";

function FlagIcon({ loc, className = "h-3.5 w-5" }) {
  if (!loc.flagImg) {
    return (
      <span className={clsx("leading-none", className)} role="img" aria-label={loc.name}>
        {loc.flag}
      </span>
    );
  }
  return (
    <span
      role="img"
      aria-label={loc.name}
      style={{ backgroundImage: `url(${loc.flagImg})` }}
      className={clsx(
        "block shrink-0 rounded-[2px] bg-cover bg-center ring-1 ring-black/15",
        className,
      )}
    />
  );
}

export default function LanguageSwitcher({ className = "", isMobile = false }) {
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

  // Close when clicking outside, on scroll or resize
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      const inTrigger = containerRef.current?.contains(e.target);
      const inList = listRef.current?.contains(e.target);
      if (!inTrigger && !inList) setOpen(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
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
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
            {isRTL ? "اللغة" : "Langue"}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-brand font-medium">
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
                className={clsx(
                  "relative flex min-h-12 items-center justify-between rounded-[3px] border px-3 py-2 text-sm transition-all",
                  isSelected
                    ? "border-brand bg-brand/10 text-brand font-semibold shadow-sm"
                    : isEnabled
                    ? "border-line bg-surface text-fg hover:border-brand/40"
                    : "cursor-not-allowed border-line/40 bg-surface/30 opacity-60 text-muted"
                )}
              >
                <span className="flex items-center gap-2">
                  <FlagIcon loc={loc} className="h-3.5 w-5" />
                  <span className="text-xs font-medium">{loc.short}</span>
                </span>

                {isSelected ? (
                  <Check size={14} className="text-brand shrink-0" />
                ) : !isEnabled ? (
                  <span className="rounded-[2px] bg-line/50 px-1.5 py-0.5 text-[9px] font-mono text-muted">
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
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.16 }}
              role="listbox"
              dir={isRTL ? "rtl" : "ltr"}
              style={{
                position: "fixed",
                top: pos.top ?? undefined,
                bottom: pos.bottom ?? undefined,
                ...(isRTL
                  ? { left: pos.left }
                  : { right: pos.right }),
              }}
              className="w-48 rounded-[3px] border border-line bg-surface p-1.5 shadow-xl backdrop-blur-xl z-[110]"
            >
              <div className="space-y-1">
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
                      className={clsx(
                        "flex w-full items-center justify-between rounded-[2px] px-2.5 py-2 text-xs transition-colors",
                        isSelected
                          ? "bg-brand/10 font-semibold text-brand"
                          : isEnabled
                          ? "text-fg hover:bg-page hover:text-brand"
                          : "cursor-not-allowed opacity-50 text-muted"
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <FlagIcon loc={loc} className="h-3.5 w-5" />
                        <span className="font-mono text-xs tracking-wide">
                          {loc.short}
                        </span>
                      </span>

                      {isSelected ? (
                        <Check size={14} className="text-brand shrink-0" />
                      ) : !isEnabled ? (
                        <span className="rounded-[2px] border border-line bg-page px-1.5 py-0.5 text-[9px] font-mono text-muted">
                          {isRTL ? loc.badgeAr : loc.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
          </motion.div>,
          document.body,
        )
      : null;

  return (
    <div ref={containerRef} className={clsx("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={isRTL ? "تغيير اللغة" : "Changer de langue"}
        className="flex h-11 items-center justify-center rounded-[3px] border border-line bg-surface/85 px-3 backdrop-blur-md transition-all hover:border-brand"
      >
        <FlagIcon loc={current} className="h-4 w-[22px]" />
      </button>

      {dropdown}
    </div>
  );
}
