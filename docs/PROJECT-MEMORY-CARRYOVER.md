# Project Memory Carryover

## 1. Project purpose

This is Stevan Veljkovic’s personal academic/professional website:

```text
https://stevanveljkovic.com/
```

It should function as a durable academic/research hub, not a generic portfolio.

Public identity:

```text
Stevan Veljkovic
Theory and editing
Oxford, England
```

Subject identity: religious studies, modern history, social theory, secularism,
climate change, liberalism.

Core public identifiers:

```text
ORCID:          https://orcid.org/0000-0002-2599-3227
Google Scholar: https://scholar.google.com/citations?user=e42TN4UAAAAJ
GitHub:         https://github.com/smveljkovic
Email:          hello@stevanveljkovic.com
```

The ORCID URL is the canonical structured-data `Person.@id`:

```text
https://orcid.org/0000-0002-2599-3227
```

Canonical site domain:

```text
https://stevanveljkovic.com/
```

Separate seminars subdomain:

```text
https://seminars.stevanveljkovic.com/
```

The site has been migrated from hand-authored HTML/CSS to Astro while preserving
existing URLs, scholarly metadata, PDFs, JSON-LD, and the distinctive visual
identity.

## 2. Current state

Current Astro project root:

```text
/Users/stevan/Projects/smvsite-astro
```

Earlier vanilla site was `smvsite` / possibly `/Users/stevan/Website/smvsite`.

The Astro migration is in Stage 3:

```text
Stage 3 = harden + expand + launch
```

The main Astro architecture is in place:

- Astro configuration with canonical site URL and trailing-slash routing;
- content collections for reviews and publication-list items;
- dynamic review route;
- generated `/publications/` page;
- centralized JSON-LD generation for reviews and publications;
- preserved legacy visual identity.

Stage 3 is not another structural migration or redesign. It is the hardening,
metadata, URL-preservation, expansion, and first-live-deployment phase.

Current generated/live canonical routes include:

```text
/
/publications/
/cv/
/publications/reviews/cosmic-connections/
/publications/reviews/christian-right-europe/
```

Current Markdown-driven review pages:

```text
src/content/reviews/cosmic-connections.md
src/content/reviews/christian-right-europe.md
```

Dynamic review route:

```text
src/pages/publications/reviews/[slug]/index.astro
```

Review JSON-LD is generated through:

```text
src/data/schema/reviews/createReviewSchema.ts
```

with:

```ts
const jsonLd = createReviewSchema(review);
```

Publications-page JSON-LD is centralized and should model:

```text
CollectionPage
  mainEntity → ItemList
    itemListElement → ListItem[]
```

Sitemap entries should include only actual generated, non-draft canonical pages.
Do not include planned-but-not-live review routes until they are intentionally
generated.

## 3. Stage 3 definition

Stage 3 takes the substantially working local Astro rebuild to a
production-ready live website.

Priorities:

1. harden the existing Astro site;
2. validate and improve scholarly metadata;
3. add the next set of review pages as drafts first;
4. preserve old URLs where possible;
5. document and execute the first live deployment.

Non-goals:

- Do not replace Astro.
- Do not adopt a generic academic theme.
- Do not redesign the site.
- Do not casually rename legacy CSS classes.
- Do not conflate local manuscripts with published DOI versions.
- Do not use false `sameAs` relationships in JSON-LD.
- Do not add planned pages to schema or sitemap until they actually exist.
- Do not publish local full-text review pages until copyright/reuse status is
  clear.
- Do not make Stage 3 depend on replacing `citationHtml` with a full citation
  rendering system.

Stage 3 completion requires checks to pass, live routes to render,
`/publications/` to contain the intended bibliography, JSON-LD to validate
truthfully, legacy URLs to be inventoried/preserved where feasible, deployment
to be documented, and the Astro site to be live at:

```text
https://stevanveljkovic.com/
```

## 4. AI assistant rules and project memory

Distilled assistant rules live in:

```text
.aiassistant/rules/
```

