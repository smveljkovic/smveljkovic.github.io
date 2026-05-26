# Project Memory Carryover

## 1. Project purpose and identity

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

## 2. Current Astro state

Current Astro project root:

```text
/Users/stevan/Projects/smvsite-astro
```

The migration is in Stage 3:

```text
Stage 3 = harden + expand + launch
```

Stage 3 is not a redesign or structural migration. It is the hardening,
metadata, URL-preservation, expansion, and first-live-deployment phase.

Current canonical routes include:

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

Publications-page JSON-LD is generated through:

```text
src/data/schema/publications/createPublicationsSchema.ts
```

Publications page schema should remain:

```text
CollectionPage
  mainEntity → ItemList
    itemListElement → ListItem[]
```

Sitemap entries should include only actual generated, non-draft canonical pages.
Do not include planned-but-not-live review routes until they are intentionally
generated.

## 3. Architecture and rules to preserve

Framework: Astro. Do not switch back to Eleventy, adopt a generic academic
theme,
or redesign the site.

Astro config should have:

```js
site: "https://stevanveljkovic.com",
trailingSlash: "always",
```

Preferred config:

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

Dynamic reviews use content collection entries. Naming convention:

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

Avoid static review files under `src/pages/publications/reviews/...`; static
routes mask the dynamic route.

Current Astro 6 content collection pattern:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
```

Use loader collections, avoid duplicate `schema` keys, and avoid old `z`
imports.

Preserve legacy/global CSS for now:

```text
src/styles/global.css
```

imported once in `BaseLayout.astro`. Do not casually rename legacy classes such
as:

```text
Basic-Text-Frame, Name, Details, Headings, BibHeading, BibEntry,
counter_bib, countercontrol, control, review_intro, review_text,
review_par, counter, title, intro, byline, review_byline, trigger,
test, CVEntry, nav-list, pronunciation
```

Use root-relative public asset URLs:

```html
/images/headshot-1200x630.png
/favicon.ico
/cv/veljkovic-cv.pdf
/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
/publications/reviews/christian-right-europe/veljkovic-review-christian-right-
europe.pdf
```

## 4. Title, URL, and site metadata rules

Adopted title rules:

```text
Homepage <title>:
Stevan Veljkovic

Ordinary internal pages:
{Page name} | Stevan Veljkovic

Review pages:
Review of {Reviewed work short title} | Stevan Veljkovic
```

`WebSite.name`, `Person.name`, and `og:site_name` should be:

```text
Stevan Veljkovic
```

Descriptive phrases such as “Theory and editing”, “theorist and editor”,
Oxford, and subject areas belong in descriptions, visible copy, and JSON-LD
`description`/`about`, not in the canonical site name.

Important constants should reflect:

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

Use URL helpers to avoid double slashes:

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

## 5. Structured data principles

General rules:

- ORCID URL is stable `Person.@id`.
- DOI URLs are stable IDs for scholarly works when available.
- Normalize DOI handling consistently, including `doi.org` and `dx.doi.org`.
- No schema `@id` should become an array.
- JSON-LD belongs on canonical pages, not redirect stubs.
- Visible content and JSON-LD should agree.
- Validate rendered page-source JSON-LD, not TypeScript object literals.
- Prefer truthful modest schema over ambitious inaccurate schema.
- Do not include the rejected/conflated OpenAlex profile.
- Use date-only values unless an actual meaningful time is known.
- Do not invent noon/midnight datetimes.

Example:

```json
"datePublished": "2025-07-25"
```

The Christian Right creation/submission datetime remains meaningful:

```json
"dateCreated": "2024-10-29T18:22:00+00:00"
```

Home and CV schemas remain manual:

```text
src/data/schema/home.ts
src/data/schema/cv.ts
```

Do not use `createReviewSchema()` on homepage or CV.

## 6. Review JSON-LD model

Review-page JSON-LD should distinguish:

1. Stevan as `Person`, identified by ORCID;
2. the reviewed work;
3. the published review/article, where applicable;
4. the local hosted review/manuscript/page representation.

Review pages should include separate nodes for:

```text
Person
WebSite
WebPage
Reviewed work
Published DOI review, where available
Local review / hosted review representation
Periodical / PublicationVolume / PublicationIssue, where available
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

