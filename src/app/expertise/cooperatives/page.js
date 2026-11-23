import ExpertiseDetailPage from "@/components/expertise/ExpertiseDetailPage";

export const metadata = {
	title: "Coopératives agricoles | Skemalab",
	description: "Des systèmes de gestion qui soutiennent les membres, les stocks et les flux de production des coopératives agricoles.",
	alternates: { canonical: "/expertise/cooperatives" },
};

export default function CooperativesExpertisePage() {
	return <ExpertiseDetailPage id="cooperatives" />;
}
