# Focused AI and SEO improvements

## Intent

Help French- and Arabic-speaking small and medium-sized businesses in Morocco and Europe find and correctly understand SkemaLab through search and AI tools.

## Goals

- Publish a concise, bilingual `llms.txt` with verified company, service, contact, and language information and links to authoritative pages.
- Improve the existing search metadata and structured data using facts already supported by the website.
- Keep crawler guidance and sitemap output accurate and consistent.

## Non-goals and anti-goals

- Do not add new indexable marketing pages or broaden the site's translation scope.
- Do not imply that `llms.txt` is a Google ranking factor.
- Do not publish unsupported business claims, geographic coverage, hours, or performance promises.

## Approaches

- **Focused SEO + AI reference (chosen):** add the bilingual AI reference and refine current SEO metadata, structured data, and crawl/index signals. This aligns with the request while limiting duplicate or thin content.
- **Broader multilingual SEO:** additionally create French and Arabic service/FAQ pages. This may target more queries but requires substantial new content and ongoing translation maintenance; it is outside the chosen scope.

## Constraints and implementation calls

- The main site is French; the blog has French, English, and Arabic routes. Clearly distinguish the languages and link only to existing pages.
- Treat the existing site content and contact configuration as the source of truth. Preserve existing behavior and use the project's Next.js metadata and sitemap conventions.
- The `llms.txt` convention is emerging and does not guarantee AI citations or search ranking changes.
- Keep changes surgical; do not introduce dependencies.

## Approval

Approved by the user on 2026-11-12.
