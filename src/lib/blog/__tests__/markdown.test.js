import { describe, expect, it } from "vitest";
import { renderMarkdown } from "../markdown.js";

describe("renderMarkdown", () => {
  it("supprime le HTML brut et les scripts", async () => {
    const { html } = await renderMarkdown(
      "## Titre\n\n<script>alert(1)</script>\n\nTexte.",
      "fr",
    );

    expect(html).not.toContain("<script");
    expect(html).not.toContain("alert(1)");
  });

  it("transforme les encadrés en callouts", async () => {
    const { html } = await renderMarkdown(
      "> [!TIP]\n> Un conseil utile.\n",
      "fr",
    );

    expect(html).toContain('class="callout callout-tip"');
    expect(html).toContain("Un conseil utile.");
  });

  it("génère des identifiants propres et alimente le sommaire", async () => {
    const { html, toc } = await renderMarkdown(
      "## Titre de section\n\n### Sous-section\n\nTexte.",
      "fr",
    );

    expect(html).toContain('id="titre-de-section"');
    expect(html).not.toContain("user-content-");
    expect(toc).toEqual([
      { id: "titre-de-section", text: "Titre de section", depth: 2 },
      { id: "sous-section", text: "Sous-section", depth: 3 },
    ]);
  });

  it("rend les tableaux GFM", async () => {
    const { html } = await renderMarkdown(
      "| A | B | C |\n| - | - | - |\n| 1 | 2 | 3 |\n",
      "fr",
    );

    expect(html).toContain("<table>");
    expect(html).toContain("<th>A</th>");
  });

  it("colore les blocs de code au build", async () => {
    const { html } = await renderMarkdown(
      "```ts\nconst answer: number = 42;\n```\n",
      "fr",
    );

    expect(html).toContain("<pre");
    expect(html).toContain("answer");
  });

  it("ouvre les liens externes dans un nouvel onglet", async () => {
    const { html } = await renderMarkdown(
      "[Exemple](https://exemple.com)\n",
      "fr",
    );

    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("calcule un temps de lecture au moins égal à une minute", async () => {
    const { readingTime } = await renderMarkdown("Un texte court.", "ar");
    expect(readingTime).toBeGreaterThanOrEqual(1);
  });
});
