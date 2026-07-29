# Bethesda Health & Wellness — website

A rebuild of bethesdahealth.ca as a conversion- and local-SEO-focused Next.js site
for a two-location Edmonton physiotherapy and rehabilitation clinic.

```bash
npm run dev     # http://localhost:3000
npm run build   # 29 static pages
```

---

## Design system

Built with the **Hallmark** design skill. The choices are recorded in
`.hallmark/log.json` and stamped at the top of `app/globals.css`.

| Axis | Choice |
| --- | --- |
| Genre | editorial |
| Macrostructure | **Split Studio** — every major block is a diptych, claim on one side, proof on the other, alternating direction |
| Theme | **Garden** — warm bone paper, deep bark ink, leaf-green accent, clay secondary for claim pathways |
| Nav | **N12** banner + retracting bar (banner carries direct-billing / MVA / WCB / hours) |
| Footer | **Ft1** mast-headed — the two addresses lead, not a fake sitemap |
| Type | Fraunces (display, roman) · Karla (body) · IBM Plex Mono (data) |
| Motion | **GSAP** — hero entrance timeline + Standard-tier scroll reveals (see below) |

### Motion (GSAP)

Lives in `components/motion/`. Two components: `HeroIntro` (load timeline) and
`Reveal` (scroll-triggered stagger). Nothing else animates.

**The load-bearing rule: every tween is `gsap.from()`, never a CSS `opacity: 0`
default.** Elements render *visible* in the HTML and animate *from* hidden after
hydration. That means crawlers and no-JS visitors get fully rendered content —
which matters enormously here, because local SEO is this site's entire job.
Hiding below-fold copy behind JS would be self-sabotage. Verified: the raw
server HTML contains **zero** `opacity: 0` / `visibility: hidden` declarations.

`prefers-reduced-motion` is handled inside `gsap.matchMedia()` — under that
preference no tween is created at all, so content simply sits where it belongs.

Deliberately **not** used, despite being available:

- **ScrollTrigger `pin`** — fights native mobile scroll; this audience is in pain on a phone
- **Parallax on text** — hurts reading comfort, can trigger motion sickness
- **SplitText** — one DOM element per character wrecks screen-reader output on a health site
- **Flip page transitions** — delays navigation for someone trying to book

**Token discipline.** Every colour and font lives in `app/tokens.css` and is
referenced by name. There are no inline hex/oklch values and no bare
`font-family` declarations anywhere in the component CSS. If you need a new
value, add it as a token first.

Colours are OKLCH. Paper is never pure white; ink is never pure black.

### CSS load order matters

`app/globals.css` imports in this order: `tailwindcss` → `tokens.css` →
`chrome.css` → `blocks.css`, then defines base + primitives. Because the
primitives (`.btn`, `.tlink`) are defined *last*, a single-class rule in
`chrome.css` loses to them. This already bit once: `.nav-book { display: none }`
was overridden by `.btn { display: inline-flex }` and the booking button leaked
onto mobile and overflowed the bar. Scope such rules to a parent
(`.nav-actions .nav-book`) rather than relying on source order.

---

## Content layer

All copy lives in typed modules under `content/`. Nothing is hard-coded in a
page component. This is the seam a headless CMS (Sanity / Payload) plugs into
later — the page components already consume typed objects, so swapping the
source is a data-fetch change, not a redesign.

| File | Holds |
| --- | --- |
| `content/site.ts` | NAP, hours, JaneApp booking URLs, primary nav |
| `content/services.ts` | 8 services, each a full landing page (treats, session, FAQs, SEO) |
| `content/locations.ts` | 2 clinics — hours, parking, accessibility, transit |
| `content/team.ts` | Practitioners — **placeholders, see below** |
| `content/billing.ts` | Insurers, MVA steps, WCB steps |
| `content/triage.ts` | The homepage symptom picker |
| `content/reviews.ts` | **Intentionally empty, see below** |

**NAP consistency:** the address and phone strings in `content/site.ts` and
`content/locations.ts` must stay byte-identical to the Google Business Profile.
Local ranking depends on it. They are defined once and rendered everywhere from
that single source.

---

