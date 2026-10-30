"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PageTransition from "@/components/PageTransition";
import { CalendlyProvider } from "@/components/CalendlyProvider";
import { useI18n } from "@/components/I18nProvider";

/**
 * Persistent site chrome. Lives in the root layout so the header and footer
 * never remount between routes; only the page body crossfades.
 */
export default function SiteShell({ children }) {
  const { t } = useI18n();

  return (
    <CalendlyProvider>
      <div id="top" className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-on-brand"
        >
          {t.common.skipToContent}
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <aside aria-label={t.common.contactShortcut || "Contact rapide"}>
          <WhatsAppFloat />
        </aside>
      </div>
    </CalendlyProvider>
  );
}
