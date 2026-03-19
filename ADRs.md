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

---

## ADR-013 · Icon Library: Lucide React over Heroicons or Phosphor

**Date:** 2026-03-19 (V1.3) · **Status:** Accepted

### Context
The project used Unicode characters (`★☆✓✕+`) and emoji for icons throughout.
This created inconsistency, poor accessibility, and limited styling control.

### Decision
Use **Lucide React** (`^0.383.0`) as the sole icon library.

### Rationale
| Factor | Lucide React | Heroicons | Phosphor |
|---|---|---|---|
| Style | Thin line, 2px stroke | Similar to Lucide | More expressive, variable weight |
| Bundle | Tree-shaken per import | Tree-shaken | Tree-shaken |
| Aesthetic fit | ✓ Matches Harusi's refined, minimal design | ✓ Similar | Slightly too playful |
| React API | `<Icon size={n} />` | `<Icon className />` | `<Icon size={n} weight />` |
| TikTok icon | ✕ Not in library | ✕ | ✕ |

Lucide's thin 2px stroke weight matches the Cormorant Garamond + DM Sans typography
pairing — both are refined and unobtrusive. The React API (`size`, `className`, 
`strokeWidth`) integrates cleanly with Tailwind.

**TikTok exception:** No mainstream icon library includes TikTok due to trademark
restrictions. A minimal custom inline SVG matching Lucide's stroke style is used
in Footer.jsx as `TikTokIcon`.

### Consequences
- All Unicode icon characters replaced with accessible Lucide components
- `aria-hidden="true"` on all decorative icons; `aria-label` on semantic ones
- `fill` prop used for Star component (filled vs outline based on rating value)
- If Lucide releases a breaking change, all icons are in a small number of files
  and easy to update in bulk

---

## ADR-014 · Navbar Wordmark: Two-Weight Typography over SVG Logo

**Date:** 2026-03-19 (V1.3) · **Status:** Accepted — superseded when logo delivered

### Context
V1.0–V1.2 used `"Harusi."` (single word, period) in the navbar. This was
the prototype's style and did not fully represent the brand name.

### Decision
Use a two-weight CSS wordmark: italic serif **"Harusi"** + small-caps sans
**"Planners"** in rose/80. This is a transitional solution until the designed
logo SVG is delivered.

### Rationale
- Communicates the full brand name ("Harusi Planners" not just "Harusi")
- Uses the existing type system — no new assets required
- The contrast between serif italic and sans-serif creates visual hierarchy
- Easy to swap: the Logo Swap Guide in README.md has exact code replacement steps

### Consequences
- When logo SVG is delivered, the two-span block in Navbar.jsx and Footer.jsx
  is replaced with `<img>` tags — a 5-minute change per the README guide
- The period in "Harusi." was a deliberate design choice in the prototype;
  removing it was intentional — the full brand name is more appropriate for
  a customer-facing nav

---

## ADR-015 · Email Capture: Vercel Serverless Function over Direct Mailchimp Call

**Date:** 2026-03-19 (V1.4) · **Status:** Accepted

### Context
Mailchimp's Marketing API requires an API key for authentication. Two integration
patterns were considered:

1. **Direct browser call** — React POSTs to Mailchimp API from the client
2. **Serverless proxy** — React POSTs to `/api/subscribe`, which calls Mailchimp server-side

### Decision
Use a **Vercel Serverless Function** at `api/subscribe.js`.

### Rationale
| Factor | Direct browser call | Serverless proxy |
|---|---|---|
| API key exposure | ✕ Visible in browser network tab | ✓ Server-side only |
| CORS | ✕ Mailchimp blocks browser CORS | ✓ Server-to-server, no CORS |
| Rate limiting | Per-user IP | Controlled server-side |
| Flexibility | Locked to Mailchimp | Can swap provider without frontend changes |

The API key in the browser bundle is a security violation — anyone could extract it
and use it to read your subscriber list, delete contacts, or send campaigns.

### Consequences
- Three Mailchimp env vars must be added to Vercel dashboard before the feature
  works in production (`MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `MAILCHIMP_SERVER_PREFIX`)
- Local development requires `.env` file (documented in README)
- If switching from Mailchimp to another provider (ConvertKit, Brevo, etc.),
  only `api/subscribe.js` needs to change — frontend forms are unchanged
- Vercel function logs available at: Vercel dashboard → Project → Functions → subscribe

### Tag Strategy
Subscribers are tagged by source for audience segmentation:
- `newsletter` + `website` — opted in via footer form (passive interest)
- `quiz-lead` + `website` — completed the quiz (high-intent lead)

This allows Mailchimp automations to treat quiz leads differently
(e.g. send vendor shortlist email) vs. newsletter subscribers (send weekly inspiration).

---

## ADR-016 · Vendor Profile Pages: Dedicated Route over Modal Expansion

**Date:** 2026-03-19 (V1.6) · **Status:** Accepted

### Context
V1.1–V1.5 used a `VendorModal` bottom-sheet for vendor details. This had three problems:
1. No unique URL — unshareable, not indexable by Google
2. Limited space — couldn't fit full bio, gallery, and service pricing comfortably
3. Poor mobile UX — modal scroll inside full-screen modal is awkward

### Decision
Replace modal with **dedicated route** `/vendors/:slug` + `VendorProfile.jsx` page.

### Rationale
- Every vendor now has a unique, shareable URL
- Each page has its own `SEOHead` — Google can index 12 vendor profiles independently
- Full layout: hero image, lightbox gallery, long bio, service packages, sticky sidebar
- Mobile sticky CTA bar solves the "CTA out of view" problem on small screens
- `VendorModal` retained only in `Vendors.jsx` context — removed from Home entirely

### Consequences
- `VendorModal` component kept in codebase for potential future use (quick-preview use case)
- Vendor data required enrichment: `slug`, `longBio`, `services`, `gallery`, `social`, `founded`
- Sitemap updated with all 12 vendor URLs — they are now crawlable
- Social links (`social.instagram`, `social.facebook`) are placeholder URLs —
  must be updated in `src/data/vendors.js` when real accounts are provided

---

## ADR-017 · Mailchimp Double Opt-In

**Date:** 2026-03-19 (V1.6) · **Status:** Accepted

### Decision
Change Mailchimp subscription `status` from `'subscribed'` to `'pending'`.

### Rationale
- **List hygiene** — only real, actively confirmed email addresses join the list
- **GDPR compliance** — explicit confirmation is the EU standard; best practice globally
- **Deliverability** — confirmed lists have higher open rates and lower bounce/spam rates
- **Kenya context** — not legally required, but protects against fake email entries

### Consequence
Subscribers receive a Mailchimp-branded confirmation email before appearing in the audience.
The confirmation email copy can be customised in Mailchimp: Audience → Signup forms → Confirmation thank you page.