The rule:

```text
60-project-memory.md
```

is a pointer rule to:

```text
docs/project-memory/
```

Use `.aiassistant/rules/` for current assistant behaviour constraints and
`docs/project-memory/` for project memory/context. Do not treat old chat
discussion as authoritative if it conflicts with these maintained files or
current planning documents.

The org task system has been reorganized around Stage 3.1–3.8. Use that
structure when checking or updating task status.

## 5. Key architecture / implementation details

Framework: Astro. Keep Astro; do not switch back to Eleventy or adopt a full
theme. Astro is used for static generation, clean trailing-slash routes, content
collections, Markdown, build-time SEO/JSON-LD, and possible future islands.

Astro config should have:

```js
site: "https://stevanveljkovic.com",
trailingSlash: "always",
```

Preferred config shape:

```js
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://stevanveljkovic.com",
  trailingSlash: "always",
  integrations: [sitemap()],
});
```

Routing model:

```text
src/pages/index.astro                              → /
src/pages/publications/index.astro                → /publications/
src/pages/cv/index.astro                          → /cv/
src/pages/publications/reviews/[slug]/index.astro →
/publications/reviews/<slug>/
```

Dynamic reviews use content collection entries. Important naming convention:

```ts
entry = full Astro collection entry
review = entry.data
```

Correct:

```ts
entry.id
entry.data
review.slug
review.title
review.citationHtml
```

Avoid:

```ts
review.id
review.data.title
```

unless the object is actually a full entry.

Dynamic route should query non-drafts:

```ts
getCollection("reviews", ({ data }) => !data.draft)
```

and use `entry.data.slug` for route params.

Static route masking warning: Astro static routes take priority over dynamic
routes. Do not keep old per-review files under
`src/pages/publications/reviews/...`, e.g.:

```text
src/pages/publications/reviews/cosmic-connections.astro
src/pages/publications/reviews/cosmic-connections/index.astro
src/pages/publications/reviews/christian-right-europe/index.astro
```

They will mask the dynamic route.

Current Astro 6 content collection pattern:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
```

Use loader collections like:

```ts
loader: glob({
  base: "./src/content/reviews",
  pattern: "**/*.md",
})
```

Do not use duplicate `schema` keys. Avoid older imports from `astro:content` or
`astro:schema` for `z`.

CSS: preserve legacy/generated CSS globally for now. Preferred location:

```text
src/styles/global.css
```

imported once in `BaseLayout.astro`. Do not casually rename legacy classes yet,
especially:

```text
Basic-Text-Frame, Name, Details, Headings, BibHeading, BibEntry,
counter_bib, countercontrol, control, review_intro, review_text,
review_par, counter, title, intro, byline, review_byline, trigger,
test, CVEntry, nav-list, pronunciation
```

Asset model: use root-relative URLs mapping to `public/`:

```html
/images/headshot-1200x630.png
/favicon.ico
/cv/veljkovic-cv.pdf
/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
```

Avoid fragile deep relative paths.

## 6. Titles, metadata, and URL helpers

A predictable SEO/title system has been adopted.

Rules:

```text
Homepage <title>:
Stevan Veljkovic

Ordinary internal pages:
{Page name} | Stevan Veljkovic

Review pages:
Review of {Reviewed work short title} | Stevan Veljkovic

Article/publication pages with their own title:
{Article title} | Stevan Veljkovic
```

Current intended examples:

```text
/                                           → Stevan Veljkovic
/publications/                              → Publications | Stevan Veljkovic
/cv/                                        → CV | Stevan Veljkovic
/publications/reviews/cosmic-connections/  → Review of Cosmic Connections |
Stevan Veljkovic
/publications/reviews/christian-right-europe/
                                            → Review of The Christian Right in
