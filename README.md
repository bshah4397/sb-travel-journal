# 🌍 30 Under 30 — Travel Journal

A couple's travel-challenge tracker: every country **Bhavya & Shraddha** visit
before each turns 30. Part passport, part scoreboard, part love letter to the
world. Static, read-only, updated by editing data and committing.

- **Stack:** React + TypeScript + Vite
- **Routing:** `react-router-dom` — `/` (Together), `/bhavya`, `/shraddha`
- **Motion:** `framer-motion`
- **Deploy:** GitHub → Vercel (SPA rewrites in `vercel.json`)
- **Design:** warm paper / scrapbook aesthetic (see
  `website-ui-ux-design-export/`), the approved source of truth.

> ⚠️ **Scaffold stage.** The build tooling, theme tokens, data model, routing
> and a live skeleton are in place. The full journal UI (map, polaroid grid,
> continent stamps, achievements, detail modal) is the next phase.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build locally
```

## Project structure

```
src/
  data/countries.ts   # the country log + racers — edit & commit to update
  theme/tokens.ts     # colors, per-view accents, fonts (from the mockup)
  lib/journal.ts      # pure selectors (counts, countdowns, stats, XP)
  pages/JournalPage.tsx
  router.tsx          # the three routes
  main.tsx
  index.css           # reset, fonts, keyframes
```

## Updating the journal

There is no backend, auth, or upload UI. To add a country:

1. Add an entry to `COUNTRIES` in [`src/data/countries.ts`](src/data/countries.ts).
2. (Optional) Drop photos in `public/assets/countries/<id>/` and reference
   them via the entry's `photos` field.
3. Commit & push — Vercel redeploys automatically.

## Deploying

1. Push this repo to GitHub.
2. Import it in Vercel — it auto-detects Vite (build `npm run build`, output
   `dist`). `vercel.json` handles client-side routing.
