# Current Project Memory

## 1. Project status

- Project: Stevan Veljkovic’s personal academic/professional Astro website, intended as a durable academic/research hub.
- Canonical domain: `https://stevanveljkovic.com/`
- Separate seminars site: `https://seminars.stevanveljkovic.com/`
- Current local root: `/Users/stevan/Projects/smvsite-astro`
- Current git branch: `main`
- Latest git status snapshot:
  - untracked: `docs/project-memory/README.md`, `docs/project-memory/inputs/`, `scripts/`
  - no reported `git diff --stat` output
- Current phase: Stage 3 / Stage 3.3 launch hardening and review-page expansion, not a redesign.
- Actual build status as of 2026-05-31 12:07 BST: `npm run build` succeeds.
- Build output: static Astro site, 9 pages:
  - `/`
  - `/cv/`
  - `/publications/`
  - `/publications/reviews/challenging-modernity/`
  - `/publications/reviews/christian-right-europe/`
  - `/publications/reviews/cosmic-connections/`
  - `/publications/reviews/evolution-of-religions/`
  - `/publications/reviews/godless-crusade/`
  - `/publications/reviews/hell-christian-ecology/`
- Launch caution: `challenging-modernity` currently builds publicly, but the current rights decision says Taylor & Francis Version-of-Record pages must not go live until CCC/T&F permission is clarified.

## 2. Current implementation / architecture

- Framework: Astro. Do not switch frameworks, adopt a theme, or redesign during Stage 3.
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
- Current review route generates only non-draft reviews. Draft review pages are not generated locally unless temporarily made non-draft.
- `/publications/` derives:
  - live reviews from `getCollection("reviews", ({ data }) => !data.draft)`
  - list-only items from `getCollection("publicationItems", ({ data }) => !data.draft)`
- `publication-items` includes duplicate/list-only review records, currently drafted except the thesis item, to avoid duplicate publication-list/schema entries.
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
  - Do not invent noon/midnight datetimes.
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
  - no fake periodical/volume/issue chain
  - container:
    ```text
    BlogPosting / Review
      isPartOf → Blog: LSE Review of Books
        isPartOf → WebSite: LSE Blogs
    ```
- Pagination rule:
  - article/review pagination belongs on the published article/review node:
    `pagination`, `pageStart`, `pageEnd`
  - issue-level pagination should only describe the whole issue and only be added if verified.
- Date rule:
  - `publishedReview.datePublished` = publisher-recognised first publication date, usually first online.
  - `PublicationIssue.datePublished` = issue date/month/year where known.
  - Do not put article first-online dates on issue nodes.
- `set:html` remains acceptable only for trusted local migration fields such as:
  - `citationHtml`
  - `bylineHtml`
  - `reuseNoteHtml`
  - `modificationNote`
  - `publicationList.noteHtml`

## 4. Design, typography, and layout decisions

- Preserve the migrated visual identity for Stage 3; no full redesign before launch.
- Current homepage identity in code:
  ```text
  Stevan Veljkovic
  Theory and design,
  Oxford, England.
  ```
- Homepage navigation labels:
  - Contact
  - Résumé
  - Writing
  - Seminars
- Homepage contact currently hardcodes `mailto:hello@stevanveljkovic.com`; this conflicts with recent contact-email decisions.
- Dark background remains `hsl(0, 0%, 7%)`.
- Preserve fragile/legacy classes for now, including:
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
- Repetitive review dek was removed/suppressed. Review h1s are editorial, not mechanically generated.
- Review intro h1 currently uses `font-weight: 700`; the intro rule is commented out / not displayed.
- `/publications/` has quiet small-caps resource pills for live review resources:
  - current labels in code: `webpage`, `pdf`
- Avoid typography/layout rabbit holes during Stage 3. If stable and not misleading, ship; deeper layout rethink belongs to Stage 4.
- The inherited margin-counter/year-marker layout is fragile and may be rethought or discarded in Stage 4.

## 5. Important files, paths, commands, and workflows

- Main source files:
  - `astro.config.mjs`
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
  - `public/publications/reviews/christian-right-europe/veljkovic-christian-right-europe.pdf`
- Important missing/unchecked asset issue:
  - latest selected public tree does **not** show PDFs for `hell-christian-ecology`, `godless-crusade`, or `challenging-modernity`.
  - verify content references before launch.
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
- Commands:
  ```bash
  npm run dev
  npm run build
  npm run preview
  npx astro sync
  npx astro check
  ```
- Inspection commands:
  ```bash
  find src/pages -type f | sort
  find src/content -maxdepth 4 -type f | sort
  find public -maxdepth 6 -type f | sort
  find dist -maxdepth 5 -type f | sort
  find dist -name "sitemap*.xml" -print -exec cat {} \;
  find src/pages/publications/reviews -type f
  ```
