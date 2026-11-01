"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/data/content";
import BrandMark from "@/components/BrandMark";
import Marquee from "@/components/motion/Marquee";
import { useI18n } from "@/components/I18nProvider";
import { GmailIcon, LinkedInIcon, WhatsAppIcon } from "@/components/icons/SocialIcons";

const socialLinks = [
  { label: "LinkedIn", href: contactInfo.linkedin, Icon: LinkedInIcon, external: true },
  {
    label: "WhatsApp",
    href: `https://wa.me/${contactInfo.whatsapp}`,
    Icon: WhatsAppIcon,
    external: true,
  },
  { label: "Email", href: `mailto:${contactInfo.email}`, Icon: GmailIcon, external: false },
];

export default function Footer() {
  const { t } = useI18n();
  const navLinks = t.nav;

  return (
    <footer className="relative overflow-hidden bg-[#07110e] text-cream">
      <div className="pointer-events-none absolute inset-0 zellige opacity-25" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-brand/15 blur-[140px]" />

      <div className="relative border-b border-cream/10">
        <Marquee duration={64} className="py-7 sm:py-9">
          <div className="flex items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
            {[0, 1, 2].map((copy) => (
              <span key={copy} className="flex items-center gap-8 sm:gap-12">
                <span className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-none tracking-tight text-cream">
                  Skemalab
                </span>
                <span className="h-2 w-2 rotate-45 bg-accent-bright" aria-hidden="true" />
                <span className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-none tracking-tight text-cream/65">
                  Build · Grow · Automate
                </span>
                <span className="h-2 w-2 rotate-45 bg-accent-bright/40" aria-hidden="true" />
              </span>
            ))}
          </div>
        </Marquee>
      </div>

      <div className="relative shell grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.5fr_0.8fr_1fr] lg:gap-16 lg:py-20">
        <div className="max-w-sm">
          <BrandMark className="h-9" tone="dark" />
          <p className="mt-6 text-sm leading-relaxed text-cream/65">{t.footer.description}</p>
          <div className="mt-8 flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-cream/15 text-cream/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-bright hover:text-accent-bright"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Pied de page">
          <p className="label-mono text-cream/65">{t.footer.navTitle}</p>
          <ul className="mt-5 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-10 items-center text-sm text-cream/70 transition-colors hover:text-accent-bright"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/our-story"
                className="inline-flex min-h-10 items-center text-sm text-cream/70 transition-colors hover:text-accent-bright"
              >
                {t.aboutIntro.cta}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="label-mono text-cream/65">{t.footer.contactTitle}</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="link-underline max-w-full break-all text-cream/85 hover:text-accent-bright"
              >
                {contactInfo.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="link-underline text-cream/85 hover:text-accent-bright"
              >
                <span dir="ltr">{contactInfo.phone}</span>
              </a>
            </li>
            <li className="text-cream/65">{contactInfo.locations.join(" · ")}</li>
          </ul>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/15 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" aria-hidden="true" />
            <span className="label-mono text-cream/65">{t.footer.pills}</span>
          </div>
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="shell flex flex-col items-start justify-between gap-3 py-5 text-xs text-cream/65 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {t.common.copyright}
          </p>
          <div className="flex items-center gap-5">
            <p className="tracking-wide">{t.common.tagline}</p>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 text-cream/65 transition-colors hover:text-accent-bright"
            >
              <ArrowUp size={13} aria-hidden="true" />
              <span className="sr-only">Retour en haut</span>
            </a>
          </div>
        </div>
      </div>

      <span className="sr-only">
        <ArrowUpRight aria-hidden="true" />
      </span>
    </footer>
  );
}