Do not type the local review node as `WebSite`.

Relationship pattern:

```text
WebPage.isPartOf → WebSite
WebPage.mainEntity → local Review node
WebPage.about → reviewed work
local Review.mainEntityOfPage → WebPage
local Review.itemReviewed → reviewed work
local Review.isBasedOn/citation → published DOI review, where applicable
published DOI Review.itemReviewed → reviewed work
published DOI Review.isPartOf → PublicationIssue → PublicationVolume →
Periodical
WebSite.publisher / Review.author → ORCID Person
```

For local review nodes, current local type remains acceptable:

```json
"@type": ["ScholarlyArticle", "Review"]
```

Local review names/headlines should be clean:

```json
"name": "Review of The Christian Right in Europe",
"headline": "Review of The Christian Right in Europe"
```

Do not use long explanatory standfirst/dek sentences as `name` or `headline`.

Edited volumes must use `editor`, not an author string with “(ed.)”.

## 7. Periodical, volume, and issue JSON-LD

The periodical/volume/issue task is materially complete.

Implemented pattern:

```text
ScholarlyArticle / Review
  isPartOf → PublicationIssue
    isPartOf → PublicationVolume
      isPartOf → Periodical
```

This is now present on:

```text
/publications/
/publications/reviews/christian-right-europe/
/publications/reviews/cosmic-connections/
```

For DOI-identified journal reviews/articles, the container chain belongs to the
published DOI node, not primarily to the local manuscript node.

The `/publications/` page uses page-local periodical/volume/issue node IDs,
e.g.:

```text
https://stevanveljkovic.com/publications/#review-cosmic-connections-periodical
https://stevanveljkovic.com/publications/#review-cosmic-connections-volume
https://stevanveljkovic.com/publications/#review-cosmic-connections-issue
```

Dedicated review pages use their own local IDs, e.g.:

```text
https://stevanveljkovic.com/publications/reviews/cosmic-connections/#periodical
https://stevanveljkovic.com/publications/reviews/cosmic-connections/#volume
https://stevanveljkovic.com/publications/reviews/cosmic-connections/#issue
```

This duplication is acceptable for Stage 3. Canonicalising these IDs across
pages
is optional and deferred.

Do not emit `PublicationIssue.name` merely as the issue number. Use
`issueNumber` for the issue number. If a future issue name is useful, either
omit
`name` by default or generate a descriptive name such as:

```text
European Journal of Social Theory, Volume 28, Issue 2, May 2025
```

The internal/frontmatter field `issueDateLabel` or similar may be used for
display, but should not be emitted as a non-standard Schema.org `dateLabel`.

Issue cover images should be attached to `PublicationIssue` when they are issue
covers, not article-specific images.

## 8. First-online publication date convention

A project convention has been adopted for first online publication dates.

For DOI-identified journal articles/reviews:

```text
article/review JSON-LD datePublished = publisher-recognised first publication
date, normally first online publication.
```

For `PublicationIssue` nodes:

```text
PublicationIssue.datePublished = issue date/month/year, where known.
```

Internal/frontmatter field:

```text
firstPublishedOnline
```

may be used to make the article-level date explicit and to generate visible
“First published online …” notes, but it should map to Schema.org
`datePublished`. Do not emit a non-standard Schema.org property named
`firstPublishedOnline`.

Recommended mapping:

```ts
const articleDatePublished =
  publishedReview.firstPublishedOnline ??
  publishedReview.datePublished;
```

For issue dates:

```ts
issue.datePublished = publishedReview.issueDatePublished;
```

Do not let article first-online dates leak onto issue nodes.

Visible review intro notes may continue to say:

```text
First published online 24 May 2024.
```

Prefer generating them from the same metadata field used by JSON-LD.

Citation formatting remains separate. A Chicago citation may display the issue
year/month differently from the real first online publication date. This is not
a contradiction.

## 9. Christian Right current JSON-LD decisions

Current route:

```text
/publications/reviews/christian-right-europe/
```

Current nodes include:

```text
Reviewed Book:
https://doi.org/10.1515/9783839460382

Published DOI Review:
https://doi.org/10.1093/jcs/csaf039

Local Review:
https://stevanveljkovic.com/publications/reviews/christian-right-europe/#review
```