Europe | Stevan Veljkovic
```

`WebSite.name`, `Person.name`, and `og:site_name` should be:

```text
Stevan Veljkovic
```

Descriptive phrases such as “Theory and editing”, “theorist and editor”,
Oxford, and subject areas belong in descriptions, visible copy, and JSON-LD
`description`/`about`, not in the canonical site name.

Preferred implementation direction:

```text
src/data/site.ts          → global site identity and title formatter
src/data/pageMeta.ts      → metadata for fixed static routes
content frontmatter       → metadata for dynamic content pages
SeoHead.astro             → renders final <title> and meta tags
layouts                   → pass metadata through, but do not invent it
```

Central title formatter logic:

```ts
export function formatTitle(pageTitle?: string): string {
  if (!pageTitle || pageTitle === site.siteName) {
    return site.siteName;
  }

  return `${pageTitle} | ${site.siteName}`;
}
```

Important site constants should reflect the current identity, including:

```ts
url: "https://stevanveljkovic.com",
siteName: "Stevan Veljkovic",
author: "Stevan Veljkovic",
email: "hello@stevanveljkovic.com",
analyticsId: "G-7VMGXMNZZ0",
language: "en-GB",
image: "/images/headshot-1200x630.png",
orcid: "https://orcid.org/0000-0002-2599-3227",
scholar: "https://scholar.google.com/citations?user=e42TN4UAAAAJ",
github: "https://github.com/smveljkovic",
```

Use centralized URL helpers to avoid double slashes in canonical URLs and
JSON-LD IDs. Preferred pattern:

```ts
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

export function nodeId(path: string, fragment: string): string {
  return `${absoluteUrl(path)}#${fragment}`;
}
```

Avoid manual string concatenation such as:

```ts
`${site.url}/${path}`
```

Clean examples:

```text
https://stevanveljkovic.com/
https://stevanveljkovic.com/#website
https://stevanveljkovic.com/#homepage
https://stevanveljkovic.com/images/headshot-1200x630.png
```

Open Graph image:

```text
/images/headshot-1200x630.png
1200 × 630 PNG
```

## 7. Structured data principles

General principles:

- ORCID URL is stable `Person.@id`.
- DOI URLs are stable IDs for scholarly works when available.
- Normalize DOI handling consistently, including `doi.org` and `dx.doi.org`
  variants.
- No schema `@id` should become an array.
- JSON-LD belongs on canonical pages, not redirect stubs.
- Visible content and JSON-LD should agree.
- Validate rendered page-source JSON-LD, not TypeScript object literals.
- Prefer truthful modest schema over ambitious inaccurate schema.
- Do not include the rejected/conflated OpenAlex profile.
- Use date-only values for publication dates unless an actual meaningful time is
  known.
- Use precise datetimes only when the time is real and meaningful.

Example date rule:

```json
"datePublished": "2025-07-25"
```

Avoid invented noon/midnight datetimes. For Christian Right, retain the real
creation/submission datetime:

```json
"dateCreated": "2024-10-29T18:22:00+00:00"
```

Home and CV schemas remain manual:

```text
src/data/schema/home.ts
src/data/schema/cv.ts
```

Do not use `createReviewSchema()` on homepage or CV.

### Homepage JSON-LD

The homepage graph is conceptually acceptable with nodes for:

```text
ImageObject
Person
WebSite
AboutPage
```

The homepage page node may be `AboutPage`; it does not need to be `WebSite`.
The `WebSite` node represents the whole site, while the homepage is a page about
the ORCID-identified `Person`.

Desired relationships:

```text
AboutPage.isPartOf → WebSite
AboutPage.mainEntity/about → Person
Person.image → ImageObject
WebSite.publisher → Person
```

`WebSite.name`:

```text
Stevan Veljkovic
```

`AboutPage.@id` should use:

```text
https://stevanveljkovic.com/#homepage
```

not the bare root URL as a node ID.

Homepage `hasPart` names should be semantic page/site names, not browser-title
strings. Prefer:

```text
CV
Publications
Seminars
```

over strings such as:

```text
Curriculum Vitae | Dr Stevan Veljkovic
Publications | Dr Stevan Veljkovic
Seminars | Dr Stevan Veljkovic
```

### Review JSON-LD

Review-page JSON-LD should distinguish:

1. Stevan as `Person`, identified by ORCID;
2. the reviewed work;
3. the published review/article, if applicable;
4. the local hosted review page or manuscript.

Review pages should include separate nodes for:

```text
Person
WebSite
WebPage
Reviewed work
Published DOI review, where available
Local review / hosted review representation
```

Review-page node ID pattern:

```text
WebSite:
https://stevanveljkovic.com/#website