## Honest-content policy

Two things in this build are deliberately *not* filled in, because inventing
them would be dishonest and, in a health context, a regulatory problem.

### Reviews — `content/reviews.ts` is an empty array

Fabricated testimonials deceive patients, Alberta's health colleges restrict the
use of patient testimonials in advertising, and Google prohibits fabricated
reviews. `<ReviewsSection>` renders an honest empty state instead.

`AggregateRating` JSON-LD is **only emitted when real consented reviews exist**.
Shipping star ratings with invented numbers is structured-data spam and can earn
a manual action.

*To go live:* wire the Google Business Profile API, or collect reviews with
written consent, and populate the array.

### Team — `content/team.ts` entries are flagged placeholders

Real names, headshots, credentials and college registration numbers were not
available. Each entry carries `isPlaceholder: true`, which:

- renders a visible "Placeholder profile" flag on the card and the profile page,
- sets `robots: noindex` on `/team` and every profile page,
- excludes those URLs from `sitemap.ts`,
- suppresses the `Person` JSON-LD.

*To go live:* replace each entry with verified information and set
`isPlaceholder: false`. The noindex, sitemap and schema behaviour flips
automatically.

---

## Before launch — required

- [ ] `content/site.ts` → set `url` to the live origin (canonical, sitemap and JSON-LD all read it)
- [ ] `app/contact/actions.ts` → wire real email delivery. **It currently returns success without sending.**
- [ ] `content/billing.ts` → verify the direct-billing list against actual Telus eClaims enrolment
- [ ] `content/credentials.ts` → fill in real `fees` amounts (all `null` today — the table says "Call for current fee")
- [ ] `content/credentials.ts` → verify `clinicAssurances` enrolments and flip `verified: true` (they render a "To verify" flag until you do)
- [ ] `content/team.ts` → replace placeholders, flip `isPlaceholder`
- [ ] `content/reviews.ts` → connect the Google reviews feed
- [ ] `app/privacy/page.tsx` → name the privacy officer, add OIPC Alberta contact, legal review
- [ ] `content/site.ts` → replace the placeholder social URLs
- [ ] Confirm the West clinic's own phone line (currently falls back to the main line)
- [ ] Add `geo` lat/lng to each location in `content/locations.ts` for richer LocalBusiness schema
- [ ] Confirm Jane allows framing on the production origin — if not, `BookingEmbed` still renders a working direct link, but check it

---

## Accessibility & privacy

Verified in-browser during the build:

- **0 contrast failures** across 164 (home) and 188 (insurance) rendered text nodes, at WCAG AA thresholds, measured on rasterised RGB
- **No horizontal scroll** at 320 / 375 / 414 / 768 px
- **No clickable text wrapping to two lines** at any tested width
- **All standalone controls ≥ 44 px** on touch (`app/chrome.css` → touch targets)
- One `h1` per page, no heading-level skips, every iframe titled, every input labelled
- Focus rings are never transitioned — they appear instantly
- `prefers-reduced-motion` collapses the single entrance animation

**Privacy by design.** The symptom picker keeps its selection in component state
only — never a URL parameter, never analytics. Health information cannot leak
into a query string or a third-party tag. The contact form asks people *not* to
send medical details and uses a honeypot + timing check rather than a
third-party CAPTCHA, so no visitor data goes to an ad network and there is no
accessibility barrier.

---

## Structure

```
app/
  tokens.css        design tokens — the only place colours/fonts are defined
  globals.css       base, primitives, Hallmark stamp
  chrome.css        nav, footer, sticky CTA, triage, booking
  blocks.css        section rhythm, cards, hero, steps
  page.tsx          home (Split Studio)
  services/[slug]   8 SEO landing pages
  locations/[slug]  2 clinic pages
  team/[slug]       practitioner profiles
  insurance-billing · new-patients · contact · book · privacy
  sitemap.ts · robots.ts · not-found.tsx
components/         SiteHeader, SiteFooter, StickyCTA, TriageWizard,
                    BookingEmbed, ContactForm, blocks, Wordmark, JsonLd
content/            the typed content layer
lib/schema.ts       JSON-LD graph
```