- External validation:
  - https://validator.w3.org/
  - https://validator.schema.org/
  - https://search.google.com/test/rich-results
  - https://pagespeed.web.dev/
- Astro workflow:
  ```text
  WebStorm + npm run dev / npm run preview + browser DevTools
  ```
  Do not use Dreamweaver for the Astro site.

## 6. Recent decisions and rationale

- Live review routes now build for:
  - Cosmic Connections
  - Christian Right in Europe
  - Hell: In Search of a Christian Ecology
  - Challenging Modernity
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
  - Use the shortest clear, stable, human-readable title slug.
- `godless-crusade`:
  - route: `/publications/reviews/godless-crusade/`
  - current local version should be `Accepted Manuscript`, not Version of Record.
  - published review DOI: `https://doi.org/10.1080/09637494.2023.2260684`
  - reviewed book DOI: `https://doi.org/10.1017/9781009262125`
  - journal: *Religion, State and Society*, volume 51, issue `4–5`
  - issue date should be `2023` or omitted unless exact issue date is verified.
  - published review first-online date may be `2023-12-14`.
  - article/review pagination: `491–492`, `491`, `492`
  - issue URL may use ASCII hyphen: `.../51/4-5`; issue number in display/schema may use en dash `4–5`.
  - Do not expose T&F VoR PDF/text unless permission is granted.
  - If VoR permission is later granted, the stable route can be updated in place; no separate route is required unless both AM and VoR are intentionally kept public.
  - Accepted Manuscript contained a Goodhart title error; local text should correct it and include a visible correction note.
  - Prefer recognisable Taylor & Francis AM wording in the intro/version block.
- `challenging-modernity`:
  - current code builds it publicly.
  - local version is a Taylor & Francis Version-of-Record reproduction.
  - published review DOI: `https://doi.org/10.1080/09637494.2024.2408091`
  - reviewed book DOI: `https://doi.org/10.7312/bell21488`
  - must be drafted/withheld before launch unless T&F/CCC permission is clarified.
  - It may still appear as a bibliographic DOI item on `/publications/`.
- `evolution-of-religions`:
  - complete for Stage 3.
  - model LSE post as `BlogPosting/Review`.
  - model local reproduction as `Article/Review`.
  - do not invent journal metadata or fake issue images.
- `hell-christian-ecology`:
  - DOI review: `https://doi.org/10.1558/jsrnc.30282`
  - reviewed book DOI: `https://doi.org/10.7312/mort21470`
  - license: CC BY-NC-ND 4.0
  - if using generic JSNRC visual assets, attach them to `Periodical`, not `PublicationIssue`.
- `christian-right-europe`:
  - edited volume uses `editor`, not author string with “(ed.)”.
  - `csaf039` is article ID, not pagination.
  - issue date is month precision in frontmatter: `2025-07`.
- `cosmic-connections`:
  - local page is an unabridged Author’s Original Manuscript and distinct from DOI article.
  - do not use `sameAs` between local review and DOI node.
- `/publications/` derives review list entries from live review content and generates local-resource pills where `canonicalPath`/`pdfPath` exist.
- Authorial-voice rule:
  - Suggested wording is acceptable for short collaborative labels/copy.
  - Do not generate extended prose in Stevan’s authorial voice or personal communications unless explicitly asked.
- Project memory rule:
  - actual code/build output is highest authority.
  - `docs/project-memory/current.md` should be compact operational memory.
  - deltas are change history and should be incorporated into `current.md`.
  - raw logs/generated summaries are audit material, not automatic current authority.

## 7. Known issues, cautions, and unresolved questions

- **T&F rights blocker:** no Taylor & Francis Version-of-Record page should go live until T&F/CCC confirms permission. Current code has `challenging-modernity` public, so this must be resolved before launch.
- `godless-crusade` AM is acceptable in principle under T&F author-reuse policy, but still needs final verification for:
  - exact visible AM wording
  - Goodhart correction note
  - text/version accuracy
  - schema
  - sitemap
  - absence of VoR PDF/text
- Contact email is inconsistent:
  - homepage hardcodes `hello@stevanveljkovic.com`
  - review intro uses `site.email`
  - recent decisions point toward `contact@stevanveljkovic.com`
  - align `src/data/site.ts`, homepage link, JSON-LD, metadata, and any contact/footer copy.
- Possible OG image mismatch:
  - public tree has `/images/headshot-1200x630.JPG`
  - older notes expected `/images/headshot-1200x630.png`
  - inspect `src/data/site.ts` and generated page source for broken image URLs.
- Current build does not prove linked assets exist. Latest selected public tree only confirms Cosmic and Christian Right PDFs.
- `hell-christian-ecology` unresolved checks:
  - whether version should be `Reproduction of the Version of Record`
  - whether first-published note should display
  - whether issue date `2024-10-03` is verified or should be omitted
  - whether referenced PDF path exists
