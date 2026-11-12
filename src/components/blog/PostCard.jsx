import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { blogPath } from "@/lib/blog/config";
import { categoryLabel, t } from "@/lib/blog/ui-strings";
import CoverImage from "./CoverImage";
import PostMeta from "./PostMeta";

export default function PostCard({
  post,
  locale,
  featured = false,
  compact = false,
  headingLevel = "h2",
}) {
  const Heading = headingLevel;

  const className = [
    "blog-card",
    featured ? "blog-card--featured" : "",
    compact ? "blog-card--compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className}>
      <div className="blog-card-media">
        <CoverImage
          src={post.cover}
          alt={post.coverAlt}
          priority={featured}
          sizes={
            featured
              ? "(min-width: 900px) 620px, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
        />
      </div>

      <div className="blog-card-body">
        <p className="blog-card-category label-mono">
          {categoryLabel(locale, post.category)}
        </p>

        {post.tags.length > 0 && (
          <ul className="blog-tags" aria-label={t(locale, "tags")}>
            {post.tags.map((tag) => (
              <li key={tag}>
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        )}

        <Heading className="blog-card-title">
          <Link href={blogPath(locale, post.slug)}>{post.title}</Link>
        </Heading>

        {!compact && <p className="blog-card-excerpt">{post.excerpt}</p>}

        <PostMeta
          post={post}
          locale={locale}
          variant={compact ? "compact" : "card"}
        />

        {!compact && (
          <span className="blog-card-cta">
            {t(locale, "readMore")}
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </span>
        )}
      </div>
    </article>
  );
}
