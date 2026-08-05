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
  title: "À propos",
  description:
    "Découvrez Skemalab : studio digital orienté résultats — développement, marketing digital et automatisation pour accélérer votre croissance.",
  openGraph: {
    title: "À propos | Skemalab",
    description:
      "Studio digital bâti pour accélérer les entreprises ambitieuses. Build, Grow, Automate.",
    url: "/about",
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
