import { notFound } from "next/navigation";
import LocaleSync from "@/components/blog/LocaleSync";
import {
  BLOG_LOCALES,
  DIR,
  SITE_URL,
  isBlogLocale,
} from "@/lib/blog/config";
import "./blog.css";

export const revalidate = 60;

export function generateStaticParams() {
  return BLOG_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isBlogLocale(locale)) return {};

  return {
    alternates: {
      types: {
        "application/rss+xml": `${SITE_URL}/${locale}/blog/rss.xml`,
      },
    },
  };
}

export default async function BlogLayout({ children, params }) {
  const { locale } = await params;
  if (!isBlogLocale(locale)) notFound();

  return (
    <div className="blog-root" lang={locale} dir={DIR[locale]}>
      <LocaleSync locale={locale} />
      {children}
    </div>
  );
}
