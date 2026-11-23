import ExpertiseDetailPage from "@/components/expertise/ExpertiseDetailPage";

export const metadata = {
	title: "Soins dentaires | Skemalab",
	description: "Des systèmes de gestion de cabinet pensés pour les praticiens et leurs patients.",
	alternates: { canonical: "/expertise/dental" },
};

export default function DentalExpertisePage() {
	return <ExpertiseDetailPage id="dental" />;
}
