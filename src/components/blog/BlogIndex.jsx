import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BLOG_INDEX_ALTERNATES,
  POSTS_PER_PAGE,
  blogPagePath,
  blogPath,
} from "@/lib/blog/config";
import { getPosts, getTags } from "@/lib/blog/posts";
import { t } from "@/lib/blog/ui-strings";
import PostCard from "./PostCard";
import RegisterAlternates from "./RegisterAlternates";

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

      <header className="blog-index-head">
        <p className="label-mono">{t(locale, "blog")}</p>
        <h1>{t(locale, "blogTitle")}</h1>
        <p className="blog-index-desc">{t(locale, "blogDesc")}</p>
      </header>

      {tags.length > 0 && (
        <nav className="blog-tagbar" aria-label={t(locale, "tags")}>
          <ul>
            {tags.map(({ tag, count }) => (
              <li key={tag}>
                <Link
                  href={`${blogPath(locale)}/tag/${encodeURIComponent(tag)}`}
                >
                  <span>{tag}</span>
                  <span className="blog-tag-count" aria-hidden="true">
                    {count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {allPosts.length === 0 ? (
        <p className="blog-empty">{t(locale, "empty")}</p>
      ) : (
        <>
          {featured && (
            <section className="blog-featured" aria-labelledby="featured">
              <p className="label-mono" id="featured">
                {t(locale, "featured")}
              </p>
              <PostCard post={featured} locale={locale} featured />
            </section>
          )}

          {posts.length > 0 && (
            <section className="blog-grid" aria-label={t(locale, "allPosts")}>
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} locale={locale} />
              ))}
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
                  ← {t(locale, "prev")}
                </Link>
              ) : (
                <span />
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
                  {t(locale, "next")} →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
