# English AI reference and blog internal links

## Intent

Make SkemaLab’s information useful to English-speaking readers and improve navigation and discovery between related blog articles.

## Goals

- Add an English-language company and services summary to `public/llms.txt` and state that the blog is available in French, English, and Arabic.
- Add a small number of contextual internal links to relevant articles in all five published posts and each existing language version.
- Use same-language routes that already exist, with descriptive anchor text.

## Non-goals

- Do not translate the main site or add blog articles.
- Do not add generic “read next” blocks that duplicate the related-post cards already shown by the blog.
- Do not change the blog renderer or add new dependencies.

## Approaches

- **Contextual links in article text (chosen):** place links where the related topic is discussed, localized to the article language. This makes links useful in context and complements the existing related-post cards.
- **Uniform “read next” list:** append a standard list to each article. This is simpler to apply mechanically, but is less contextual and duplicates existing related-post navigation.

## Constraints and implementation calls

- The blog has five published articles, each with French, English, and Arabic content.
- Preserve the articles’ language and meaning; make only small copy additions needed to introduce links.
- Link only to published posts with a matching language version. Keep links within the same locale.
- Validate the content and run the existing Markdown tests; no rendering-pipeline changes are planned.

## Approval

Approved by the user on 2026-11-12.
