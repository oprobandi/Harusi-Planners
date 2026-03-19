# Architecture Decision Records (ADRs)

Lightweight ADRs for **Harusi Planners v1.0**.
Format: [MADR](https://adr.github.io/madr/) — minimal, markdown-based.

---

## ADR-001 · Vite + React over Next.js or CRA

**Date:** 2026-03-19
**Status:** Accepted

### Context
Three React scaffolding options were considered: Create React App (CRA), Vite + React, and Next.js.

### Decision
Use **Vite + React** (SPA, client-side only).

### Rationale
| Factor | CRA | Vite | Next.js |
|---|---|---|---|
| Build speed | Slow (Webpack) | Fast (ESBuild) | Medium |
| Bundle size | Large baseline | Lean | Larger (SSR runtime) |
| SSR / SEO | ✕ | ✕ | ✓ |
| Complexity | Low | Low | Medium–High |
| Deployment target | Any static host | Any static host | Needs Node or edge |

The v1.0 product is a **marketing landing site** with no server-rendered SEO requirements beyond meta tags. Next.js SSR overhead is unjustified at this stage. CRA is effectively deprecated upstream. Vite gives the fastest DX and smallest output.

### Consequences
- Static output (`dist/`) deploys to Netlify, Vercel, Cloudflare Pages, or any CDN with zero config
- If SEO becomes critical (blog, vendor pages indexed by Google), migrate to Next.js App Router or add a pre-rendering step (e.g. `vite-plugin-ssr`)
- No server-side data fetching — all data loads client-side

---

## ADR-002 · Tailwind CSS v3 with Custom Config over Inline CSS or CSS Modules

**Date:** 2026-03-19
**Status:** Accepted

### Context
The original prototype used the Tailwind CDN script with custom CSS variables alongside standard Tailwind classes. This caused the custom color tokens (`bg-ivory`, `text-blush`, etc.) to silently fail because they were not registered in a Tailwind config.

### Decision
Use **Tailwind CSS v3** installed as a PostCSS plugin, with all brand tokens defined in `tailwind.config.js` under `theme.extend.colors`.

### Rationale
- Resolves the silent class failure bug from the prototype
- All brand colours (`plum`, `rose`, `blush`, `gold`, `ivory`, `sage`) become first-class Tailwind utilities with full opacity modifier support (`bg-plum/10`, `text-rose/60`, etc.)
- PostCSS pipeline enables tree-shaking — only used utility classes are emitted into the final CSS bundle
- Design tokens live in one file; changing a hex value propagates everywhere

### Consequences
- Developers must run `npm install` before classes resolve (no CDN fallback)
- Adding new brand colours requires editing `tailwind.config.js`; arbitrary values (`bg-[#hex]`) should be avoided in favour of named tokens

---

## ADR-003 · React Router v6 for Client-Side Routing

**Date:** 2026-03-19
**Status:** Accepted

### Context
Four pages needed to be broken into separate routes: Home, Vendors & Venues, Pricing, Real Weddings.

### Decision
Use **React Router DOM v6** with `<BrowserRouter>` and `<Routes>` / `<Route>` declarations in `App.jsx`.

### Rationale
- Industry-standard, well-documented, zero-config with Vite
- v6 `<NavLink>` provides built-in `isActive` class injection — used for nav highlighting
- Declarative route tree is easy to extend (add `/vendors/:slug`, `/blog/:post`, etc.)
- `useNavigate` used in Navbar for programmatic scroll-to-quiz behaviour

### Consequences
- Hosting provider must be configured to serve `index.html` for all routes (SPA fallback). On Netlify, add a `_redirects` file: `/* /index.html 200`. On Vercel, add `vercel.json` with rewrites. See `TODO.md`.
- Direct URL navigation (`/vendors`) requires this SPA fallback rule — without it, users get a 404 from the CDN

---

## ADR-004 · Quiz State Managed in Component Local State (not Context or Zustand)

**Date:** 2026-03-19
**Status:** Accepted

### Context
The 5-step quiz needs to track: current step index, per-step answers, and the selected option within the current step.

### Decision
Manage all quiz state with **`useState` hooks local to `Quiz.jsx`** — no global state (Context, Zustand, Redux).

### Rationale
- The quiz is self-contained; no other component needs to read its state
- Local state keeps the component portable and independently testable
- Adding global state at this stage would be premature complexity
- If quiz answers need to persist (e.g. pre-fill a CRM form, survive navigation), the upgrade path is: `localStorage` serialisation (1 line) → Zustand store (if shared)

### Consequences
- Navigating away from the Home page resets the quiz; this is acceptable for v1.0
- See `TODO.md` for `localStorage` persistence as a planned enhancement

---

## ADR-005 · Hardcoded Mock Data in Page Components

**Date:** 2026-03-19
**Status:** Accepted (to be revisited in v1.1)

### Context
Vendor listings, wedding stories, packages, and quiz options are static arrays defined at the top of each page component. No CMS or API exists yet.

### Decision
Keep mock data **co-located with the page component** that uses it for v1.0.

### Rationale
- Enables zero-dependency deployment — no API keys, no CMS setup required to get the site live
- Speeds up v1.0 delivery significantly
- Data is scoped to a single consumer; no cross-page sharing exists yet

### Consequences
- Content updates require a code deploy — not suitable for a non-technical content team
- As the vendor count grows, the bundle size will grow with it
- **Migration path (v1.1+):** Extract arrays to `src/data/*.js` files → replace with `fetch()` calls against a Headless CMS (Sanity recommended for its image pipeline) or Supabase table

---

## ADR-006 · No Authentication in v1.0

**Date:** 2026-03-19
**Status:** Accepted

### Context
The product vision includes a couple dashboard and a vendor portal. Both require authenticated sessions.

### Decision
**Defer all authentication** to v1.1.

### Rationale
- Auth adds significant complexity (token management, protected routes, refresh logic, session storage)
- v1.0 goal is a conversion-focused marketing site — the primary CTA is WhatsApp contact, not account creation
- Premature auth scaffolding would slow delivery without user-facing value

### Consequences
- Vendor "View Profile" links are non-functional placeholders in v1.0
- Email submitted via quiz is captured client-side only (`alert()` confirmation) — must be wired to an email provider before launch (see `TODO.md`)

### Recommended Auth Stack (when ready)
[Supabase Auth](https://supabase.com/docs/guides/auth) — free tier, supports magic links (appropriate for East African market where email-first flows work better than social auth), row-level security for vendor data.

---

## ADR-007 · Accessibility Baseline

**Date:** 2026-03-19
**Status:** Accepted (partial — to be hardened in v1.1)

### Context
The original prototype had zero accessibility considerations: no `alt` text, no ARIA labels, no keyboard navigation.

### Decision
Implement a **WCAG 2.1 Level A baseline** in v1.0 and document gaps for Level AA in `TODO.md`.

### What was implemented
- `alt` attributes on all images (descriptive, not empty)
- `aria-label` on icon-only buttons (hamburger, WhatsApp float, social links)
- `aria-expanded` on hamburger toggle and FAQ accordion buttons
- `aria-pressed` on quiz option buttons
- `role="alert"` on form error messages
- `aria-hidden="true"` on decorative SVGs and emoji
- Semantic HTML (`<nav>`, `<main>`, `<footer>`, `<section>`, heading hierarchy)
- Form `<label>` elements linked to inputs via `htmlFor` / `id`

### Known gaps (Level AA — see TODO.md)
- Focus trap not implemented in mobile nav drawer
- `aria-live` region missing from quiz step transitions
- Color contrast of opacity-reduced text variants not formally audited
- `prefers-reduced-motion` media query not yet applied to animations
