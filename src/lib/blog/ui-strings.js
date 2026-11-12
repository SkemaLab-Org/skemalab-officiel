const dict = {
  fr: {
    blog: "Blog",
    blogTitle: "Blog Skemalab",
    blogDesc:
      "Conseils, retours d'expérience et idées sur le développement, le marketing digital et l'automatisation.",
    minRead: "min de lecture",
    toc: "Sommaire",
    share: "Partager",
    copyLink: "Copier le lien",
    related: "Articles liés",
    featured: "À la une",
    empty: "Aucun article pour le moment.",
    prev: "Précédent",
    next: "Suivant",
    page: "Page",
    of: "sur",
    allPosts: "Tous les articles",
    articles: "articles",
    all: "Tous",
    readMore: "Lire l'article",
    copy: "Copier",
    copied: "Copié !",
    cta: "Lancer un projet",
    ctaDesc:
      "Décrivez-nous votre projet en quelques lignes. Nous revenons vers vous sous 48 h avec un premier avis clair.",
    backToBlog: "Retour au blog",
    tags: "Sujets",
    categories: "Catégories",
    categoriesCount: "catégories",
    categoryBuild: "Build",
    categoryGrow: "Grow",
    categoryAutomate: "Automate",
    categoryBuildDesc:
      "Développement de sites, d'applications et d'interfaces sur mesure.",
    categoryGrowDesc:
      "Visibilité, acquisition et croissance digitale, du SEO à la recherche IA.",
    categoryAutomateDesc:
      "Automatisation des opérations, workflows et agents IA.",
  },
  en: {
    blog: "Blog",
    blogTitle: "Skemalab Blog",
    blogDesc:
      "Insights, lessons learned and ideas on development, digital marketing and automation.",
    minRead: "min read",
    toc: "Contents",
    share: "Share",
    copyLink: "Copy link",
    related: "Related articles",
    featured: "Featured",
    empty: "No posts yet.",
    prev: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
    allPosts: "All posts",
    articles: "articles",
    all: "All",
    readMore: "Read the article",
    copy: "Copy",
    copied: "Copied!",
    cta: "Start a project",
    ctaDesc:
      "Tell us about your project in a few lines. We come back within 48 hours with a first honest take.",
    backToBlog: "Back to blog",
    tags: "Topics",
    categories: "Categories",
    categoriesCount: "categories",
    categoryBuild: "Build",
    categoryGrow: "Grow",
    categoryAutomate: "Automate",
    categoryBuildDesc:
      "Websites, applications and custom interfaces, designed and built to last.",
    categoryGrowDesc:
      "Visibility, acquisition and digital growth, from SEO to AI search.",
    categoryAutomateDesc:
      "Operations automation, workflows and AI agents.",
  },
  ar: {
    blog: "المدونة",
    blogTitle: "مدونة سكيما لاب",
    blogDesc:
      "نصائح وتجارب وأفكار حول التطوير والتسويق الرقمي والأتمتة.",
    minRead: "دقيقة قراءة",
    toc: "المحتويات",
    share: "مشاركة",
    copyLink: "نسخ الرابط",
    related: "مقالات ذات صلة",
    featured: "مميز",
    empty: "لا توجد مقالات بعد.",
    prev: "السابق",
    next: "التالي",
    page: "الصفحة",
    of: "من",
    allPosts: "كل المقالات",
    articles: "مقالات",
    all: "الكل",
    readMore: "اقرأ المقال",
    copy: "نسخ",
    copied: "تم النسخ!",
    cta: "أطلق مشروعك",
    ctaDesc:
      "صف مشروعك في أسطر قليلة. نعود إليك خلال 48 ساعة برأي أول واضح.",
    backToBlog: "رجوع إلى المدونة",
    tags: "المواضيع",
    categories: "الفئات",
    categoriesCount: "فئات",
    categoryBuild: "البناء",
    categoryGrow: "النمو",
    categoryAutomate: "الأتمتة",
    categoryBuildDesc: "تصميم وبناء المواقع والتطبيقات والواجهات المخصصة.",
    categoryGrowDesc:
      "الظهور والاستقطاب والنمو الرقمي، من تحسين محركات البحث إلى البحث بالذكاء الاصطناعي.",
    categoryAutomateDesc: "أتمتة العمليات وسير العمل ووكلاء الذكاء الاصطناعي.",
  },
};

export const t = (locale, key) =>
  dict[locale]?.[key] ?? dict.fr[key] ?? key;

const CATEGORY_LABEL_KEY = {
  build: "categoryBuild",
  grow: "categoryGrow",
  automate: "categoryAutomate",
};

const CATEGORY_DESCRIPTION_KEY = {
  build: "categoryBuildDesc",
  grow: "categoryGrowDesc",
  automate: "categoryAutomateDesc",
};

export const categoryLabel = (locale, category) =>
  t(locale, CATEGORY_LABEL_KEY[category] ?? "categories");

export const categoryDescription = (locale, category) =>
  t(locale, CATEGORY_DESCRIPTION_KEY[category] ?? "blogDesc");
