# Current Project Memory

For task list: NEXT-STEPS.md
For durable decisions: DECISIONS.md
For metadata registry: docs/metadata/master-values.md
For operational AI rules: .aiassistant/rules/

- Active repo project memory should remain compact and operational. Expanded/trimmed material in
  `~/Projects/website-admin/project-memory-materials` or `~/Projects/website-admin/stage-4-0/` is contextual background,
  not a co-equal canonical source.

## 1. Project status

- Project: Stevan Veljkovic’s personal academic/professional Astro website, intended as a durable academic/research hub.
- Canonical domain: `https://stevanveljkovic.com/`
- Separate seminars site: `https://seminars.stevanveljkovic.com/`
- Current local root: `/Users/stevan/Projects/smvsite-astro`
- Current working branch for Stage 4.0: `stage-4-0`
- Production branch: `main` (`origin/main` deploys to Netlify)
- Git remote `origin`: `https://github.com/smveljkovic/smveljkovic.github.io.git`
- Current phase: Stage 4.2 thesis page v1 release polish within Stage 4.0.
- Stage 4.2 thesis page is implemented in the working tree at:
  `/research/doctoral-thesis/religious-atavism-climate-crisis/`
- Stage 4.2 state should distinguish:
   - working-tree implementation: present;
   - build/generated output: unconfirmed;
   - production deployment/live state: unconfirmed.
- No merge to `main` or Netlify production deployment has been confirmed.
- Remaining Stage 4.2 work should be treated as a release checklist, not an open-ended writing / design exercise.
- Site is live at `https://stevanveljkovic.com/`.
- Stage 4.1b research hub v1 is complete/live:
   - `/research/` exists as a compact research/signposting hub.
   - `Research → /research/` is live in primary navigation.
   - The generated sitemap/route set now includes `/research/`.
   - `main` contains the Stage 4.1b release and is deployed on Netlify.
   - `stage-4-0` has been updated from `main` and left clean.

- Production deploys from `origin/main` to Netlify using `npm run build` and `dist`; Node should be `22.12.0` or `22`.
- Apex domain is canonical. `www` redirects permanently to the apex domain.
- DNS remains at Hover. The seminars subdomain remains separate and hosted through GitHub Pages.
- GitHub Pages deployment for the Astro site is retired.

- Current confirmed production/generated route set before Stage 4.2 thesis release: static Astro site, 9 pages:
   - `/`
   - `/cv/`
   - `/publications/`
   - `/pronunciation/`
   - `/research/`
   - `/publications/reviews/cosmic-connections/`
   - `/publications/reviews/evolution-of-religions/`
   - `/publications/reviews/godless-crusade/`
   - `/publications/reviews/hell-christian-ecology/`
- In the current thesis-page working tree, confirm build output contains 10 generated routes.

- Current code has `challenging-modernity` and `christian-right-europe` drafted / withheld from page generation.
- Withheld review image / material folders temporarily live at `~/Projects/website-admin/withheld-images-folders/`.

- Stage 4.0 time budget:
  ```text
  Target: 40–50 hours
  Mandatory scope review: 30 hours
  Re-scope / stop-and-decide threshold: 55 hours
  ```

- Stage 4.0 has reached the mandatory 30-hour scope-review checkpoint.
- Before expanding further Stage 4 work, make and record an explicit scope decision.
- Current recommended rescope, pending explicit Stevan confirmation:
   - committed: Stage 4.2 thesis page v1, validation, and close-out;
   - conditional: bounded Stage 4.3 CV v1 if time/energy remains;
   - optional triage only: withheld-review rights/status;
   - defer unless separately re-scoped: full design foundation, light/dark mode, review reading aid, and
     publications/reviews refinements.

- Project-memory maintenance should not consume more than roughly 10–15% of Stage 4.0 work from here onward.

## 2. Current implementation / architecture

- Framework: Astro. Framework should be set for the foreseeable future. Significant design work remains to be done.
- `package.json`:
   - `astro: ^6.3.1`
   - `@astrojs/sitemap: ^3.7.2`
   - `@astrojs/mdx: ^5.0.6`
   - `@astrojs/check: ^0.9.9`
   - `typescript: ^6.0.3`
   - Node engine: `>=22.12.0`
- `astro.config.mjs`:
   - `site: 'https://stevanveljkovic.com'`
   - `trailingSlash: 'always'`
   - integrations: `sitemap()`, `mdx()`
- Main routes:
   - `src/pages/index.astro` → `/`
   - `src/pages/cv/index.astro` → `/cv/`
   - `src/pages/publications/index.astro` → `/publications/`
   - `src/pages/publications/reviews/[slug]/index.astro` → `/publications/reviews/<slug>/`
   - `src/pages/pronunciation/index.astro` → `/pronunciation/`
