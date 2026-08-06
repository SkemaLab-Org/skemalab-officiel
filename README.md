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

Tous les champs sont obligatoires. Envoi via `/api/contact` → Google Form → Sheets.

**Sécurité :** validation serveur, honeypot, rate limit (5 / 15 min / IP), contrôle d’origine same-origin, headers CSP / HSTS.

1. Copie `.env.example` → `.env`
2. Remplis `GOOGLE_FORM_ACTION` + `GF_ENTRY_*` (lien prérempli Google Form)
3. Redémarre `npm run dev`

## Prise de rendez-vous (Calendly)

Le bouton navbar **Demandez un RDV** ouvre une modal (iframe Calendly). Créneaux et anti double-booking via sync **Google Calendar**.

### Setup à faire (une fois)

1. **Google Calendar** — compte SkemaLab, fuseau `Africa/Casablanca`.
2. **Calendly** — même compte Google, Settings → **Calendar sync** (conflits + écriture events).
3. **Event type** — ex. 30 min, horaires + buffers.
4. Copie l’URL dans `.env` :

```bash
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/TON-USERNAME/decouverte
```

5. Redémarre `npm run dev`, teste une résa, vérifie Google Calendar, puis annule le test.

Sans `NEXT_PUBLIC_CALENDLY_URL`, le bouton redirige vers `#contact`. CSP : `frame-src` Calendly uniquement.
