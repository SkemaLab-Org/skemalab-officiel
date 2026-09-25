import SiteShell from "@/components/SiteShell";
import EmailSignatureStudio from "@/components/email-signature/EmailSignatureStudio";

export const metadata = {
  title: "Générateur de Signature Email | SkemaLab Agency",
  description:
    "Générez et personnalisez la signature email officielle de SkemaLab Agency pour Feissal Tarkaoui et l'équipe. Compatible Gmail, Apple Mail et Outlook.",
  alternates: {
    canonical: "/email-signature",
  },
  openGraph: {
    title: "Générateur de Signature Email | SkemaLab Agency",
    description:
      "Signature professionnelle SkemaLab prête à copier-coller dans Gmail. Design raffiné, badge Build · Grow · Automate et coordonnées complètes.",
    url: "/email-signature",
  },
};

export default function EmailSignaturePage() {
  return (
    <SiteShell>
      <EmailSignatureStudio />
    </SiteShell>
  );
}
