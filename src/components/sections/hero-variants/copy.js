/**
 * Copy for the hero variants.
 *
 * Kept local to the variant bundle so each prototype reads exactly as it was
 * designed. The service titles/descriptions mirror `t.servicesList`; if one of
 * these variants ships, move these strings into `src/i18n/translations/*`.
 */

export const SERVICE_KEYS = ["build", "grow", "automate"];

/** Brand verbs: identical in every language, as on the current site. */
export const LABEL = {
  build: "Build",
  grow: "Grow",
  automate: "Automate",
};

export const copy = {
  fr: {
    tagline: "Conseil, ingénierie logicielle & automatisation",
    cta: {
      primary: "Lancer un projet",
      all: "Voir les services",
      one: "Voir le service",
    },
    scan: {
      title: "Des systèmes qui font grandir votre entreprise.",
      sub: "Nous développons vos logiciels sur mesure, pilotons votre acquisition et automatisons vos opérations.",
    },
    triptych: {
      title: "Un laboratoire. Trois leviers de croissance.",
      sub: "Conseil, ingénierie logicielle et automatisation pour les organisations qui veulent changer d’échelle.",
    },
    services: {
      build: {
        title: "Ingénierie logicielle & ERP",
        text: "Plateformes métiers, ERP, CRM et applications sur mesure, conçus pour soutenir la croissance de votre organisation.",
      },
      grow: {
        title: "Marketing de performance",
        text: "Acquisition, SEO et campagnes pilotées par la donnée pour transformer votre audience en clients.",
      },
      automate: {
        title: "Automatisation & Intelligence",
        text: "Workflows, intégrations et agents IA qui suppriment les tâches répétitives et accélèrent vos opérations.",
      },
    },
  },
  en: {
    tagline: "Consulting, software engineering & automation",
    cta: {
      primary: "Start a project",
      all: "View services",
      one: "View the service",
    },
    scan: {
      title: "Systems that grow your business.",
      sub: "We build your custom software, run your acquisition and automate your operations.",
    },
    triptych: {
      title: "One lab. Three levers of growth.",
      sub: "Consulting, software engineering and automation for organizations ready to scale.",
    },
    services: {
      build: {
        title: "Software engineering & ERP",
        text: "Business platforms, ERP, CRM and custom applications built to support your organization’s growth.",
      },
      grow: {
        title: "Performance marketing",
        text: "Acquisition, SEO and data-driven campaigns that turn your audience into customers.",
      },
      automate: {
        title: "Automation & Intelligence",
        text: "Workflows, integrations and AI agents that remove repetitive work and speed up your operations.",
      },
    },
  },
  ar: {
    tagline: "استشارات وهندسة برمجيات وأتمتة",
    cta: {
      primary: "ابدأ مشروعك",
      all: "استكشف خدماتنا",
      one: "اكتشف الخدمة",
    },
    scan: {
      title: "أنظمة تنمّي أعمالك.",
      sub: "نطوّر برمجياتك المخصصة، وندير استقطاب عملائك، ونؤتمت عملياتك.",
    },
    triptych: {
      title: "مختبر واحد. ثلاث رافعات للنمو.",
      sub: "استشارات وهندسة برمجيات وأتمتة للمؤسسات الراغبة في التوسّع.",
    },
    services: {
      build: {
        title: "هندسة البرمجيات وأنظمة ERP",
        text: "منصات أعمال وأنظمة ERP وCRM وتطبيقات مخصصة، مصمّمة لدعم نمو مؤسستك.",
      },
      grow: {
        title: "التسويق بالأداء",
        text: "استقطاب العملاء وتحسين محركات البحث وحملات تعتمد على البيانات لتحويل جمهورك إلى عملاء.",
      },
      automate: {
        title: "الأتمتة والذكاء الاصطناعي",
        text: "سير عمل وتكاملات ووكلاء ذكاء اصطناعي تُلغي المهام المتكررة وتُسرّع عملياتك.",
      },
    },
  },
};
