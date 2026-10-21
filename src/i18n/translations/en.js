import devArticleImage from "@/assets/home-imgs/dev-article.webp";
import marketingArticleImage from "@/assets/home-imgs/marketing-article.webp";
import automationArticleImage from "@/assets/home-imgs/automation-article.webp";
import saasImage from "@/assets/home-imgs/saas-b2b.webp";
import refonteImage from "@/assets/home-imgs/refonte-ecom.webp";
import engineImage from "@/assets/home-imgs/engine-d'acquise.webp";
import crmImage from "@/assets/home-imgs/automation-crm.webp";
import dashboardImage from "@/assets/home-imgs/dashboard-data.webp";

export const en = {
  meta: {
    title: "Skemalab | Web Development, Digital Marketing & Automation",
    titleTemplate: "%s | Skemalab",
    description:
      "Skemalab is a results-driven digital studio: custom web & mobile development, ROI-focused digital marketing and workflow automation (n8n, Make, AI) to power your growth.",
    aboutTitle: "About SkemaLab | Digital Studio, Story & Founders",
    aboutDescription:
      "Discover the story of Skemalab, the digital studio founded by Feissal Tarkaoui (CEO) and Marouan Khadiri (CTO). Next.js web development, ROI marketing and smart automation.",
  },

  common: {
    tagline: "Development · Marketing · Automation",
    badgeStudio: "Award-Worthy Digital Studio · Essaouira & International",
    skipToContent: "Skip to content",
    menuLabel: "Navigation menu",
    closeMenu: "Close menu",
    openMenu: "Open menu",
    copyright: "Skemalab. All rights reserved.",
    bookingCta: "Book a call",
    bookingSubtitle: "Pick an available slot",
  },

  nav: [
    { href: "/#services", label: "Services" },
    { href: "/#method", label: "Method" },
    { href: "/#projets", label: "Projects" },
    { href: "/#agence", label: "Agency" },
    { href: "/#contact", label: "Contact" },
  ],

  hero: {
    ctaPrimary: "Start a project",
    ctaSecondary: "View services",
    prevSlide: "Previous slide",
    nextSlide: "Next slide",
    selectService: "Choose a service",
  },

  servicesList: [
    {
      id: "dev",
      title: "Software Development",
      subtitle: "Custom digital products",
      description:
        "Sites, platforms and applications built to perform: clean architecture, precise UX, API integrations and secure deployment.",
      points: [
        "Corporate sites & web platforms",
        "Web & mobile applications",
        "APIs, CRM & business systems",
        "Performance, security & maintenance",
      ],
      image: devArticleImage,
      heroLabel: "01 — Build",
      heroHeadline: "Digital products that accelerate your business.",
      heroText:
        "Sites, platforms and applications designed to convert, scale and last.",
    },
    {
      id: "marketing",
      title: "Digital Marketing",
      subtitle: "Measurable growth",
      description:
        "ROI-driven acquisition and brand strategies: SEO, content, paid media and conversion funnels aligned with your business goals.",
      points: [
        "SEO / SEA & acquisition",
        "Branding & content",
        "Social media & campaigns",
        "Funnels & conversion",
      ],
      image:
        marketingArticleImage,
      heroLabel: "02 — Grow",
      heroHeadline: "ROI-driven digital acquisition.",
      heroText:
        "SEO, campaigns and content aligned with your goals — to attract, convert and retain.",
    },
    {
      id: "automation",
      title: "Automation & Workflows",
      subtitle: "Smart operations",
      description:
        "We remove repetitive tasks and connect your tools to save time, cut errors and accelerate your teams.",
      points: [
        "Workflows n8n / Make / Zapier",
        "AI assistants & agents",
        "CRM, email & outreach",
        "Automated reporting",
      ],
      image:
        automationArticleImage,
      heroLabel: "03 — Automate",
      heroHeadline: "Smart workflows that free up your teams.",
      heroText:
        "Automate your processes, connect your tools and save hours every week.",
    },
  ],

  servicesSection: {
    eyebrow: "Expertise",
    titlePart1: "Three levers. One ambition: ",
    titleHighlight: "your growth.",
    description:
      "Skemalab combines development, digital marketing and automation to build systems that convert, scale and improve over time.",
    talkWithExpert: "Talk to an expert",
  },

  clientsMarquee: {
    headline: "They trust us to accelerate their digital growth",
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
    eyebrow: "Method",
    title: "A clear approach, from diagnosis to ROI.",
    description:
      "Less friction, more clarity. Every step is designed to move fast without sacrificing quality or business vision.",
    steps: [
      {
        step: "01",
        title: "Diagnosis",
        text: "We map your challenges, processes and growth levers to define a clear roadmap.",
      },
      {
        step: "02",
        title: "Architecture",
        text: "Strategy, design and tech stack aligned with a precise business goal — not with trends.",
      },
      {
        step: "03",
        title: "Execution",
        text: "Short sprints, measurable deliverables, transparent communication. We build, we test, we iterate.",
      },
      {
        step: "04",
        title: "Optimization",
        text: "After launch, we measure, automate and continuously improve to maximize ROI.",
      },
    ],
  },

  projectsSection: {
    eyebrow: "Projects",
    title: "Projects built to perform.",
    description:
      "Every delivery combines design, engineering and business impact — concrete results, not slide decks.",
    measuredImpact: "Measured impact",
    summary:
      "Design, build and optimization — delivered with a clear roadmap and success metrics defined from day one.",
    similarProject: "Similar project",
    prevLabel: "Previous project",
    nextLabel: "Next project",
    list: [
      {
        title: "B2B SaaS Platform",
        category: "Development",
        result: "+48% user activation",
        image: saasImage,
      },
      {
        title: "E-commerce rebuild",
        category: "Web & UX",
        result: "+62% conversion rate",
        image: refonteImage,
      },
      {
        title: "Acquisition engine",
        category: "Marketing",
        result: "3.2× qualified leads / month",
        image: engineImage,
      },
      {
        title: "CRM automation",
        category: "Workflows",
        result: "18h saved per week",
        image: crmImage,
      },
      {
        title: "Data dashboard",
        category: "AI & Data",
        result: "Real-time decisions",
        image: dashboardImage,
      },
    ],
  },

  statsList: [
    { value: 40, suffix: "+", label: "Projects delivered" },
    { value: 98, suffix: "%", label: "Satisfied clients" },
    { value: 5, suffix: "h", label: "Saved / day on average" },
    { value: 3, suffix: "×", label: "Process acceleration" },
  ],

  aboutHome: {
    eyebrow: "The agency",
    title: "Your digital growth partner.",
    p1: "Skemalab supports ambitious companies through their digital transformation. We combine business strategy, technical excellence and smart automation to build durable performance levers.",
    p2: "Whether you are launching a product, accelerating acquisition or industrializing internal processes, we design a clear, executable, results-oriented solution.",
    promiseEyebrow: "Our promise",
    promiseText:
      "No decorative projects. Digital systems that create measurable value.",
    cta: "Talk to an expert",
    imageAlt: "Skemalab, your digital growth partner",
    pillars: [
      [ "Mission", "Blend tech, marketing and automation to scale." ],
      [ "Approach", "Precise diagnosis, fast execution, tracked ROI." ],
      [ "Teams", "Product, design, growth & automation." ],
      [ "Model", "Long-term partnership, not one-off delivery." ],
    ],
  },

  testimonialsSection: {
    eyebrow: "Testimonials",
    title: "Trust is built on results.",
    list: [
      {
        quote:
          "Skemalab turned our brochure site into a real acquisition machine. The results are concrete and measurable, with zero useless jargon.",
        name: "Sara Benali",
        role: "Marketing Director, FinTech",
      },
      {
        quote:
          "Their automation stack halved our processing times. Our teams can finally focus on high-value work.",
        name: "Youssef Amrani",
        role: "COO, Retail",
      },
      {
        quote:
          "A rare partner: business vision, solid technical execution and rigorous follow-up. We shipped a SaaS MVP in 8 weeks.",
        name: "Camille Dupont",
        role: "Founder, Scale-up",
      },
    ],
  },

  ctaBanner: {
    imageAlt: "City skyline — growth and ambition",
    eyebrow: "Ready to accelerate",
    headline: "Turn your digital ambition into a competitive advantage.",
    description:
      "A 30-minute conversation to clarify your challenges, spot quick wins and build a concrete roadmap.",
    ctaPrimary: "Request a quote",
    ctaSecondary: "Email the team",
  },

  contactSection: {
    eyebrow: "Contact",
    title: "Let's talk about your next growth lever.",
    description:
      "Tell us what you need — site, product, acquisition or automation. We get back to you within 24 business hours.",
    fieldsRequirement:
      "All fields are required — reply within 24 business hours.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    locationLabel: "Location",
    nameInput: "Name",
    companyInput: "Company",
    emailInput: "Email",
    phoneInput: "Phone",
    serviceInput: "Service",
    servicePlaceholder: "Choose a service",
    globalService: "Full-service engagement",
    messageInput: "Your needs",
    messagePlaceholder: "Goals, timeline, context...",
    submitBtn: "Send request",
    submitting: "Sending…",
    successTitle: "Message sent.",
    successEyebrow: "Thank you",
    successText:
      "Your request has been delivered. Our team will get back to you within 24 business hours.",
    resetSuccess: "Send another message",
    rateLimitTitle: "Too many requests.",
    rateLimitEyebrow: "Limit",
    rateLimitText:
      "Wait about 15 minutes, or write to us directly.",
    errorTitle: "Unable to send.",
    errorEyebrow: "Error",
    errorText: "Try again in a moment, or write to us directly.",
    retryBtn: "Retry",
    backBtn: "Back",
  },

  contactErrors: {
    nameRequired: "Name is required.",
    nameTooLong: "Name is too long.",
    companyRequired: "Company is required.",
    companyTooLong: "Company name is too long.",
    emailRequired: "Email is required.",
    emailInvalid: "Invalid email format.",
    phoneRequired: "Phone number is required.",
    phoneTooShort: "Number is too short.",
    phoneTooLong: "Number is too long.",
    serviceRequired: "Please choose a service.",
    serviceInvalid: "Invalid service.",
    messageRequired: "Message is required.",
    messageTooShort: "Message is too short (10 characters min.).",
    messageTooLong: "Message is too long.",
  },

  footer: {
    description:
      "Results-driven digital studio. Development, marketing and automation for companies that want to accelerate.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    pills: "Build · Grow · Automate",
  },

  aboutPage: {
    heroBadge: "Award-Worthy Digital Studio · Essaouira & International",
    heroH1Part1: "Digital engineering & operational intelligence to ",
    heroH1Highlight: "accelerate your business.",
    heroHeadline:
      "Digital engineering and operational intelligence at the service of your growth.",
    heroLead:
      "Skemalab designs, builds and automates high-performing digital ecosystems that generate immediate and lasting business value.",
    heroCta1: "Discover our story",
    heroCta2: "Meet the founders",
    strip1: "Projects successfully delivered",
    strip2: "Satisfied clients",
    strip3: "Process acceleration",
    strip4: "Saved / week on average",

    identityEyebrow: "01 — Our Identity & Vision",
    identityTitlePart1: "Reconciling code, growth and automation into one ",
    identityTitleHighlight: "single system.",
    hqLabel: "HQ & R&D",
    scopeLabel: "Reach",
    scopeValue: "Europe · MENA · International",
    studioContact: "Studio Contact",
    standardBadge: "The SkemaLab Standard",
    standardTitle: "Operational excellence without compromise",
    standardText:
      "We don't build throwaway projects. Every platform and every automation is designed to become a durable, scalable asset for your business.",

    methodEyebrow: "Founding Methodology",
    methodTitle: "The 3 fundamental levers of our studio",
    methodSubtitle:
      "Designed to work in continuous synergy, not as siloed departments.",

    pillars: [
      {
        num: "01",
        name: "Build",
        title: "Custom Development & SaaS",
        desc: "Web and mobile applications, Next.js architectures, business platforms and robust API integrations built to convert, scale and last.",
        tags: [ "Next.js", "React", "APIs & Microservices", "Cloud" ],
      },
      {
        num: "02",
        name: "Grow",
        title: "Digital Marketing & ROI Acquisition",
        desc: "Acquisition strategies focused on direct profitability: technical SEO, high-converting sales funnels, targeted campaigns and premium branding.",
        tags: [ "SEO / SEA", "Sales funnels", "Growth", "Data analytics" ],
      },
      {
        num: "03",
        name: "Automate",
        title: "Smart Workflows & AI Agents",
        desc: "Radical removal of repetitive tasks, interconnection of your SaaS tools and AI assistant integration to multiply productivity.",
        tags: [ "n8n & Make", "AI agents & LLMs", "Auto CRM", "24/7 Workflows" ],
      },
    ],

    commitmentsEyebrow: "Our Commitments",
    commitmentsTitle: "The 4 non-negotiable principles at SkemaLab",
    principles: [
      {
        num: "01",
        title: "Clarity & ROI Obsession",
        text: "No useless jargon or decorative features. Every line of code and every workflow serves a precise financial goal.",
      },
      {
        num: "02",
        title: "Engineering Excellence",
        text: "Modern Next.js architectures, secure APIs and resilient automation to guarantee performance, speed and scalability.",
      },
      {
        num: "03",
        title: "Durable & Scalable Systems",
        text: "We design modular foundations able to absorb your growth without requiring a costly rebuild.",
      },
      {
        num: "04",
        title: "Partnership & Sprint Agility",
        text: "Close collaboration with your teams, short delivery cycles and real-time tracking of your key metrics.",
      },
    ],

    timelineEyebrow: "02 — Our History & Origin",
    timelineTitlePart1: "How the idea of SkemaLab was born: ",
    timelineTitleHighlight: "from vision to reality.",
    timelineSubtitlePart1: "See how ",
    timelineSubtitlePart2: " (CEO) and ",
    timelineSubtitlePart3:
      " (CTO) joined their expertise to build a next-generation digital laboratory.",
    thesisEyebrow: "The Founding Thesis",
    thesisQuote:
      "A beautiful website that generates no leads is a waste of money. A brilliant acquisition campaign without automated operations creates a bottleneck. SkemaLab was born to deliver one complete, seamless solution.",
    thesisAuthors: "— Feissal Tarkaoui & Marouan Khadiri, Founders",
    seeProfiles: "View their profiles",

    milestones: [
      {
        id: "genesis",
        year: "2023",
        period: "Genesis",
        title: "The Founding Spark & The Diagnosis",
        subtitle: "The shared vision of Feissal Tarkaoui & Marouan Khadiri",
        description:
          "Feissal (business visionary) and Marouan (tech architect) reach an unmistakable conclusion: companies are slowed down by non-converting brochure sites, fragmented tools and hundreds of hours lost to manual tasks. They join forces to create a hybrid studio where technical engineering directly serves revenue.",
        tag: "The Initial Idea",
        highlight: "Bridging the gap between Deep Tech, Growth and Automation",
      },
      {
        id: "foundation",
        year: "2023",
        period: "Launch",
        title: "SkemaLab Founded & First Deployments",
        subtitle: "Based in Essaouira, reaching internationally",
        description:
          "SkemaLab is officially born. The founders build their R&D lab and deliver their first systems for clients in Europe and MENA: ultra-fast web platforms, automated CRM pipelines and conversion funnels. Early feedback confirms spectacular productivity gains.",
        tag: "Foundation",
        highlight: "First international clients and 15h+ saved / week",
      },
      {
        id: "methodology",
        year: "2024",
        period: "Expansion",
        title: "The « Build · Grow · Automate » System",
        subtitle: "Formalizing a proven proprietary methodology",
        description:
          "Skemalab structures its approach into 3 synergistic pillars: custom development (Build), high value-added marketing (Grow) and business process automation (Automate). Over 25 major projects are shipped with sprint-level precision.",
        tag: "Proven System",
        highlight: "Fast delivery cadence and measurable results",
      },
      {
        id: "ai-era",
        year: "2025",
        period: "Innovation",
        title: "Large-Scale AI Integration & Autonomous Workflows",
        subtitle: "The cutting edge of smart operations",
        description:
          "Under Marouan's technical leadership and Feissal's scaling vision, SkemaLab connects AI agents and cloud-native Next.js architectures to clients' internal processes. Processing times drop by 50% for our partners.",
        tag: "AI Revolution",
        highlight: "24/7 autonomous workflows and custom assistants",
      },
      {
        id: "scale",
        year: "2026",
        period: "Today & Future",
        title: "Expansion & International Reference",
        subtitle: "The technology partner for ambitious companies",
        description:
          "With over 40 major projects delivered, a 98% satisfaction rate and a solid international portfolio, SkemaLab has become the digital studio that turns technology into a lever of sovereignty and hyper-growth.",
        tag: "Full Speed Ahead",
        highlight: "40+ successful projects · Global strategic partner",
      },
    ],

    foundersEyebrow: "03 — Leadership",
    foundersTitlePart1: "The minds behind ",
    foundersTitleHighlight: "SkemaLab.",
    foundersSubtitle:
      "A rare and decisive complementarity between corporate strategic vision and software engineering excellence.",

    foundersList: [
      {
        id: "feissal-tarkaoui",
        name: "Feissal Tarkaoui",
        role: "Founder & CEO",
        title: "Chief Executive Officer & Business Strategy",
        bio: "Visionary entrepreneur and digital strategist, Feissal steers Skemalab's overall vision, commercial development and product strategy. With sharpened expertise in digital growth, conversion and negotiation, he ensures every solution we build becomes a powerful profitability engine for our partners.",
        quote:
          "Technology only has real value when it produces measurable financial and operational impact for the business.",
        expertiseLabel: "Areas of expertise:",
        expertise: [
          "Vision & Business Strategy",
          "Digital Acquisition & ROI",
          "Product Management & UX",
          "Sales Leadership & Partnerships",
        ],
        focusArea: "Business, Growth & Vision",
        ctaBtn: "Schedule a call",
      },
      {
        id: "marouan-khadiri",
        name: "Marouan Khadiri",
        role: "CTO",
        title: "Chief Technology Officer & Systems Architect",
        bio: "Software architect and advanced automation expert, Marouan designs the technical infrastructure, high-performance web platforms and smart workflow systems at Skemalab. A Next.js, API and n8n / AI specialist, he turns technical complexity into fluid, scalable architectures.",
        quote:
          "Automate the repetitive and build robust architectures to unlock human potential and grow businesses without friction.",
        expertiseLabel: "Areas of expertise:",
        expertise: [
          "Software Architecture & Next.js",
          "n8n, Make & Zapier Workflows",
          "AI Agents & LLM Integration",
          "Security, APIs & Performance",
        ],
        focusArea: "Deep Tech, Architecture & AI",
        ctaBtn: "Discuss the architecture",
      },
    ],

    binomeBadge: "The Power of the Duo",
    binomeTitle: "Why the Feissal × Marouan alliance makes all the difference.",
    binomeText:
      "In most traditional agencies, commercial strategy and technical development don't talk to each other. At SkemaLab, the CEO and the CTO work hand in hand on every project.",
    binomePoints: [
      {
        strong: "Zero gap",
        text: " between commercial promise and technical feasibility.",
      },
      {
        strong: "ROI-driven architecture",
        text: " from the very first line of code.",
      },
      {
        strong: "Native automation",
        text: " to save dozens of hours.",
      },
      {
        strong: "Direct contacts",
        text: " founders on key decisions.",
      },
    ],
    binomeCalloutBadge: "The SkemaLab Commitment",
    binomeCalloutTitle:
      "Discuss your project directly with our leadership.",
    binomeCalloutText:
      "Book a 30-minute strategic diagnosis with no strings attached.",
    binomeCalloutBtn: "Book a call with the founders",

    closingEyebrow: "Take action",
    closingTitle:
      "Ready to transform your digital presence and automate your operations with our founders?",
    closingText:
      "Whether it's building your new platform, structuring your acquisition funnels or automating your processes with AI — we are listening.",
    closingBtn1: "Schedule a discovery call",
    closingBtn2: "Send a message",
  },
};
