import { ArrowLeft } from "lucide-react";
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
  const [posts, tags] = await Promise.all([
    getPosts(locale),
    getTags(locale),
  ]);
  const tagged = posts.filter((post) => post.tags.includes(tag));
  if (tagged.length === 0) notFound();

  return (
    <div className="blog-index">
      <RegisterAlternates alternates={BLOG_INDEX_ALTERNATES} />

      <nav aria-label="breadcrumb" className="blog-breadcrumb">
        <Link href={blogPath(locale)}>
          <ArrowLeft
            size={14}
            strokeWidth={1.75}
            aria-hidden="true"
            className="rtl-flip"
          />
          {t(locale, "backToBlog")}
        </Link>
      </nav>

      <header className="blog-index-head zellige-spot">
        <div className="blog-index-head-top">
          <p className="label-mono blog-index-eyebrow">{t(locale, "tags")}</p>
          <p className="label-mono blog-index-count">
            {posts.length} {t(locale, "articles")}
          </p>
        </div>
        <h1 className="blog-index-title">#{tag}</h1>
        <p className="blog-index-desc">
          {tagged.length} {t(locale, "articles")}
        </p>
      </header>

      <nav className="blog-tagbar" aria-label={t(locale, "tags")}>
        <p className="label-mono blog-tagbar-label">{t(locale, "tags")}</p>
        <ul>
          <li>
            <Link href={blogPath(locale)} className="blog-pill">
              {t(locale, "all")}
            </Link>
          </li>
          {tags.map(({ tag: itemTag, count }) => (
            <li key={itemTag}>
              <Link
                href={`${blogPath(locale)}/tag/${encodeURIComponent(itemTag)}`}
                className="blog-pill"
                aria-current={itemTag === tag ? "page" : undefined}
                aria-label={`${itemTag} (${count})`}
              >
                <span>{itemTag}</span>
                <span className="blog-pill-count" aria-hidden="true">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="blog-section" aria-labelledby="tag-posts-heading">
        <h2 className="label-mono blog-section-label" id="tag-posts-heading">
          {t(locale, "allPosts")}
        </h2>
        <div className="blog-grid">
          {tagged.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              locale={locale}
              headingLevel="h3"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
