# Current Project Memory

## 1. Project status

- Project: Stevan Veljkovic’s personal academic/professional Astro website, intended as a durable academic/research hub.
- Canonical domain: `https://stevanveljkovic.com/`
- Separate seminars site: `https://seminars.stevanveljkovic.com/`
- Current local root: `/Users/stevan/Projects/smvsite-astro`
- Current git branch: `main`
- Git remote `origin`: `https://github.com/smveljkovic/smveljkovic.github.io.git`
- Current phase: post-launch validation / Stage 3.7 deployment hardening, not a redesign.
- Site is live at `https://stevanveljkovic.com/`.
- `https://www.stevanveljkovic.com/` redirects permanently to the apex domain.
- GitHub Pages deployment uses GitHub Actions artifact publishing from `origin/main`.
- `.github/workflows/deploy.yml` currently uses manual `workflow_dispatch`; enabling build-on-push to `main` is intended as the last Stage 3 subtask.
- `public/CNAME` contains exactly `stevanveljkovic.com`.
- Latest observed `dist/` snapshot: static Astro site, 7 pages:
  - `/`
  - `/cv/`
  - `/publications/`
  - `/publications/reviews/cosmic-connections/`
  - `/publications/reviews/evolution-of-religions/`
  - `/publications/reviews/godless-crusade/`
  - `/publications/reviews/hell-christian-ecology/`
- Current code has `challenging-modernity` and `christian-right-europe` drafted/withheld from page generation.
- Withheld review image/material folders temporarily live at `~/Projects/website-admin/withheld-images-folders/`.

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
- `draft:true` controls review page generation only; it does not protect static files under `public/`.
- `/publications/` derives:
  - review bibliography entries from `getCollection("reviews", ({ data }) => data.publicationList.include !== false)`, including drafted reviews;
  - local webpage/PDF links only for non-draft reviews;
  - list-only items from non-draft `publicationItems` whose IDs are not already represented by reviews.
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
- Homepage contact uses `site.email`; current canonical code value is
  `stevan@stevanveljkovic.com`.
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
  - `public/publications/reviews/hell-christian-ecology/veljkovic-review-hell-christian-ecology.pdf`
- Important missing/unchecked asset issue:
  - latest selected public tree does **not** show PDFs for `christian-right-europe`, `godless-crusade`, or `challenging-modernity`.
  - verify content references before making any withheld/draft review live.
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
  - current code has it drafted/withheld from page generation.
  - local version is a Taylor & Francis Version-of-Record reproduction.
  - published review DOI: `https://doi.org/10.1080/09637494.2024.2408091`
  - reviewed book DOI: `https://doi.org/10.7312/bell21488`
  - must remain drafted/withheld unless T&F/CCC permission is clarified.
  - It still appears as a bibliographic DOI item on `/publications/` if `publicationList.include !== false`.
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
- `/publications/` derives review list entries from review content, including drafted reviews where `publicationList.include !== false`, and generates local-resource pills only for non-draft reviews where `canonicalPath`/`pdfPath` exist.
- Authorial-voice rule:
  - Suggested wording is acceptable for short collaborative labels/copy.
  - Do not generate extended prose in Stevan’s authorial voice or personal communications unless explicitly asked.
- Project memory rule:
  - actual code/build output is highest authority.
  - `docs/project-memory/current.md` should be compact operational memory.
  - deltas are change history and should be incorporated into `current.md`.
  - raw logs/generated summaries are audit material, not automatic current authority.

## 7. Known issues, cautions, and unresolved questions

- **T&F rights caution:** no Taylor & Francis Version-of-Record page should go
  live until T&F/CCC confirms permission. Current code has
  `challenging-modernity` withheld; keep it absent from routes, sitemap, and
  public assets unless that decision changes.
- `godless-crusade` AM is acceptable in principle under T&F author-reuse policy, but still needs final verification for:
  - exact visible AM wording
  - Goodhart correction note
  - text/version accuracy
  - schema
  - sitemap
  - absence of VoR PDF/text
