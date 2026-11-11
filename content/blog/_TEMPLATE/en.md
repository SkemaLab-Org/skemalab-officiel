---
title: "Article title in English"
description: "Summary between 50 and 160 characters, used for SEO and social sharing."
excerpt: "Short hook displayed on the article card in the blog list."
coverAlt: "Accurate description of the cover image"
tags: ["example", "web"]
---

Open the article with a paragraph that states the reader's concrete problem.
The frontmatter above is required, except `excerpt` which is optional.

## A first section

Use `##` headings for sections and `###` for subsections: they automatically
feed the article's table of contents.

### Subsection

The text supports **bold**, *italic*, `inline code`, [links](https://www.skemalab.com)
and lists:

- one point;
- another point;
- a last point.

1. One step
2. Another step
3. The last step

## Callouts

> [!NOTE]
> Additional information.

> [!TIP]
> Good practice to apply.

> [!WARNING]
> Something to watch out for.

> [!IMPORTANT]
> Essential information.

> [!CAUTION]
> Risk to avoid.

## Tables and code

| Column A | Column B |
| --- | --- |
| Value 1 | Value 2 |

```js
const message = "Code always stays readable from left to right";
console.log(message);
```

## Images

![Useful alternative text](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80)

Every image must come from a domain listed in `src/lib/blog/image-hosts.json`
and use an `https://` URL.

## Conclusion

End with a call to action and, when useful, a link to another page of the site.
