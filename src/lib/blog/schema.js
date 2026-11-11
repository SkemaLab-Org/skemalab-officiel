import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { RESERVED_SLUGS } from "./config.js";

const hostsFile = path.join(
  process.cwd(),
  "src",
  "lib",
  "blog",
  "image-hosts.json",
);

const ALLOWED_IMAGE_HOSTS = JSON.parse(
  fs.readFileSync(hostsFile, "utf8"),
);

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function imageUrlProblem(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    return "URL invalide";
  }
  if (url.protocol !== "https:") return "l'URL doit commencer par https://";
  if (!ALLOWED_IMAGE_HOSTS.includes(url.hostname)) {
    return `domaine non autorisé « ${url.hostname} » → ajoute-le dans src/lib/blog/image-hosts.json`;
  }
  return null;
}

export function slugProblem(slug) {
  if (!SLUG_RE.test(slug)) {
    return "slug invalide (minuscules, chiffres et tirets uniquement)";
  }
  if (RESERVED_SLUGS.includes(slug)) {
    return `slug réservé (${RESERVED_SLUGS.join(", ")})`;
  }
  return null;
}

export const metaSchema = z
  .object({
    date: z.string().regex(ISO_DATE, "format attendu YYYY-MM-DD"),
    updated: z
      .string()
      .regex(ISO_DATE, "format attendu YYYY-MM-DD")
      .optional(),
    cover: z.string().min(1),
    author: z.string().min(1).default("Skemalab"),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  })
  .strict();

export const frontmatterSchema = z
  .object({
    title: z.string().min(3).max(120),
    description: z.string().min(50).max(160),
    excerpt: z.string().max(300).optional(),
    coverAlt: z.string().min(3),
    tags: z.array(z.string().min(1)).default([]),
  })
  .strict();
