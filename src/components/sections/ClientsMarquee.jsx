"use client";

import { useI18n } from "@/components/I18nProvider";

export default function ClientsMarquee() {
  const { t, locale } = useI18n();
  const clients = t.clientsMarquee.clients;
  const row = [...clients, ...clients];

  return (
    <section
      className="relative overflow-hidden border-y border-line bg-page py-7 sm:py-9"
      aria-label={t.clientsMarquee.headline}
    >
      <div className="relative mb-5 flex items-center justify-center gap-3 px-4 text-center sm:mb-6">
        <span className="hidden h-px w-10 bg-brand/30 sm:block" />
        <span className="h-1.5 w-1.5 rotate-45 rounded-[0.5px] bg-brand" />
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted text-balance sm:text-[11px] sm:tracking-[0.28em]">
          {locale === "ar"
            ? "شركاء النجاح والمشاريع الرائدة · المغرب ودولياً"
            : t.clientsMarquee.headline}
        </p>
        <span className="h-1.5 w-1.5 rotate-45 rounded-[0.5px] bg-brand" />
        <span className="hidden h-px w-10 bg-brand/30 sm:block" />
      </div>

      <ul className="sr-only">
        {clients.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <div className="relative" aria-hidden="true">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-page to-transparent sm:w-20 lg:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-page to-transparent sm:w-20 lg:w-36" />

        <div className="marquee-track flex w-max items-center gap-3 px-4 sm:gap-4 sm:px-6">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="group inline-flex items-center gap-3 whitespace-nowrap rounded-[3px] border border-line bg-surface/80 px-4 py-2 text-sm font-medium tracking-wide text-muted shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-brand/40 hover:bg-surface hover:text-fg sm:px-6 sm:py-2.5 sm:text-base"
            >
              {/* Moroccan 8-star icon separator */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0 text-brand/60 transition-transform duration-300 group-hover:rotate-45 group-hover:text-brand"
              >
                <rect x="5" y="5" width="14" height="14" />
                <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
              </svg>
              <span>{name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