Reviewed work is an edited volume:

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

The DOI review node includes both DOI and article ID:

```json
"identifier": [
  {
    "@type": "PropertyValue",
    "propertyID": "DOI",
    "value": "10.1093/jcs/csaf039",
    "url": "https://doi.org/10.1093/jcs/csaf039"
  },
  {
    "@type": "PropertyValue",
    "propertyID": "Article ID",
    "value": "csaf039"
  }
]
```

`csaf039` should be treated as an article identifier, not pagination.

Christian Right periodical metadata currently includes:

```text
Periodical: Journal of Church and State
URL: https://academic.oup.com/jcs
ISSNs: 0021-969X, 2040-4867
Publisher: Oxford University Press
Volume: 67
Issue: 3
Issue URL: https://academic.oup.com/jcs/issue/67/3/
Issue image:
https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/jcs/Issue/67
/3/15/m_jcs_67_3cover.jpeg
```

Current issue-level date:

```json
"datePublished": "2025-07-01"
```

Retain only if exact and verified. If it merely means July 2025, reduce to:

```json
"datePublished": "2025-07"
```

or omit.

Christian Right description/standfirst rationalisation remains deferred.

## 10. Cosmic Connections current JSON-LD decisions

Current route:

```text
/publications/reviews/cosmic-connections/
```

Cosmic Connections special rule remains: local page is an unabridged Author’s
Original Manuscript / author manuscript and materially different from the
published version. Do not use `sameAs` between local review and DOI article. Use
`isBasedOn` and/or `citation`.

Current DOI article node:

```text
https://doi.org/10.1177/13684310241249684
```

The DOI article/review now uses date-only first online publication date:

```json
"datePublished": "2024-05-24"
```

The arbitrary previous timestamp has been removed:

```json
"datePublished": "2024-05-24T12:00:00+01:00"
```

Do not reintroduce it unless the time is real and meaningful.

Cosmic issue metadata:

```text
Periodical: European Journal of Social Theory
Periodical URL: https://journals.sagepub.com/home/EST
ISSNs: 1368-4310, 1461-7137
Publisher: Sage Publications
Volume: 28
Volume URL: https://journals.sagepub.com/toc/esta/28
Issue: 2
Issue URL: https://journals.sagepub.com/toc/esta/28/2
Issue datePublished: 2025-05
Issue image:
https://journals.sagepub.com/cms/asset/e55d45ab-8419-4908-b935-0563c55874fa/
esta_28_2.cover.png
```

The DOI article includes:

```json
"pagination": "339–42",
"pageStart": "339",
"pageEnd": "342"
```

The local `#review` node remains distinct:

```text
https://stevanveljkovic.com/publications/reviews/cosmic-connections/#review
```

It is currently modelled as:

```json
"@type": ["ScholarlyArticle", "Review"],
"version": "Author’s Original Manuscript",
"datePublished": "2024-05-24",
"dateCreated": "2024-04-02T17:09:00+01:00"
```

and points to the DOI node through:

```json
"isBasedOn": { "@id": "https://doi.org/10.1177/13684310241249684" },
"citation": { "@id": "https://doi.org/10.1177/13684310241249684" }
```

## 11. Review page display and SEO

Review pages should pass SEO props through:

```text
review page → ReviewLayout → BaseLayout → SeoHead
```

Review pages should have:

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

Visible heading pattern:

```ts
const heading =
  review.pageHeading ??
  review.seoTitle ??
  `Review of ${review.title}`;
```

Examples:

```text
Review of Cosmic Connections
Review of The Christian Right in Europe
```

A short dek may be generated:

```text
Stevan Veljkovic reviews Cosmic Connections by Charles Taylor.
Stevan Veljkovic reviews The Christian Right in Europe, edited by Gionathan Lo
Mascolo.
```

Current decision: freeze the h1/dek + existing intro/citation/version block for
now, even though it repeats titles.

Do not change review byline email behavior casually; historical mismatch may be
intentional.

`set:html` is acceptable for trusted local migration fields only:

```yaml
citationHtml
bylineHtml
originalSubmissionNote
publicationList.noteHtml
```

## 12. Planned new review pages

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

