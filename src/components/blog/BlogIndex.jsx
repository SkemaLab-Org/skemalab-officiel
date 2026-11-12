import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import {
  BLOG_INDEX_ALTERNATES,
  POSTS_PER_PAGE,
  blogPagePath,
} from "@/lib/blog/config";
import { getPosts, getTags } from "@/lib/blog/posts";
import { t } from "@/lib/blog/ui-strings";
import PostCard from "./PostCard";
import RegisterAlternates from "./RegisterAlternates";
import TopicBar from "./TopicBar";

export default async function BlogIndex({ locale, pageNumber = 1 }) {
  const [allPosts, tags] = await Promise.all([
    getPosts(locale),
    getTags(locale),
  ]);

  const featured =
    pageNumber === 1
      ? (allPosts.find((post) => post.featured) ?? allPosts[0] ?? null)
      : null;

  const rest = featured
    ? allPosts.filter((post) => post.slug !== featured.slug)
    : allPosts;

  const totalPages = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE));

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 1 ||
    pageNumber > totalPages
  ) {
    notFound();
  }

  const start = (pageNumber - 1) * POSTS_PER_PAGE;
  const posts = rest.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className="blog-index">
      <RegisterAlternates alternates={BLOG_INDEX_ALTERNATES} />

      <header className="blog-index-head zellige-spot">
        <div className="blog-index-head-top">
          <p className="label-mono blog-index-eyebrow">{t(locale, "blog")}</p>
          <p className="label-mono blog-index-count">
            {allPosts.length} {t(locale, "articles")}
          </p>
        </div>

        <h1 className="blog-index-title">{t(locale, "blogTitle")}</h1>
        <p className="blog-index-desc">{t(locale, "blogDesc")}</p>
      </header>

      {tags.length > 0 && (
        <TopicBar locale={locale} tags={tags} total={allPosts.length} />
      )}

      {allPosts.length === 0 ? (
        <div className="blog-empty">
          <BookOpen size={22} strokeWidth={1.5} aria-hidden="true" />
          <p>{t(locale, "empty")}</p>
        </div>
      ) : (
        <>
          {featured && (
            <section className="blog-featured" aria-labelledby="featured-heading">
              <h2 className="label-mono blog-section-label" id="featured-heading">
                {t(locale, "featured")}
              </h2>
              <PostCard post={featured} locale={locale} featured headingLevel="h3" />
            </section>
          )}

          {posts.length > 0 && (
            <section className="blog-section" aria-labelledby="all-posts-heading">
              <h2
                className="label-mono blog-section-label"
                id="all-posts-heading"
              >
                {t(locale, "allPosts")}
              </h2>
              <div className="blog-grid">
                {posts.map((post, index) => (
                  <Reveal
                    key={post.slug}
                    className="blog-card-reveal"
                    delay={Math.min(index, 6) * 0.06}
                  >
                    <PostCard post={post} locale={locale} headingLevel="h3" />
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {totalPages > 1 && (
            <nav className="blog-pagination" aria-label={t(locale, "page")}>
              {pageNumber > 1 ? (
                <Link
                  href={blogPagePath(locale, pageNumber - 1)}
                  rel="prev"
                  className="blog-page-link"
                >
                  <ChevronLeft
                    size={15}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="rtl-flip"
                  />
                  {t(locale, "prev")}
                </Link>
              ) : (
                <span className="blog-page-link" aria-disabled="true">
                  <ChevronLeft
                    size={15}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="rtl-flip"
                  />
                  {t(locale, "prev")}
                </span>
              )}

              <span className="blog-page-count">
                {t(locale, "page")} {pageNumber} {t(locale, "of")}{" "}
                {totalPages}
              </span>

              {pageNumber < totalPages ? (
                <Link
                  href={blogPagePath(locale, pageNumber + 1)}
                  rel="next"
                  className="blog-page-link"
                >
                  {t(locale, "next")}
                  <ChevronRight
                    size={15}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="rtl-flip"
                  />
                </Link>
              ) : (
                <span className="blog-page-link" aria-disabled="true">
                  {t(locale, "next")}
                  <ChevronRight
                    size={15}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="rtl-flip"
                  />
                </span>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
