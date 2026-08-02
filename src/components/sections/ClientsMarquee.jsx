import { clients } from "@/data/content";

export default function ClientsMarquee() {
  const row = [...clients, ...clients];

  return (
    <section
      className="relative overflow-hidden border-y border-line bg-page py-8 sm:py-10"
      aria-label="Clients"
    >
      <p className="relative mb-5 px-4 text-center text-[10px] uppercase tracking-[0.18em] text-muted text-balance sm:mb-7 sm:text-[11px] sm:tracking-[0.32em]">
        Ils nous font confiance pour accélérer leur digital
      </p>
      <ul className="sr-only">
        {clients.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <div className="relative" aria-hidden="true">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-page to-transparent sm:w-16 lg:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-page to-transparent sm:w-16 lg:w-32" />
        <div className="marquee-track flex w-max items-center gap-2.5 px-4 sm:gap-4 sm:px-6">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-[3px] border border-line bg-surface px-3.5 py-2 text-sm font-medium tracking-wide text-muted transition-colors hover:border-brand/30 hover:text-fg sm:gap-3 sm:px-6 sm:py-2.5 sm:text-base"
            >
              <span className="h-1.5 w-1.5 rounded-[3px] bg-brand/60" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