Each new review remains draft until text, metadata, rights status, version
wording, and schema have been checked. Do not publish rights-sensitive full text
until reuse status is clear.

Before publishing additional local review texts, define consistent display and
metadata rules for:

```text
Version of Record
Accepted Author Manuscript
Author Manuscript
Submitted Manuscript
Original Submission
preprint
first publication date
first online publication date
DOI
copyright holder
reuse permission
required credit line
local PDF availability
```

## 13. Deployment, URLs, and old-route preservation

Likely initial deployment path:

```text
Astro build → GitHub Pages → stevanveljkovic.com
```

A later hosting move may be considered:

```text
GitHub Pages → Netlify or Cloudflare Pages
```

GitHub Pages cannot do arbitrary server redirects. If staying on GitHub Pages,
use static HTML redirect stubs with canonical, meta refresh,
`location.replace`, and visible fallback link. No full JSON-LD on redirect
stubs. Do not replace old PDF URLs with HTML redirects; keep PDFs as PDFs unless
true HTTP redirects are available later.

Old URLs to preserve/redirect/keep in mind:

```text
/writing.html
/writing/ReviewCosmicConnectionsV2.html
/writing/ReviewCosmicConnectionsV2.pdf
/itinerary.pdf
```

For old HTML routes, if real redirects are available later, prefer:

```text
301 → new canonical URL
```

## 14. Known remaining cleanup items

Remaining Stage 3 metadata/date cleanup:

1. Run checks after significant changes:

```bash
npx astro sync
npx astro check
npm run build
```

2. Remove production debugging output, especially `console.log()` in page
   generation.

3. Audit routes and sitemap; sitemap must include only real canonical non-draft
   pages.

4. Validate rendered JSON-LD for homepage, publications, CV, and review pages.

5. Continue hardening DOI normalization and node IDs.

6. `/publications/` schema still contains old “Dr Stevan Veljkovic” strings:

```json
"name": "Publications | Dr Stevan Veljkovic"
"description": "Publications of Dr Stevan Veljkovic."
"name": "Publications of Dr Stevan Veljkovic"
```

Align later with:

```text
Page title: Publications | Stevan Veljkovic
Semantic page/list names: Publications / Publications of Stevan Veljkovic
```

7. Some `/publications/` entries still use apparent placeholder dates:

```json
"datePublished": "2025-01-01"
"datePublished": "2023-01-01"
```

Use exact dates where known; otherwise avoid invented day/month precision.

8. Christian Right issue date `2025-07-01` requires verification or reduction.

9. Publication-list review entries may later use:

```json
"@type": ["ScholarlyArticle", "Review"]
```

rather than only `ScholarlyArticle`.

10. Decide thesis-page scope for Stage 3.

Option A: thesis remains bibliography-only during Stage 3. If so, do not include
a thesis page in sitemap and do not link CV schema to a non-existent thesis
page.

Option B: implement:

```text
src/pages/thesis/religious-atavism-climate-crisis/index.astro
```

with thesis metadata, ARK/DOI handling, `/publications/` update, CV schema
update,
and JSON-LD validation.

11. Create/update:

```text
docs/legacy-urls.md
docs/deployment.md
docs/launch-checklist.md
```

12. Confirm GitHub Pages workflow, custom domain, DNS, and `public/CNAME` needs.

## 15. Important commands and inspection

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

## 16. Immediate next steps

Recommended next sequence:

1. Run baseline checks:

```bash
npx astro sync
npx astro check
npm run build
```

2. Preview and inspect:

```text
/
 /publications/
 /cv/
 /publications/reviews/cosmic-connections/
 /publications/reviews/christian-right-europe/
```

3. Validate rendered JSON-LD after the periodical/issue and first-online
changes.

4. Continue metadata/date cleanup:
   - verify Christian Right issue date;
   - clean placeholder dates;
   - align `/publications/` “Dr” strings;
   - consider `["@type": ["ScholarlyArticle", "Review"]]` for review items.

5. Add planned new review files as drafts.

6. Resolve copyright/version/display rules before publishing additional review
   texts.

7. Inventory legacy URLs and prepare redirect strategy.

8. Prepare deployment documentation/workflow.

9. Deploy live and validate live canonical pages, PDFs, assets, sitemap, and
   JSON-LD.