WebPage:
https://stevanveljkovic.com/publications/reviews/<slug>/#webpage

Local Review:
https://stevanveljkovic.com/publications/reviews/<slug>/#review
```

The canonical page URL remains in `url`:

```text
https://stevanveljkovic.com/publications/reviews/<slug>/
```

Do not type the local review node as `WebSite`. `WebSite` is only the whole
site.

Key relationship pattern:

```text
WebPage.isPartOf → WebSite
WebPage.mainEntity → local Review node
WebPage.about → reviewed work
local Review.mainEntityOfPage → WebPage
local Review.itemReviewed → reviewed work
local Review.isBasedOn/citation → published DOI review, where applicable
published DOI Review.itemReviewed → reviewed work
WebSite.publisher / Review.author → ORCID Person
```

For review local nodes, current local review type remains acceptable:

```json
"@type": ["ScholarlyArticle", "Review"]
```

Local review nodes should use clean review-title strings for `name` and
`headline`, normally identical:

```json
"name": "Review of The Christian Right in Europe",
"headline": "Review of The Christian Right in Europe"
```

Implementation logic should be approximately:

```ts
const localReviewName =
  review.schemaName ??
  review.pageHeading ??
  review.seoTitle ??
  `Review of ${review.title}`;

const localReviewHeadline =
  review.schemaHeadline ??
  localReviewName;
```

Do not use the long explanatory sentence beginning “Stevan Veljkovic reviews …”
as `name` or `headline`. That sentence belongs in the visible dek, meta
description, JSON-LD `description`, or future orientation/summary fields.

Review schema special rules:

- Local hosted manuscript and DOI article are distinct if materially different.
- Do not use false `sameAs`.
- Use `isBasedOn` and/or `citation` from local version to published DOI version
  where appropriate.
- Use `itemReviewed` for reviewed work.
- Edited volumes should use `editor`, not an `author` string containing “(ed.)”.
- Add journal, volume, issue, article ID, pagination, DOI, and ISSN data where
  available and appropriate.
- Mixed `inLanguage` values are acceptable for now:
  `WebPage.inLanguage → en-GB`, `Review.inLanguage → en`.

For the Christian Right review, accepted structure includes:

```text
Person:
https://orcid.org/0000-0002-2599-3227

WebSite:
https://stevanveljkovic.com/#website

WebPage:
https://stevanveljkovic.com/publications/reviews/christian-right-europe/#webpage

Reviewed Book:
https://doi.org/10.1515/9783839460382

Published DOI Review:
https://doi.org/10.1093/jcs/csaf039

Local Review:
https://stevanveljkovic.com/publications/reviews/christian-right-europe/#review
```

Christian Right reviewed work is an edited volume and must be modelled with:

```json
"editor": {
  "@type": "Person",
  "name": "Gionathan Lo Mascolo"
}
```

Do not revert to:

```json
"author": {
  "name": "Gionathan Lo Mascolo (ed.)"
}
```

The current De Gruyter/Brill book-cover image URL has been checked by Stevan,
works, and is being retained:

```text
https://www.degruyterbrill.com/document/cover/isbn/9783839460382/product_pages/
```

Cosmic Connections special rule: local page is an unabridged Original Submission
/ Author Manuscript and materially different from published version. Do not use
`sameAs` to DOI article. Use `isBasedOn`/`citation`; include version/status.

Christian Right description/standfirst rationalisation is deferred. For now, the
`description` may remain the standfirst-style string:

```text
This repository of rich and useful scholarship is bound together by a
tendentious thesis, writes Stevan Veljkovic.
```

Likely future model:

```yaml
title: "The Christian Right in Europe: Movements, Networks, and Denominations"
seoTitle: "Review of The Christian Right in Europe"
pageHeading: "Review of The Christian Right in Europe"
description: "Stevan Veljkovic reviews The Christian Right in Europe, edited by
Gionathan Lo Mascolo."
standfirst: "This repository of rich and useful scholarship is bound together by
a tendentious thesis, writes Stevan Veljkovic."
```

Do not force this refactor immediately.

Possible future Version of Record refinement is deferred. A cleaner future model
for true Version of Record cases may be:

```text
DOI node:
  ScholarlyArticle / Review

