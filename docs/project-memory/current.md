# Current Project Memory

For task list: NEXT-STEPS.md
For durable decisions: DECISIONS.md
For metadata registry: docs/metadata/master-values.md
For operational AI rules: .aiassistant/rules/

## 1. Project status

- Project: Stevan Veljkovic’s personal academic/professional Astro website, intended as a durable academic/research hub.
- Canonical domain: `https://stevanveljkovic.com/`
- Separate seminars site: `https://seminars.stevanveljkovic.com/`
- Current local root: `/Users/stevan/Projects/smvsite-astro`
- Current working branch for Stage 4.0: `stage-4-0`
- Production branch: `main` (`origin/main` deploys to Netlify)
- Git remote `origin`: `https://github.com/smveljkovic/smveljkovic.github.io.git`
- Stage 3 is complete.
- Current phase: Stage 4.0 planning / core architecture and design foundation.
- Site is live at `https://stevanveljkovic.com/`.
- Production host: Netlify, deploying from `origin/main`.
- Netlify build settings:
  ```text
  Build command: npm run build
  Publish directory: dist
  Production branch: main
  NODE_VERSION = 22.12.0
  ```

If the exact Node patch causes trouble, use `22`.

- `https://www.stevanveljkovic.com/` redirects permanently to the apex domain.
- DNS remains hosted at Hover for now.
- Apex DNS currently uses Netlify’s Hover fallback A record:
  ```text
  stevanveljkovic.com A 75.2.60.5
  ```
- `seminars.stevanveljkovic.com` remains separate and hosted via GitHub Pages:
  ```text
  CNAME seminars smveljkovic.github.io
  ```
- GitHub Pages deployment for the Astro site is retired; `public/CNAME` and `.github/workflows/deploy.yml` are no longer
  part of the active deployment model.
- Latest observed `dist/` snapshot: static Astro site, 7 pages:
   - `/`
   - `/cv/`
   - `/publications/`
   - `/publications/reviews/cosmic-connections/`
   - `/publications/reviews/evolution-of-religions/`
   - `/publications/reviews/godless-crusade/`
   - `/publications/reviews/hell-christian-ecology/`
- Current code has `challenging-modernity` and `christian-right-europe` drafted / withheld from page generation.
- Withheld review image / material folders temporarily live at `~/Projects/website-admin/withheld-images-folders/`.

- Stage 4.0 time budget:
  ```text
  Target: 40–50 hours
  Mandatory scope review: 30 hours
  Re-scope / stop-and-decide threshold: 55 hours
  ```
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

   - Stage 4.1 site-shell work is expected to involve:
      - `src/data/navigation.ts`
      - `src/components/SiteHeader.astro`
      - `src/components/SiteFooter.astro`
      - `src/layouts/BaseLayout.astro`
      - `src/styles/global.css`
   - A basic global header exists locally. `Research` should remain absent/commented out in live primary navigation
     until
     `/research/` exists.

## 3. Content model, schema, and metadata

- Content config: `src/content.config.ts`
- Astro 6 loader pattern is current:
  ```ts
  import { defineCollection } from "astro:content";
  import { glob } from "astro/loaders";
  import { z } from "astro/zod";
  ```
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
- Important schema conventions:
   - Canonical `Person.@id`: `https://orcid.org/0000-0002-2599-3227`
   - DOI URLs are stable IDs for DOI-identified works.
   - No `@id` should become an array.
   - JSON-LD belongs on canonical pages, not redirect stubs.
   - Use date-only values unless a real meaningful time is known.
   - Do not invent noon / midnight datetimes.
   - Validate rendered page-source JSON-LD, not TypeScript literals.
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

## 4. Design, typography, and layout decisions

- Adapt the migrated visual identity going into Stage 4.0
- Current homepage identity in code:
  ```text
  Stevan Veljkovic
  Theory and design,
  Oxford, England.
  ```
- Inherited / artefactual homepage nav labels:
   - Contact
   - Résumé
   - Writing
   - Seminars
- Stage 4.1 primary navigation is settled as:
  ```text
  Stevan Veljkovic → /
  CV → /cv/
  Publications → /publications/
  Research → /research/
  ```
- `Research` must not be exposed in live primary navigation until `/research/` exists.
- Avoid primary-nav `Contact` unless a real `/contact/` page exists.
- Avoid putting `Seminars` in primary navigation for now.

