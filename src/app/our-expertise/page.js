import ExpertiseHero from "@/components/expertise/ExpertiseHero";
import IntroBand from "@/components/expertise/IntroBand";
import SectorSection from "@/components/expertise/SectorSection";
import ClosingBand from "@/components/expertise/ClosingBand";
import { siteConfig } from "@/data/content";

export const metadata = {
	title: "Notre expertise sectorielle | Skemalab",
	description:
		"Skemalab conçoit des systèmes métiers pour trois secteurs : coopératives agricoles, établissements d’enseignement et cabinets dentaires. Plateformes robustes, conçues pour des flux réels et une valeur mesurable.",
	alternates: {
		canonical: "/our-expertise",
	},
	openGraph: {
		title: "Notre expertise sectorielle | Skemalab",
		description:
			"Skemalab conçoit des systèmes métiers pour trois secteurs : coopératives agricoles, établissements d’enseignement et cabinets dentaires.",
		url: "/our-expertise",
		images: [
			{
				url: "/opengraph-image",
				width: 1200,
				height: 630,
				alt: "Skemalab — Notre expertise sectorielle",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Notre expertise sectorielle | Skemalab",
		description:
			"Skemalab conçoit des systèmes métiers pour trois secteurs : coopératives agricoles, établissements d’enseignement et cabinets dentaires.",
		images: ["/opengraph-image"],
	},
};

export default function ExpertisePage() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: "Notre expertise sectorielle — Skemalab",
		description:
			"Skemalab conçoit des systèmes métiers pour trois secteurs : coopératives agricoles, établissements d’enseignement et cabinets dentaires.",
		url: `${ siteConfig.url }/our-expertise`,
		inLanguage: "fr-FR",
		isPartOf: {
			"@type": "WebSite",
			"@id": `${ siteConfig.url }/#website`,
		},
		about: {
			"@type": "Organization",
			name: "Skemalab",
			url: siteConfig.url,
		},
		hasPart: [
			{
				"@type": "WebPage",
				name: "Coopératives agricoles",
				url: `${ siteConfig.url }/our-expertise#cooperatives`,
			},
			{
				"@type": "WebPage",
				name: "Systèmes éducatifs",
				url: `${ siteConfig.url }/our-expertise#education`,
			},
			{
				"@type": "WebPage",
				name: "Soins dentaires",
				url: `${ siteConfig.url }/our-expertise#dental`,
			},
		],
	};

	return (
		<>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={ { __html: JSON.stringify( jsonLd ) } }
			/>
			<ExpertiseHero />
			<IntroBand />
			<SectorSection id="cooperatives" />
			<SectorSection id="education" mirror />
			<SectorSection id="dental" />
			<ClosingBand />
		</>
	);
}
