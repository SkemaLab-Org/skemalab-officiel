import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/blog/PostCard";
import RegisterAlternates from "@/components/blog/RegisterAlternates";
import {
  BLOG_INDEX_ALTERNATES,
  BLOG_LOCALES,
  OG_LOCALE,
  absoluteUrl,
  blogPath,
  isBlogLocale,
} from "@/lib/blog/config";
import { getPosts, getTags } from "@/lib/blog/posts";
import { t } from "@/lib/blog/ui-strings";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const params = [];
  for (const locale of BLOG_LOCALES) {
    for (const { tag } of await getTags(locale)) {
      params.push({ locale, tag });
    }
  }
  return params;
}

function decodeTag(raw) {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export async function generateMetadata({ params }) {
  const { locale, tag: rawTag } = await params;
  if (!isBlogLocale(locale)) return {};

  const tag = decodeTag(rawTag);
  const url = absoluteUrl(
    `${blogPath(locale)}/tag/${encodeURIComponent(tag)}`,
  );
  const title = `#${tag} — ${t(locale, "blogTitle")} — Skemalab`;

  return {
    title: { absolute: title },
    description: `${t(locale, "blogDesc")} — #${tag}`,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description: `${t(locale, "blogDesc")} — #${tag}`,
      siteName: "Skemalab",
      locale: OG_LOCALE[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `${t(locale, "blogDesc")} — #${tag}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogTagPage({ params }) {
  const { locale, tag: rawTag } = await params;
  if (!isBlogLocale(locale)) notFound();

  const tag = decodeTag(rawTag);
  const posts = (await getPosts(locale)).filter((post) =>
    post.tags.includes(tag),
  );
  if (posts.length === 0) notFound();

  return (
    <div className="blog-index">
      <RegisterAlternates alternates={BLOG_INDEX_ALTERNATES} />

      <nav aria-label="breadcrumb" className="blog-breadcrumb">
        <Link href={blogPath(locale)}>← {t(locale, "backToBlog")}</Link>
      </nav>

      <header className="blog-index-head">
        <p className="label-mono">{t(locale, "blog")}</p>
        <h1>#{tag}</h1>
        <p className="blog-index-desc">
          {posts.length} {t(locale, "allPosts")}
        </p>
      </header>

      <section className="blog-grid" aria-label={t(locale, "allPosts")}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
      </section>
    </div>
  );
}