- Stage 4.1 footer / secondary navigation is settled as:
  ```text
  Contact → mailto:stevan@stevanveljkovic.com
  ORCID → https://orcid.org/0000-0002-2599-3227
  Google Scholar → https://scholar.google.com/citations?user=e42TN4UAAAAJ
  GitHub → https://github.com/smveljkovic
  Pronunciation → /pronunciation/
  Seminars → https://seminars.stevanveljkovic.com/
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
   - `public/images/headshot-1200x630.JPG`
   - `public/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf`
   - `public/publications/reviews/hell-christian-ecology/veljkovic-review-hell-christian-ecology.pdf`
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
   - Cloudflare remains a possible future option, but is not needed now.
      - Note: Cloudflare was found to be generally preferable on the basis of site style and feel.
      - But site style and feel were determined to be immaterial to the present aims.
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

- **T&F rights caution:** no Taylor & Francis Version-of-Record page should go
  live until T&F / CCC confirms permission. Current code has
  `challenging-modernity` withheld; keep it absent from routes, sitemap, and
  public assets unless that decision changes.
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
- Possible OG image mismatch:
   - public tree has `/images/headshot-1200x630.JPG`
   - older notes expected `/images/headshot-1200x630.png`
   - inspect `src/data/site.ts` and generated page source for broken image URLs.
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

## 8. Immediate next steps

1. Continue Stage 4.1 shell work on `stage-4-0`.
2. Finish “4.1a shell v1” before merging to `main`:
   * header;
   * footer;
   * stable primary and secondary navigation;
   * no broken links;
   * no `Research` primary-nav link until `/research/` exists;
   * narrow/mobile layout;
   * active/current-page state;
   * accessible markup and visible keyboard focus.
3. Implement footer links:
   ```text
   Contact / ORCID / Google Scholar / GitHub / Pronunciation / Seminars
   ```
4. Create `/research/` as a compact hub.
5. Once `/research/` exists, add `Research → /research/` to primary nav.
6. Add only a short Seminars bridge on `/research/` if it fits naturally.
7. Then implement the thesis page:
   ```text
   /research/doctoral-thesis/religious-atavism-climate-crisis/
   ```
8. Before merging any Stage 4.0 increment to `main`, run:
   ```bash
   npx astro check
   npm run build
   npm run preview
   ```
   Inspect:
   ```text
   /
   /cv/
   /publications/
   /publications/reviews/cosmic-connections/
   /publications/reviews/evolution-of-religions/
   /publications/reviews/godless-crusade/
   /publications/reviews/hell-christian-ecology/
   /research/   once created
   ```

## 9. Details that should not be lost

- Minimal `/research/` structure:
  ```text
  Research
  - Doctoral thesis
  - Research themes
  - Earlier academic work
  - Publications and review essays
  - Seminars
  ```

- Core identifiers:
  ```text
  ORCID: https://orcid.org/0000-0002-2599-3227
  Google Scholar: https://scholar.google.com/citations?user=e42TN4UAAAAJ
  GitHub: https://github.com/smveljkovic
  ```
- Canonical structured-data `Person.@id`:
  ```text
  https://orcid.org/0000-0002-2599-3227
  ```
- Title rules:
   - homepage `<title>`: `Stevan Veljkovic`
   - ordinary pages: `{Page name} | Stevan Veljkovic`
   - review pages: `Review of {Reviewed work short title} | Stevan Veljkovic`
- `WebSite.name`, `Person.name`, and `og:site_name` should be `Stevan Veljkovic`.
- Descriptive phrases belong in descriptions / copy / schema descriptions, not in canonical site name.
- Use URL helpers, not manual concatenation, for absolute URLs and node IDs.
- Do not use the rejected / conflated OpenAlex profile.
- Real OpenAlex profile URL is now known and may be used.
- For DOI-identified journal reviews:
   - article / review `datePublished` = publisher-recognised first publication date, usually first online.
   - `PublicationIssue.datePublished` = issue date / month / year where known.
   - do not emit non-standard `firstPublishedOnline`; map it to Schema.org `datePublished`.
- Do not emit `PublicationIssue.name` merely as the issue number. Use `issueNumber` for numbers; only emit `name` for
  real issue labels.
- Issue cover images belong on `PublicationIssue` only when they are issue-specific covers.
- Local review node ID pattern:
  ```text
  https://stevanveljkovic.com/publications/reviews/<slug>/#review
  ```
- WebPage node ID pattern:
  ```text
  https://stevanveljkovic.com/publications/reviews/<slug>/#webpage
  ```
- WebSite node ID:
  ```text
  https://stevanveljkovic.com/#website
  ```
- For local reproductions / manuscripts, do not use `sameAs` with the DOI / publisher page unless truly identical.
  Prefer `isBasedOn` and / or `citation`.

- `/research/` is now intended as a compact research hub.
- Thesis slug is settled:
  ```text
  religious-atavism-climate-crisis
  ```
- Thesis route is settled but should not be linked until implemented:
  ```text
  /research/doctoral-thesis/religious-atavism-climate-crisis/
  ```
- `/research/` should function as a map/signposting hub, not an essay or manifesto.
- Give the doctoral thesis pride of place; do not apologise for lack of conventional research articles; do not
  overclaim; separate outputs from themes.

- Thesis DOI is primary ID:
  ```text
  https://doi.org/10.5287/ora-4rjoobkvk
  ```
- Thesis secondary identifiers:
  ```text
  ARK: ark:/29072/ora_7aff13dc075e4c17bee95adfc1b2fcf4
  Oxford Research Archive pubs id: 1624720
  Oxford Research Archive local pid: pubs:1624720
  ```
- Stage 4.0 mission / planning note lives outside the repo:
  ```text
  ~/Projects/website-admin/stage-4/plan-mission-note.md
  ```


