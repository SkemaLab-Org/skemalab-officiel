import {
	Bricolage_Grotesque,
	Manrope,
	Cairo,
	JetBrains_Mono,
} from "next/font/google";
import Script from "next/script";
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

const mono = JetBrains_Mono({
	variable: "--font-jetbrains",
	subsets: ["latin"],
	weight: ["300", "400"],
	display: "swap",
});

export const metadata = {
	metadataBase: (() => {
		try {
			return new URL(siteConfig.url);
		} catch {
			return undefined;
		}
	})(),
	title: {
		default:
			"Skemalab | Studio digital au Maroc — Web, marketing & automatisation",
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
		url: siteConfig.url,
		siteName: siteConfig.name,
		title:
			"Skemalab | Studio digital au Maroc — Web, marketing & automatisation",
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
		title:
			"Skemalab | Studio digital au Maroc — Web, marketing & automatisation",
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
const localeInitScript = `(function(){try{var p=location.pathname;var m=p.match(/^\\/(fr|en|ar)\\/blog(?:\\/|$)/);var l=m?m[1]:(localStorage.getItem("skemalab-locale")||"fr");if(m){localStorage.setItem("skemalab-locale",l)}var r=document.documentElement;r.setAttribute("lang",l);if(l==="ar"){r.setAttribute("dir","rtl");r.classList.add("rtl")}else{r.setAttribute("dir","ltr");r.classList.remove("rtl")}}catch(e){}})();`;

export default function RootLayout({ children }) {
	return (
		<html
			lang="fr"
			dir="ltr"
			className={`dark ${display.variable} ${sans.variable} ${arabic.variable} ${mono.variable} antialiased`}
			suppressHydrationWarning
		>
			<head>
				<style
					dangerouslySetInnerHTML={{
						__html: `
html[data-intro="pending"] body::after {
  position: fixed;
  z-index: 120;
  inset: 0;
  background: #07110e;
  content: "";
  pointer-events: none;
}
html[data-intro="pending"] #hero {
  opacity: 0 !important;
  visibility: hidden !important;
}
html[data-intro="pending"] [data-intro-anchor="nav"],
html[data-intro="true"] [data-intro-anchor="nav"] {
  opacity: 0 !important;
}
`,
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var p=location.pathname;if(p==="/"||p===""){if(!matchMedia("(prefers-reduced-motion: reduce)").matches){if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);document.documentElement.setAttribute("data-intro","pending");setTimeout(function(){if(document.documentElement.getAttribute("data-intro")==="pending"){document.documentElement.removeAttribute("data-intro");}},4000);}}}catch(e){}})();`,
					}}
				/>
			</head>
			<body className="min-h-svh bg-page font-sans text-fg antialiased">
				<JsonLd />
				<Script
					id="theme-init"
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{ __html: themeInitScript }}
				/>
				<Script
					id="locale-init"
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{ __html: localeInitScript }}
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
