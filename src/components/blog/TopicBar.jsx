import Link from "next/link";
import { blogPath } from "@/lib/blog/config";
import { t } from "@/lib/blog/ui-strings";
import TopicRail from "./TopicRail";

/**
 * Topics filter for the blog index and the tag pages.
 *
 * The header (label + topic count) stays in the flow and scrolls away; the
 * chip rail is the sticky part, so the filter remains reachable under the
 * navbar while the reader goes through the articles.
 */
export default function TopicBar({ locale, tags, activeTag = null, total }) {
  return (
    <>
      <div className="blog-tagbar-head">
        <p className="label-mono blog-tagbar-eyebrow">{t(locale, "tags")}</p>
        <p className="label-mono blog-tagbar-count">
          {tags.length} {t(locale, "topicsCount")}
        </p>
      </div>

      <TopicRail label={t(locale, "tags")}>
        <ul className="blog-tagbar-list">
          <li className="blog-tagbar-item">
            <Link
              href={blogPath(locale)}
              className="blog-pill"
              aria-current={activeTag ? undefined : "page"}
              aria-label={`${t(locale, "all")} (${total})`}
            >
              <span>{t(locale, "all")}</span>
              <span className="blog-pill-count" aria-hidden="true">
                {total}
              </span>
            </Link>
          </li>

          {tags.map(({ tag, count }) => (
            <li key={tag} className="blog-tagbar-item">
              <Link
                href={`${blogPath(locale)}/tag/${encodeURIComponent(tag)}`}
                className="blog-pill"
                aria-current={tag === activeTag ? "page" : undefined}
                aria-label={`${tag} (${count})`}
              >
                <span>{tag}</span>
                <span className="blog-pill-count" aria-hidden="true">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </TopicRail>
    </>
  );
}
