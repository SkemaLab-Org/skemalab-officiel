import SiteShell from "@/components/SiteShell";
import {
  AboutHero,
  AboutIdentity,
  AboutTimeline,
  AboutFounders,
  AboutNumbers,
  AboutClosing,
} from "@/components/about/AboutPageSections";

export const metadata = {
  title: "À propos de SkemaLab | Studio Digital, Histoire & Fondateurs",
  description:
    "Découvrez l'histoire de Skemalab, studio digital fondé par Feissal Tarkaoui (CEO) et Marouan Khadiri (CTO). Développement web Next.js, marketing ROI et automatisation intelligente.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "À propos de SkemaLab | Histoire, Vision & Fondateurs",
    description:
      "L'alliance de la stratégie business et de l'ingénierie logicielle. Découvrez la genèse de Skemalab et ses fondateurs Feissal Tarkaoui & Marouan Khadiri.",
    url: "/about",
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
      "Découvrez la vision, l'histoire et les fondateurs de Skemalab : Feissal Tarkaoui (CEO) et Marouan Khadiri (CTO).",
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "À propos de SkemaLab",
    description:
      "Studio digital fondé par Feissal Tarkaoui et Marouan Khadiri spécialisé en développement web, marketing ROI et automatisation des workflows.",
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
      ],
    },
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <AboutHero />

      {/* Section 1: About SkemaLab (Identité, Vision & 3 Piliers) */}
      <AboutIdentity />

      {/* Section 2: Notre Histoire (Timeline interactive & Genèse) */}
      <AboutTimeline />

      {/* Section 3: Présentation des Fondateurs (Feissal Tarkaoui & Marouan Khadiri) */}
      <AboutFounders />

      {/* Impact Stats */}
      <AboutNumbers />

      {/* Call to Action */}
      <AboutClosing />
    </SiteShell>
  );
}
