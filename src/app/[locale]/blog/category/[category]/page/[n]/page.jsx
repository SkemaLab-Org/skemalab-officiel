import { notFound, redirect } from "next/navigation";
import BlogIndex from "@/components/blog/BlogIndex";
import {
  BLOG_LOCALES,
  CATEGORIES,
  OG_LOCALE,
  POSTS_PER_PAGE,
  SITE_URL,
  absoluteUrl,
  blogCategoryAlternates,
  blogCategoryPath,
  isBlogLocale,
  isCategory,
} from "@/lib/blog/config";
import { getPostsByCategory } from "@/lib/blog/posts";
import { categoryDescription, categoryLabel, t } from "@/lib/blog/ui-strings";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const params = [];
  for (const locale of BLOG_LOCALES) {
    for (const category of CATEGORIES) {
      const posts = await getPostsByCategory(locale, category);
      const totalPages = Math.max(
        1,
        Math.ceil(posts.length / POSTS_PER_PAGE),
      );
      for (let n = 2; n <= totalPages; n += 1) {
        params.push({ locale, category, n: String(n) });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { locale, category, n } = await params;
  if (
    !isBlogLocale(locale) ||
    !isCategory(category) ||
    !/^[1-9]\d*$/.test(n)
  ) {
    return {};
  }

  const pageNumber = Number(n);
  const url = absoluteUrl(blogCategoryPath(locale, category, pageNumber));
  const languages = Object.fromEntries(
    Object.entries(blogCategoryAlternates(category)).map(([item, path]) => [
      item,
      absoluteUrl(`${path}/page/${pageNumber}`),
    ]),
  );
  languages["x-default"] = absoluteUrl(
    blogCategoryPath("fr", category, pageNumber),
  );

  const title = `${categoryLabel(locale, category)} — ${t(locale, "page")} ${pageNumber} — Skemalab`;
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

export default async function BlogCategoryPagedPage({ params }) {
  const { locale, category, n } = await params;
  if (!isBlogLocale(locale) || !isCategory(category)) notFound();
  if (!/^[1-9]\d*$/.test(n)) notFound();
  // /category/x/page/1 duplicates the category page: keep one canonical URL.
  if (n === "1") redirect(blogCategoryPath(locale, category));

  return (
    <BlogIndex
      locale={locale}
      category={category}
      pageNumber={Number(n)}
    />
  );
}
