import { BLOG_LOCALES, absoluteUrl, blogPath } from "./config.js";
import { getAllParams, getPost } from "./posts.js";

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
