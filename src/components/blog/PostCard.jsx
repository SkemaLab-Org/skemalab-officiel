import Link from "next/link";
import { blogPath, formatPostDate } from "@/lib/blog/config";
import { t } from "@/lib/blog/ui-strings";
import CoverImage from "./CoverImage";

export default function PostCard({ post, locale, featured = false }) {
  return (
    <article className={`blog-card${featured ? " blog-card-featured" : ""}`}>
      <CoverImage
        src={post.cover}
        alt={post.coverAlt}
        priority={featured}
        sizes={
          featured
            ? "(min-width: 1024px) 720px, 100vw"
            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        }
      />

      <div className="blog-card-body">
        {post.tags.length > 0 && (
          <ul className="blog-tags" aria-label={t(locale, "tags")}>
            {post.tags.map((tag) => (
              <li key={tag}>
                <span>{tag}</span>
              </li>
            ))}
          </ul>
        )}

        <h2 className="blog-card-title">
          <Link href={blogPath(locale, post.slug)}>{post.title}</Link>
        </h2>

        <p className="blog-card-excerpt">{post.excerpt}</p>

        <p className="blog-meta">
          <time dateTime={post.date}>
            {formatPostDate(post.date, locale)}
          </time>
          <span aria-hidden="true"> · </span>
          <span>{post.author}</span>
          <span aria-hidden="true"> · </span>
          <span>
            {post.readingTime} {t(locale, "minRead")}
          </span>
        </p>
      </div>
    </article>
  );
}
