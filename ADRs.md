# Architecture Decision Records (ADRs)

Lightweight ADRs for **Harusi Planners**.
Format: [MADR](https://adr.github.io/madr/) — minimal, markdown-based.

---

## ADR-001 · Vite + React over Next.js or CRA

**Date:** 2026-03-19 · **Status:** Accepted

### Context
Three React scaffolding options were considered: CRA, Vite + React, and Next.js.

### Decision
Use **Vite + React** (SPA, client-side only).

### Rationale
| Factor | CRA | Vite | Next.js |
|---|---|---|---|
| Build speed | Slow (Webpack) | Fast (ESBuild) | Medium |
| Bundle size | Large baseline | Lean | Larger (SSR runtime) |
| SSR / SEO | ✕ | ✕ | ✓ |
| Complexity | Low | Low | Medium–High |
| Deployment | Any static host | Any static host | Needs Node or edge |

The v1.x product is a marketing site. Next.js SSR overhead is unjustified. CRA is deprecated.

### Consequences
- Static `dist/` deploys to Netlify, Vercel, Cloudflare Pages with zero config
- All routes require a SPA fallback rule (`_redirects` / `vercel.json`)
- If SEO becomes critical (blog, vendor pages indexed), consider migrating to Next.js App Router

---

## ADR-002 · Tailwind CSS v3 with Custom Config

**Date:** 2026-03-19 · **Status:** Accepted

### Decision
Tailwind CSS v3 as a PostCSS plugin with all brand tokens in `tailwind.config.js`.

### Rationale
Fixes the silent class failure bug from the prototype where `bg-ivory`, `text-blush` etc. used CSS variables that were never registered in Tailwind's config. All six brand tokens (`plum`, `rose`, `blush`, `gold`, `ivory`, `sage`) are now first-class Tailwind utilities with full opacity modifier support.

---

## ADR-003 · React Router v6

**Date:** 2026-03-19 · **Status:** Accepted

### Decision
React Router DOM v6 with `<BrowserRouter>` and `<Routes>`.

### Consequences
- Hosting must serve `index.html` for all routes. Netlify: `_redirects` file. Vercel: `vercel.json` rewrites. Both included in `/public/`.

---

## ADR-004 · Local Component State for Quiz (not Zustand/Context)

**Date:** 2026-03-19 · **Status:** Accepted

### Decision
All quiz state (`step`, `answers`, `selected`) managed with `useState` inside `Quiz.jsx`.

### Rationale
Quiz is self-contained. No other component reads quiz state. Global state would be premature.

### Upgrade Path
If quiz results need to survive navigation: `localStorage.setItem('harusi-quiz', JSON.stringify(answers))` — one line. If quiz feeds a couple dashboard (V1.2+): promote to Zustand store.

---

## ADR-005 · Data Layer: `src/data/*.js` Files (not CMS, not inline)

**Date:** 2026-03-19 (revised V1.1) · **Status:** Accepted — to be revisited in V1.2

### Context
V1.0 hardcoded all data inside page components. V1.1 extracts them to `src/data/` files.

### Decision
Data lives in `src/data/packages.js`, `src/data/vendors.js`, `src/data/weddings.js`, `src/data/quiz.js`.

### Rationale
- Zero-dependency deployment — no API keys or CMS setup required to run locally or deploy
- Data is now separated from presentation — page components import data, not own it
- Single edit point per data type

### Consequences
- Content updates still require a code deploy
- **Migration path (V1.2):** Replace data file exports with `fetch()` calls against Sanity or Supabase. The import shape in consuming components won't change if a loading/error state pattern is introduced at the data layer.

### Recommended CMS (when ready)
**Sanity** — optimal for image-heavy content (vendor photos, wedding galleries), GROQ query language is expressive, generous free tier, and has a React Studio UI that non-technical staff can use.

---

## ADR-006 · No Authentication in V1.x

**Date:** 2026-03-19 · **Status:** Accepted

### Decision
Defer all authentication to V1.2.

### Rationale
Auth adds significant complexity (token management, protected routes, session storage). V1.x goal is a conversion-focused marketing site — primary CTA is WhatsApp contact, not account creation.

### Recommended Auth Stack (V1.2)
**Supabase Auth** — free tier, magic link support (appropriate for East African market where email-first flows outperform social auth), row-level security for vendor data, integrates cleanly with Supabase DB for the vendor portal.

---

## ADR-007 · Accessibility Baseline (WCAG 2.1 Level A)

**Date:** 2026-03-19 · **Status:** Accepted (partial — Level AA gaps documented in TODO)

### What was implemented (V1.0–V1.1)
- `alt` on all images, `aria-label` on icon-only buttons, `aria-expanded` on accordions and hamburger
- `aria-pressed` on quiz option buttons, `aria-checked` on BudgetEstimator toggle
- `role="alert"` on form errors, `aria-hidden` on decorative elements
- Semantic HTML throughout (`<nav>`, `<main>`, `<footer>`, heading hierarchy)
- Form `<label>` linked to inputs via `htmlFor/id`

### Known Level AA gaps (see TODO.md)
- Focus trap not implemented in mobile nav drawer
- `aria-live` region missing from quiz step transitions
- Color contrast of opacity-reduced text not formally audited
- `prefers-reduced-motion` not yet applied to animations

---

## ADR-008 · Pricing Strategy: Market-Rate Alignment

**Date:** 2026-03-19 (V1.1) · **Status:** Accepted

### Context
V1.0 pricing was derived from the original prototype without market validation. After analysis of 2026 Kenya wedding market data (harusihub.com/blog, ccentricevents.co.ke, janatribe.com), all three original packages were found to be underpriced relative to industry benchmarks of 5–15% of total wedding budget.

### Decision
1. **Reprice all three original tiers** upward (Ndogo +22%, Kati +46%, Kubwa +52%)
2. **Add Asili tier** (KSh 90,000) for the cultural/traditional wedding market — a gap explicitly unaddressed by competitors
3. **Add Safari & Shores tier** (from KSh 450,000) for destination weddings — distinct scope requiring separate packaging
4. **Add Budget Estimator** — interactive tool showing couples the full picture of wedding costs, positioning Harusi as transparent and trustworthy rather than just a vendor

### Rationale for Kubwa Correction
A couple spending KSh 3–5M on their wedding will have greater trust in a planner who charges KSh 380,000 than one who charges KSh 250,000. Price signals quality at the luxury tier. Underpricing actively undermines conversion with high-budget clients.

### Consequences
- Existing clients quoted under V1.0 pricing must be honoured at the V1.0 rate for 90 days post-launch
- Package descriptions updated to clearly state "starting price" and "excl. 16% VAT" to prevent anchor-price confusion
- The "from KSh 450,000" phrasing on Safari & Shores is intentional — destination scope is too variable for a flat rate

---

## ADR-009 · SEO: react-helmet-async over Static Meta Tags

**Date:** 2026-03-19 (V1.1) · **Status:** Accepted

### Context
V1.0 placed all meta tags statically in `index.html`. All four routes served identical `<title>` and `<meta description>` tags — a significant SEO regression from a multi-page experience.

### Decision
Use `react-helmet-async` with a `<SEOHead>` component that each page mounts with its own title, description, canonical URL, Open Graph, and Twitter Card data.

### Rationale
`react-helmet-async` is the maintained successor to `react-helmet`. It is safe with React 18's concurrent rendering, unlike its predecessor. Alternative (`@vite-plugin-html`) would require SSR or pre-rendering to be effective.

### Consequences
- Meta tags are injected by JavaScript — bots that don't execute JS (older Googlebot crawls) may miss them
- **V1.2 mitigation:** Add `vite-plugin-ssr` pre-rendering or migrate to Next.js if Google Search Console reports crawl issues
