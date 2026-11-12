const envUrl =
  typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SITE_URL : undefined;

export const SITE_URL = (envUrl || "https://www.skemalab.com").replace(/\/$/, "");

export const BLOG_LOCALES = ["fr", "en", "ar"];
export const POSTS_PER_PAGE = 9;
export const CATEGORIES = ["build", "grow", "automate"];
export const RESERVED_SLUGS = ["page", "category", "rss", "rss.xml"];

export const DIR = {
  fr: "ltr",
  en: "ltr",
  ar: "rtl",
};

const DATE_LOCALE = {
  fr: "fr-FR",
  en: "en-US",
  ar: "ar-MA",
};

export const OG_LOCALE = {
  fr: "fr_FR",
  en: "en_US",
  ar: "ar_MA",
};

export const READING_WPM = {
  fr: 200,
  en: 200,
  ar: 180,
};

export const isBlogLocale = (value) => BLOG_LOCALES.includes(value);

export const isCategory = (value) => CATEGORIES.includes(value);

export const blogPath = (locale, slug) =>
  slug ? `/${locale}/blog/${slug}` : `/${locale}/blog`;

export const blogPagePath = (locale, pageNumber) =>
  pageNumber <= 1 ? blogPath(locale) : `${blogPath(locale)}/page/${pageNumber}`;

export const blogCategoryPath = (locale, category, pageNumber = 1) =>
  pageNumber <= 1
    ? `${blogPath(locale)}/category/${category}`
    : `${blogPath(locale)}/category/${category}/page/${pageNumber}`;

export const BLOG_INDEX_ALTERNATES = Object.fromEntries(
  BLOG_LOCALES.map((locale) => [locale, blogPath(locale)]),
);

export const blogCategoryAlternates = (category) =>
  Object.fromEntries(
    BLOG_LOCALES.map((locale) => [locale, blogCategoryPath(locale, category)]),
  );

export const absoluteUrl = (pathname) => `${SITE_URL}${pathname}`;

export const formatPostDate = (isoDate, locale) =>
  new Intl.DateTimeFormat(DATE_LOCALE[locale] || DATE_LOCALE.fr, {
    dateStyle: "long",
  }).format(new Date(`${isoDate}T12:00:00Z`));
