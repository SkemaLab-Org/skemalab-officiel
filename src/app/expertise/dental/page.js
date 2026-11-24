import ExpertiseDetailPage from "@/components/expertise/ExpertiseDetailPage";

export const metadata = {
	title: "Soins dentaires | Skemalab",
	description: "Systèmes complets : agenda intelligent, dossiers patients centralisés, plans de traitement, facturation & mutuelles, rappels automatiques, tableau de bord analytique.",
	alternates: { canonical: "/expertise/dental" },
};

export default function DentalExpertisePage() {
	return <ExpertiseDetailPage id="dental" />;
}
