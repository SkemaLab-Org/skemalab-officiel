import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { BLOG_LOCALES, READING_WPM } from "./config.js";
import {
  frontmatterSchema,
  imageUrlProblem,
  metaSchema,
  slugProblem,
} from "./schema.js";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function isPublished(meta, today = todayISO()) {
  return !meta.draft && meta.date <= today;
}

export function estimateReadingTime(body, locale) {
  const words = body
    .replace(/[#>*_`|()[\]!~-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / (READING_WPM[locale] || 200)));
}

async function readIfExists(file) {
  try {
    return await fs.readFile(file, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

function bodyImageUrls(body) {
  const urls = [];
  const markdownImage = /!\[[^\]]*\]\((https?:\/\/[^)\s]+)(?:\s+"[^"]*")?\)/g;
  const htmlImage = /<img\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["'][^>]*>/gi;

  for (const match of body.matchAll(markdownImage)) urls.push(match[1]);
  for (const match of body.matchAll(htmlImage)) urls.push(match[1]);
  return urls;
}

/**
 * Reads every article folder. Invalid files never throw: they are reported
 * through `issues` so the build validator can fail with a readable message.
 */
export async function readAllPosts(dir = CONTENT_DIR) {
  const issues = [];
  const posts = [];

  let entries;
  try {
    entries = await fs.readdir(/* turbopackIgnore: true */ dir, {
      withFileTypes: true,
    });
  } catch {
    return { posts, issues };
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;

    const slug = entry.name;
    const base = path.join(/* turbopackIgnore: true */ dir, slug);
    const slugIssue = slugProblem(slug);
    if (slugIssue) {
      issues.push({ level: "error", where: slug, message: slugIssue });
      continue;
    }

    const rawMeta = await readIfExists(path.join(base, "meta.json"));
    if (rawMeta === null) {
      issues.push({
        level: "error",
        where: `${slug}/meta.json`,
        message: "fichier manquant",
      });
      continue;
    }

    let metaJson;
    try {
      metaJson = JSON.parse(rawMeta);
    } catch {
      issues.push({
        level: "error",
        where: `${slug}/meta.json`,
        message: "JSON invalide",
      });
      continue;
    }

    const metaParsed = metaSchema.safeParse(metaJson);
    if (!metaParsed.success) {
      for (const issue of metaParsed.error.issues) {
        issues.push({
          level: "error",
          where: `${slug}/meta.json`,
          message: `${issue.path.join(".") || "(racine)"} : ${issue.message}`,
        });
      }
      continue;
    }

    const meta = metaParsed.data;
    const coverIssue = imageUrlProblem(meta.cover);
    if (coverIssue) {
      issues.push({
        level: "error",
        where: `${slug}/meta.json`,
        message: `cover : ${coverIssue}`,
      });
      continue;
    }

    const locales = {};
    for (const locale of BLOG_LOCALES) {
      const where = `${slug}/${locale}.md`;
      const raw = await readIfExists(path.join(base, `${locale}.md`));
      if (raw === null) {
        issues.push({
          level: "warning",
          where,
          message:
            "langue manquante (l'article ne sera pas visible dans cette langue)",
        });
        continue;
      }

      let parsed;
      try {
        parsed = matter(raw);
      } catch {
        issues.push({
          level: "error",
          where,
          message: "frontmatter YAML invalide",
        });
        continue;
      }

      const frontmatter = frontmatterSchema.safeParse(parsed.data);
      if (!frontmatter.success) {
        for (const issue of frontmatter.error.issues) {
          issues.push({
            level: "error",
            where,
            message: `${issue.path.join(".") || "(racine)"} : ${issue.message}`,
          });
        }
        continue;
      }

      const body = parsed.content;
      if (body.trim().length < 100) {
        issues.push({
          level: "error",
          where,
          message: "contenu trop court (< 100 caractères)",
        });
        continue;
      }

      for (const url of bodyImageUrls(body)) {
        const problem = imageUrlProblem(url);
        if (problem) {
          issues.push({
            level: "error",
            where,
            message: `image du corps : ${problem}`,
          });
        }
      }

      locales[locale] = { frontmatter: frontmatter.data, body };
    }

    if (Object.keys(locales).length === 0) {
      issues.push({
        level: "error",
        where: slug,
        message: "aucune langue valide pour cet article",
      });
      continue;
    }

    posts.push({ slug, meta, locales });
  }

  return { posts, issues };
}