- Current review route has no dev-only draft preview generation. To preview a draft route locally, temporarily set `draft: false` or implement a dev-only pattern.
- Some sort/date metadata remains questionable:
  - `godless-crusade` `publicationList.sortDate: "2023-01-01"` may be placeholder-like.
  - `christian-right-europe` issue date is month precision but sort date may be `"2025-07-01"`.
  - `challenging-modernity` citation issue-year is 2025, but `publicationList.year` may be 2024 and sort date may be first-online date.
- Content schema/frontmatter mismatch risk remains. Current schema is better than older notes, but verify any frontmatter keys not declared in `src/content.config.ts`, especially if intended to drive display or JSON-LD.
- `publicationIssueSchema` has `dateLabel`, but some notes mention `issueDateLabel`. Keep display-only labels out of Schema.org unless mapped intentionally.
- `Analytics.astro` uses `site.analyticsId` for script URL but hardcodes `gtag('config', 'G-7VMGXMNZZ0')`. Fine if matching, but not DRY.
- `.DS_Store` files are present in source/public tree. Remove from repo if tracked or accidentally committed.
- Legacy redirect strategy is unresolved. Old URLs to consider:
  - `/writing.html`
  - `/writing/ReviewCosmicConnectionsV2.html`
  - `/writing/ReviewCosmicConnectionsV2.pdf`
  - `/itinerary.pdf`

## 8. Immediate next steps

1. Decide whether `challenging-modernity` must be set back to `draft: true` until T&F/CCC rights clarification is received.
2. Run:
   ```bash
   npx astro sync
   npx astro check
   npm run build
   ```
3. Inspect generated sitemap:
   ```bash
   find dist -name "sitemap*.xml" -print -exec cat {} \;
   ```
   Confirm only intended live canonical pages appear.
4. Verify all generated-page asset references:
   - PDFs
   - review cover images
   - issue/periodical images
   - favicon files
   - OG/social image
5. Align canonical contact email across:
   - `src/data/site.ts`
   - homepage contact link
   - review intro
   - JSON-LD
   - metadata docs
   - any footer/contact copy
6. Validate rendered JSON-LD for:
   - `/`
   - `/cv/`
   - `/publications/`
   - all intended live review pages
7. Fix schema/frontmatter mismatches where stripped fields are meant to matter.
8. Clean placeholder-like sort/date metadata.
9. Resolve Hell-specific metadata and asset questions.
10. Prepare launch/deployment docs and legacy URL plan.

## 9. Details that should not be lost

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
- Descriptive phrases belong in descriptions/copy/schema descriptions, not in canonical site name.
- Use URL helpers, not manual concatenation, for absolute URLs and node IDs.
- Do not use the rejected/conflated OpenAlex profile.
- For DOI-identified journal reviews:
  - article/review `datePublished` = publisher-recognised first publication date, usually first online.
  - `PublicationIssue.datePublished` = issue date/month/year where known.
  - do not emit non-standard `firstPublishedOnline`; map it to Schema.org `datePublished`.
- Do not emit `PublicationIssue.name` merely as the issue number. Use `issueNumber` for numbers; only emit `name` for real issue labels.
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
- For local reproductions/manuscripts, do not use `sameAs` with the DOI/publisher page unless truly identical. Prefer `isBasedOn` and/or `citation`.
- Thesis remains bibliography-only until Stage 4. Do not create or link a thesis page unless actually implemented.
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

## 10. Possibly superseded or uncertain information

- Older notes listing only Cosmic and Christian Right as live review pages are superseded by current code: six review routes now build.
- Older planned-page notes for Hell, Challenging Modernity, Evolution of Religions, and Godless Crusade are mostly superseded by current files, but rights/asset validation remains active.
- Earlier public identity said “Theory and editing”; current homepage code says “Theory and design”. Confirm desired wording before launch.
- Older constants said `hello@stevanveljkovic.com`; recent decisions point toward `contact@stevanveljkovic.com`, but current code still has at least one hardcoded `hello@` link.
- Older expected headshot path `/images/headshot-1200x630.png` may be superseded or broken; current public file shown is `/images/headshot-1200x630.JPG`.
- Older Case font path notes used `public/fonts/Case/...`; current code uses lowercase `public/fonts/case/...` and simplified lowercase filenames.
- Older PDF convention used `veljkovic-review-<slug>.pdf`; current Christian Right path is `veljkovic-christian-right-europe.pdf`, and other current/planned paths may differ.
- Current `publicationList.year` and sorting choices may not match final bibliographic grouping decisions, especially for Challenging Modernity and Godless Crusade.
- Richer `/publications/` JSON-LD for reviewed-book nodes, licenses, copyright holders, and external WebPage nodes is deferred; do not over-model before launch unless necessary.
- `.aiassistant/rules/*.md` are intended to be concise operational extracts from `current.md`, not a competing memory system. If absent or stale, update them from this file and actual code rather than from old generated summaries.
