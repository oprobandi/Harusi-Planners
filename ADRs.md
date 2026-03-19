# Architecture Decision Records (ADRs)

Lightweight ADRs for **Harusi Planners**.
Format: [MADR](https://adr.github.io/madr/).

---

## ADR-001 · Vite + React over Next.js or CRA
**Date:** 2026-03-19 · **Status:** Accepted

SPA with Vite chosen over Next.js (SSR overhead unjustified for a marketing site)
and CRA (deprecated). Static `dist/` deploys to any CDN. SPA fallback rules
included in `public/_redirects` (Netlify) and `vercel.json` (Vercel).

**Upgrade trigger:** If Google Search Console reports crawl issues with
JS-rendered meta tags, migrate to Next.js App Router.

---

## ADR-002 · Tailwind CSS v3 with Custom Config
**Date:** 2026-03-19 · **Status:** Accepted

Full brand token palette (`plum`, `rose`, `blush`, `gold`, `ivory`, `sage`)
registered in `tailwind.config.js`. Fixes the original prototype bug where
`bg-ivory`, `text-blush` etc. silently failed against the CDN script.
All tokens support Tailwind opacity modifiers (`bg-rose/10`, `text-plum/60`).

---

## ADR-003 · React Router v6
**Date:** 2026-03-19 · **Status:** Accepted

`<BrowserRouter>` + `<Routes>`. `<NavLink>` used for active state.
`useNavigate` for programmatic scroll-to-quiz. Wildcard `*` route added
in V1.2 for 404 handling. Both `_redirects` and `vercel.json` ensure
SPA fallback on hosting.

---

## ADR-004 · Local Component State for Quiz
**Date:** 2026-03-19 · **Status:** Accepted

All quiz state in `useState` inside `Quiz.jsx`. No global state needed —
quiz is self-contained. V1.2 adds `localStorage` persistence so state
survives refresh. If quiz results need to feed a couple dashboard (V1.3+),
promote to Zustand store at that point.

---

## ADR-005 · Data Layer: src/data/*.js Files
**Date:** 2026-03-19 (introduced V1.1) · **Status:** Accepted — revisit V1.3

All content in `src/data/packages.js`, `vendors.js`, `weddings.js`, `quiz.js`.
Zero-dependency deployment; single edit point per data type.

**Migration path (V1.3):** Replace exports with `fetch()` + `useSWR` calls
against Sanity or Supabase. Consuming component import shapes won't change
if loading/error states are handled at the data layer.

**Recommended CMS:** Sanity — optimal image pipeline, GROQ queries,
non-technical Studio UI, generous free tier.

---

## ADR-006 · No Authentication in V1.x
**Date:** 2026-03-19 · **Status:** Accepted — defer to V1.3

Auth adds significant complexity. V1.x is a conversion marketing site;
primary CTA is WhatsApp. Couple dashboard and vendor portal both require
auth and are scoped to V1.3.

**Recommended stack:** Supabase Auth with magic links. Appropriate for
East African market where email-first flows outperform social auth.
Row-level security on Supabase DB for vendor data isolation.

---

## ADR-007 · Accessibility Baseline (WCAG 2.1 Level A)
**Date:** 2026-03-19 · **Status:** Accepted (Level AA gaps in TODO)

**Implemented V1.0–V1.2:**
- `alt` on all images; `aria-label` on icon-only buttons
- `aria-expanded` on accordion + hamburger; `aria-pressed` on quiz options
- `aria-checked` on BudgetEstimator toggle
- `role="alert"` on form errors; `aria-hidden` on decorative elements
- `role="progressbar"` on quiz progress; `aria-valuenow/min/max`
- `role="tablist"` + `aria-selected` on carousel dots
- `role="navigation"` + `aria-current="page"` on vendor pagination
- `role="status"` + `aria-label` on Suspense page loader
- Semantic HTML throughout; form `<label>` linked via `htmlFor/id`

**Known Level AA gaps (TODO.md):**
- Focus trap not implemented in mobile nav drawer
- `aria-live` missing from quiz step transitions
- Color contrast of opacity-reduced text not formally audited
- `prefers-reduced-motion` not applied to carousel or animations

---

## ADR-008 · Pricing Strategy: Market-Rate Alignment
**Date:** 2026-03-19 (V1.1) · **Status:** Accepted

All three original packages were underpriced vs. the 5–15% of total budget
industry benchmark (source: harusihub.com/blog, ccentricevents.co.ke,
janatribe.com).

**Key decisions:**
1. Reprice all tiers upward (Ndogo +22%, Kati +46%, Kubwa +52%)
2. Add Asili tier — cultural/traditional weddings; unaddressed by competitors
3. Add Safari & Shores tier — destination scope requires separate packaging
4. Add BudgetEstimator — transparency as a trust and conversion mechanism
5. "From KSh 450,000" on Safari & Shores is intentional — variable scope
   creates natural consultation funnel via WhatsApp

**Kubwa rationale:** Couples spending KSh 3–5M trust a planner who charges
KSh 380,000 more than one who charges KSh 250,000. Underpricing actively
damages conversion at the luxury tier.

---

## ADR-009 · SEO: react-helmet-async for Per-Page Meta
**Date:** 2026-03-19 (V1.1) · **Status:** Accepted

`react-helmet` is unmaintained and unsafe with React 18 concurrent rendering.
`react-helmet-async` is the maintained successor. Each route mounts `<SEOHead>`
with its own title, description, canonical URL, OG, and Twitter Card.

**Limitation:** Meta injected by JS — older crawlers may miss it.
**Mitigation (V1.3):** Add pre-rendering or migrate to Next.js if Search
Console reports crawl issues.

---

## ADR-010 · Code Splitting: React.lazy() + Suspense
**Date:** 2026-03-19 (V1.2) · **Status:** Accepted

**Context:** As of V1.1, all four pages were eagerly imported in `App.jsx`,
bundled into a single JS chunk. As pages grow (vendor profiles, blog, etc.)
this becomes a meaningful performance regression.

**Decision:** Convert all page imports to `React.lazy()`. Wrap `<Routes>`
in `<Suspense fallback={<PageLoader />}>`.

**Rationale:**
- Each route becomes a separate Vite chunk, loaded only when visited
- Reduces initial bundle from ~all-pages to ~shared-components + current-page
- `PageLoader` shows a branded `Harusi.` pulse — graceful UX during chunk fetch
- Zero API change — all route components are unchanged

**Consequences:**
- First visit to any non-home route incurs a small chunk fetch (~50–200ms on 4G)
- Acceptable trade-off vs. larger upfront bundle
- If chunk fetch fails (offline), React will throw — add an `ErrorBoundary`
  wrapper in V1.3 for a graceful offline message

---

## ADR-011 · Testimonials: Pure React Carousel, No External Library
**Date:** 2026-03-19 (V1.2) · **Status:** Accepted

**Context:** Static 2-up testimonials grid replaced with a carousel.
Options considered: Embla Carousel, Swiper.js, Keen Slider, pure React.

**Decision:** Pure React with CSS transitions.

**Rationale:**
| Option | Bundle addition | SSR safe | Customisation |
|--------|----------------|----------|---------------|
| Embla  | ~7KB           | Yes      | High          |
| Swiper | ~30KB          | Partial  | Very high     |
| Pure React | 0KB       | Yes      | Full          |

The carousel has one slide type, one transition style, and dots + arrows.
Swiper/Embla are justified when you need touch momentum, complex slide types,
or parallax. For this use case, 0KB overhead with full control wins.

**Touch support:** Pause on `onTouchStart` / resume on `onTouchEnd`.
Full swipe gesture (drag-to-advance) deferred to V1.3 if user research
indicates it's needed.

**Upgrade path:** If swipe gestures or complex slide layouts are required,
replace with Embla Carousel — it's the lightest option and has a clean
React hook API.

---

## ADR-012 · Vendor Pagination: Client-Side, 12 per Page
**Date:** 2026-03-19 (V1.2) · **Status:** Accepted

**Context:** All vendors rendered in a single grid — fine at 12, problematic
at 50+.

**Decision:** Client-side pagination, 12 items per page (`ITEMS_PER_PAGE`
constant in `Vendors.jsx`).

**Rationale:**
- All vendor data is already in memory (src/data/vendors.js)
- Server-side pagination only adds value when fetching from an API
- `useMemo` on the filter ensures re-calculation only on dependency change
- `ITEMS_PER_PAGE` is a named constant — trivially adjustable

**Consequences:**
- Full vendor array still loaded on page visit (fine at current scale)
- When vendor count exceeds ~100, migrate to API + server-side pagination
  (V1.3 CMS migration will address this — see ADR-005)
- Scroll-to-top on page change prevents disorientation on mobile
