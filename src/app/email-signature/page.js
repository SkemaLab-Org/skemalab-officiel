import EmailSignatureStudio from "@/components/email-signature/EmailSignatureStudio";

export const metadata = {
  title: "Générateur de Signature Email | SkemaLab Agency",
  description:
    "Générez la signature email officielle de SkemaLab Agency pour Feissal Tarkaoui, Marouan Khadiri et Adam Khairi. Compatible Gmail, Apple Mail et Outlook.",
  alternates: {
    canonical: "/email-signature",
  },
  openGraph: {
    title: "Générateur de Signature Email | SkemaLab Agency",
    description:
      "Trois signatures professionnelles SkemaLab prêtes à copier-coller dans Gmail : Feissal Tarkaoui, Marouan Khadiri et Adam Khairi. Design raffiné, badge Build · Grow · Automate et coordonnées complètes.",
    url: "/email-signature",
  },
};

export default function EmailSignaturePage() {
  return (
    <EmailSignatureStudio />
  );
}