- Review pages are content-collection driven from `src/content/reviews/*.md`.
- Current review route generates only non-draft reviews. Draft review pages are not generated locally unless temporarily
  made non-draft.
- `draft:true` controls review page generation only; it does not protect static files under `public/`.
- `/publications/` derives:
   - review bibliography entries from `getCollection("reviews", ({ data }) => data.publicationList.include !== false)`,
     including drafted reviews;
   - local webpage / PDF links only for non-draft reviews;
   - list-only items from non-draft `publicationItems` whose IDs are not already represented by reviews.
- `publication-items` includes duplicate / list-only review records, currently drafted except the thesis item, to avoid
  duplicate publication-list / schema entries.
- Layout chain:
   - reviews: `ReviewLayout.astro` → `BaseLayout.astro` → `SeoHead.astro`
   - text pages: `TextPageLayout.astro` → `BaseLayout.astro`
   - homepage: `HomeLayout.astro` → `BaseLayout.astro`
- Global CSS: `src/styles/global.css`, imported once by `BaseLayout.astro`. Preserve legacy class names for now.
- JSON-LD and schema code:
   - `src/components/JsonLd.astro`
   - `src/data/schema/home.ts`
   - `src/data/schema/cv.ts`
   - `src/data/schema/publications/createPublicationsSchema.ts`
   - `src/data/schema/reviews/createReviewSchema.ts`
   - `src/data/schema/reviews/cosmic-connections/cosmic-connections.ts`
- DOI/schema helpers:
   - `src/lib/doi.ts`
   - `src/lib/schema/ids.ts`
   - `src/lib/schema/person.ts`
   - `src/lib/schema/review.ts`

- Stage 4.2 thesis page working-tree implementation currently involves:
   - `src/pages/research/doctoral-thesis/religious-atavism-climate-crisis/index.astro`
   - `src/data/thesis.ts`
   - `src/data/schema/thesis/createThesisSchema`
   - `src/data/pageMeta.ts`
   - `src/styles/global.css`
   - `/research/` thesis link, currently present in the working tree; confirm generated and live state before release
   - `/publications/` thesis entry check
- `src/data/thesis.ts` and `createThesisSchema(thesis, meta)` exist and are used in the working tree, but rendered
  thesis JSON-LD remains unvalidated.
- Thesis page structure now includes or is intended to include: thesis header and metadata block; resource actions;
  “About the thesis”; abstract; citation; resources; identifiers / technical identifiers; supervision and
  examination; thesis JSON-LD.
- Thesis-specific visual polish is considered tolerable and shippable after light polish, not final design.

- Stage 4.1b research hub v1 is implemented/live and involved:
   - `src/pages/research/`
   - `src/data/navigation.ts`
   - `src/data/pageMeta.ts`
   - `src/pages/index.astro`
   - `src/styles/global.css`
- `Research → /research/` is now live in primary navigation because `/research/` exists.

## 3. Content model, schema, and metadata

- Content config: `src/content.config.ts`
- Astro 6 loader pattern is current:
  ```ts
  import { defineCollection } from "astro:content";
  import { glob } from "astro/loaders";
  import { z } from "astro/zod";
  ```

- Thesis page schema:
   - use `createThesisSchema(thesis, meta)`;
   - `WebPage.mainEntity` should point to the DOI thesis node;
   - thesis `@id` should be the DOI URL;
   - `Person.@id` remains ORCID;
   - do not emit `@id` arrays;
   - use date-only values;
   - include `isAccessibleForFree: true` if the PDF/resource is freely available and verified;
   - validate rendered page-source JSON-LD.

- Collections:
   - `reviews`
   - `publicationItems`
- Current review files:
   - `src/content/reviews/challenging-modernity.md`
   - `src/content/reviews/christian-right-europe.md`
   - `src/content/reviews/cosmic-connections.md`
   - `src/content/reviews/evolution-of-religions.md`
   - `src/content/reviews/godless-crusade.md`
   - `src/content/reviews/hell-christian-ecology.md`
- Current publication-item files:
   - `src/content/publication-items/challenging-modernity.md`
   - `src/content/publication-items/evolution-of-religions.md`
   - `src/content/publication-items/godless-crusade.md`
   - `src/content/publication-items/hell-christian-ecology.md`
   - `src/content/publication-items/religious-atavism-climate-crisis.md`
- `/publications/` schema should remain:
  ```text
  CollectionPage
    mainEntity → ItemList
      itemListElement → ListItem[]
  ```
