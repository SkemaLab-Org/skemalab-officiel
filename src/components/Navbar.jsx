"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/components/I18nProvider";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CalendlyButton = dynamic(() => import("@/components/CalendlyButton"), {
  ssr: false,
  loading: () => (
    <span className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-[13px] font-medium text-on-brand opacity-80">
      RDV
    </span>
  ),
});

const MENU_ID = "mobile-nav-menu";
const SECTION_IDS = ["services", "method", "projets", "agence", "contact"];
const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const navLinks = t.nav;

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > last && y > 180);
        last = y;
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return undefined;

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`/#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        queueMicrotask(() => menuButtonRef.current?.focus());
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (open) queueMicrotask(() => closeButtonRef.current?.focus());
  }, [open]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    queueMicrotask(() => menuButtonRef.current?.focus());
  }, []);

  const mobileMenu =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {open ? (
              <motion.div
                id={MENU_ID}
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={t.common.menuLabel}
                className="fixed inset-0 z-[95] flex flex-col bg-[#07110e] text-cream lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="pointer-events-none absolute inset-0 zellige opacity-30" />
                <div className="relative flex h-16 shrink-0 items-center justify-between border-b border-cream/10 px-5">
                  <BrandMark onClick={closeMenu} className="h-7" />
                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label={t.common.closeMenu}
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-cream/20 text-cream transition-colors hover:border-accent-bright hover:text-accent-bright"
                    onClick={closeMenu}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="relative flex flex-1 flex-col overflow-y-auto px-5 py-8">
                  <nav className="flex flex-col" aria-label="Mobile">
                    {navLinks.map((link, index) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className="group flex min-h-16 items-center justify-between gap-4 border-b border-cream/10 py-4"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + index * 0.05, ease: EASE.out, duration: 0.45 }}
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="label-mono text-cream/65">0{index + 1}</span>
                          <span className="font-display text-3xl tracking-tight text-cream">
                            {link.label}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={20}
                          className="shrink-0 text-cream/65 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-bright rtl-flip"
                        />
                      </motion.a>
                    ))}
                  </nav>

                  <div className="mt-8">
                    <LanguageSwitcher isMobile />
                  </div>

                  <div className="mt-auto space-y-4 border-t border-cream/10 pt-6">
                    <CalendlyButton
                      className="w-full"
                      onBeforeOpen={closeMenu}
                    >
                      {t.common.bookingCta}
                    </CalendlyButton>
                    <p className="text-center text-xs text-cream/65">{t.common.tagline}</p>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] text-cream transition-colors duration-500",
          scrolled
            ? "border-b border-cream/10 bg-[#07110e]/85 backdrop-blur-xl"
            : "bg-transparent",
        )}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: EASE.out }}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 lg:h-20">
          <div className="flex items-center gap-5">
            <BrandMark className="h-7 lg:h-8" priority />
            <span className="hidden h-5 w-px bg-cream/15 xl:block" aria-hidden="true" />
            <span className="label-mono hidden text-cream/65 xl:block">
              {t.common.tagline}
            </span>
          </div>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principale">
            {navLinks.map((link) => {
              const isActive = pathname === "/" && active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-[13px] tracking-[0.01em] transition-colors duration-300",
                    isActive ? "text-cream" : "text-cream/65 hover:text-cream",
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-accent-bright"
                      transition={{ duration: 0.4, ease: EASE.out }}
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <CalendlyButton className="min-h-10 px-4 py-2 text-[13px]">
              {t.common.bookingCta}
            </CalendlyButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={t.common.openMenu}
              aria-expanded={open}
              aria-controls={MENU_ID}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-cream/20 text-cream transition-colors hover:border-accent-bright hover:text-accent-bright"
              onClick={() => setOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent-bright/70"
          style={{ scaleX: progress }}
        />
      </motion.header>
      {mobileMenu}
    </>
  );
}
