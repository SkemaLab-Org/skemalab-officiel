import AboutHero from "@/components/about/AboutHero";
import Identity from "@/components/about/Identity";
import Timeline from "@/components/about/Timeline";
import Founders from "@/components/about/Founders";
import Stats from "@/components/sections/Stats";
import Closing from "@/components/about/Closing";

export const metadata = {
  title: "À propos de SkemaLab | Studio Digital, Histoire & Fondateurs",
  description:
    "Découvrez l'histoire de Skemalab, studio digital fondé par Feissal Tarkaoui (CEO), Marouan Khadiri (CTO) et Adam Khairi (Lead Software Engineer). Développement web Next.js, marketing ROI et automatisation intelligente.",
  alternates: {
    canonical: "/our-story",
  },
  openGraph: {
    title: "À propos de SkemaLab | Histoire, Vision & Fondateurs",
    description:
      "L'alliance de la stratégie business, de l'ingénierie logicielle et de l'IA. Découvrez la genèse de Skemalab et son équipe : Feissal Tarkaoui, Marouan Khadiri & Adam Khairi.",
    url: "/our-story",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "À propos de Skemalab — Studio Digital & Fondateurs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de SkemaLab | Studio Digital & Fondateurs",
    description:
      "Découvrez la vision, l'histoire et les fondateurs de Skemalab : Feissal Tarkaoui (CEO), Marouan Khadiri (CTO) et Adam Khairi (Lead Software Engineer).",
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "À propos de SkemaLab",
    description:
      "Studio digital fondé par Feissal Tarkaoui, Marouan Khadiri et Adam Khairi spécialisé en développement web, marketing ROI et automatisation des workflows.",
    mainEntity: {
      "@type": "Organization",
      name: "SkemaLab",
      founders: [
        {
          "@type": "Person",
          name: "Feissal Tarkaoui",
          jobTitle: "Founder & Chief Executive Officer",
        },
        {
          "@type": "Person",
          name: "Marouan Khadiri",
          jobTitle: "Chief Technology Officer",
        },
        {
          "@type": "Person",
          name: "Adam Khairi",
          jobTitle: "Lead Software Engineer",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutHero />
      <Identity />
      <Timeline />
      <Founders />
      <Stats />
      <Closing />
    </>
  );
}
