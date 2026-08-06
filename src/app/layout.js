import Script from "next/script";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/data/content";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Skemalab | Développement, Marketing Digital & Automatisation",
    template: "%s | Skemalab",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "développement web",
    "marketing digital",
    "automatisation",
    "workflows",
    "agence digitale",
    "Skemalab",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Skemalab | Développement, Marketing Digital & Automatisation",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: "Skemalab | Développement, Marketing Digital & Automatisation",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("skemalab-theme");var r=document.documentElement;if(t==="dark"){r.classList.add("dark");r.style.colorScheme="dark"}else{r.classList.remove("dark");r.style.colorScheme="light"}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans text-fg antialiased">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
