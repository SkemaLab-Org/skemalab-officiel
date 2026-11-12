import { notFound } from "next/navigation";
import BlogIndex from "@/components/blog/BlogIndex";
import {
  BLOG_LOCALES,
  CATEGORIES,
  OG_LOCALE,
  SITE_URL,
  absoluteUrl,
  blogCategoryAlternates,
  blogCategoryPath,
  isBlogLocale,
  isCategory,
} from "@/lib/blog/config";
import { categoryDescription, categoryLabel, t } from "@/lib/blog/ui-strings";

export const revalidate = 60;
export const dynamicParams = true;

export function generateStaticParams() {
  return BLOG_LOCALES.flatMap((locale) =>
    CATEGORIES.map((category) => ({ locale, category })),
  );
}

export async function generateMetadata({ params }) {
  const { locale, category } = await params;
  if (!isBlogLocale(locale) || !isCategory(category)) return {};

  const url = absoluteUrl(blogCategoryPath(locale, category));
  const languages = Object.fromEntries(
    Object.entries(blogCategoryAlternates(category)).map(([item, path]) => [
      item,
      absoluteUrl(path),
    ]),
  );
  languages["x-default"] = absoluteUrl(blogCategoryPath("fr", category));

  const title = `${categoryLabel(locale, category)} — ${t(locale, "blogTitle")} — Skemalab`;
  const description = categoryDescription(locale, category);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages,
      types: {
        "application/rss+xml": `${SITE_URL}/${locale}/blog/rss.xml`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Skemalab",
      locale: OG_LOCALE[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogCategoryPage({ params }) {
  const { locale, category } = await params;
  if (!isBlogLocale(locale) || !isCategory(category)) notFound();

  return <BlogIndex locale={locale} category={category} />;
}