- Expected `/publications/` count from current live reviews plus thesis: 7.
- Current review metadata supports, among other fields:
   - `reviewedWork`
   - `publishedReview`
   - `periodical`, `volume`, `issue`
   - `blog` for non-journal cases
   - `rights`
   - `reuseNoteHtml`
   - `modificationNote`
   - `publicationList`
   - `localSchemaTypes`

- Journal review model:
  ```text
  local WebPage
    mainEntity → local #review
    about → reviewed Book

  local #review
    itemReviewed → reviewed Book
    isBasedOn/citation → DOI/published review

  DOI/published review
    itemReviewed → reviewed Book
    isPartOf → PublicationIssue → PublicationVolume → Periodical
  ```
- LSE Review of Books model for `evolution-of-religions`:
   - published LSE post: `["@type": ["BlogPosting", "Review"]]`
   - local Stevan-site reproduction: `["@type": ["Article", "Review"]]`
   - no fake periodical / volume / issue chain
   - container:
     ```text
     BlogPosting / Review
       isPartOf → Blog: LSE Review of Books
         isPartOf → WebSite: LSE Blogs
     ```
- Pagination rule:
   - article / review pagination belongs on the published article / review node:
     `pagination`, `pageStart`, `pageEnd`
   - issue-level pagination should only describe the whole issue and only be added if verified.
- Date rule:
   - `publishedReview.datePublished` = publisher-recognised first publication date, usually first online.
   - `PublicationIssue.datePublished` = issue date / month / year where known.
   - Do not put article first-online dates on issue nodes.
- `set:html` remains acceptable only for trusted local migration fields such as:
   - `citationHtml`
   - `bylineHtml`
   - `reuseNoteHtml`
   - `modificationNote`
   - `publicationList.noteHtml`
- Current canonical social image asset/URL:
  ```text
  /images/headshot-1200x630.jpg
  ```
  Home/CV JSON-LD should still be checked for stale `.png` references.

## 4. Design, typography, and layout decisions

- Adapt the migrated visual identity going into Stage 4.0
- Current homepage identity in code remains sparse:
  ```text
  Stevan Veljkovic
  Theory and design,
  Oxford, England.
  [pronunciation line linking to /pronunciation/]
  ```

- Homepage contact uses `site.email`; current canonical code value is `stevan@stevanveljkovic.com`.
- Dark background remains `hsl(0, 0%, 7%)`.
- Preserve fragile / legacy classes for now, including:
  ```text
  Basic-Text-Frame, Name, Details, Headings, BibHeading, BibEntry,
  counter_bib, countercontrol, control, review_intro, review_text,
  review_par, counter, title, intro, byline, review_byline, trigger,
  test, CVEntry, nav-list, pronunciation
  ```
- Webfonts:
   - Adobe Fonts / Typekit loaded globally in `BaseLayout.astro`:
     ```html
     <link rel="stylesheet" href="https://use.typekit.net/icu4lvx.css">
     ```
   - Case VAR self-hosted:
     ```text
     public/fonts/case/case-upright-var.woff2
     public/fonts/case/case-italic-var.woff2
     ```
   - CSS family name: `"Case VAR SV"`
   - Confirmed axes: `wght`, `opsz`
   - Use root-relative font URLs; do not include `/public`.
- Review intro pattern:
  ```text
  Review of [Work]
  By [site.personName] · [site.email]

  The following text reproduces ...
  [citation]
  [first-published note if enabled]
  [reuse / modification / copyright note]
  ```
- Repetitive review dek was removed / suppressed. Review h1s are editorial, not mechanically generated.
- Review intro h1 currently uses `font-weight: 700`; the intro rule is commented out / not displayed.
- `/publications/` has subtle small-caps resource pills for live review resources:
   - current labels in code: `webpage`, `pdf`
- Avoid typography / layout rabbit holes. If stable and not misleading, ship; deeper layout rethink
  belongs to Stage 4.
- The inherited margin-counter / year-marker layout is fragile and may be rethought or discarded in Stage 4.

## 5. Important files, paths, commands, and workflows

- Main source files:
   - `astro.config.mjs`
   - `public/_redirects`
   - `src/content.config.ts`
   - `src/data/site.ts`
   - `src/data/pageMeta.ts`
   - `src/styles/global.css`
   - `src/layouts/BaseLayout.astro`
   - `src/components/SeoHead.astro`
   - `src/components/ReviewIntro.astro`
   - `src/pages/publications/index.astro`
   - `src/pages/publications/reviews/[slug]/index.astro`
