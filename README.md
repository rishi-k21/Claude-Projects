# Claude Projects

A practice log. Each experiment I build with Claude gets an entry on the index
page, so I can retrace what I did later — and show it to other people.

**Live:** https://claude-projects-tau.vercel.app
**Source:** https://github.com/rishi-k21/Claude-Projects

## Stack

| Piece      | Choice                            |
| ---------- | --------------------------------- |
| Framework  | Next.js 16 (App Router)           |
| Language   | TypeScript                        |
| Styling    | Tailwind CSS v4 + CSS custom properties |
| Hosting    | Vercel                            |

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run lint    # eslint
```

## Layout

```
app/
  layout.tsx        root layout, fonts, metadata, no-flash theme script
  page.tsx          the index page
  globals.css       design tokens (light + dark) and base styles
components/
  project-card.tsx  project card + empty-slot placeholder
  theme-toggle.tsx  light/dark switch
lib/
  projects.ts       the project registry — the file you edit most
  site.ts           site name, author, repo + deployment URLs
```

## Adding a project

1. Build the thing, usually under `app/projects/<slug>/page.tsx`.
2. Add an entry to the top of the `projects` array in
   [`lib/projects.ts`](lib/projects.ts) — there's a template comment above it.
3. Commit and push. Vercel deploys the rest.

Statuses are `live`, `building` or `planned`; the index page counts and dates
itself from that array, so nothing else needs updating.

## Design notes

Colours, spacing and shadows all come from CSS custom properties defined in
`app/globals.css` and exposed to Tailwind through `@theme inline`. Dark mode is
class-based — an inline script in the root layout resolves the stored preference
before first paint, so there's no flash — with a `prefers-color-scheme` fallback
for when JavaScript is off.
