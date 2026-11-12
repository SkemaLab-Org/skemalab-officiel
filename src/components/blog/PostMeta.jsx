import { Calendar, Clock, User } from "lucide-react";
import { formatPostDate } from "@/lib/blog/config";
import { t } from "@/lib/blog/ui-strings";

/**
 * Publication meta row: date, author and reading time, marked with real icons
 * instead of typographic separators.
 */
export default function PostMeta({ post, locale, variant = "card" }) {
  return (
    <p className={`blog-meta blog-meta--${variant}`}>
      <span className="blog-meta-item">
        <Calendar
          size={13}
          strokeWidth={1.6}
          aria-hidden="true"
          className="blog-meta-icon"
        />
        <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
      </span>

      {variant !== "compact" && (
        <span className="blog-meta-item">
          <User
            size={13}
            strokeWidth={1.6}
            aria-hidden="true"
            className="blog-meta-icon"
          />
          <span>{post.author}</span>
        </span>
      )}

      <span className="blog-meta-item">
        <Clock
          size={13}
          strokeWidth={1.6}
          aria-hidden="true"
          className="blog-meta-icon"
        />
        <span>
          {post.readingTime} {t(locale, "minRead")}
        </span>
      </span>
    </p>
  );
}
