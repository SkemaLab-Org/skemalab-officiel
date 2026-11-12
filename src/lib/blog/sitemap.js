import {
  BLOG_LOCALES,
  CATEGORIES,
  absoluteUrl,
  blogCategoryPath,
  blogPath,
} from "./config.js";
import { getAllParams, getPost, getPostsByCategory } from "./posts.js";

export async function getBlogSitemapEntries() {
  const listLanguages = Object.fromEntries(
    BLOG_LOCALES.map((locale) => [locale, absoluteUrl(blogPath(locale))]),
  );

  const entries = BLOG_LOCALES.map((locale) => ({
    url: absoluteUrl(blogPath(locale)),
    changeFrequency: "weekly",
    priority: 0.7,
    alternates: { languages: listLanguages },
  }));

  for (const category of CATEGORIES) {
    const byLocale = {};
    for (const locale of BLOG_LOCALES) {
      const posts = await getPostsByCategory(locale, category);
      if (posts.length > 0) byLocale[locale] = posts;
    }

    const languages = Object.fromEntries(
      Object.keys(byLocale).map((locale) => [
        locale,
        absoluteUrl(blogCategoryPath(locale, category)),
      ]),
    );

    for (const [locale, posts] of Object.entries(byLocale)) {
      entries.push({
        url: absoluteUrl(blogCategoryPath(locale, category)),
        lastModified: posts[0]?.updated ?? posts[0]?.date,
        changeFrequency: "weekly",
        priority: 0.65,
        alternates: { languages },
      });
    }
  }

  const params = await getAllParams();
  const slugs = [...new Set(params.map((entry) => entry.slug))];

  for (const slug of slugs) {
    const locales = params
      .filter((entry) => entry.slug === slug)
      .map((entry) => entry.locale);
    const languages = Object.fromEntries(
      locales.map((locale) => [
        locale,
        absoluteUrl(blogPath(locale, slug)),
      ]),
    );

    for (const locale of locales) {
      const post = await getPost(locale, slug);
      entries.push({
        url: absoluteUrl(blogPath(locale, slug)),
        lastModified: post?.updated ?? post?.date,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  return entries;
}
