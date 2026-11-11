---
title: "Automating your outreach with n8n"
description: "Automate your outreach with n8n: a simple workflow to collect, qualify and follow up with your leads."
excerpt: "A concrete n8n workflow to collect leads, qualify them and trigger the right follow-ups."
coverAlt: "Computer screen displaying code and automation workflows"
tags: ["automation", "n8n"]
---

Manual outreach quickly becomes a bottleneck: leads pile up in a spreadsheet, follow-ups are forgotten and nobody really knows where each contact stands. **n8n** fixes this without building a full application.

## The real need

We were looking for a simple system able to:

- centralise incoming requests;
- qualify each lead based on budget and need;
- notify the team only for relevant contacts;
- trigger a follow-up after three days without a reply.

Everything had to stay understandable by a non-developer.

## The workflow in four steps

1. **Trigger**: a webhook receives the website form.
2. **Normalisation**: fields are cleaned and duplicates removed.
3. **Qualification**: a conditional node routes hot leads to Slack.
4. **Follow-up**: a three-day wait precedes a personalised email.

> [!TIP]
> Start with a single scenario and a single channel. An oversized workflow is hard to debug.

## The technical part

The webhook returns a normalised JSON object:

```json
{
  "name": "Amina",
  "email": "amina@example.com",
  "budget": 8000,
  "need": "Website redesign"
}
```

In n8n, a **Code** node can compute a simple score:

```js
const budget = Number($json.budget) || 0;
const need = String($json.need || "").toLowerCase();

const score = (budget >= 5000 ? 2 : 0) + (need.includes("website") ? 1 : 0);

return [{ json: { ...$json, score } }];
```

An **IF** node then sends scores of 2 or more to Slack, and the rest to a nurturing sequence.

> [!WARNING]
> Always check for duplicates before sending an email. A double follow-up costs more than a missed one.

## What we learned

| Problem | Solution |
| --- | --- |
| Duplicate leads | Deduplication on email |
| Forgotten follow-ups | Wait node + scheduled task |
| Overloaded team | Conditional notification |

After one month, the time spent processing a lead dropped from fifteen minutes to under two. The real gain is not speed: it is consistency.

To go further, read [our introduction article](/en/blog/bienvenue-sur-le-blog) or [contact us](/#contact) to scope your first workflow.
