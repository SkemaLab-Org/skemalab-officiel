import "server-only";
import { cache } from "react";
import { BLOG_LOCALES, blogPath } from "./config.js";
import {
  estimateReadingTime,
  isPublished,
  readAllPosts,
} from "./core.js";
import { renderMarkdown } from "./markdown.js";

const loadPublished = cache(async () => {
  const { posts, issues } = await readAllPosts();
  for (const issue of issues) {
    if (issue.level === "error") {
      console.error(`[blog] ${issue.where} : ${issue.message}`);
    }
  }
  return posts.filter((post) => isPublished(post.meta));
});

function toSummary(post, locale) {
  const entry = post.locales[locale];
  if (!entry) return null;

  return {
    slug: post.slug,
    locale,
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    excerpt: entry.frontmatter.excerpt ?? entry.frontmatter.description,
    coverAlt: entry.frontmatter.coverAlt,
    tags: entry.frontmatter.tags,
    cover: post.meta.cover,
    date: post.meta.date,
    updated: post.meta.updated,
    author: post.meta.author,
    featured: post.meta.featured,
    readingTime: estimateReadingTime(entry.body, locale),
    body: entry.body,
  };
}

export const getPosts = cache(async (locale) => {
  const raw = await loadPublished();
  return raw
    .map((post) => toSummary(post, locale))
    .filter((post) => post !== null)
    .sort((a, b) =>
      a.date === b.date
        ? a.slug.localeCompare(b.slug)
        : a.date < b.date
          ? 1
          : -1,
    );
});

export async function getPost(locale, slug) {
  return (await getPosts(locale)).find((post) => post.slug === slug) ?? null;
}

export const getRenderedPost = cache(async (locale, slug) => {
  const post = await getPost(locale, slug);
  if (!post) return null;
  const rendered = await renderMarkdown(post.body, locale);
  return { ...post, ...rendered };
});

export async function getAllParams() {
  const raw = await loadPublished();
  return raw.flatMap((post) =>
    BLOG_LOCALES.filter((locale) => post.locales[locale]).map((locale) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export async function getAlternates(slug) {
  const raw = (await loadPublished()).find((post) => post.slug === slug);
  const alternates = {};
  if (raw) {
    for (const locale of BLOG_LOCALES) {
      if (raw.locales[locale]) alternates[locale] = blogPath(locale, slug);
    }
  }
  return alternates;
}

export async function getTags(locale) {
  const counts = new Map();
  for (const post of await getPosts(locale)) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getRelated(locale, slug, limit = 3) {
  const all = await getPosts(locale);
  const current = all.find((post) => post.slug === slug);
  if (!current) return [];

  return all
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        (a.post.date < b.post.date ? 1 : a.post.date > b.post.date ? -1 : 0),
    )
    .slice(0, limit)
    .map((entry) => entry.post);
}
