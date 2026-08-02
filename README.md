# Skemalab

One-page marketing site for **Skemalab** — développement informatique, marketing digital et automatisation de workflows.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19
- Tailwind CSS 4
- Framer Motion
- Lucide React
- [Poppins](https://fonts.google.com/specimen/Poppins) via `next/font`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Structure

- `src/app` — layout, page, metadata, robots, sitemap
- `src/components` — UI + sections (Hero, Services, Contact, …)
- `src/data/content.js` — copy, images, contact info
- `src/hooks/useCarousel.js` — shared carousel logic

## Contact form

Validated client-side; submit opens a prefilled `mailto:` to `contactInfo.email`. No fake “message saved” without a real endpoint.
