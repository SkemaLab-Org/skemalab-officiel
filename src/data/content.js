export const services = [
	{
		title: "Développement informatique",
		subtitle: "Produits digitaux sur mesure",
		description:
			"Sites, plateformes et applications conçus pour performer : architecture propre, UX précise, intégrations API et déploiement sécurisé.",
	},
	{
		title: "Digital marketing",
		subtitle: "Croissance mesurable",
		description:
			"Des stratégies d’acquisition et de marque orientées ROI : SEO, contenu, paid media et tunnels de conversion alignés sur vos objectifs business.",
	},
	{
		title: "Automatisation & workflows",
		subtitle: "Opérations intelligentes",
		description:
			"Nous éliminons les tâches répétitives et connectons vos outils pour gagner du temps, réduire les erreurs et accélérer vos équipes.",
	},
];

export const founders = [
	{
		id: "feissal-tarkaoui",
		name: "Feissal Tarkaoui",
		role: "Fondateur & CEO",
		title: "Chief Executive Officer & Stratégie Business",
		shortBio:
			"Entrepreneur et stratège digital, Feissal pilote la vision, la croissance et le développement commercial pour transformer les projets en leviers de rentabilité.",
		image: "/team/feissal_tarkaoui.webp",
		social: {
			linkedin: "https://www.linkedin.com/company/skemalab",
		},
		focusArea: "Business, Growth & Vision",
	},
	{
		id: "marouan-khadiri",
		name: "Marouan Khadiri",
		role: "CTO",
		title: "Chief Technology Officer & Architecte Systèmes",
		shortBio:
			"Architecte logiciel, Marouan conçoit les infrastructures web et les automatisations de Skemalab. Expert Next.js, API et n8n, il transforme la complexité en systèmes fiables et évolutifs.",
		image: "/team/marouan_khadiri.webp",
		social: {
			linkedin: "https://www.linkedin.com/in/marouan-khadiri/",
		},
		focusArea: "Deep Tech, Architecture & IA",
	},
	{
		id: "adam-khairi",
		name: "Adam Khairi",
		role: "Head of Engineering",
		title: "Head of Engineering — Logiciel, Produit & IA",
		shortBio:
			"Pilote et construis. En tant que Head of Engineering, Adam dirige l’architecture, l’UI/UX, les produits web et mobiles ainsi que les solutions IA.",
		image: "/team/adam-khairi.jpg",
		social: {
			linkedin: "https://www.linkedin.com/in/adam-khairi/",
		},
		focusArea: "Software Engineering & IA",
	},
];

export const contactInfo = {
	email: "contact@skemalab.com",
	phone: "+212 6 99 99 57 54",
	whatsapp: "212699995754",
	linkedin: "https://www.linkedin.com/company/skemalab",
	locations: [ "E104 TECHNOPARK ESSAOUIRA", "Maroc" ],
};

export const siteConfig = {
	name: "Skemalab",
	legalName: "Skemalab Studio",
	url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.skemalab.com",
	ogImage: "/opengraph-image",
	description:
		"Studio digital basé à Essaouira, Skemalab accompagne les TPE et PME au Maroc et en Europe en développement web et mobile sur mesure, marketing digital orienté ROI et automatisation de workflows avec n8n, Make et l’IA.",
	shortDescription:
		"Studio digital d'excellence : Développement Web, Marketing Digital et Automatisation de workflows.",
	keywords: [
		"Skemalab",
		"studio digital",
		"agence web Maroc",
		"développement web sur mesure",
		"marketing digital ROI",
		"automatisation de workflows",
		"n8n",
		"Make",
		"Next.js",
		"création site web",
		"développement application mobile",
		"acquisition digitale",
		"SEO Maroc",
		"SaaS MVP",
		"consulting digital",
		"Essaouira tech",
		"automatisation IA",
	],
	locale: "fr_FR",
};

/** CTA navbar — ouvre Calendly (NEXT_PUBLIC_CALENDLY_URL) */
export const bookingCta = {
	label: "Demander RDV",
	subtitle: "Choisissez un créneau disponible",
};
