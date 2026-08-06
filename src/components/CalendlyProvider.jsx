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
        window.location.href = "/#contact";
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
    [url, iframeSrc],
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
                  ? "brand-fusion-bg relative z-10 flex max-h-[92svh] w-full max-w-3xl translate-y-0 flex-col overflow-hidden rounded-t-[12px] border border-white/10 opacity-100 shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition-[opacity,transform] duration-200 ease-out sm:rounded-[12px]"
                  : "brand-fusion-bg relative z-10 flex max-h-[92svh] w-full max-w-3xl translate-y-4 flex-col overflow-hidden rounded-t-[12px] border border-white/10 opacity-0 sm:rounded-[12px]"
              }
            >
              <div className="relative z-10 flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3.5 sm:px-5">
                <div>
                  <p
                    id={titleId}
                    className="text-sm font-medium tracking-wide text-white"
                  >
                    {bookingCta.label}
                  </p>
                  <p className="mt-0.5 text-xs text-white/55">
                    {bookingCta.subtitle}
                  </p>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeBooking}
                  aria-label="Fermer la fenêtre"
                  tabIndex={open ? 0 : -1}
                  className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-white/15 bg-white/5 text-white transition-colors hover:border-brand hover:text-brand"
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
                    <p className="text-sm text-fg">
                      Impossible de charger Calendly.
                    </p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
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
