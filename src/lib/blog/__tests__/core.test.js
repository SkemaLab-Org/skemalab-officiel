import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  estimateReadingTime,
  isPublished,
  readAllPosts,
} from "../core.js";

const LONG_BODY = `# Article de test

Ceci est un contenu suffisamment long pour passer la validation du chargeur.
Il contient plusieurs phrases afin de dépasser la limite de cent caractères.
`;

const meta = {
  date: "2020-01-01",
  cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
  author: "Skemalab",
  featured: false,
  draft: false,
};

async function writePost(root, category, slug, options = {}) {
  const dir = path.join(root, category, slug);
  await fs.mkdir(dir, { recursive: true });

  if (options.meta !== false) {
    await fs.writeFile(
      path.join(dir, "meta.json"),
      JSON.stringify(options.meta ?? meta, null, 2),
    );
  }

  const locales = options.locales ?? ["fr", "en", "ar"];
  for (const locale of locales) {
    await fs.writeFile(
      path.join(dir, `${locale}.md`),
      `---
title: "Titre ${locale}"
description: "Une description suffisamment longue pour respecter la contrainte de cinquante caractères minimum."
coverAlt: "Une image de couverture"
tags: ["test"]
---

${options.body ?? LONG_BODY}`,
    );
  }
}

describe("readAllPosts", () => {
  let root;

  beforeEach(async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), "skemalab-blog-"));
  });

  afterEach(async () => {
    await fs.rm(root, { recursive: true, force: true });
  });

  it("charge un article valide dans les trois langues", async () => {
    await writePost(root, "build", "mon-article");
    const { posts, issues } = await readAllPosts(root);

    expect(posts).toHaveLength(1);
    expect(posts[0].category).toBe("build");
    expect(Object.keys(posts[0].locales)).toEqual(["fr", "en", "ar"]);
    expect(issues.filter((issue) => issue.level === "error")).toHaveLength(0);
  });

  it("déduit la catégorie du dossier parent", async () => {
    await writePost(root, "grow", "article-grow");
    await writePost(root, "automate", "article-automate");
    const { posts } = await readAllPosts(root);

    const categories = Object.fromEntries(
      posts.map((post) => [post.slug, post.category]),
    );
    expect(categories).toEqual({
      "article-grow": "grow",
      "article-automate": "automate",
    });
  });

  it("signale une langue manquante sans supprimer l'article", async () => {
    await writePost(root, "build", "sans-arabe", { locales: ["fr", "en"] });
    const { posts, issues } = await readAllPosts(root);

    expect(posts).toHaveLength(1);
    expect(issues).toContainEqual(
      expect.objectContaining({
        level: "warning",
        where: "build/sans-arabe/ar.md",
      }),
    );
  });

  it("refuse une couverture en http", async () => {
    await writePost(root, "build", "http-cover", {
      meta: { ...meta, cover: "http://images.unsplash.com/photo-1" },
    });
    const { posts, issues } = await readAllPosts(root);

    expect(posts).toHaveLength(0);
    expect(issues[0].message).toContain("https://");
  });

  it("refuse un domaine d'image inconnu et le nomme", async () => {
    await writePost(root, "build", "domaine-inconnu", {
      meta: { ...meta, cover: "https://example.com/image.jpg" },
    });
    const { posts, issues } = await readAllPosts(root);

    expect(posts).toHaveLength(0);
    expect(issues[0].message).toContain("example.com");
  });

  it.each(["Page", "page", "category", "mon article"])(
    "refuse le slug invalide ou réservé %s",
    async (slug) => {
      await writePost(root, "build", slug);
      const { posts, issues } = await readAllPosts(root);

      expect(posts).toHaveLength(0);
      expect(issues.some((issue) => issue.level === "error")).toBe(true);
    },
  );

  it("refuse un frontmatter sans titre", async () => {
    await writePost(root, "build", "sans-titre");
    for (const locale of ["fr", "en", "ar"]) {
      await fs.writeFile(
        path.join(root, "build", "sans-titre", `${locale}.md`),
        `---
description: "Une description suffisamment longue pour respecter la contrainte de cinquante caractères minimum."
coverAlt: "Une image de couverture"
---

${LONG_BODY}`,
      );
    }

    const { posts, issues } = await readAllPosts(root);
    expect(posts).toHaveLength(0);
    expect(
      issues.some((issue) => issue.where === "build/sans-titre/fr.md"),
    ).toBe(true);
  });

  it("refuse une clé inconnue dans le frontmatter", async () => {
    await writePost(root, "build", "cle-inconnue");
    const file = path.join(root, "build", "cle-inconnue", "fr.md");
    await fs.writeFile(
      file,
      `---
title: "Titre valide"
description: "Une description suffisamment longue pour respecter la contrainte de cinquante caractères minimum."
coverAlt: "Une image de couverture"
inconnue: true
---

${LONG_BODY}`,
    );

    const { issues } = await readAllPosts(root);
    expect(issues.some((issue) => issue.message.includes("inconnue"))).toBe(
      true,
    );
  });

  it("ignore les dossiers _TEMPLATE et les fichiers cachés à la racine", async () => {
    await writePost(root, "_TEMPLATE", "modele");
    await writePost(root, ".brouillon", "modele");
    const { posts } = await readAllPosts(root);

    expect(posts).toHaveLength(0);
  });

  it("ignore les dossiers _ et cachés à l'intérieur d'une catégorie", async () => {
    await writePost(root, "build", "_modele");
    await writePost(root, "build", ".brouillon");
    const { posts } = await readAllPosts(root);

    expect(posts).toHaveLength(0);
  });

  it("refuse un dossier racine qui n'est pas une catégorie", async () => {
    await writePost(root, "divers", "article-egare");
    const { posts, issues } = await readAllPosts(root);

    expect(posts).toHaveLength(0);
    expect(issues).toContainEqual(
      expect.objectContaining({
        level: "error",
        where: "divers",
      }),
    );
    expect(issues[0].message).toContain("catégorie inconnue");
  });

  it("refuse un slug présent dans deux catégories", async () => {
    await writePost(root, "build", "slug-duplique");
    await writePost(root, "grow", "slug-duplique");
    const { posts, issues } = await readAllPosts(root);

    expect(posts).toHaveLength(1);
    expect(
      issues.some(
        (issue) =>
          issue.level === "error" &&
          issue.message.includes("déjà utilisé"),
      ),
    ).toBe(true);
  });
});

describe("isPublished", () => {
  it("exclut les brouillons", () => {
    expect(isPublished({ ...meta, draft: true }, "2026-01-01")).toBe(false);
  });

  it("exclut les dates futures", () => {
    expect(isPublished({ ...meta, date: "2099-01-01" }, "2026-01-01")).toBe(
      false,
    );
  });

  it("accepte une date passée", () => {
    expect(isPublished({ ...meta, date: "2020-01-01" }, "2026-01-01")).toBe(
      true,
    );
  });
});

describe("estimateReadingTime", () => {
  it("retourne au moins une minute", () => {
    expect(estimateReadingTime("mot", "fr")).toBe(1);
    expect(estimateReadingTime(Array(450).fill("mot").join(" "), "fr")).toBe(3);
  });
});
