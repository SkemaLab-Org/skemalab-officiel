import { notFound } from "next/navigation";
import BlogIndex from "@/components/blog/BlogIndex";
import {
  BLOG_LOCALES,
  OG_LOCALE,
  SITE_URL,
  absoluteUrl,
  blogPath,
  isBlogLocale,
} from "@/lib/blog/config";
import { t } from "@/lib/blog/ui-strings";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isBlogLocale(locale)) return {};

  const url = absoluteUrl(blogPath(locale));
  const languages = Object.fromEntries(
    BLOG_LOCALES.map((item) => [item, absoluteUrl(blogPath(item))]),
  );
  languages["x-default"] = absoluteUrl(blogPath("fr"));
  const title = `${t(locale, "blogTitle")} — Skemalab`;

  return {
    title: { absolute: title },
    description: t(locale, "blogDesc"),
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
      description: t(locale, "blogDesc"),
      siteName: "Skemalab",
      locale: OG_LOCALE[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t(locale, "blogDesc"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPage({ params }) {
  const { locale } = await params;
  if (!isBlogLocale(locale)) notFound();

  return <BlogIndex locale={locale} pageNumber={1} />;
}
