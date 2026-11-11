import {
  BLOG_LOCALES,
  SITE_URL,
  absoluteUrl,
  blogPath,
  isBlogLocale,
} from "@/lib/blog/config";
import { getPosts } from "@/lib/blog/posts";

export const dynamic = "force-static";
export const revalidate = 60;

export function generateStaticParams() {
  return BLOG_LOCALES.map((locale) => ({ locale }));
}

const esc = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET(_request, { params }) {
  const { locale } = await params;
  if (!isBlogLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }

  const posts = (await getPosts(locale)).slice(0, 20);

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${esc(post.title)}</title>
      <link>${absoluteUrl(blogPath(locale, post.slug))}</link>
      <guid isPermaLink="true">${absoluteUrl(blogPath(locale, post.slug))}</guid>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(post.excerpt)}</description>
      ${post.tags.map((tag) => `<category>${esc(tag)}</category>`).join("")}
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Skemalab Blog</title>
    <link>${absoluteUrl(blogPath(locale))}</link>
    <description>Skemalab – Build · Grow · Automate</description>
    <language>${locale}</language>
    <atom:link href="${SITE_URL}/${locale}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