Local page node:
  WebPage
  mainEntity → DOI node
  about → reviewed work
  citation → DOI node
```

## 8. Review page display and SEO

Review pages should pass SEO props correctly through:

```text
review page → ReviewLayout → BaseLayout → SeoHead
```

Review pages should receive intended Open Graph article metadata, normally:

```html
<meta property="og:type" content="article">
```

Review pages preserve original scholarly/manuscript visual style:

```astro
<ReviewIntro review={review} />

<div class="review_text">
  <Content />
  <ReviewByLine bylineHtml={review.bylineHtml} />
</div>
```

A visible `h1`–dek pattern has been added to `ReviewIntro.astro` for
SEO/accessibility/semantic HTML.

Heading derivation:

```ts
const heading =
  review.pageHeading ??
  review.seoTitle ??
  `Review of ${review.title}`;
```

Visible `h1` examples:

```text
Review of Cosmic Connections
Review of The Christian Right in Europe
```

A short dek may be generated when reviewed-work creator data is available:

```text
Stevan Veljkovic reviews Cosmic Connections by Charles Taylor.
Stevan Veljkovic reviews The Christian Right in Europe, edited by Gionathan Lo
Mascolo.
```

Editor wording should preserve the comma:

```text
Stevan Veljkovic reviews The Christian Right in Europe, edited by Gionathan Lo
Mascolo.
```

Current editorial decision: freeze the h1/dek + existing
intro/citation/version block for now, even though it repeats the reviewed-work
title multiple times.

Deferred note:

```text
Review intro repeats reviewed-work title in h1, dek, and citation; revisit
display hierarchy after additional review pages are added.
```

Do not change review byline email behavior casually; historical mismatch may be
intentional:

```html
<a
href="mailto:correspondence@stevanveljkovic.com">stevan.veljkovic@theology.ox.ac
.uk</a>
```

`set:html` is acceptable for trusted local migration fields only:

```yaml
citationHtml
bylineHtml
originalSubmissionNote
publicationList.noteHtml
```

## 9. Important files and commands

Core files:

```text
astro.config.mjs
src/content.config.ts
src/styles/global.css
```

Pages:

```text
src/pages/index.astro
src/pages/publications/index.astro
src/pages/cv/index.astro
src/pages/publications/reviews/[slug]/index.astro
```

Layouts:

```text
src/layouts/BaseLayout.astro
src/layouts/HomeLayout.astro
src/layouts/TextPageLayout.astro
src/layouts/ReviewLayout.astro
```

Components:

```text
src/components/Analytics.astro
src/components/FaviconLinks.astro
src/components/SeoHead.astro
src/components/JsonLd.astro
src/components/ReviewIntro.astro
src/components/ReviewByLine.astro
```

Check exact capitalization of `ReviewByLine.astro` before importing.

Data/schema:

```text
src/data/site.ts
src/data/pageMeta.ts
src/data/schema/home.ts
src/data/schema/cv.ts
src/data/schema/reviews/createReviewSchema.ts
src/data/schema/publications/createPublicationsSchema.ts
```

Old/reference schema files may exist:

```text
src/data/schema/reviews/cosmic-connections/cosmic-connections.ts
src/lib/schema/review.ts
```

Keep the rich old Cosmic schema as a benchmark/reference until generated schema
fully reproduces needed detail.

Current review content:

```text
src/content/reviews/cosmic-connections.md
src/content/reviews/christian-right-europe.md
```

Publication-list items are in:

```text
src/content/publication-items/
```

Stage 3 planned new full review content files:

```text
src/content/reviews/godless-crusade.md
src/content/reviews/hell-christian-ecology.md
src/content/reviews/challenging-modernity.md
```

These should be created as drafts first:

```yaml
draft: true
```

Important assets:

```text
public/images/headshot-1200x630.png
public/favicon.ico
public/favicon.svg
public/site.webmanifest
public/cv/veljkovic-cv.pdf
public/publications/reviews/cosmic-connections/veljkovic-review-cosmic-
connections.pdf
public/publications/reviews/christian-right-europe/veljkovic-review-christian-
right-europe.pdf
```

Development/build:

```bash
npm run dev
npm run preview
npx astro sync
npx astro check
npm run build
```

Inspect generated routes/content:

```bash
find src/pages -type f | sort
find src/content -maxdepth 4 -type f | sort
find dist -maxdepth 5 -type f | sort
find dist -name "sitemap*.xml" -print -exec cat {} \;
```

Find static files that may mask dynamic review routes:

```bash
find src/pages/publications/reviews -type f
```

Validation:

```text
https://validator.w3.org/
https://validator.schema.org/
https://search.google.com/test/rich-results
https://pagespeed.web.dev/
```

Rich Results may report “no items detected” for general schema types; use Schema
Markup Validator for general JSON-LD.

## 10. Decisions and constraints to preserve

Preserve the custom visual/design identity. Do not convert the site into a
generic academic Astro theme. Refactor only after routing/content/schema
migration is stable.

Homepage navigation labels/links:

```html
Contact → mailto:hello@stevanveljkovic.com
Résumé  → /cv/
Writing → /publications/
Seminars → https://seminars.stevanveljkovic.com/
```

Pronunciation link:

```text
https://ipa-reader.com/?text=stεv(%C9%99)n&voice=Brian
```

Displayed IPA:

```text
/ˈstεv(ə)n ˈvεlˌkəːvɪk/
```

Use `lang="und-fonipa"` on IPA span.

Accessibility/design constraints:

- Internal CV link should not use `target="_blank"`.
- External `_blank` links need `rel="noopener"` or `rel="noopener noreferrer"`.
- Decorative nav icons: `alt="" aria-hidden="true"`.
- Homepage nav `<ul>` must contain `<li>` children.
- Preserve `p.Headings` unless CSS is rewritten.
- Homepage `h1.Name` must be visible in Safari.
- Pages should have appropriate landmarks where possible.
- Long review pages should remain readable on mobile.
- Review pages should have acceptable heading/link structure.

Publications page should preserve grouped-by-year bibliography, old classes such
as `BibEntry`, `counter_bib`, `test#writings`, exact citation formatting, and
note lines.

