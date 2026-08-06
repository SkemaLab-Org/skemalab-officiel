import { ArrowUpRight } from "lucide-react";
import { contactInfo, navLinks } from "@/data/content";
import BrandMark from "@/components/BrandMark";
import {
  GmailIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/icons/SocialIcons";

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
  return (
    <footer className="brand-fusion-bg relative overflow-hidden text-mist">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:gap-12 sm:px-8 sm:py-16 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-14 lg:py-20">
        <div>
          <BrandMark className="h-9 sm:h-10" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65 sm:mt-5">
            Studio digital orienté résultats. Développement, marketing et
            automatisation pour les entreprises qui veulent accélérer.
          </p>

          <div className="mt-6 flex items-center gap-2.5 sm:mt-8">
            {socialLinks.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-white/15 bg-white/5 text-white/85 transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>

          <div className="mt-5 inline-flex items-center rounded-[3px] border border-white/12 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55 sm:mt-6 sm:px-4 sm:text-[11px] sm:tracking-[0.2em]">
            Build · Grow · Automate
          </div>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/45 sm:mb-5">
            Navigation
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

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/45 sm:mb-5">
            Contact
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex min-h-11 max-w-full items-center gap-2 break-all text-white/90 transition-colors hover:text-brand"
              >
                {contactInfo.email}
                <ArrowUpRight size={14} className="shrink-0" />
              </a>
            </li>
            <li>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center gap-2 text-white/90 transition-colors hover:text-brand"
              >
                {contactInfo.phone}
                <ArrowUpRight size={14} className="shrink-0" />
              </a>
            </li>
            <li className="pt-2 text-white/50">
              <span className="block sm:inline">{contactInfo.locations[0]}</span>
              <span className="hidden sm:inline"> · </span>
              <span className="block sm:inline">{contactInfo.locations[1]}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:px-8 sm:py-6">
          <p>© {new Date().getFullYear()} Skemalab. Tous droits réservés.</p>
          <p className="tracking-wide">Développement · Marketing · Automatisation</p>
        </div>
      </div>
    </footer>
  );
}
