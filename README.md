# MZA Solutions — IT Services Website

Mobile-first marketing site for **MZA Solutions**, built with Vite, React, TypeScript, and Tailwind CSS.

## Features

- **Home**, **Services**, **Plans**, and **Contact** pages
- **External JSON content** — edit services, plans, and company info without changing React code
- **Quote-style plans** — no fixed prices; “Get a quote” links to contact with service prefill
- **Contact form** via [Formspree](https://formspree.io)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Edit content (no rebuild needed after deploy)

Update these files in `public/content/`:

| File | Contents |
|------|----------|
| `services.json` | Service list |
| `plans.json` | Plans / offerings |
| `company.json` | Company name, tagline, and about text |
| `contact.json` | Direct contact details — email, phone, address, hours, social links |

After deploying, you can replace these JSON files on the server and hard-refresh the browser to see changes.

### Add a service

In `public/content/services.json`, add an object to the `services` array:

```json
{
  "id": "unique-id",
  "name": "Service Name",
  "description": "Short description shown on the card.",
  "icon": "layout",
  "featured": true
}
```

**Icon values:** `layout`, `video`, `palette`, `code`, `shield`, `chart`

Set `featured: true` to show the service on the homepage (up to 4 featured services display well).

### Add a plan

In `public/content/plans.json`, add to the `plans` array:

```json
{
  "id": "plan-id",
  "name": "Plan Name",
  "tagline": "One-line summary",
  "relatedServiceId": "web-design",
  "includes": ["Feature one", "Feature two"],
  "idealFor": "Who this plan is best for"
}
```

`relatedServiceId` must match a service `id` from `services.json` so “Get a quote” pre-fills the contact form.

### Update contact details

Edit `public/content/contact.json`:

```json
{
  "email": "hello@mzasolutions.com",
  "phone": "+1 (555) 000-0000",
  "address": "Your City, Your Country",
  "hours": "Mon–Fri, 9:00 AM – 6:00 PM",
  "social": {
    "linkedin": "https://linkedin.com/company/mza-solutions",
    "instagram": "https://instagram.com/mzasolutions",
    "facebook": "https://facebook.com/mzasolutions"
  }
}
```

Changes appear in the footer and on the Contact page “Direct contact” section.

## Contact form setup

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID
3. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

4. Set your form ID:

   ```
   VITE_FORMSPREE_FORM_ID=your_actual_form_id
   ```

5. Restart the dev server (`npm run dev`)

## Build & deploy

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to **Vercel**, **Netlify**, or any static host. Set `VITE_FORMSPREE_FORM_ID` as an environment variable in your hosting dashboard for production builds.

## Project structure

```
public/content/     ← Edit services, plans, company JSON here
src/
  components/       ← UI components
  context/          ← Loads JSON at runtime
  pages/            ← Route pages
  types/            ← TypeScript types for JSON shape
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
