import devArticleImage from "@/assets/home-imgs/dev-article.webp";
import marketingArticleImage from "@/assets/home-imgs/marketing-article.webp";
import automationArticleImage from "@/assets/home-imgs/automation-article.webp";
import saasImage from "@/assets/home-imgs/saas-b2b.webp";
import refonteImage from "@/assets/home-imgs/refonte-ecom.webp";
import engineImage from "@/assets/home-imgs/engine-d'acquise.webp";
import crmImage from "@/assets/home-imgs/automation-crm.webp";
import dashboardImage from "@/assets/home-imgs/dashboard-data.webp";

export const fr = {
  meta: {
    title: "Skemalab | Développement Web, Marketing Digital & Automatisation",
    titleTemplate: "%s | Skemalab",
    description:
      "Skemalab est un studio digital orienté résultats : développement web & mobile sur mesure, marketing digital ROI et automatisation de workflows (n8n, Make, IA) pour propulser votre croissance.",
    aboutTitle: "À propos de SkemaLab | Studio Digital, Histoire & Fondateurs",
    aboutDescription:
      "Découvrez l'histoire de Skemalab, studio digital fondé par Feissal Tarkaoui (CEO) et Marouan Khadiri (CTO). Développement web Next.js, marketing ROI et automatisation intelligente.",
  },

  common: {
    tagline: "Développement · Marketing · Automatisation",
    badgeStudio: "Studio Digital d’Excellence · Essaouira & International",
    skipToContent: "Aller au contenu",
    menuLabel: "Menu de navigation",
    closeMenu: "Fermer le menu",
    openMenu: "Ouvrir le menu",
    copyright: "Skemalab. Tous droits réservés.",
    bookingCta: "Demander RDV",
    bookingSubtitle: "Choisissez un créneau disponible",
  },

  nav: [
    { href: "/#services", label: "Services" },
    { href: "/#method", label: "Méthode" },
    { href: "/#projets", label: "Projets" },
    { href: "/#agence", label: "Agence" },
    { href: "/#contact", label: "Contact" },
  ],

  hero: {
    ctaPrimary: "Lancer un projet",
    ctaSecondary: "Voir le service",
    prevSlide: "Slide précédent",
    nextSlide: "Slide suivant",
    selectService: "Choisir un service",
  },

  servicesList: [
    {
      id: "dev",
      title: "Développement informatique",
      subtitle: "Produits digitaux sur mesure",
      description:
        "Sites, plateformes et applications conçus pour performer : architecture propre, UX précise, intégrations API et déploiement sécurisé.",
      points: [
        "Sites corporate & plateformes web",
        "Applications web & mobile",
        "APIs, CRM & systèmes métiers",
        "Performance, sécurité & maintenance",
      ],
      image: devArticleImage,
      heroLabel: "01 — Build",
      heroHeadline: "Des produits digitaux qui accélèrent votre business.",
      heroText:
        "Sites, plateformes et applications sur mesure — pensés pour convertir, scaler et durer.",
    },
    {
      id: "marketing",
      title: "Digital marketing",
      subtitle: "Croissance mesurable",
      description:
        "Des stratégies d’acquisition et de marque orientées ROI : SEO, contenu, paid media et tunnels de conversion alignés sur vos objectifs business.",
      points: [
        "SEO / SEA & acquisition",
        "Branding & contenu",
        "Social media & campagnes",
        "Funnels & conversion",
      ],
      image:
        marketingArticleImage,
      heroLabel: "02 — Grow",
      heroHeadline: "Une acquisition digitale orientée ROI.",
      heroText:
        "SEO, campagnes et contenus alignés sur vos objectifs — pour attirer, convertir et fidéliser.",
    },
    {
      id: "automation",
      title: "Automatisation & workflows",
      subtitle: "Opérations intelligentes",
      description:
        "Nous éliminons les tâches répétitives et connectons vos outils pour gagner du temps, réduire les erreurs et accélérer vos équipes.",
      points: [
        "Workflows n8n / Make / Zapier",
        "Assistants & agents IA",
        "CRM, email & prospection",
        "Reporting automatisé",
      ],
      image:
        automationArticleImage,
      heroLabel: "03 — Automate",
      heroHeadline: "Des workflows intelligents qui libèrent vos équipes.",
      heroText:
        "Automatisez vos process, connectez vos outils et gagnez des heures chaque semaine.",
    },
  ],

  servicesSection: {
    eyebrow: "Expertises",
    titlePart1: "Trois leviers. Une seule ambition : ",
    titleHighlight: "votre croissance.",
    description:
      "Skemalab réunit développement, marketing digital et automatisation pour construire des systèmes qui convertissent, scalent et s’améliorent dans le temps.",
    talkWithExpert: "En parler avec un expert",
  },

  clientsMarquee: {
    headline: "Ils nous font confiance pour accélérer leur digital",
    clients: [
      "Northline",
      "Atlas Retail",
      "Pulse Finance",
      "Orion Santé",
      "Vertex Logistique",
      "Maison Clarisse",
      "Nova Media",
      "Helix Legal",
    ],
  },

  processSection: {
    eyebrow: "Méthode",
    title: "Une approche claire, du diagnostic au ROI.",
    description:
      "Moins de friction, plus de clarté. Chaque étape est conçue pour avancer vite sans sacrifier la qualité ni la vision business.",
    steps: [
      {
        step: "01",
        title: "Diagnostic",
        text: "Nous cartographions vos enjeux, vos process et vos leviers de croissance pour définir une feuille de route claire.",
      },
      {
        step: "02",
        title: "Architecture",
        text: "Stratégie, design et stack technique alignés sur un objectif business précis — pas sur des tendances.",
      },
      {
        step: "03",
        title: "Exécution",
        text: "Sprints courts, livrables mesurables, communication transparente. On construit, on teste, on itère.",
      },
      {
        step: "04",
        title: "Optimisation",
        text: "Après le lancement, nous mesurons, automatisons et améliorons en continu pour maximiser le ROI.",
      },
    ],
  },

  projectsSection: {
    eyebrow: "Réalisations",
    title: "Des projets pensés pour performer.",
    description:
      "Chaque livraison allie design, technique et impact business — des résultats concrets, pas des slides.",
    measuredImpact: "Impact mesuré",
    summary:
      "Conception, build et optimisation — livrés avec une feuille de route claire et des indicateurs de succès définis dès le départ.",
    similarProject: "Projet similaire",
    prevLabel: "Projet précédent",
    nextLabel: "Projet suivant",
    list: [
      {
        title: "Plateforme SaaS B2B",
        category: "Développement",
        result: "+48% d’activation utilisateurs",
        image: saasImage,
      },
      {
        title: "Refonte e-commerce",
        category: "Web & UX",
        result: "+62% de taux de conversion",
        image: refonteImage,
      },
      {
        title: "Engine d’acquisition",
        category: "Marketing",
        result: "3,2× leads qualifiés / mois",
        image: engineImage,
      },
      {
        title: "Automatisation CRM",
        category: "Workflows",
        result: "18h / semaine économisées",
        image: crmImage,
      },
      {
        title: "Dashboard data",
        category: "IA & Data",
        result: "Décisions en temps réel",
        image: dashboardImage,
      },
    ],
  },

  statsList: [
    { value: 40, suffix: "+", label: "Projets livrés" },
    { value: 100, suffix: "%", label: "Clients satisfaits" },
    { value: 5, suffix: "h", label: "Économisées / jour en moyenne" },
    { value: 3, suffix: "×", label: "Accélération des process" },
  ],

  aboutHome: {
    eyebrow: "L’agence",
    title: "Votre partenaire de croissance digitale.",
    p1: "Skemalab accompagne les entreprises ambitieuses dans leur transformation digitale. Nous allions stratégie business, excellence technique et automatisation intelligente pour bâtir des leviers de performance durables.",
    p2: "Que vous lanciez un produit, accélériez votre acquisition ou industrialisiez vos process internes, nous concevons une solution claire, exécutable et orientée résultats.",
    promiseEyebrow: "Notre promesse",
    promiseText:
      "Pas de projets décoratifs. Des systèmes digitaux qui créent de la valeur mesurable.",
    cta: "Parler à un expert",
    imageAlt: "L’agence Skemalab, partenaire de croissance digitale",
    pillars: [
      [ "Mission", "Allier tech, marketing et automation pour scaler." ],
      [ "Approche", "Diagnostic précis, exécution rapide, ROI suivi." ],
      [ "Équipes", "Produit, design, growth & automation." ],
      [ "Modèle", "Partenariat long terme, pas livraison jetable." ],
    ],
  },

  testimonialsSection: {
    eyebrow: "Témoignages",
    title: "La confiance se construit sur les résultats.",
    list: [
      {
        quote:
          "Skemalab a transformé notre site vitrine en véritable machine d’acquisition. Les résultats sont concrets, mesurables, sans jargon inutile.",
        name: "Sara Benali",
        role: "Directrice Marketing, FinTech",
      },
      {
        quote:
          "Leur stack d’automatisation a réduit nos délais de traitement de moitié. Nos équipes se concentrent enfin sur la valeur ajoutée.",
        name: "Youssef Amrani",
        role: "COO, Retail",
      },
      {
        quote:
          "Un partenaire rare : vision business, exécution technique solide et suivi rigoureux. On a livré un MVP SaaS en 8 semaines.",
        name: "Camille Dupont",
        role: "Fondatrice, Scale-up",
      },
    ],
  },

  ctaBanner: {
    imageAlt: "Skyline urbain — croissance et ambition",
    eyebrow: "Prêt à accélérer",
    headline: "Transformons votre ambition digitale en avantage concurrentiel.",
    description:
      "Un échange de 30 minutes pour clarifier vos enjeux, identifier les leviers rapides et construire une feuille de route concrète.",
    ctaPrimary: "Demander un devis",
    ctaSecondary: "Écrire à l’équipe",
  },

  contactSection: {
    eyebrow: "Contact",
    title: "Parlons de votre prochain levier de croissance.",
    description:
      "Décrivez votre besoin — site, produit, acquisition ou automation. Nous revenons vers vous sous 24h ouvrées.",
    fieldsRequirement:
      "Tous les champs sont obligatoires — réponse sous 24h ouvrées.",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    locationLabel: "Localisation",
    nameInput: "Nom",
    companyInput: "Entreprise",
    emailInput: "Email",
    phoneInput: "Téléphone",
    serviceInput: "Service concerné",
    servicePlaceholder: "Choisir un service",
    globalService: "Accompagnement global",
    messageInput: "Votre besoin",
    messagePlaceholder: "Objectifs, délais, contexte...",
    submitBtn: "Envoyer la demande",
    submitting: "Envoi…",
    successTitle: "Message envoyé.",
    successEyebrow: "Merci",
    successText:
      "Votre demande a bien été transmise. Notre équipe vous recontacte sous 24h ouvrées.",
    resetSuccess: "Envoyer un autre message",
    rateLimitTitle: "Trop de demandes.",
    rateLimitEyebrow: "Limite",
    rateLimitText: "Patientez environ 15 minutes, ou écrivez-nous directement.",
    errorTitle: "Envoi impossible.",
    errorEyebrow: "Erreur",
    errorText: "Réessayez dans un instant, ou écrivez-nous directement.",
    retryBtn: "Réessayer",
    backBtn: "Retour",
  },

  contactErrors: {
    nameRequired: "Le nom est requis.",
    nameTooLong: "Nom trop long.",
    companyRequired: "L’entreprise est requise.",
    companyTooLong: "Entreprise trop longue.",
    emailRequired: "L’email est requis.",
    emailInvalid: "Format d’email invalide.",
    phoneRequired: "Le téléphone est requis.",
    phoneTooShort: "Numéro trop court.",
    phoneTooLong: "Numéro trop long.",
    serviceRequired: "Choisissez un service.",
    serviceInvalid: "Service invalide.",
    messageRequired: "Le message est requis.",
    messageTooShort: "Message trop court (10 caractères min.).",
    messageTooLong: "Message trop long.",
  },

  footer: {
    description:
      "Studio digital orienté résultats. Développement, marketing et automatisation pour les entreprises qui veulent accélérer.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    pills: "Build · Grow · Automate",
  },

  aboutPage: {
    heroBadge: "Studio Digital d’Excellence · Essaouira & International",
    heroH1Part1: "L’ingénierie digitale & l’intelligence opérationnelle pour ",
    heroH1Highlight: "accélérer votre business.",
    heroHeadline:
      "L'ingénierie digitale et l'intelligence opérationnelle au service de votre croissance.",
    heroLead:
      "Skemalab conçoit, bâtit et automatise des écosystèmes digitaux performants qui génèrent une valeur business immédiate et durable.",
    heroCta1: "Découvrir notre histoire",
    heroCta2: "Rencontrer les fondateurs",
    strip1: "Projets livrés avec succès",
    strip2: "Clients satisfaits",
    strip3: "Accélération des process",
    strip4: "Économisées / sem. en moy.",

    identityEyebrow: "01 — Notre Identité & Vision",
    identityTitlePart1: "Réconcilier le code, la croissance et l’automatisation en un ",
    identityTitleHighlight: "système unique.",
    hqLabel: "Siège & R&D",
    scopeLabel: "Rayonnement",
    scopeValue: "Europe · MENA · International",
    studioContact: "Contact Studio",
    standardBadge: "Le Standard SkemaLab",
    standardTitle: "L’Excellence opérationnelle sans compromis",
    standardText:
      "Nous ne concevons pas des projets jetables. Chaque plateforme et chaque automatisation sont pensées pour devenir un actif pérenne et scalable pour votre entreprise.",

    methodEyebrow: "Méthodologie Fondatrice",
    methodTitle: "Les 3 leviers fondamentaux de notre studio",
    methodSubtitle:
      "Conçus pour agir en synergie continue, et non comme des départements cloisonnés.",

    pillars: [
      {
        num: "01",
        name: "Build",
        title: "Développement & SaaS Sur-Mesure",
        desc: "Applications web et mobiles, architectures Next.js, plateformes métiers et intégrations d'APIs robustes conçues pour convertir, scaler et durer.",
        tags: [ "Next.js", "React", "APIs & Microservices", "Cloud" ],
      },
      {
        num: "02",
        name: "Grow",
        title: "Marketing Digital & Acquisition ROI",
        desc: "Stratégies d'acquisition orientées rentabilité directe : SEO technique, tunnels de vente à haute conversion, campagnes ciblées et branding premium.",
        tags: [ "SEO / SEA", "Funnels de vente", "Growth", "Data Analytics" ],
      },
      {
        num: "03",
        name: "Automate",
        title: "Workflows Intelligents & Agents IA",
        desc: "Suppression radicale des tâches répétitives, interconnexion de vos outils SaaS et intégration d'assistants IA pour démultiplier la productivité.",
        tags: [ "n8n & Make", "Agents IA & LLMs", "CRM Auto", "Workflows 24/7" ],
      },
    ],

    commitmentsEyebrow: "Nos Engagements",
    commitmentsTitle: "Les 4 principes non négociables chez SkemaLab",
    principles: [
      {
        num: "01",
        title: "Clarté & Obsession ROI",
        text: "Pas de jargon inutile ni de fonctionnalités décoratives. Chaque ligne de code et chaque workflow répondent à un objectif financier précis.",
      },
      {
        num: "02",
        title: "Excellence d'Ingénierie",
        text: "Architectures modernes Next.js, APIs sécurisées et automatisation résiliente pour garantir performance, rapidité et scalabilité.",
      },
      {
        num: "03",
        title: "Systèmes Durables & Scalables",
        text: "Nous concevons des fondations modulaires capables d'encaisser votre croissance sans nécessiter de refonte coûteuse.",
      },
      {
        num: "04",
        title: "Partenariat & Agilité Sprints",
        text: "Une collaboration étroite avec vos équipes, des cycles de livraison courts et un suivi en temps réel de vos indicateurs clés.",
      },
    ],

    timelineEyebrow: "02 — Notre Histoire & Genèse",
    timelineTitlePart1: "Comment l’idée de SkemaLab est née : ",
    timelineTitleHighlight: "de la vision à la réalité.",
    timelineSubtitlePart1: "Découvrez comment ",
    timelineSubtitlePart2: " (CEO) et ",
    timelineSubtitlePart3: " (CTO) ont uni leurs expertises pour bâtir un laboratoire digital nouvelle génération.",
    thesisEyebrow: "La Thèse Fondatrice",
    thesisQuote:
      "Un site ultra design qui ne génère aucun lead est une perte d’argent. Une campagne d’acquisition brillante sans opérations automatisées crée un goulot d’étranglement. SkemaLab est né pour apporter une solution intégrale et fluide.",
    thesisAuthors: "— Feissal Tarkaoui & Marouan Khadiri, Fondateurs",
    seeProfiles: "Voir leurs profils",

    milestones: [
      {
        id: "genesis",
        year: "2023",
        period: "Genèse",
        title: "L'Étincelle Fondatrice & Le Constat",
        subtitle: "La vision partagée de Feissal Tarkaoui & Marouan Khadiri",
        description:
          "Feissal (visionnaire business) et Marouan (architecte tech) font un constat sans appel : les entreprises sont ralenties par des sites vitrines sans conversion, des outils fragmentés et des centaines d'heures perdues sur des tâches manuelles. Ils décident d'unir leurs forces pour créer un studio hybride où l'ingénierie technique sert directement le chiffre d'affaires.",
        tag: "L'Idée Initiale",
        highlight: "Combler le fossé entre Deep Tech, Growth et Automatisation",
      },
      {
        id: "foundation",
        year: "2023",
        period: "Lancement",
        title: "Création de SkemaLab & Premiers Déploiements",
        subtitle: "Implantation à Essaouira, rayonnement international",
        description:
          "Naissance officielle de SkemaLab. Les fondateurs conçoivent leur laboratoire R&D et livrent leurs premiers systèmes pour des clients en Europe et MENA : plateformes web ultra-rapides, pipelines CRM automatisés et tunnels de conversion. Les premiers retours confirment des gains spectaculaires de productivité.",
        tag: "Fondation",
        highlight: "Premiers clients internationaux et 15h+ économisées / semaine",
      },
      {
        id: "methodology",
        year: "2024",
        period: "Expansion",
        title: "Le Système « Build · Grow · Automate »",
        subtitle: "Formalisation d'une méthodologie propriétaire éprouvée",
        description:
          "Skemalab structure son approche en 3 piliers synergiques. Développement sur-mesure (Build), marketing à haute valeur ajoutée (Grow), et automatisation des processus métiers (Automate). Plus de 25 projets majeurs sont déployés avec une rigueur de sprint millimétrée.",
        tag: "Système Éprouvé",
        highlight: "Une cadence de livraison rapide et des résultats mesurables",
      },
      {
        id: "ai-era",
        year: "2025",
        period: "Innovation",
        title: "L'Intégration Massive de l'IA & Workflows Autonomes",
        subtitle: "L'avant-garde des opérations intelligentes",
        description:
          "Sous le leadership technologique de Marouan et la vision d'échelle de Feissal, SkemaLab connecte les agents IA et les architectures Next.js cloud-native aux process internes des clients. Les délais de traitement chutent de 50% chez nos partenaires.",
        tag: "Révolution IA",
        highlight: "Workflows autonomes 24/7 et assistants sur-mesure",
      },
      {
        id: "scale",
        year: "2026",
        period: "Aujourd'hui & Futur",
        title: "L'Expansion & La Référence Internationale",
        subtitle: "Le partenaire technologique des entreprises ambitieuses",
        description:
          "Avec plus de 40 projets d'envergure livrés, un taux de satisfaction de 100% et un portefeuille international solide, SkemaLab s'impose comme le studio digital qui transforme la technologie en levier de souveraineté et d'hyper-croissance.",
        tag: "Cap Futur",
        highlight: "40+ projets réussis · Partenaire stratégique global",
      },
    ],

    foundersEyebrow: "03 — Direction & Leadership",
    foundersTitlePart1: "Les esprits derrière ",
    foundersTitleHighlight: "SkemaLab.",
    foundersSubtitle:
      "Une complémentarité rare et décisive entre vision stratégique d’entreprise et excellence d’ingénierie logicielle.",

    foundersList: [
      {
        id: "feissal-tarkaoui",
        name: "Feissal Tarkaoui",
        role: "Fondateur & CEO",
        title: "Chief Executive Officer & Stratégie Business",
        bio: "Entrepreneur visionnaire et stratège digital, Feissal pilote la vision globale, le développement commercial et la stratégie produit de Skemalab. Fort d'une expertise aiguisée en croissance digitale, conversion et négociation, il veille à ce que chaque solution développée devienne un puissant moteur de rentabilité pour nos partenaires.",
        quote:
          "La technologie n’a de réelle valeur que si elle produit un impact financier et opérationnel mesurable pour l'entreprise.",
        expertiseLabel: "Domaines d’intervention :",
        expertise: [
          "Vision & Stratégie Business",
          "Acquisition Digitale & ROI",
          "Product Management & UX",
          "Direction Commerciale & Partenariats",
        ],
        focusArea: "Business, Growth & Vision",
        ctaBtn: "Planifier un échange",
      },
      {
        id: "marouan-khadiri",
        name: "Marouan Khadiri",
        role: "CTO",
        title: "Chief Technology Officer & Architecte Systèmes",
        bio: "Architecte logiciel et expert en automatisation avancée, Marouan conçoit les infrastructures techniques, les plateformes web haute performance et les systèmes de workflows intelligents chez Skemalab. Spécialiste Next.js, API & écosystèmes n8n / IA, il transforme la complexité technique en architectures fluides et scalables.",
        quote:
          "Automatiser le répétitif et bâtir des architectures robustes pour libérer le potentiel humain et faire grandir les entreprises sans friction.",
        expertiseLabel: "Domaines d’intervention :",
        expertise: [
          "Architecture Logicielle & Next.js",
          "Workflows n8n, Make & Zapier",
          "Intégration d’Agents IA & LLMs",
          "Sécurité, APIs & Performance",
        ],
        focusArea: "Deep Tech, Architecture & IA",
        ctaBtn: "Échanger sur l’architecture",
      },
    ],

    binomeBadge: "La Force du Binôme",
    binomeTitle: "Pourquoi l’alliance Feissal × Marouan fait toute la différence.",
    binomeText:
      "Dans la plupart des agences traditionnelles, la stratégie commerciale et le développement technique ne se parlent pas. Chez SkemaLab, le CEO et le CTO collaborent main dans la main sur chaque projet.",
    binomePoints: [
      {
        strong: "Zéro décalage",
        text: " entre promesse commerciale et faisabilité technique.",
      },
      {
        strong: "Architecture pensée ROI",
        text: " dès la première ligne de code.",
      },
      {
        strong: "Automatisation native",
        text: " pour économiser des dizaines d’heures.",
      },
      {
        strong: "Interlocuteurs directs",
        text: " fondateurs sur les décisions clés.",
      },
    ],
    binomeCalloutBadge: "L’Engagement SkemaLab",
    binomeCalloutTitle:
      "Discuter directement de votre projet avec notre direction.",
    binomeCalloutText:
      "Prenez rendez-vous pour un diagnostic stratégique de 30 minutes sans engagement.",
    binomeCalloutBtn: "Prendre rendez-vous avec les fondateurs",

    closingEyebrow: "Passer à l’action",
    closingTitle:
      "Prêt à transformer votre présence digitale et à automatiser vos opérations avec nos fondateurs ?",
    closingText:
      "Que ce soit pour créer votre nouvelle plateforme, structurer vos tunnels d’acquisition ou automatiser vos process avec l’IA, nous sommes à votre écoute.",
    closingBtn1: "Planifier un appel découverte",
    closingBtn2: "Envoyer un message",
  },
};
