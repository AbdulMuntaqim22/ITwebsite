# MZA Solutions — IT Services Website

Mobile-first marketing site for **MZA Solutions**, built with Vite, React, TypeScript, Tailwind CSS, and a **SQLite** backend with an **admin center**.

## Features

- **Home**, **Services**, **Plans**, and **Contact** pages
- **Admin center** at `/admin` — manage services, plans, company info, contact details, and contact form submissions
- **SQLite database** — free, self-hosted; seeded from `public/content/*.json` on first run
- **Quote-style plans** — no fixed prices; “Get a quote” links to contact with service prefill

## Quick start

```bash
npm install
cp .env.example .env
# Edit .env — set ADMIN_PASSWORD and SESSION_SECRET
npm run dev
```

- Public site: [http://localhost:5173](http://localhost:5173)
- Admin: [http://localhost:5173/admin](http://localhost:5173/admin)
- API: [http://localhost:3001](http://localhost:3001) (proxied via Vite in dev)

**Default admin login** (first run only — change in `.env` before production):

- Username: `admin` (or `ADMIN_USERNAME`)
- Password: value of `ADMIN_PASSWORD` in `.env` (default in code is `admin123` if unset)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite + API server (recommended) |
| `npm run dev:client` | Frontend only |
| `npm run dev:server` | API only |
| `npm run build` | Production frontend build → `dist/` |
| `npm run start` | Serve `dist/` + API (after build) |
| `npm run preview` | Build then start production server |

## Admin center

| Section | What you can do |
|---------|-----------------|
| **Submissions** | View, mark read/unread, delete contact form messages |
| **Services** | Add, edit, delete services (homepage “featured” flag) |
| **Plans** | Add, edit, delete plans/offerings and bullet lists |
| **Contact info** | Email, phone, address, hours, social links |
| **Company** | Name, tagline, description |

Data is stored in `data/mza.db` (gitignored). Back up this file regularly.

## Environment variables

Copy [`.env.example`](.env.example) to `.env`:

| Variable | Purpose |
|----------|---------|
| `PORT` | API port (default `3001`) |
| `DATABASE_PATH` | SQLite file path |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Admin login |
| `SESSION_SECRET` | JWT signing secret |
| `CORS_ORIGIN` | Frontend URL for dev (default `http://localhost:5173`) |

## Production deploy

1. Set strong `ADMIN_PASSWORD` and `SESSION_SECRET` in `.env`
2. `npm run build`
3. `npm run start` (serves both API and static site on `PORT`)
4. Point your domain to this server (not static-only hosting unless API runs elsewhere)

For **split hosting** (e.g. static CDN + API server), set `VITE_API_URL` to your API URL at build time and deploy `dist/` separately.

## Initial data (seed)

On first API start, if the database is empty, content is imported from:

- `public/content/services.json`
- `public/content/plans.json`
- `public/content/company.json`
- `public/content/contact.json`

You can edit everything afterward in the admin UI.

## Project structure

```
server/           ← Express API + SQLite
data/mza.db       ← Database (created automatically)
public/content/   ← Seed JSON (reference / first import)
src/
  admin/          ← Admin UI
  components/     ← Public site components
  context/        ← Loads content from API
  pages/          ← Public routes
```

## Contact form

Submissions are saved to SQLite and appear in **Admin → Submissions**. No third-party form service is required.
