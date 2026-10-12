"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { CalendlyProvider } from "@/components/CalendlyProvider";
import { useI18n } from "@/components/I18nProvider";

export default function SiteShell({ children, showLoader = false, loader = null }) {
  const { t } = useI18n();

  return (
    <CalendlyProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-[3px] focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t.common.skipToContent}
      </a>
      {showLoader ? loader : null}
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </CalendlyProvider>
  );
}
