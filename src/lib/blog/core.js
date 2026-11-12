import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  BLOG_LOCALES,
  CATEGORIES,
  READING_WPM,
  isCategory,
} from "./config.js";
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

async function readDir(dir) {
  try {
    return await fs.readdir(/* turbopackIgnore: true */ dir, {
      withFileTypes: true,
    });
  } catch {
    return null;
  }
}

/**
 * Reads every article folder. Articles live in `content/blog/<category>/<slug>/`,
 * so the parent folder is the only source of truth for the category.
 *
 * Invalid files never throw: they are reported through `issues` so the build
 * validator can fail with a readable message.
 */
export async function readAllPosts(dir = CONTENT_DIR) {
  const issues = [];
  const posts = [];
  const candidates = [];

  const rootEntries = await readDir(dir);
  if (!rootEntries) return { posts, issues };

  for (const entry of rootEntries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;

    const category = entry.name;
    if (!isCategory(category)) {
      issues.push({
        level: "error",
        where: category,
        message: `catégorie inconnue : rangez l'article dans ${CATEGORIES.join(", ")}/`,
      });
      continue;
    }

    const categoryEntries = await readDir(
      path.join(/* turbopackIgnore: true */ dir, category),
    );
    if (!categoryEntries) continue;

    for (const child of categoryEntries) {
      if (!child.isDirectory()) continue;
      if (child.name.startsWith("_") || child.name.startsWith(".")) continue;
      candidates.push({ category, slug: child.name });
    }
  }

  const loadedSlugs = new Set();

  for (const { category, slug } of candidates) {
    const where = `${category}/${slug}`;
    const base = path.join(/* turbopackIgnore: true */ dir, category, slug);

    const slugIssue = slugProblem(slug);
    if (slugIssue) {
      issues.push({ level: "error", where, message: slugIssue });
      continue;
    }

    if (loadedSlugs.has(slug)) {
      issues.push({
        level: "error",
        where,
        message:
          "slug déjà utilisé dans une autre catégorie (les URLs /blog/<slug> entreraient en collision)",
      });
      continue;
    }

    const rawMeta = await readIfExists(path.join(base, "meta.json"));
    if (rawMeta === null) {
      issues.push({
        level: "error",
        where: `${where}/meta.json`,
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
        where: `${where}/meta.json`,
        message: "JSON invalide",
      });
      continue;
    }

    const metaParsed = metaSchema.safeParse(metaJson);
    if (!metaParsed.success) {
      for (const issue of metaParsed.error.issues) {
        issues.push({
          level: "error",
          where: `${where}/meta.json`,
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
        where: `${where}/meta.json`,
        message: `cover : ${coverIssue}`,
      });
      continue;
    }

    const locales = {};
    for (const locale of BLOG_LOCALES) {
      const file = `${where}/${locale}.md`;
      const raw = await readIfExists(path.join(base, `${locale}.md`));
      if (raw === null) {
        issues.push({
          level: "warning",
          where: file,
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
          where: file,
          message: "frontmatter YAML invalide",
        });
        continue;
      }

      const frontmatter = frontmatterSchema.safeParse(parsed.data);
      if (!frontmatter.success) {
        for (const issue of frontmatter.error.issues) {
          issues.push({
            level: "error",
            where: file,
            message: `${issue.path.join(".") || "(racine)"} : ${issue.message}`,
          });
        }
        continue;
      }

      const body = parsed.content;
      if (body.trim().length < 100) {
        issues.push({
          level: "error",
          where: file,
          message: "contenu trop court (< 100 caractères)",
        });
        continue;
      }

      for (const url of bodyImageUrls(body)) {
        const problem = imageUrlProblem(url);
        if (problem) {
          issues.push({
            level: "error",
            where: file,
            message: `image du corps : ${problem}`,
          });
        }
      }

      locales[locale] = { frontmatter: frontmatter.data, body };
    }

    if (Object.keys(locales).length === 0) {
      issues.push({
        level: "error",
        where,
        message: "aucune langue valide pour cet article",
      });
      continue;
    }

    loadedSlugs.add(slug);
    posts.push({ slug, category, meta, locales });
  }

  return { posts, issues };
}
