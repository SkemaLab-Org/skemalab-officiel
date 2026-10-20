"use client";

import { ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/data/content";
import BrandMark from "@/components/BrandMark";
import { useI18n } from "@/components/I18nProvider";
import {
  GmailIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/icons/SocialIcons";
import { MoroccanZelligeLattice, LuxuryRibbonMotif } from "@/components/ui/MoroccanPattern";

const socialLinks = [
  {
    label: "LinkedIn",
    href: contactInfo.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${contactInfo.whatsapp}`,
    Icon: WhatsAppIcon,
    external: true,
  },
  {
    label: "Gmail",
    href: `mailto:${contactInfo.email}`,
    Icon: GmailIcon,
    external: false,
  },
];

export default function Footer() {
  const { t } = useI18n();
  const navLinks = t.nav;

  return (
    <footer className="brand-fusion-bg relative overflow-hidden text-mist">
      {/* Design Pattern in Background */}
      <MoroccanZelligeLattice
        opacity={0.06}
        strokeColor="#089587"
        size={100}
        fadeMask={true}
      />

      {/* Luxury Ribbon Motif in Footer Background */}
      <div className="pointer-events-none absolute -right-20 -top-10 opacity-40 lg:opacity-55" aria-hidden="true">
        <LuxuryRibbonMotif width={680} height={380} opacity={0.5} />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:gap-12 sm:px-8 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-14 lg:py-20">
        <div className="flex flex-col">
          <BrandMark className="h-9 sm:h-10" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65 sm:mt-5">
            {t.footer.description}
          </p>

          <div className="mt-6 flex items-center gap-2.5 sm:mt-8 lg:mt-auto">
            {socialLinks.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-white/15 bg-white/5 text-white/85 transition-all duration-300 hover:border-brand hover:bg-brand/20 hover:text-brand"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>

        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/45 sm:mb-5">
            {t.footer.navTitle}
          </p>
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm text-white/85 transition-colors hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/45 sm:mb-5">
            {t.footer.contactTitle}
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex min-h-11 max-w-full items-center gap-2 break-all text-white/90 transition-colors hover:text-brand"
              >
                {contactInfo.email}
                <ArrowUpRight size={14} className="shrink-0 rtl-flip" />
              </a>
            </li>
            <li>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center gap-2 text-white/90 transition-colors hover:text-brand"
              >
                <span dir="ltr">{contactInfo.phone}</span>
                <ArrowUpRight size={14} className="shrink-0 rtl-flip" />
              </a>
            </li>
            <li className="pt-2 text-white/50">
              <span className="block sm:inline">{contactInfo.locations[0]}</span>
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">{contactInfo.locations[1]}</span>
            </li>
          </ul>

          <div className="mt-auto pt-5 sm:pt-6">
            <span className="inline-flex items-center rounded-[3px] border border-white/12 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55 sm:px-4 sm:text-[11px] sm:tracking-[0.2em]">
              {t.footer.pills}
            </span>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:px-8 sm:py-6">
          <p>© {new Date().getFullYear()} {t.common.copyright}</p>
          <p className="tracking-wide">{t.common.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
