# CLAUDE.md

Guidance for AI assistants working in this repo.

## What this is

A small personal movie watch-list app. A React + Vite frontend renders a hard-coded list of films with sortable/filterable columns and a "watched" toggle. An optional Express + Postgres backend persists which titles have been marked watched. Both halves deploy to Railway.

## Layout

```
/                       # Vite frontend (root package)
  index.html            # Vite entry
  vite.config.js        # React plugin + Railway preview host allowlist
  src/
    main.jsx            # ReactDOM root
    App.jsx             # Entire app: movies array, styles, table + card UI
/server/                # Independent Node package (CommonJS)
  index.js              # Express API: GET/POST /api/watched
  package.json          # Own deps (express, cors, pg)
```

There are two `package.json` files. They are not a workspace — each is installed independently. `node_modules`, `dist`, and `.env` are gitignored.

## Frontend (`/`)

- React 18 + Vite 5, ESM (`"type": "module"`).
- `src/App.jsx` is intentionally a single file: the movie data, styles (inline `<style>` string), sort/filter state, desktop table layout, and mobile card layout all live there. Don't split it up unless asked.
- Movies are a hard-coded array at the top of `App.jsx`. Adding a film = adding an object with: `title, year, rt, audience, genre, vibe, rating, runtime, director, stars`. Use `null` for unknown numeric fields — the UI renders `—` and the sort treats `null` as `-1`.
- `VIBES` and `GENRES` filter dropdowns are derived from the movie array; no manual update needed when categories are added.
- `rtColor` / `audienceColor` thresholds (75/50 and 85/70) drive the green/orange/red score coloring.
- Watched state lives in a `{ [title]: boolean }` map. `toggleWatched` does optimistic UI then POSTs; on failure it reverts. Initial state is fetched from `${API}/api/watched` on mount.
- `API` base URL: `import.meta.env.VITE_API_URL || "http://localhost:3001"`. Set `VITE_API_URL` at build time for production.
- Responsive split is CSS-only: `.table-wrap` shows ≥768px, `.cards` shows <768px. Both render the same `filtered` list.

### Scripts (root)

```
npm install
npm run dev       # vite dev server on :5173
npm run build     # outputs to dist/
npm run preview   # vite preview
npm start         # vite preview --host 0.0.0.0 --port $PORT  (Railway)
```

## Backend (`/server`)

- Express, CommonJS, single file (`server/index.js`).
- Postgres via `pg.Pool`, connection string from `DATABASE_URL`, SSL with `rejectUnauthorized: false` (Railway's managed Postgres).
- On boot: `initDB()` runs `CREATE TABLE IF NOT EXISTS watched_items (title TEXT PRIMARY KEY, watched BOOLEAN, updated_at TIMESTAMP)`.
- Endpoints:
  - `GET  /api/watched` → `[{ title, watched }, ...]`
  - `POST /api/watched/:title` body `{ watched: boolean }` → upsert
- `cors()` is wide-open. `PORT` env var, defaults to 3001.

### Scripts (server/)

```
cd server
npm install
npm start         # node index.js
```

Local dev needs a `DATABASE_URL` (or stub the API — the frontend tolerates a failed initial fetch and just leaves everything unwatched).

## Deployment

Railway hosts both halves as separate services from this repo:

- Frontend: builds with `npm run build`, serves with `npm start` (vite preview). `vite.config.js` whitelists `robbie-watchlist-production.up.railway.app` under `preview.allowedHosts` — add new hosts there if the deploy URL changes.
- Backend: runs `node index.js` from `/server`. Needs `DATABASE_URL` from a Railway Postgres plugin.
- Frontend needs `VITE_API_URL` set to the backend's Railway URL at build time (it's inlined into the bundle).

## Conventions

- Title is the primary key everywhere — frontend keys, API params, DB primary key. If you rename a movie, the watched state for the old title is orphaned. There's no migration path; either accept it or write a one-off SQL update.
- Styling is inline in `App.jsx` via a tagged string and `style={}` props. No CSS modules, no Tailwind, no design system. Match the existing zinc/dark palette (`#141416` bg, `#fafafa` text, `#fb923c` accent, `#27272a`/`#3f3f46` borders) when adding UI.
- No tests, no linter, no formatter configured. Don't add them unless asked.
- No TypeScript. Don't introduce it unless asked.

## Git / branches

- Default branch: `main`.
- When working under Claude Code on the web, develop on the assigned `claude/...` branch and push there. Don't open PRs unless explicitly requested.