- Public files confirmed in latest selected tree:
   - `public/cv/veljkovic-cv.pdf`
   - `public/favicon.ico`
   - `public/favicon.svg`
   - `public/site.webmanifest`
   - `public/images/headshot-1200x630.jpg`
   - `public/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf`
   - `public/publications/reviews/hell-christian-ecology/veljkovic-review-hell-christian-ecology.pdf`
   - `public/research/doctoral-thesis/religious-atavism-climate-crisis/veljkovic-dphil-thesis.pdf`
- Important missing / unchecked asset issue:
   - latest selected public tree does **not** show PDFs for `christian-right-europe`, `godless-crusade`, or
     `challenging-modernity`.
   - verify content references before making any withheld / draft review live.
- Preferred future PDF convention:
  ```text
  public/publications/reviews/<slug>/veljkovic-review-<slug>.pdf
  ```
  but current code already has exceptions.
- Preferred image convention:
  ```text
  public/images/publications/reviews/<slug>/
    reviewed-work/cover.jpg
    issue/cover.jpg
    periodical/poster.jpg
    periodical/banner.jpg
    article/image.jpg
    page/social-card.jpg
  ```
  Frontmatter should use root-relative URLs, e.g.:
  ```yaml
  reviewedWork:
    image: "/images/publications/reviews/<slug>/reviewed-work/cover.jpg"
  ```
- Attach images to the correct JSON-LD entity:
   - `reviewed-work/cover.jpg` → reviewed `Book` / work
   - `issue/cover.jpg` → `PublicationIssue`
   - `periodical/poster.jpg` or `periodical/banner.jpg` → `Periodical`
   - `article/image.jpg` → article/post/review only if rights are clear
   - `page/social-card.jpg` → local page/Open Graph image

## 6. Recent decisions and rationale

- Header/navigation should be implemented directly in Astro/CSS/browser iteration, not by beginning in Figma or Adobe
  tools.
- First-pass header should use a no-JavaScript responsive layout; no hamburger menu is needed initially because primary
  nav is small.
- Header, homepage masthead, and page heading should remain conceptually distinct.
- Header should be a stable global site shell:
  ```html
  <header>
    <a href="/">Stevan Veljkovic</a>
    <nav aria-label="Primary">…</nav>
  </header>
  ```

- Stage 4.0 should not be deployed as one big-bang release, and individual micro-steps should not be deployed
  separately.
- Deploy coherent public release units:
  ```text
  4.1a shell v1: header + footer + stable nav, no broken links
  4.1b research hub v1: /research/ exists and Research appears in nav
  4.2 thesis page v1
  4.3 CV expansion v1
  4.4+ bounded design / interaction improvements
  ```
- Git workflow for Stage 4.0:
  ```text
  main = production
  stage-4-0 = work / integration branch
  merge to main = coherent public release units
  ```

- Deployment is now Netlify, not GitHub Pages.
   - Netlify was chosen over Cloudflare Pages after test deployments because it gives a frictionless deploy workflow,
     real redirects, private-repo-capable deployment, and lower conceptual overhead.
   - Cloudflare remains plausible later, but current aims favour Netlify simplicity.
   - No Netlify Functions, SSR, adapter change, framework migration, or Cloudflare adapter configuration is intended.
- Keep the apex domain as canonical despite Netlify’s recommendation to prefer `www` for optimal CDN behaviour.
- Keep DNS hosted at Hover for now; do not move DNS to Netlify for the foreseeable future.
   - Revisit only if performance issues emerge.
   - If performance issues arise, consider Cloudflare DNS to use Netlify’s preferred load-balancer route.

- Seminars integration for Stage 4.1 is “bridge, don’t migrate”:
   - keep `https://seminars.stevanveljkovic.com/` separate for now;
   - expose Seminars in footer / secondary nav;
   - optionally add a short Seminars section/card on `/research/`;
   - do not import seminar PDFs/assets into the main Astro site during Stage 4.1.

- Live review routes now build for:
   - Cosmic Connections
   - Hell: In Search of a Christian Ecology
   - The Evolution of Religions
   - The Godless Crusade
- Slug policy:
   - Do not rename existing slugs unless there is a real error.
   - Existing slugs:
     ```text
     cosmic-connections
     christian-right-europe
     hell-christian-ecology
     challenging-modernity
     evolution-of-religions
     godless-crusade
     ```

## 7. Known issues, cautions, and unresolved questions

- For Netlify 404 spikes, likely bot-scanning paths returning `404` are not by themselves an incident. Investigate if
  sensitive-looking paths return `200`, and keep `dist/`, `public/`, and the public repo free of secrets or
  rights-sensitive unintended assets.

