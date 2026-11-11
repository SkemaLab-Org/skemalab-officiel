---
title: "Welcome to the Skemalab blog"
description: "Insights, methods and lessons learned on web development, digital marketing and automation."
excerpt: "A space to share what we learn while building digital products, running campaigns and automating operations."
coverAlt: "A workspace with a laptop, a notebook and a cup of coffee"
tags: ["studio", "web", "automation"]
---

We spend our days designing websites, launching campaigns and connecting tools. The Skemalab blog is where we take the time to explain **what actually works**, what wastes our time, and how we improve our methods.

## Why this blog

A digital studio learns fast, but forgets even faster. Writing forces us to structure our ideas and test them against reality. This blog is both a workshop notebook and a place to share.

### What you will find here

- lessons learned from real projects;
- practical guides on development and SEO;
- automation workflows you can adapt;
- honest analyses of what we test, including its limits.

Our editorial priorities are simple: be useful, stay concrete and own our technical choices.

> Clarity is not a simplification. It is the result of serious work.

### A simple method

1. Clarify the problem and the expected outcome.
2. Build the smallest version that proves the value.
3. Measure, correct, then industrialise.
4. Document what worked so you do not start from scratch.

- [x] Define a measurable goal
- [x] Choose a single indicator
- [ ] Automate reporting
- [ ] Train the team on the tool

## The formats we will use

We will alternate between short notes, case studies and technical tutorials. A topic can be covered more than once: the first version sets the frame, the next ones add what we learned in the field.

| Format | Length | For whom? |
| --- | --- | --- |
| Workshop note | 3 to 5 minutes | The whole team |
| Practical guide | 8 to 12 minutes | Developers and marketers |
| Case study | 10 to 15 minutes | Decision-makers and clients |

> [!NOTE]
> Code samples are tested against current versions of Node.js and Next.js. If an API changes, the article is updated.

> [!TIP]
> Start with the problem, not the tool. A good workflow that solves the wrong problem is still a waste of time.

> [!WARNING]
> Never copy an automation workflow to production without understanding its side effects: duplicates, loops or mass sends.

## A technical preview

Here is the kind of configuration we use to keep rendering predictable:

```ts
type Article = {
  slug: string;
  locale: "fr" | "en" | "ar";
  published: boolean;
};

export function isVisible(article: Article, today: string): boolean {
  return article.published && article.slug.length > 0 && today.length === 10;
}
```

And the command that validates content before a deployment:

```bash
npm run content:check
```

We like simple tools: one Markdown file, one metadata file, and a pipeline that validates everything. Nothing more.

![The Skemalab team working on a project](https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80)

---

The next article shows how we use [n8n to automate outreach](/en/blog/automatiser-avec-n8n). You can also read [our story](/our-story) to understand where the studio comes from.

If you want to build something solid, [let's talk](/#contact).
