# Harusi Planners · v1.4

> East Africa's most trusted wedding planning platform.

---

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

---

## Project Structure

```
harusi-planners/
├── public/
│   ├── _redirects        # Netlify SPA fallback
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── data/
│   │   ├── packages.js   # 5 pricing tiers, add-ons, FAQs
│   │   ├── vendors.js    # Vendor listings + profile data
│   │   ├── weddings.js   # Real weddings gallery
│   │   └── quiz.js       # Quiz steps + recommendation engine
│   ├── utils/
│   │   └── constants.js  # WhatsApp number, site URL, market rates
│   ├── components/
│   │   ├── quiz/
│   │   │   └── Quiz.jsx              # 5-step quiz + email capture + localStorage
│   │   ├── BudgetEstimator.jsx       # Interactive cost calculator
│   │   ├── VendorModal.jsx           # Vendor profile bottom-sheet
│   │   ├── SEOHead.jsx               # Per-page meta via react-helmet-async
│   │   ├── TestimonialsCarousel.jsx  # Auto-advancing carousel, pure React
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── WhatsAppFloat.jsx
│   ├── pages/
│   │   ├── Home.jsx        /             (carousel testimonials)
│   │   ├── Vendors.jsx     /vendors      (pagination, 12/page)
│   │   ├── Pricing.jsx     /pricing
│   │   ├── Inspiration.jsx /inspiration
│   │   └── NotFound.jsx    *             (branded 404)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
├── vercel.json
├── CHANGELOG.md
├── TODO.md
└── ADRs.md
```

---

## Design Tokens

| Token   | Hex       | Usage |
|---------|-----------|-------|
| `plum`  | `#4A0E2E` | Primary text, hero backgrounds |
| `rose`  | `#A0266A` | CTAs, accents, links |
| `blush` | `#F4A7B9` | Soft borders, decorative, quiz hover |
| `gold`  | `#C9A84C` | Premium accents, shimmer, stars |
| `ivory` | `#F5F0E8` | Page background |
| `sage`  | `#2D4739` | Vendor CTA strip |

All tokens available as Tailwind utilities with opacity modifiers:
`bg-rose/10`, `text-plum/60`, `border-gold/30` etc.

---

## Pricing Packages (V1.1)

| Package          | Price          | Guests       |
|-----------------|----------------|-------------|
| Ndogo           | KSh 55,000     | Up to 50    |
| Asili           | KSh 90,000     | Up to 200   |
| Kati ⭐         | KSh 175,000    | Up to 250   |
| Kubwa           | KSh 380,000    | Unlimited   |
| Safari & Shores | From KSh 450,000 | Any / Multi-day |

All prices exclude 16% VAT. Based on 2026 Kenya market rates.

---

## Environment Variables

Create `.env` at project root (not committed):

```env
VITE_WHATSAPP_NUMBER=254799644100
```

---

## Deployment

### Netlify
Build command: `npm run build` · Publish directory: `dist`
The `public/_redirects` file handles SPA routing automatically.

### Vercel
`vercel.json` at project root handles SPA routing rewrites.

### Cloudflare Pages
Build command: `npm run build` · Output directory: `dist`
Add a redirect rule: `/* → /index.html` (200 rewrite).

---

## Mailchimp Setup Guide

Newsletter subscriptions and quiz email captures both POST to `/api/subscribe`,
which is a Vercel serverless function that proxies to Mailchimp server-side.

### Step 1 — Get your Mailchimp credentials

1. Log in at [mailchimp.com](https://mailchimp.com)
2. **API Key:** Account → Extras → API Keys → Create A Key
   - Looks like: `abc123...xyz-us21`
   - The part after the last `-` is your **server prefix** (e.g. `us21`)
3. **List/Audience ID:** Audience → Manage Audiences → Settings → Audience name & defaults
   - Looks like: `a1b2c3d4e5`

### Step 2 — Add to Vercel environment variables

In the Vercel dashboard: **Project → Settings → Environment Variables**

Add all three — set scope to **Production + Preview + Development**:

| Variable | Value |
|---|---|
| `MAILCHIMP_API_KEY` | Your full API key |
| `MAILCHIMP_LIST_ID` | Your Audience ID |
| `MAILCHIMP_SERVER_PREFIX` | e.g. `us21` |

Then **redeploy** (Vercel dashboard → Deployments → Redeploy, or push a commit).

### Step 3 — Test it

Subscribe with a real email on your live site. Then in Mailchimp:
- Audience → All Contacts — your subscriber should appear with tags:
  - `newsletter` + `website` (from footer form)
  - `quiz-lead` + `website` (from quiz email capture)

### Step 4 — Local development

Create `.env` at the project root (copied from `.env.example`) and fill in
the three Mailchimp values. The serverless function will use them via `process.env`.

```bash
cp .env.example .env
# Edit .env with your real values
npm run dev
```


---

## Logo Swap Guide

When your designer delivers the logo, follow these steps:

### 1. Add the logo file
Place your SVG logo at:
```
public/logo.svg          ← main logo (plum on transparent)
public/logo-white.svg    ← inverted version (white on transparent, for dark backgrounds)
public/logo-mark.svg     ← icon/monogram only (for favicon, small contexts)
```

### 2. Update the Navbar wordmark
In `src/components/Navbar.jsx`, replace the two-span wordmark block:
```jsx
// BEFORE — text wordmark
<span className="text-2xl font-serif ...">Harusi</span>
<span className="text-[11px] ...">Planners</span>

// AFTER — SVG logo
<img
  src="/logo.svg"
  alt="Harusi Planners"
  className="h-8 w-auto"
/>
```

### 3. Update the Footer
In `src/components/Footer.jsx`, replace the text brand block with:
```jsx
<img src="/logo-white.svg" alt="Harusi Planners" className="h-7 w-auto mb-6" />
```

### 4. Update the favicon
Replace `public/favicon.ico` (or add `favicon.svg`) and update `index.html`:
```html
<link rel="icon" type="image/svg+xml" href="/logo-mark.svg" />
```

### 5. Commit
```bash
git add public/ src/components/Navbar.jsx src/components/Footer.jsx index.html
git commit -m "brand: add Harusi Planners logo (replace text wordmark)"
git push
```


---

## Key Docs

- [`CHANGELOG.md`](./CHANGELOG.md) — Full history of changes and bug fixes
- [`TODO.md`](./TODO.md) — Prioritised backlog (V1.2+)
- [`ADRs.md`](./ADRs.md) — Architecture decisions and rationale