- **T&F rights caution:** no Taylor & Francis Version-of-Record page should go live until T&F / CCC confirms permission.
  Current code has `challenging-modernity` withheld; keep it absent from routes, sitemap, and public assets unless that
  decision changes.
- `godless-crusade` AM is acceptable in principle under T&F author-reuse policy, but still needs final verification for:
   - exact visible AM wording
   - Goodhart correction note
   - text/version accuracy
   - schema
   - sitemap
   - absence of VoR PDF / text
- Current canonical contact email in code is `stevan@stevanveljkovic.com`.
  Homepage and review intro use `site.email`; `bylineHtml` is deprecated; manuscript-specific bylines are historical and
  may contain now-defunct `stevan.veljkovic@theology.ox.ac.uk` address.
- Remaining headshot metadata cleanup:
   - `site.image` and the public file now use `/images/headshot-1200x630.jpg`;
   - home/CV JSON-LD schema still needs checking for stale `.png` references.
- Latest selected public tree confirms review PDFs for Cosmic and Hell only.
  Godless currently has no local PDF; drafted / withheld Christian Right and Challenging Modernity PDF / image assets
  are not in `public/`.
- `hell-christian-ecology` unresolved checks:
   - whether version should be `Reproduction of the Version of Record`
   - whether first-published note should display
   - whether issue date `2024-10-03` is verified or should be omitted
   - whether referenced PDF path exists
- Current review route has no dev-only draft preview generation. To preview a draft route locally, temporarily set
  `draft: false` or implement a dev-only pattern.
- Some sort / date metadata remains questionable:
   - `godless-crusade` `publicationList.sortDate: "2023-01-01"` may be placeholder-like.
   - `christian-right-europe` issue date is month precision but sort date may be `"2025-07-01"`.
   - `challenging-modernity` citation issue-year is 2025, but `publicationList.year` may be 2024 and sort date may be
     first-online date.
- Content schema / frontmatter mismatch risk remains. Current schema is better than older notes, but verify any
  frontmatter keys not declared in `src/content.config.ts`, especially if intended to drive display or JSON-LD.
- `publicationIssueSchema` has `dateLabel`, but some notes mention `issueDateLabel`. Keep display-only labels out of
  Schema.org unless mapped intentionally.
- `Analytics.astro` uses `site.analyticsId` for script URL but hardcodes `gtag('config', 'G-7VMGXMNZZ0')`. Fine if
  matching, but not DRY.
- `.DS_Store` files are present in source / public tree. Remove from repo if tracked or accidentally committed.
- Netlify forced redirects are implemented for legacy URLs while old compatibility files still exist:
  ```text
  /writing.html /publications/ 301!
  /writing/ReviewCosmicConnectionsV2.html /publications/reviews/cosmic-connections/ 301!
  /writing/ReviewCosmicConnectionsV2.pdf /publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf 301!
  /itinerary.pdf /cv/veljkovic-cv.pdf 301!
  ```
- Keep the redirects forced (`301!`) while physical legacy files remain, because otherwise Netlify may serve existing
  files with `200`.
- `/research/` currently uses CSS-generated section numbering. This is acceptable for now, but if stricter
  accessibility is needed later, use explicit markup, e.g. an `aria-hidden` number span.
- Minor typography cautions remain:
   - homepage pronunciation brackets may be optically imperfect;
   - Meta Serif roman/italic boundaries can show awkward spacing in some phrases.
     Treat these as bounded micro-fixes only if they recur or become visibly distracting.

## 8. Immediate next steps

See NEXT-STEPS.md; immediate focus is Stage 4.2 thesis release validation and the 30-hour scope decision

## 9. Material brought in from other memory docs 2026-06-18

- **Use the thesis data/schema working-tree implementation, pending rendered validation.**  
  **Current state:** `src/data/thesis.ts` and `createThesisSchema(thesis, meta)` exist and are used in the working
  tree.  
  **Still required:** validate rendered page-source JSON-LD before release.  
  **Status:** Working-tree implementation present; validation pending.

## 10. Do not lose

- For stable metadata values, identifiers, title rules, node IDs, review-specific metadata, thesis metadata, asset
  rules, sitemap rules, and superseded values, use `docs/metadata/master-values.md`.
- For durable architectural/schema/design/deployment decisions, use `DECISIONS.md`.
- For runnable release work, use `NEXT-STEPS.md`.
- Critical current thesis facts: route `/research/doctoral-thesis/religious-atavism-climate-crisis/`; DOI
  `https://doi.org/10.5287/ora-4rjoobkvk`; formal title
  `Religious atavism and the climate crisis, with reference to Taylor and Rorty on liberalism`; build/live state
  unconfirmed.