Content model decision:

- full local review pages belong in `src/content/reviews/`;
- bibliography-only items belong in `src/content/publication-items/`;
- do not force every bibliography entry into `reviews`.

`/publications/` should be generated from both `reviews` and
`publicationItems`.

Publications JSON-LD identifier preference:

1. DOI URL, if available;
2. canonical local page URL, if available;
3. stable local fragment URL.

Thesis canonical future slug:

```text
/thesis/religious-atavism-climate-crisis/
```

Do not revert to:

```text
/thesis/atavism-climate-crisis/
```

Old URLs to preserve/redirect/keep in mind:

```text
/writing.html
/writing/ReviewCosmicConnectionsV2.html
/writing/ReviewCosmicConnectionsV2.pdf
/itinerary.pdf
```

GitHub Pages cannot do arbitrary server redirects. If staying on GitHub Pages,
use static HTML redirect stubs with canonical, meta refresh, `location.replace`,
and visible fallback link. No full JSON-LD on redirect stubs. Do not replace old
PDF URLs with HTML redirects; keep PDFs as PDFs unless true HTTP redirects are
available later.

Netlify or Cloudflare Pages can provide real redirects. For old HTML routes,
prefer:

```text
301 → new canonical URL
```

Do not use 303 for ordinary old-page-to-new-page redirects.