- Current canonical contact email in code is `stevan@stevanveljkovic.com`.
  Homepage and review intro use `site.email`; individual review `bylineHtml`
  may still contain manuscript-specific byline addresses.
- Possible OG image mismatch:
  - public tree has `/images/headshot-1200x630.JPG`
  - older notes expected `/images/headshot-1200x630.png`
  - inspect `src/data/site.ts` and generated page source for broken image URLs.
- Latest selected public tree confirms review PDFs for Cosmic and Hell only.
  Godless currently has no local PDF; drafted/withheld Christian Right and
  Challenging Modernity PDF/image assets are not in `public/`.
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
- GitHub Pages legacy stop-gaps are implemented for:
  - `/writing.html`
  - `/writing/ReviewCosmicConnectionsV2.html`
  - `/writing/ReviewCosmicConnectionsV2.pdf`
  - `/itinerary.pdf`
  Old PDF URLs remain PDFs on GitHub Pages; the old Cosmic V2 PDF path may serve
  the current Cosmic PDF as a compatibility alias.

## 8. Immediate next steps

1. Fix or deliberately resolve the OG/headshot mismatch:
   - code/build output references `/images/headshot-1200x630.png`;
   - current public file is `/images/headshot-1200x630.JPG`.
2. Repeat PageSpeed checks and record metrics for the homepage and at least one review page.
3. Recheck legacy URL behaviour after deployment:
   - `/writing.html`
   - `/writing/ReviewCosmicConnectionsV2.html`
   - `/writing/ReviewCosmicConnectionsV2.pdf`
   - `/itinerary.pdf`
4. Keep `challenging-modernity` and `christian-right-europe` withheld unless rights/publication decisions change.
5. Enable automatic deployment on push to `main` as the final Stage 3 subtask once the manual workflow is judged stable.
6. Fix schema/frontmatter mismatches where stripped fields are meant to matter.
7. Clean placeholder-like sort/date metadata.
8. Resolve any remaining Hell-specific metadata questions.

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

- Older notes listing only Cosmic and Christian Right as live review pages are superseded by current code and current draft state.
- Older planned-page notes for Hell, Challenging Modernity, Evolution of Religions, and Godless Crusade are mostly superseded by current files, but rights/asset validation remains active.
- Earlier public identity said “Theory and editing”; current homepage code says “Theory and design”. Confirm desired wording before further identity work.
- Older constants said `hello@stevanveljkovic.com` or `contact@stevanveljkovic.com`; current code uses `stevan@stevanveljkovic.com` through `site.email`.
- Older expected headshot path `/images/headshot-1200x630.png` may be superseded or broken; current public file shown is `/images/headshot-1200x630.JPG`.
- Older Case font path notes used `public/fonts/Case/...`; current code uses lowercase `public/fonts/case/...` and simplified lowercase filenames.
- Older PDF convention used `veljkovic-review-<slug>.pdf`; current/planned paths may differ.
- Current `publicationList.year` and sorting choices may not match final bibliographic grouping decisions, especially for Challenging Modernity and Godless Crusade.
- Richer `/publications/` JSON-LD for reviewed-book nodes, licenses, copyright holders, and external WebPage nodes is deferred; do not over-model during post-launch hardening unless necessary.
- `.aiassistant/rules/*.md` are intended to be concise operational extracts from `current.md`, not a competing memory system. If absent or stale, update them from this file and actual code rather than from old generated summaries.

## 11. Other information

### Rights and permissions table

General notes:
- Accepted Manuscript (AM)
- Author’s Original Manuscript (AOM)
- Version of Record (VoR)
- It is standard policy amongst publishers that author reuse of Accepted Manuscript (AM) versions is automatic
  - Although in some cases this can be subject to embargo
