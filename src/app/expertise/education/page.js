import ExpertiseDetailPage from "@/components/expertise/ExpertiseDetailPage";

export const metadata = {
	title: "Systèmes éducatifs | Skemalab",
	description: "Des plateformes qui accompagnent élèves, enseignants et administration.",
	alternates: { canonical: "/expertise/education" },
};

export default function EducationExpertisePage() {
	return <ExpertiseDetailPage id="education" />;
}
