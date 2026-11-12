import Link from "next/link";
import { blogCategoryPath, blogPath } from "@/lib/blog/config";
import { categoryLabel, t } from "@/lib/blog/ui-strings";
import CategoryRail from "./CategoryRail";

/**
 * Category filter for the blog index and the category pages.
 *
 * The header (label + category count) stays in the flow and scrolls away; the
 * chip rail is the sticky part, so the filter remains reachable under the
 * navbar while the reader goes through the articles.
 */
export default function CategoryBar({
  locale,
  categories,
  activeCategory = null,
  total,
}) {
  return (
    <>
      <div className="blog-categorybar-head">
        <p className="label-mono blog-categorybar-eyebrow">
          {t(locale, "categories")}
        </p>
        <p className="label-mono blog-categorybar-count">
          {categories.length} {t(locale, "categoriesCount")}
        </p>
      </div>

      <CategoryRail label={t(locale, "categories")}>
        <ul className="blog-categorybar-list">
          <li className="blog-categorybar-item">
            <Link
              href={blogPath(locale)}
              className="blog-chip"
              aria-current={activeCategory ? undefined : "page"}
              aria-label={`${t(locale, "all")} (${total})`}
            >
              <span>{t(locale, "all")}</span>
              <span className="blog-chip-count" aria-hidden="true">
                {total}
              </span>
            </Link>
          </li>

          {categories.map(({ category, count }) => (
            <li key={category} className="blog-categorybar-item">
              <Link
                href={blogCategoryPath(locale, category)}
                className="blog-chip"
                aria-current={category === activeCategory ? "page" : undefined}
                aria-label={`${categoryLabel(locale, category)} (${count})`}
              >
                <span>{categoryLabel(locale, category)}</span>
                <span className="blog-chip-count" aria-hidden="true">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CategoryRail>
    </>
  );
}
