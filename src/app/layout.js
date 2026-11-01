import { Bricolage_Grotesque, Manrope, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/components/I18nProvider";
import SmoothScroll from "@/components/SmoothScroll";
import SiteShell from "@/components/SiteShell";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/content";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const arabic = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Skemalab | Développement Web, Marketing Digital & Automatisation",
    template: "%s | Skemalab",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale || "fr_FR",
    alternateLocale: siteConfig.localeAlternate ? [siteConfig.localeAlternate] : undefined,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Skemalab | Studio Digital : Développement, Marketing & Automatisation",
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Skemalab — Studio Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skemalab | Développement Web, Marketing Digital & Automatisation",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07110e" },
    { media: "(prefers-color-scheme: light)", color: "#f4f0e7" },
  ],
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("skemalab-theme");var r=document.documentElement;if(t==="light"){r.classList.remove("dark");r.style.colorScheme="light"}else{r.classList.add("dark");r.style.colorScheme="dark"}}catch(e){}})();`;
const localeInitScript = `(function(){try{var l=localStorage.getItem("skemalab-locale")||"fr";var r=document.documentElement;r.setAttribute("lang",l);if(l==="ar"){r.setAttribute("dir","rtl");r.classList.add("rtl")}else{r.setAttribute("dir","ltr");r.classList.remove("rtl")}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      dir="ltr"
      className={`dark ${display.variable} ${sans.variable} ${arabic.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-svh bg-page font-sans text-fg antialiased">
        <JsonLd />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
        <script
          id="locale-init"
          dangerouslySetInnerHTML={{ __html: localeInitScript }}
          suppressHydrationWarning
        />
        <ThemeProvider>
          <I18nProvider>
            <SmoothScroll />
            <SiteShell>{children}</SiteShell>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
