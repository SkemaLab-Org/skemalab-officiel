"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import { bookingCta } from "@/data/content";
import {
  getCalendlyEmbedUrl,
  getCalendlyUrl,
  preconnectCalendly,
  scheduleCalendlyWarmup,
} from "@/lib/calendly";

const CalendlyContext = createContext({
  open: false,
  openBooking: () => {},
  closeBooking: () => {},
});

export function useCalendly() {
  return useContext(CalendlyContext);
}

export function CalendlyProvider({ children }) {
  const titleId = useId();
  const closeBtnRef = useRef(null);
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const [iframeReady, setIframeReady] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const url = getCalendlyUrl();
  const router = useRouter();

  useEffect(() => {
    scheduleCalendlyWarmup();
  }, []);

  const closeBooking = useCallback(() => {
    setOpen(false);
    queueMicrotask(() => triggerRef.current?.focus?.());
  }, []);

  const openBooking = useCallback(
    (triggerEl) => {
      if (!url) {
        router.push("/#contact");
        return;
      }
      if (triggerEl instanceof HTMLElement) triggerRef.current = triggerEl;
      preconnectCalendly();
      setOpen(true);
      if (!iframeSrc) {
        setIframeSrc(getCalendlyEmbedUrl());
        setIframeReady(false);
        setIframeError(false);
      }
      queueMicrotask(() => closeBtnRef.current?.focus());
    },
    [url, iframeSrc, router],
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeBooking();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeBooking]);

  const value = useMemo(
    () => ({ open, openBooking, closeBooking }),
    [open, openBooking, closeBooking],
  );

  const modal =
    typeof document !== "undefined" && (open || iframeSrc)
      ? createPortal(
          <div
            className={
              open
                ? "fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6"
                : "pointer-events-none invisible fixed inset-0 z-[120]"
            }
            aria-hidden={!open}
            inert={!open || undefined}
          >
            {open && (
              <button
                type="button"
                aria-label="Fermer"
                className="absolute inset-0 bg-ink/75"
                onClick={closeBooking}
              />
            )}

            <div
              role="dialog"
              aria-modal={open ? "true" : undefined}
              aria-labelledby={titleId}
              className={
                open
                  ? "relative z-10 flex max-h-[92svh] w-full max-w-3xl translate-y-0 flex-col overflow-hidden rounded-t-lg border border-cream/10 bg-[#07110e] text-cream opacity-100 shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition-[opacity,transform] duration-200 ease-out sm:rounded-lg"
                  : "relative z-10 flex max-h-[92svh] w-full max-w-3xl translate-y-4 flex-col overflow-hidden rounded-t-lg border border-cream/10 bg-[#07110e] text-cream opacity-0 sm:rounded-lg"
              }
            >
              <div className="relative z-10 flex shrink-0 items-center justify-between gap-4 border-b border-cream/10 px-4 py-3.5 sm:px-5">
                <div>
                  <p
                    id={titleId}
                    className="text-sm font-medium tracking-wide text-cream"
                  >
                    {bookingCta.label}
                  </p>
                  <p className="mt-0.5 text-xs text-cream/65">
                    {bookingCta.subtitle}
                  </p>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeBooking}
                  aria-label="Fermer la fenêtre"
                  tabIndex={open ? 0 : -1}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-cream/15 text-cream/80 transition-colors hover:border-accent-bright hover:text-accent-bright"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative z-10 min-h-[min(70svh,640px)] flex-1 overflow-hidden bg-white">
                {iframeSrc && !iframeReady && !iframeError && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white px-6 text-sm text-muted">
                    Chargement du calendrier…
                  </div>
                )}
                {iframeError && (
                  <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 px-6 text-center">
                    <p className="text-sm text-ink">
                      Impossible de charger Calendly.
                    </p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#0b7a6b] hover:underline"
                      tabIndex={open ? 0 : -1}
                    >
                      Ouvrir dans un nouvel onglet
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}
                {iframeSrc && !iframeError && (
                  <iframe
                    title="Calendrier de rendez-vous SkemaLab"
                    src={iframeSrc}
                    className="h-[min(70svh,640px)] w-full border-0"
                    loading="eager"
                    tabIndex={open ? 0 : -1}
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setIframeReady(true)}
                    onError={() => setIframeError(true)}
                  />
                )}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <CalendlyContext.Provider value={value}>
      {children}
      {modal}
    </CalendlyContext.Provider>
  );
}