## 11. Planned new review pages

Stage 3 planned full review pages:

```text
/publications/reviews/godless-crusade/
/publications/reviews/hell-christian-ecology/
/publications/reviews/challenging-modernity/
```

Expected content files:

```text
src/content/reviews/godless-crusade.md
src/content/reviews/hell-christian-ecology.md
src/content/reviews/challenging-modernity.md
```

Initial rule:

```yaml
draft: true
```

Each new review should remain draft until its text, metadata, rights status,
version wording, and schema have been checked.

For each new review, confirm:

- local slug and canonical path;
- citation;
- reviewed-work metadata;
- published-review metadata, if applicable;
- DOI;
- local PDF path, if any;
- version status;
- copyright/reuse statement;
- publication-list entry;
- generated JSON-LD;
- sitemap behaviour once live.

Do not publish rights-sensitive full text until reuse status is clear.

Before publishing additional local review texts, define consistent display and
metadata rules for:

- Version of Record;
- Accepted Author Manuscript;
- Author Manuscript;
- Submitted Manuscript;
- Original Submission;
- preprint;
- first publication date;
- first online publication date;
- DOI;
- copyright holder;
- reuse permission;
- required credit line;
- local PDF availability.

## 12. Deployment plan

Stage 3 includes the first live deployment.

Likely initial deployment path:

```text
Astro build → GitHub Pages → stevanveljkovic.com
```

A later hosting move may be considered for better redirects and deployment
features:

```text
GitHub Pages → Netlify or Cloudflare Pages
```

Deployment preparation tasks:

- create/update `docs/deployment.md`;
- create/update `docs/launch-checklist.md`;
- decide the initial deployment method;
- begin with GitHub Pages unless a better first-launch target is chosen;
- confirm custom domain handling;
- confirm whether `public/CNAME` is needed;
- confirm DNS records;
- confirm build output and deployment branch/workflow;
- add a GitHub Actions workflow if deploying through GitHub Pages.

First live deployment tasks:

- run final local checks;
- run local preview;
- deploy;
- verify the live site;
- verify live PDFs and assets;
- verify sitemap;
- validate live JSON-LD;
- check canonical URLs and trailing slashes;
- check old URL stubs;
- monitor Google/Search Console behaviour if available.

## 13. Stage 3.1 status and open issues

Stage 3.1 items materially improved or addressed:

```text
double-slash URL bug fixed
homepage WebSite.name aligned with title system
review h1/dek added
review JSON-LD edited-volume modelling fixed
review JSON-LD name/headline behaviour fixed
review local node ID fixed with #review
separate review WebPage node added with #webpage
review-page WebSite node added correctly
datePublished precision cleaned
```

Remaining Stage 3.1 issues are refinements, not blockers:

```text
description/standfirst rationalisation
richer journal/periodical metadata
possible future Version of Record WebPage/DOI-node model
review intro visual/content density
broader content-model cleanup after more review pages exist
```

Current open issues:

1. Run or re-run Stage 3 baseline checks after significant changes:

```bash
npx astro sync
npx astro check
npm run build
```

2. Remove production debugging output, especially any `console.log()` in page
   generation.
3. Audit generated routes and sitemap; sitemap must contain only real canonical
   non-draft pages.
4. Verify rendered SEO/title output follows the adopted title system.
5. Confirm review pages pass SEO props through:

```text
review page → ReviewLayout → BaseLayout → SeoHead
```

6. Confirm review pages use intended Open Graph article metadata.
7. Validate rendered homepage JSON-LD, especially `ImageObject`, `Person`,
   `WebSite`, `AboutPage`, `#website`, and `#homepage`.
