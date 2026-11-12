<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Blog

- Documentation complète : `README-BLOG.md`.
- Le contenu vit dans `content/blog/<catégorie>/<slug>/` (`meta.json` + `fr.md`/`en.md`/`ar.md`) ; les catégories sont `build`, `grow` et `automate`, déduites du dossier parent. Ne pas déplacer ces fichiers sans mettre à jour `src/lib/blog/core.js`.
- Le pipeline Markdown (`src/lib/blog/markdown.js`) est couvert par `src/lib/blog/__tests__/markdown.test.js`. Lancer `npm test` avant toute modification du rendu.
- `npm run content:check` valide le contenu ; il tourne aussi au début de `npm run build`.

