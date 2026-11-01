"use client";

import { ArrowUp } from "lucide-react";
import { contactInfo } from "@/data/content";
import { useI18n } from "@/components/I18nProvider";
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
    label: "Email",
    href: `mailto:${contactInfo.email}`,
    Icon: GmailIcon,
    external: false,
  },
];

export default function Footer() {
  const { t } = useI18n();
  const navLinks = t.nav;
  const linkClass =
    "inline-flex min-h-9 items-center text-[13px] text-muted transition-colors hover:text-accent";

  return (
    <footer className="border-t border-line bg-page text-fg">
      <div className="shell grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_0.7fr_1fr] lg:gap-16">
        <div className="max-w-sm">
          <p className="font-display text-[2rem] font-light leading-none tracking-[-0.04em]">
            <span className="sr-only">SkemaLab</span>
            <span aria-hidden="true">
              Skema<span className="text-accent">lab</span>
            </span>
          </p>

          <p className="mt-5 text-[13px] leading-[1.7] text-muted">
            {t.footer.description}
          </p>

          <div className="mt-7 flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-none border border-line text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-[17px] w-[17px]" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label={t.footer.navTitle}>
          <p className="label-mono text-muted">{t.footer.navTitle}</p>
          <ul className="mt-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/our-story" className={linkClass}>
                {t.aboutIntro.cta}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="label-mono text-muted">{t.footer.contactTitle}</p>
          <ul className="mt-4 space-y-2 text-[13px]">
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="link-underline max-w-full break-all text-fg transition-colors hover:text-accent"
              >
                {contactInfo.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="link-underline text-fg transition-colors hover:text-accent"
              >
                <span dir="ltr">{contactInfo.phone}</span>
              </a>
            </li>
            <li className="text-muted">{contactInfo.locations.join(" · ")}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col items-start justify-between gap-3 py-5 sm:flex-row sm:items-center">
          <p className="label-mono text-muted">
            © {new Date().getFullYear()} {t.common.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <p className="label-mono text-muted">{t.common.tagline}</p>
            <a
              href="#top"
              className="label-mono inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
            >
              <ArrowUp size={12} aria-hidden="true" />
              <span className="sr-only">{t.common.backToTop}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
