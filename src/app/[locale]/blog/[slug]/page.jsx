import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CalendlyButton from "@/components/CalendlyButton";
import CoverImage from "@/components/blog/CoverImage";
import JsonLd from "@/components/blog/JsonLd";
import PostCard from "@/components/blog/PostCard";
import PostEnhancer from "@/components/blog/PostEnhancer";
import PostMeta from "@/components/blog/PostMeta";
import RegisterAlternates from "@/components/blog/RegisterAlternates";
import ShareButtons from "@/components/blog/ShareButtons";
import Toc from "@/components/blog/Toc";
import {
  OG_LOCALE,
  SITE_URL,
  absoluteUrl,
  blogPath,
  isBlogLocale,
} from "@/lib/blog/config";
import {
  getAllParams,
  getAlternates,
  getRelated,
  getRenderedPost,
} from "@/lib/blog/posts";
import { t } from "@/lib/blog/ui-strings";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllParams();
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (!isBlogLocale(locale)) return {};

  const post = await getRenderedPost(locale, slug);
  if (!post) return {};

  const alternates = await getAlternates(slug);
  const languages = {};
  for (const [item, path] of Object.entries(alternates)) {
    languages[item] = absoluteUrl(path);
  }
  const fallback =
    alternates.fr ?? Object.values(alternates)[0] ?? blogPath(locale, slug);
  languages["x-default"] = absoluteUrl(fallback);

  const url = absoluteUrl(blogPath(locale, slug));

  return {
    title: { absolute: `${post.title} — Skemalab` },
    description: post.description,
    alternates: {
      canonical: url,
      languages,
      types: {
        "application/rss+xml": `${SITE_URL}/${locale}/blog/rss.xml`,
      },
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      siteName: "Skemalab",
      locale: OG_LOCALE[locale],
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.cover, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  if (!isBlogLocale(locale)) notFound();

  const post = await getRenderedPost(locale, slug);
  if (!post) notFound();

  const [alternates, related] = await Promise.all([
    getAlternates(slug),
    getRelated(locale, slug),
  ]);

  const url = absoluteUrl(blogPath(locale, slug));

  return (
    <article className="blog-article">
      <RegisterAlternates alternates={alternates} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              image: post.cover,
              datePublished: post.date,
              dateModified: post.updated ?? post.date,
              inLanguage: locale,
              author: { "@type": "Organization", name: post.author },
              publisher: {
                "@type": "Organization",
                name: "Skemalab",
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_URL}/logo2.png`,
                },
              },
              mainEntityOfPage: url,
              keywords: post.tags.join(", "),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Skemalab",
                  item: SITE_URL,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: t(locale, "blog"),
                  item: absoluteUrl(blogPath(locale)),
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: url,
                },
              ],
            },
          ],
        }}
      />

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

      <header className="blog-hero">
        <div className="blog-hero-text">
          {post.tags.length > 0 && (
            <ul className="blog-tags" aria-label={t(locale, "tags")}>
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`${blogPath(locale)}/tag/${encodeURIComponent(tag)}`}
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <h1>{post.title}</h1>

          <PostMeta post={post} locale={locale} variant="hero" />
        </div>

        <CoverImage
          src={post.cover}
          alt={post.coverAlt}
          priority
          sizes="(min-width: 1440px) 1312px, (min-width: 1024px) 944px, 100vw"
          className="blog-hero-cover"
        />
      </header>

      <div className="blog-layout">
        {post.toc.length > 1 && <Toc items={post.toc} title={t(locale, "toc")} />}
        <div
          className="prose-skema"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>

      <PostEnhancer
        copyLabel={t(locale, "copy")}
        copiedLabel={t(locale, "copied")}
      />

      <footer className="blog-footer">
        <ShareButtons
          url={url}
          title={post.title}
          label={t(locale, "share")}
          copyLabel={t(locale, "copyLink")}
          copiedLabel={t(locale, "copied")}
        />

        {related.length > 0 && (
          <section className="blog-related" aria-labelledby="related">
            <h2 id="related">{t(locale, "related")}</h2>
            <div className="blog-grid">
              {related.map((relatedPost) => (
                <PostCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  locale={locale}
                  compact
                  headingLevel="h3"
                />
              ))}
            </div>
          </section>
        )}

        <section className="blog-cta beam-frame">
          <div className="blog-cta-inner">
            <p className="label-mono">Skemalab</p>
            <h2>{t(locale, "cta")}</h2>
            <p className="blog-cta-desc">{t(locale, "ctaDesc")}</p>
            <CalendlyButton className="mt-2 min-h-12 px-6">
              {t(locale, "cta")}
            </CalendlyButton>
          </div>
        </section>
      </footer>
    </article>
  );
}
