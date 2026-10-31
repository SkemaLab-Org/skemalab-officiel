import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-[#07110e] text-cream">
      <div aria-hidden="true" className="zellige absolute inset-0 opacity-30" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-[26rem] w-[26rem] rounded-full bg-brand/20 blur-[140px]"
      />

      <div className="shell relative py-28">
        <div className="ledger-rule ledger-rule--ink max-w-xl">
          <span className="label-mono text-cream/65">Erreur 404</span>
          <span className="label-mono text-cream/65">Skemalab</span>
        </div>

        <h1 className="display-xl mt-8 max-w-[16ch] text-cream">
          Cette page n’existe <span className="text-accent-bright">pas encore.</span>
        </h1>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/65 sm:text-base">
          Le lien que vous avez suivi est introuvable. Revenez à l’accueil ou
          écrivez-nous pour parler de votre projet.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand px-6 text-sm font-medium text-on-brand transition-colors hover:bg-brand-deep"
          >
            <ArrowLeft size={16} aria-hidden="true" className="rtl-flip" />
            Retour à l’accueil
          </Link>
          <Link
            href="/#contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-cream/25 px-6 text-sm text-cream transition-colors hover:border-accent-bright hover:text-accent-bright"
          >
            Nous contacter
            <ArrowUpRight size={16} aria-hidden="true" className="rtl-flip" />
          </Link>
        </div>
      </div>
    </section>
  );
}
