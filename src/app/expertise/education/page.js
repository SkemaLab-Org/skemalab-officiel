import ExpertiseDetailPage from "@/components/expertise/ExpertiseDetailPage";

export const metadata = {
	title: "Systèmes éducatifs | Skemalab",
	description: "Plateformes complètes : création de cours modulaire, suivi de progression granulaire, certification automatisée, gamification, présence QR/géo, assistant IA pédagogique.",
	alternates: { canonical: "/expertise/education" },
};

export default function EducationExpertisePage() {
	return <ExpertiseDetailPage id="education" />;
}
