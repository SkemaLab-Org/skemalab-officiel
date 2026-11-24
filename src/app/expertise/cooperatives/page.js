import ExpertiseDetailPage from "@/components/expertise/ExpertiseDetailPage";

export const metadata = {
	title: "Coopératives de production | Skemalab",
	description: "Des plateformes qui organisent les membres, la production et la répartition des résultats des coopératives de production.",
	alternates: { canonical: "/expertise/cooperatives" },
};

export default function CooperativesExpertisePage() {
	return <ExpertiseDetailPage id="cooperatives" />;
}
