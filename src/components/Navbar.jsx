"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BrandMark from "@/components/BrandMark";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/components/I18nProvider";
import clsx from "clsx";

const CalendlyButton = dynamic(() => import("@/components/CalendlyButton"), {
  ssr: false,
  loading: () => (
    <span className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[3px] bg-brand px-5 py-2.5 text-[13px] font-medium tracking-[0.04em] text-white opacity-80">
      RDV
    </span>
  ),
});

const MENU_ID = "mobile-nav-menu";

export default function Navbar() {
  const { t, isRTL } = useI18n();
  const navLinks = t.nav;
  const bookingCtaLabel = t.common.bookingCta;
  const tagline = t.common.tagline;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      queueMicrotask(() => menuButtonRef.current?.focus());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    queueMicrotask(() => menuButtonRef.current?.focus());
  };

  const mobileMenu =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id={MENU_ID}
                role="dialog"
                aria-modal="true"
                aria-label={t.common.menuLabel}
                className="fixed inset-0 z-[90] flex flex-col bg-page lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4 sm:h-[76px] sm:px-8">
                  <BrandMark onClick={closeMenu} className="h-7 sm:h-8" />
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                      type="button"
                      aria-label={t.common.closeMenu}
                      className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-[3px] border border-line bg-surface text-fg transition-colors hover:border-brand hover:text-brand"
                      onClick={closeMenu}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col overflow-y-auto px-4 py-6 sm:px-8">
                  {/* Language Switcher inside mobile drawer */}
                  <div className="mb-6 rounded-[3px] border border-line bg-surface/50 p-3.5">
                    <LanguageSwitcher isMobile />
                  </div>

                  <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-muted">
                    {isRTL ? "روابط التنقل" : "Navigation"}
                  </p>
                  <nav className="flex flex-col" aria-label="Mobile">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className="nav-link-mobile group"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * i }}
                      >
                        <span className="flex items-center gap-4">
                          <span className="font-mono text-[11px] font-medium tracking-wider text-muted">
                            0{i + 1}
                          </span>
                          {link.label}
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="shrink-0 text-muted transition-colors group-hover:text-brand rtl-flip"
                        />
                      </motion.a>
                    ))}
                  </nav>

                  <div className="mt-auto border-t border-line pt-6">
                    <CalendlyButton className="w-full" onBeforeOpen={closeMenu}>
                      {bookingCtaLabel}
                    </CalendlyButton>
                    <p className="mt-4 text-center text-xs text-muted">
                      {tagline}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-[80] overflow-hidden transition-all duration-300",
          scrolled
            ? "brand-fusion-bg brand-fusion-bg--bar border-b border-white/10"
            : "bg-transparent",
        )}
      >
        <div className="relative z-[81] mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-8">
          <BrandMark className="h-7 sm:h-9" priority />

          <nav className="hidden items-center lg:flex" aria-label="Principale">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link nav-link--over-hero"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <LanguageSwitcher className={scrolled ? "nav-chrome" : ""} />
            <ThemeToggle className={scrolled ? "nav-chrome" : ""} />
            <CalendlyButton className="px-5 py-2.5">
              {bookingCtaLabel}
            </CalendlyButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher className={scrolled ? "nav-chrome" : ""} />
            <ThemeToggle className={scrolled ? "nav-chrome" : ""} />
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={t.common.openMenu}
              aria-expanded={open}
              aria-controls={MENU_ID}
              className={clsx(
                "relative z-[82] flex h-11 w-11 touch-manipulation items-center justify-center rounded-[3px] border transition-colors",
                scrolled
                  ? "nav-chrome"
                  : "border-line bg-surface text-fg hover:border-brand hover:text-brand",
              )}
              onClick={() => setOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