- For blogs equivalent of VoR is URL
- If the value of `Permission/clarification sought?` is `Yes`, then permissions or rights should *not* be regarded as final
- Other useful information
  - [OUP policy](https://academic.oup.com/pages/open-research/open-access/charges-licences-and-self-archiving/author-self-archiving-policy)
- All items, regardless of launch status, should appear on bibliography
- `Live if AM only` means that permission for VoR use has been sought but is not yet finally confirmed
  - In these cases, if the launch deadline is approaching and VoR permission remains outstanding, launch should proceed with the AM
- If the cell for `Rights platform` is not blank, permission has been sought or obtained on that platform
  - Unless otherwise specified, that permission is for use of the VoR
- Platform credit language would not ordinarily apply except in cases of permissions granted for use of the VoR
- Publisher credit language applies even when the version used is AM
  - Credit language is recorded here for completeness, but the practice adopted in this project is not to adhere strictly to these suggestions
  - Because suggested credit language is often in bad style, the policy is to make sure that every *element* of suggested language is included although the form may differ significantly from the suggested wording

#### Rights status of the various publications

| Pub                    | Publisher                              | Holder            | Open access? | Version on site | Reuse basis                      | Reuse URL or email information                                                                                                                                                                                                            | Rights platform, if any | Permission/clarification sought? | Launch status   | Rights-platform credit language                                | Publisher suggested credit language                                                                                                                                    |
|------------------------|----------------------------------------|-------------------|--------------|-----------------|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------|----------------------------------|-----------------|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| godless-crusade        | Taylor & Francis                       | Stevan Veljkovic  | No           | AM              | Publisher policy                 | https://authorservices.taylorandfrancis.com/research-impact/sharing-versions-of-journal-articles/                                                                                                                                         | PLSClear                | Yes                              | Live if AM only | ‘Reproduced with permission of the Licensor through PLSclear.’ | ‘This is an Accepted Manuscript of an article published by Taylor & Francis in [JOURNAL TITLE] on [date of publication], available at: https://doi.org/[Article DOI].’ |
| cosmic-connections     | Sage Publications                      | Stevan Veljkovic  | No           | AOM             | Publisher policy                 | https://www.sagepub.com/journals/permissions/sages-author-archiving-and-re-use-guidelines/                                                                                                                                                |                         | No                               | Live            |                                                                |                                                                                                                                                                        |
| challenging-modernity  | Taylor & Francis                       | Stevan Veljkovic  | No           | VoR             | Permission provisionally granted | [Email from no-reply@email.copyright.com: Additional Information Needed for Your Request to Taylor & Francis Informa UK Ltd - Journals](message://%3C0100019e68ed1644-c6e37698-4b56-469f-b0f8-42eef4365670-000000@email.amazonses.com%3E) | CCC                     | Yes                              | Live if AM only |                                                                |                                                                                                                                                                        |
| hell-christian-ecology | Equinox Publishing                     | Stevan Veljkovic  | Yes          | VoR             | Licensed: CC BY-NC-ND            | https://journal.equinoxpub.com/JSRNC/Open                                                                                                                                                                                                 |                         | No                               | Live            |                                                                |                                                                                                                                                                        |
| evolution-of-religions | London School of Economics / LSE Blogs | Stevan Veljkovic  | Yes          | URL             | Licensed: CC BY                  | https://blogs.lse.ac.uk/republishing-policy/                                                                                                                                                                                              |                         | No                               | Live            |                                                                |                                                                                                                                                                        |
| christian-right-europe | Oxford University Press                | Stevan Veljkovic  | No           | VoR             | Permission provisionally granted | [Email from no-reply@email.copyright.com: Thank you for your order with RightsLink / Oxford University Press](message://%3C0100019e3bce63fe-6380f2eb-6054-4911-8f4c-ff46ce1a2670-000000@email.amazonses.com%3E)                           | CCC                     | Yes                              | Live if AM only |                                                                |                                                                                                                                                                        |

### Rules on use and management of files in public/

- No rights-uncertain PDF, image, or other publication asset should live under public/.
- `draft:true` controls page generation only; it does not protect static files in public/.
- A later stage should define an explicit allowlist of files permitted under `public/`.

### Rules regarding design and typography

- As an optical starting point:
  - All other parameters being equal, if a character of FF Meta Serif is 4mm, the same character in Case VAR will be about 5mm.
    - Therefore:
      - Treat FF Meta Serif as the baseline;
      - Adjust Case VAR downwards when visual parity is desired;
        - In ordinary use, good style will usually mean making this adjustment.


## 12. Project memory maintenance procedure

### Resources

- Scripts and directories for processing project-memory materials live in `~/Projects/web-admin/project-memory-materials`

### Procedure and best practice

- Overview conversations with gpt-5.5 are carried out in BBEdit AI Worksheets
  - These live normally in `~/Projects/web-admin/project-memory-materials/raw-logs/`
- Worksheet length threshold is ~ 20,000–25,000 words
  - When a conv approaches threshold, the thread is extracted into an .md file
    - The .md file is placed in `~/Projects/web-admin/project-memory-materials/inbox/delta-from-conversation/`
- A script which automates an API call produces a draft in `~/Projects/web-admin/project-memory-materials/draft-deltas/`
- The draft delta is examined and if acceptable moved to `docs/project-memory/deltas/`
- File naming for new deltas follows the pattern [date]-[conv_index]-[keywords].md
- The new delta is used as the basis for requests to gpt in WebStorm
  - First request is revision of core project-memory files
  - Second request is revision of .aiassistant rules
- Model prompt to WebStorm stored in `~/Projects/web-admin/project-memory-materials/prompts/2026-06-01-conv-14-webstorm-prompt.md`
- A new thread then begins in a fresh BBEdit worksheet using the contents of current.md as introductory context and reference material

## 13. Audit information

### JSON-LD audit 2026-06-01T10:34Z
- `Pass` means success
- multiple items of same type in `Detected data issues` share issues set unless otherwise noted 
  
| Page                   | Playground: https://json-ld.org/playground/ | Google Rich Results test: https://search.google.com/test/rich-results | Google detected item types         | Google detected issues                                                                                                                                                  | Notes |
|------------------------|---------------------------------------------|-----------------------------------------------------------------------|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------|
| /                      | Pass                                        | Pass                                                                  | None                               | None                                                                                                                                                                    |       |
| /cv/                   | Pass                                        | Pass                                                                  | 1 Profile page                     | None                                                                                                                                                                    |       | 
| /publications/         | Pass                                        | Pass                                                                  | 6 Articles <br/> 6 Review snippets | Articles [non-critical]: missing image; invalid datetime value for datePublished; datePublished missing timezone <br/> Review snippets [critical]: missing itemReviewed |       |
| cosmic-connections     | Pass                                        | Pass                                                                  | 2 Articles <br/> 2 Review snippets | Articles [non-critical]: missing image; invalid datetime value for datePublished; datePublished missing timezone <br/> Review snippets: None                            |       |
| godless-crusade        | Pass                                        | Pass                                                                  | 2 Articles <br/> 2 Review snippets | Articles [non-critical]: missing image; invalid datetime value for datePublished; datePublished missing timezone <br/> Review snippets: None                            |       |
| hell-christian-ecology | Pass                                        | Pass                                                                  | 2 Articles <br/> 2 Review snippets | Articles [non-critical]: missing image; invalid datetime value for datePublished; datePublished missing timezone <br/> Review snippets: None                            |       |
| challenging-modernity  | Pass                                        | Pass                                                                  | 2 Articles <br/> 2 Review snippets | Articles [non-critical]: missing image; invalid datetime value for datePublished; datePublished missing timezone <br/> Review snippets: None                            |       |
| christian-right-europe | Pass                                        | Pass                                                                  | 2 Articles <br/> 2 Review snippets | Articles [non-critical]: missing image; invalid datetime value for datePublished; datePublished missing timezone <br/> Review snippets: None                            |       |
| evolution-of-religions | Pass                                        | Pass                                                                  | 2 Articles <br/> 2 Review snippets | Articles [non-critical]: missing image; invalid datetime value for datePublished; datePublished missing timezone <br/> Review snippets: None                            |       |

## 14. Deployment notes / memory

### Legacy URLs

- The site is deployed first to GitHub Pages. A later move to a provider with
  true redirects remains optional.

| Old URL                                 | Long-term target                                                                 | Implementable on GitHub Pages? | Launch action                 | Notes                                                  |
|-----------------------------------------|----------------------------------------------------------------------------------|--------------------------------|-------------------------------|--------------------------------------------------------|
| /writing.html                           | /publications/                                                                   | Yes                            | Static redirect stub present  | Former writing/publications page                       |
| /writing/ReviewCosmicConnectionsV2.html | /publications/reviews/cosmic-connections/                                        | Yes                            | Static redirect stub present  | Old Cosmic Connections HTML                            |
| /writing/ReviewCosmicConnectionsV2.pdf  | /publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf | No                             | Retain page at old URL        | PDF URLs cannot be redirected properly on GitHub Pages |
| /itinerary.pdf                          | /cv/veljkovic-cv.pdf                                                             | No                             | Retain page at old URL        | Old PDF                                                |

### Deployment

Canonical domain: https://stevanveljkovic.com/

Framework: Astro static build.

Local checks:

```bash
npx astro sync
npx astro check
npm run build
npx serve dist
```

Deployment target: GitHub Pages.

Deployment method: GitHub Actions builds the Astro site and publishes `dist/`.

GitHub Pages source: GitHub Actions.

Custom domain: stevanveljkovic.com.

Sitemap submission target: `https://stevanveljkovic.com/sitemap-index.xml`.

Current workflow trigger: manual `workflow_dispatch`; enable build-on-push to
`main` as the final Stage 3 subtask after the manual workflow is stable.

Important:
- `public/` is copied directly to `dist/`.
- Only publishable files should be placed under `public/`.
- Draft review pages are not generated, but public assets are still copied if
  present.
---


### Launch checklist

#### Local checks

```bash
npx astro sync
npx astro check
npm run build
find dist -name "sitemap*.xml" -print -exec cat {} \;
find dist/publications -type f | sort
npx serve dist
```

Check:
- homepage
- CV
- publications
- intended live review pages
- withheld review pages absent
- PDFs/images/favicons
- sitemap includes only intended URLs

#### Rights checks

- Only permitted PDFs/assets are in `public/`.
- `challenging-modernity` withheld if T&F/CCC permission unresolved.
- Any `draft:true` review has no public assets unless intentionally permitted.

#### Live checks

```bash
curl -I https://stevanveljkovic.com/
curl -I https://www.stevanveljkovic.com/
curl -I https://seminars.stevanveljkovic.com/
```

Check:
- live homepage
- live CV
- live publications
- live sitemap
- JSON-LD validation for representative pages

## 15. Post-launch notes

### First GitHub Actions workflow run produced warnings

- *build* Node.js 20 actions are deprecated. The following actions are running on Node.js 20 and may not work as expected: actions/checkout@v4, actions/configure-pages@v5, actions/setup-node@v4, actions/upload-artifact@v4. Actions will be forced to run with Node.js 24 by default starting June 16th, 2026. Node.js 20 will be removed from the runner on September 16th, 2026. Please check if updated versions of these actions are available that support Node.js 24. To opt into Node.js 24 now, set the FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true environment variable on the runner or in your workflow file. Once Node.js 24 becomes the default, you can temporarily opt out by setting ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
- *deploy* Node.js 20 actions are deprecated. The following actions are running on Node.js 20 and may not work as expected: actions/deploy-pages@v4. Actions will be forced to run with Node.js 24 by default starting June 16th, 2026. Node.js 20 will be removed from the runner on September 16th, 2026. Please check if updated versions of these actions are available that support Node.js 24. To opt into Node.js 24 now, set the FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true environment variable on the runner or in your workflow file. Once Node.js 24 becomes the default, you can temporarily opt out by setting ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
