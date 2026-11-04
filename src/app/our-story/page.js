import AboutHero from "@/components/about/AboutHero";
import Identity from "@/components/about/Identity";
import Timeline from "@/components/about/Timeline";
import Founders from "@/components/about/Founders";
import PinnedStagesController from "@/components/PinnedStagesController";

export const metadata = {
  title: "À propos de SkemaLab | Notre histoire & notre équipe",
  description:
    "Découvrez la vision, l'histoire et l'équipe de SkemaLab, studio digital basé à Essaouira.",
  alternates: {
    canonical: "/our-story",
  },
  openGraph: {
    title: "À propos de SkemaLab | Histoire & équipe",
    description:
      "Découvrez l'histoire de Skemalab, sa vision et les personnes qui construisent ses solutions digitales.",
    url: "/our-story",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "À propos de Skemalab — Notre histoire et notre équipe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de SkemaLab | Histoire & équipe",
    description:
      "Découvrez la vision, l'histoire et l'équipe de SkemaLab, studio digital basé à Essaouira.",
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
          jobTitle: "Head of Engineering — Logiciel, Produit & IA",
        },
      ],
    },
  };

  return (
    <>
      <PinnedStagesController />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutHero />
      <Identity />
      <Timeline />
      <Founders />
    </>
  );
}