8. Validate rendered review JSON-LD, especially separate `WebPage` `#webpage`
   and local Review `#review` nodes.
9. Continue hardening JSON-LD node IDs so no `@id` can become an array.
10. Normalize DOI handling consistently, including `doi.org` and `dx.doi.org`
    variants.
11. Confirm `/publications/` is generated from both `reviews` and
    `publicationItems`.
12. Compare rendered `/publications/` against the intended bibliography,
    including year grouping, sort dates, manual order, citation formatting, DOI
    links, local links, PDF links, and note lines.
13. Harden `/publications/` `CollectionPage` / `ItemList` JSON-LD.
14. Add richer review metadata where available and appropriate: journal,
    periodical, volume, issue, article ID, pagination, DOI, ISSNs.
15. Verify Christian Right metadata: exact published date, volume/issue,
    `csaf039`, ISSNs, PDF filename/path, and version wording.
16. Add the three new review pages as drafts:

```text
src/content/reviews/godless-crusade.md
src/content/reviews/hell-christian-ecology.md
src/content/reviews/challenging-modernity.md
```

17. Define consistent copyright, version, and review-page display rules before
    publishing additional local review texts.
18. Create `docs/legacy-urls.md`; inventory old HTML pages, PDFs, CV paths,
    image paths, and externally linked assets.
19. Add static redirect stubs for GitHub Pages where needed; keep old PDF URLs
    serving PDFs where feasible.
20. Decide thesis-page scope for Stage 3.

Option A: thesis remains bibliography-only during Stage 3.

If so:

- document that decision;
- do not include a thesis page in sitemap;
- do not link CV schema to a non-existent thesis page.

Option B: thesis page is implemented during Stage 3.

If so:

- add the route;
- add or link the PDF if appropriate;
- add thesis metadata;
- include the ARK identifier;
- update `/publications/`;
- update CV schema;
- validate rendered JSON-LD.

Planned thesis route if implemented:

```text
src/pages/thesis/religious-atavism-climate-crisis/index.astro
```

21. Create/update deployment documentation and launch checklist.
22. Confirm GitHub Pages workflow, custom domain, DNS, and `public/CNAME` needs.
23. Fix or consciously defer remaining small accessibility/design issues,
    including Safari homepage `h1.Name` visibility.
24. Seminars consolidation remains undecided.

## 14. Immediate next steps

Preferred Stage 3 sequence:

1. Run baseline checks:

```bash
npx astro sync
npx astro check
npm run build
```

2. Run local inspection:

```bash
npm run dev
npm run preview
```

Inspect at least:

```text
http://localhost:4321/
http://localhost:4321/publications/
http://localhost:4321/cv/
http://localhost:4321/publications/reviews/cosmic-connections/
http://localhost:4321/publications/reviews/christian-right-europe/
```

3. Audit current routes/content/sitemap:

```bash
find src/pages -type f | sort
find src/content -maxdepth 4 -type f | sort
find dist -maxdepth 5 -type f | sort
find dist -name "sitemap*.xml" -print -exec cat {} \;
```

4. Validate rendered source for homepage, publications, CV, and current review
   JSON-LD.
5. Confirm dynamic review route imports only:

```ts
import { createReviewSchema } from
"../../../../data/schema/reviews/createReviewSchema";
```

and calls:

```ts
const jsonLd = createReviewSchema(review);
```

Homepage should use `homeSchema`; CV should use `cvSchema`; no active route
should import `buildReviewSchema`. Old Cosmic schema remains reference only.

6. Confirm `/publications/` data integrity and publications JSON-LD.
7. Add the three new reviews as drafts first.
8. Resolve copyright/version/display rules.
9. Publish new reviews one by one only after validation.
10. Inventory and preserve legacy URLs.
11. Prepare GitHub Pages deployment documentation/workflow.
12. Deploy live.
13. Validate the live site and decide whether to remain on GitHub Pages or move
    later to Netlify/Cloudflare.