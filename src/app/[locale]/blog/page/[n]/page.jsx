import { notFound, redirect } from "next/navigation";
import BlogIndex from "@/components/blog/BlogIndex";
import {
  BLOG_LOCALES,
  OG_LOCALE,
  SITE_URL,
  absoluteUrl,
  blogPagePath,
  blogPath,
  isBlogLocale,
} from "@/lib/blog/config";
import { t } from "@/lib/blog/ui-strings";

export const revalidate = 60;
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { locale, n } = await params;
  if (!isBlogLocale(locale) || !/^[1-9]\d*$/.test(n)) return {};

  const pageNumber = Number(n);
  const url = absoluteUrl(blogPagePath(locale, pageNumber));
  const languages = Object.fromEntries(
    BLOG_LOCALES.map((item) => [
      item,
      absoluteUrl(blogPagePath(item, pageNumber)),
    ]),
  );
  languages["x-default"] = absoluteUrl(blogPagePath("fr", pageNumber));
  const title = `${t(locale, "blogTitle")} — ${t(locale, "page")} ${pageNumber} — Skemalab`;

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

export default async function BlogPagedPage({ params }) {
  const { locale, n } = await params;
  if (!isBlogLocale(locale)) notFound();
  if (!/^[1-9]\d*$/.test(n)) notFound();
  // /blog/page/1 duplicates the index: keep a single canonical URL.
  if (n === "1") redirect(blogPath(locale));

  return <BlogIndex locale={locale} pageNumber={Number(n)} />;
}
