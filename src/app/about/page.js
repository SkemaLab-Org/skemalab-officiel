import SiteShell from "@/components/SiteShell";
import {
  AboutHero,
  AboutStory,
  AboutPrinciples,
  AboutExpertise,
  AboutNumbers,
  AboutClosing,
} from "@/components/about/AboutPageSections";

export const metadata = {
  title: "À propos de nous",
  description:
    "Découvrez Skemalab : studio digital basé à Essaouira, opérant à l'international. Développement web, marketing digital ROI et automatisation de process.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "À propos de Skemalab | Studio Digital & Automatisation",
    description:
      "Studio digital bâti pour accélérer les entreprises ambitieuses. Build, Grow, Automate — orienté résultats et ROI.",
    url: "/about",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "À propos de Skemalab — Studio Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de Skemalab | Studio Digital",
    description:
      "Découvrez la vision, l'équipe et les méthodes de travail de Skemalab.",
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutHero />
      <AboutStory />
      <AboutPrinciples />
      <AboutExpertise />
      <AboutNumbers />
      <AboutClosing />
    </SiteShell>
  );
}
