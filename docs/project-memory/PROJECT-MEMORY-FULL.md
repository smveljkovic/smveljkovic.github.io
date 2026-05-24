# Project Memory

## 1. Project overview

This project is Stevan Veljkovic’s personal academic/professional website:

```text
https://stevanveljkovic.com/
```

The site is intended to function as a durable academic/research hub, not merely a portfolio or publication list. It foregrounds Stevan Veljkovic’s identity as a theorist/editor and academic working around:

- religious studies;
- modern history;
- social theory;
- secularism;
- climate change;
- liberalism.

The website’s public identity includes:

```text
Stevan Veljkovic
Theory and editing
Oxford, England
```

Core identity/profile URLs:

```text
ORCID:          https://orcid.org/0000-0002-2599-3227
Google Scholar: https://scholar.google.com/citations?user=e42TN4UAAAAJ
GitHub:         https://github.com/smveljkovic
Email:          hello@stevanveljkovic.com
```

The ORCID URL is the canonical stable structured-data identity for the `Person` node:

```text
https://orcid.org/0000-0002-2599-3227
```

The site is hosted via GitHub Pages, with a canonical apex domain:

```text
https://stevanveljkovic.com/
```

There is also a separate seminars subdomain:

```text
https://seminars.stevanveljkovic.com/
```

The project has evolved from hand-authored HTML/CSS into an Astro static-site project, while preserving existing URLs, visual identity, PDFs, scholarly metadata, and structured data.

---

## 2. Current state

### Current project directory

Current Astro project root:

```text
/Users/stevan/Projects/smvsite-astro
```

Earlier/original vanilla site:

```text
smvsite
```

The previous local path may have been:

```text
/Users/stevan/Website/smvsite
```

### Current production site

```text
https://stevanveljkovic.com/
```

### Preserved public routes

Current known/preserved public routes:

```text
/
 /publications/
 /cv/
 /publications/reviews/cosmic-connections/
 /publications/reviews/christian-right-europe/
```

The `christian-right-europe` route was added during Stage 2 as the second content-driven review page.

### Migration stage status

#### Stage 1: complete

Stage 1 migrated the original hand-built HTML/CSS site into Astro while preserving visual and URL behaviour.

Stage 1 accomplishments:

- Existing routes preserved.
- Static assets copied into `public/`.
- Legacy/generated CSS preserved globally.
- Existing page body HTML largely retained.
- Repeated head/SEO/favicon/analytics/schema logic extracted into Astro layouts/components.
- JSON-LD moved out of raw inline HTML into TypeScript data files.
- Homepage, publications page, CV page, and Cosmic Connections review page were represented as Astro pages.
- Clean trailing-slash URLs preserved.

#### Stage 2: in progress

Stage 2 is focused on making review pages and the publications index data-driven.

Current Stage 2 status:

- `cosmic-connections` review is generated from Markdown content.
- `christian-right-europe` review is generated from Markdown content.
- Dynamic review route exists and is active:

  ```text
  src/pages/publications/reviews/[slug]/index.astro
  ```

- Review content files live in:

  ```text
  src/content/reviews/
  ```

- Review JSON-LD is now generated with a reusable factory:

  ```text
  src/data/schema/reviews/createReviewSchema.ts
  ```

- Dynamic review pages call:

  ```ts
  const jsonLd = createReviewSchema(review);
  ```

- `/publications/` is partially content-driven but currently only shows migrated review entries unless/until list-only publication data is added.
- A lightweight `publicationItems` collection is planned/recommended for bibliography/list-only entries that do not yet have full generated pages.

### Current content-driven review pages

Current review Markdown files:

```text
src/content/reviews/cosmic-connections.md
src/content/reviews/christian-right-europe.md
```

Current/generated review URLs:

```text
/publications/reviews/cosmic-connections/
/publications/reviews/christian-right-europe/
```

Adding a new review should require:

1. one Markdown file under `src/content/reviews/`;
2. any PDF/static assets under `public/`;
3. no new per-review `.astro` page;
4. ideally no new per-review schema `.ts` file.

### Current known sitemap intent

Only actual/generated pages should be included.

Current intended entries:

```text
/
 /publications/
 /publications/reviews/cosmic-connections/
 /publications/reviews/christian-right-europe/
 /cv/
```

Previously planned but not necessarily live review routes:

```text
/publications/reviews/hell-christian-ecology/
/publications/reviews/challenging-modernity/
/publications/reviews/evolution-of-religions/
/publications/reviews/godless-crusade/
```

These should not appear in the sitemap unless generated and intended to be live.

---

## 3. Architecture and implementation model

### Framework

The project uses Astro.

Astro was chosen over Eleventy because:

- the site is mostly static;
- Astro is static-first and works well on GitHub Pages;
- Astro supports content collections and Markdown/MDX;
- Astro can generate clean trailing-slash routes;
- future Vue islands are possible without turning the whole site into a SPA;
- it supports build-time SEO/JSON-LD generation cleanly.

Eleventy remains technically viable but is no longer the preferred path.

### Migration principle

The guiding principle is:

> Use Astro to make the site more maintainable, but preserve the site’s existing scholarly/personal identity and visual design.

Do **not** adopt a full Astro theme as the foundation. Themes may be inspected for ideas, but the current custom design should remain.

### Routing model

Astro route files preserve clean trailing-slash URLs.

Current/preserved route model:

```text
src/pages/index.astro
  → /

src/pages/publications/index.astro
  → /publications/

src/pages/cv/index.astro
  → /cv/

src/pages/publications/reviews/[slug]/index.astro
  → /publications/reviews/<slug>/
```

Astro should be configured with:

```js
trailingSlash: "always"
site: "https://stevanveljkovic.com"
```

### Dynamic reviews

Dynamic review route:

```text
src/pages/publications/reviews/[slug]/index.astro
```

Content source:

```text
src/content/reviews/*.md
```

Route behaviour:

- `getCollection("reviews", ({ data }) => !data.draft)` gets non-draft reviews.
- `params.slug` comes from `entry.data.slug`.
- The rendered page uses:
  - `ReviewLayout`;
  - `ReviewIntro`;
  - Markdown body via `render(entry)`;
  - `ReviewByLine`;
  - `createReviewSchema(review)` for JSON-LD.

Important naming convention:

```ts
entry = full Astro content collection entry
review = entry.data
```

Correct access:

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

unless the object really is a collection entry.

### Static route masking warning

Astro static routes take priority over dynamic routes.

Do **not** keep old per-review static files under `src/pages`, such as:

```text
src/pages/publications/reviews/cosmic-connections.astro
src/pages/publications/reviews/cosmic-connections/index.astro
src/pages/publications/reviews/christian-right-europe/index.astro
```

These will mask the dynamic route.

Old manual Cosmic Connections page was moved/removed from `src/pages`; this allowed the dynamic route to generate `/publications/reviews/cosmic-connections/`.

### Content collections

Current content config:

```text
src/content.config.ts
```

Current preferred Astro 6 import pattern:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
```

This supersedes older/deprecated patterns:

```ts
import { z } from "astro:content";
import { z } from "astro:schema";
```

Use loader-style collections:

```ts
loader: glob({
  base: "./src/content/reviews",
  pattern: "**/*.md",
})
```

Do not define duplicate `schema` keys in the same collection object.

### CSS model

Stage 1 preserved legacy/generated CSS globally.

Current preferred CSS location:

```text
src/styles/global.css
```

Imported once in `BaseLayout.astro`.

Alternative still viable but less current:

```text
public/website-web-resources/css/idGeneratedStyles.css
```

The legacy CSS includes many classes that should not be casually renamed yet:

```text
Basic-Text-Frame
Name
Details
Headings
BibHeading
BibEntry
counter_bib
countercontrol
control
review_intro
review_text
review_par
counter
title
intro
byline
review_byline
trigger
test
CVEntry
nav-list
pronunciation
```

Refactor CSS later only after content/routing/schema migration is stable.

### Asset model

Use root-relative URLs for assets and internal links:

```html
/images/headshot-1200x630.png
/favicon.ico
/favicon.svg
/site.webmanifest
/cv/veljkovic-cv.pdf
/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
```

Avoid fragile deep relative paths:

```html
../../../images/...
../website-web-resources/css/...
```

Root-relative public URLs map to the `public/` directory.

Example:

```yaml
pdf: "/publications/reviews/christian-right-europe/veljkovic-review-christian-right-europe.pdf"
```

must correspond to:

```text
public/publications/reviews/christian-right-europe/veljkovic-review-christian-right-europe.pdf
```

### Structured data model

The site uses Schema.org JSON-LD extensively.

Core principles:

- Use stable `@id`s.
- ORCID URL is the stable `Person.@id`.
- DOI URLs are preferred stable IDs for scholarly objects.
- JSON-LD belongs on canonical pages, not redirect stubs.
- Visible page content and JSON-LD should agree.
- Validate final rendered JSON-LD from page source, not TypeScript object literals.
- Avoid spammy or misleading equivalence claims.

Important stable IDs:

```text
Person:
https://orcid.org/0000-0002-2599-3227

Website:
https://stevanveljkovic.com/#website

Homepage/AboutPage:
https://stevanveljkovic.com/

CV/ProfilePage:
https://stevanveljkovic.com/cv/

Publications page:
https://stevanveljkovic.com/publications/

Cosmic Connections local page:
https://stevanveljkovic.com/publications/reviews/cosmic-connections/

Christian Right local page:
https://stevanveljkovic.com/publications/reviews/christian-right-europe/
```

### Review structured-data model

For review pages, model distinct graph nodes for:

1. Stevan Veljkovic as `Person`, identified by ORCID.
2. The reviewed work, preferably identified by DOI.
3. The published review/article, if available, preferably identified by DOI.
4. The local hosted review/manuscript page.

Important modelling decisions:

- Local hosted review page and published DOI article are distinct objects.
- Local author manuscript should not use `sameAs` to the DOI if materially different.
- Use `isBasedOn` and/or `citation` from local hosted version to the DOI-published version.
- Use `itemReviewed` to point to the DOI-backed reviewed work.
- Do not model local review page as `WebSite`.
- Current local review type is acceptable:

  ```json
  ["ScholarlyArticle", "Review"]
  ```

- A later refinement may split `WebPage` and `#review` article nodes.

### Publications page content model

Do **not** force all bibliography entries into the full `reviews` collection.

Reason:

- `reviews` is for full generated review pages.
- Some items are currently list-only bibliography records.
- Putting list-only items in `reviews` would either create unwanted pages or require awkward filtering.

Preferred model:

```text
src/content/reviews/
  Full generated review pages.

src/content/publication-items/
  Lightweight list-only bibliography records.
```

The `/publications/` page should combine:

1. full review entries from `reviews`;
2. list-only entries from `publicationItems`.

Display should continue using trusted `citationHtml` and optional `noteHtml` to preserve visual fidelity for now.

### Homepage/CV schemas

Home and CV schemas remain manual one-off schema files:

```text
src/data/schema/home.ts
src/data/schema/cv.ts
```

Do not use `createReviewSchema()` on homepage or CV.

The homepage should use:

```ts
homeSchema
```

The CV page should use:

```ts
cvSchema
```

---

## 4. Important files, paths, commands, and scripts

### Project root

```text
/Users/stevan/Projects/smvsite-astro
```

### Core Astro files/directories

```text
astro.config.mjs
src/content.config.ts
src/styles/global.css
```

### Pages

```text
src/pages/index.astro
src/pages/publications/index.astro
src/pages/cv/index.astro
src/pages/publications/reviews/[slug]/index.astro
```

### Layouts

```text
src/layouts/BaseLayout.astro
src/layouts/HomeLayout.astro
src/layouts/TextPageLayout.astro
src/layouts/ReviewLayout.astro
```

### Components

```text
src/components/Analytics.astro
src/components/FaviconLinks.astro
src/components/SeoHead.astro
src/components/JsonLd.astro
src/components/ReviewIntro.astro
src/components/ReviewByLine.astro
```

Possible later extraction:

```text
src/components/ReviewListItem.astro
src/components/PublicationCitation.astro
src/components/ReviewByline.astro
```

Note spelling currently recorded as:

```text
ReviewByLine.astro
```

Check exact filename before importing.

### Site data/schema

```text
src/data/site.ts
src/data/schema/home.ts
src/data/schema/cv.ts
src/data/schema/reviews/createReviewSchema.ts
```

Old/reference schema files:

```text
src/data/schema/reviews/cosmic-connections/cosmic-connections.ts
src/lib/schema/review.ts
```

The old rich Cosmic Connections schema should be kept as a benchmark/reference until the generated schema fully reproduces needed detail.

Potential future schema file:

```text
src/data/schema/publications/createPublicationsSchema.ts
```

### Content files

Current:

```text
src/content/reviews/cosmic-connections.md
src/content/reviews/christian-right-europe.md
```

Planned additional review content files:

```text
src/content/reviews/hell-christian-ecology.md
src/content/reviews/challenging-modernity.md
src/content/reviews/evolution-of-religions.md
src/content/reviews/godless-crusade.md
```

Planned lightweight publication/list-only collection:

```text
src/content/publication-items/
```

Example list-only files:

```text
src/content/publication-items/phd-thesis.md
src/content/publication-items/hell-christian-ecology.md
src/content/publication-items/challenging-modernity.md
src/content/publication-items/evolution-of-religions.md
src/content/publication-items/godless-crusade.md
```

Actual naming can vary.

### Static/public assets

Important static assets:

```text
public/images/
public/images/headshot-1200x630.png
public/images/apple-touch-icon.png
public/images/favicon-32x32.png
public/images/favicon-16x16.png
public/images/Artwork_1.png
public/images/Artwork_2.png
public/images/Artwork_4.png
public/images/Asset 1.png

public/favicon.ico
public/favicon.svg
public/site.webmanifest

public/cv/veljkovic-cv.pdf

public/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
public/publications/reviews/christian-right-europe/veljkovic-review-christian-right-europe.pdf
```

Verify exact PDF filenames before linking/deleting.

### Important URLs

Site:

```text
https://stevanveljkovic.com/
```

Seminars:

```text
https://seminars.stevanveljkovic.com/
```

Current important pages:

```text
https://stevanveljkovic.com/publications/
https://stevanveljkovic.com/cv/
https://stevanveljkovic.com/publications/reviews/cosmic-connections/
https://stevanveljkovic.com/publications/reviews/christian-right-europe/
```

CV PDF:

```text
https://stevanveljkovic.com/cv/veljkovic-cv.pdf
```

Cosmic PDF:

```text
https://stevanveljkovic.com/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
```

### Astro config

Recommended:

```js
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://stevanveljkovic.com",
  trailingSlash: "always",
  integrations: [sitemap()],
});
```

If sitemap integration not yet installed:

```bash
npx astro add sitemap
```

### Development commands

Run dev server:

```bash
npm run dev
```

Run Astro sync/check:

```bash
npx astro sync
npx astro check
```

Build:

```bash
npm run build
```

Inspect generated review output:

```bash
ls dist/publications/reviews/
ls dist/publications/reviews/cosmic-connections/
ls dist/publications/reviews/christian-right-europe/
```

Find review page files that may mask dynamic route:

```bash
find src/pages/publications/reviews -type f
```

Find content files:

```bash
find src/content -maxdepth 4 -type f -print
```

Commit useful milestones:

```bash
git add .
git commit -m "Complete stage 1 Astro migration"
git tag stage-1-complete
```

```bash
git add .
git commit -m "Generate second review from content collection"
```

### Validation tools

HTML:

```text
https://validator.w3.org/
```

Schema:

```text
https://validator.schema.org/
```

Google rich results:

```text
https://search.google.com/test/rich-results
```

Performance:

```text
https://pagespeed.web.dev/
```

Important: Rich Results Test may show “no items detected” for types such as `Person`, `WebSite`, `AboutPage`, `CollectionPage`, etc. That is not necessarily an error. Use Schema Markup Validator for general schema validation.

### GitHub Pages/DNS diagnostic commands

```bash
dig +short seminars.stevanveljkovic.com CNAME
curl -I https://stevanveljkovic.com/
curl -I https://www.stevanveljkovic.com/
curl -I https://seminars.stevanveljkovic.com/
curl -I https://stevanveljkovic.com/seminars/
curl -I -L https://stevanveljkovic.com/seminars/
```

Inspect GitHub Pages settings:

```text
GitHub repo → Settings → Pages → Source
GitHub repo → Settings → Pages → Custom domain
```

Relevant repos:

```text
smveljkovic.github.io
seminars
```

---

## 5. Content/data/schema model

### Shared site data

`src/data/site.ts` should contain stable site constants.

Important values:

```ts
export const site = {
  url: "https://stevanveljkovic.com",
  name: "Dr Stevan Veljkovic – theorist and editor",
  shortName: "Dr Stevan Veljkovic",
  author: "Stevan Veljkovic",
  email: "hello@stevanveljkovic.com",
  analyticsId: "G-7VMGXMNZZ0",
  language: "en-GB",
  image: "/images/headshot-1200x630.png",
  orcid: "https://orcid.org/0000-0002-2599-3227",
  scholar: "https://scholar.google.com/citations?user=e42TN4UAAAAJ",
  github: "https://github.com/smveljkovic",
};
```

Ensure URL helper avoids double slashes:

```ts
function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
```

Use:

```ts
absoluteUrl("/")
```

not:

```ts
`${site.url}/`
```

if `site.url` may already include a trailing slash.

### Person schema

Canonical `Person.@id`:

```text
https://orcid.org/0000-0002-2599-3227
```

Preferred person properties:

```json
{
  "@id": "https://orcid.org/0000-0002-2599-3227",
  "@type": "Person",
  "name": "Stevan Veljkovic",
  "additionalName": "M.",
  "alternateName": "Stevan M. Veljkovic",
  "url": "https://stevanveljkovic.com/",
  "sameAs": [
    "https://orcid.org/0000-0002-2599-3227",
    "https://scholar.google.com/citations?user=e42TN4UAAAAJ",
    "https://github.com/smveljkovic"
  ],
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "ORCID",
    "value": "0000-0002-2599-3227",
    "url": "https://orcid.org/0000-0002-2599-3227"
  },
  "knowsAbout": [
    "Religious studies",
    "Modern history",
    "Social theory",
    "Secularism",
    "Climate change",
    "Liberalism"
  ]
}
```

Do **not** use the OpenAlex profile previously found:

```text
https://openalex.org/A5056034517
```

It was rejected as conflated/messy and should not be included in `sameAs`.

### Homepage schema

Homepage should be modelled as:

- `ImageObject`;
- `Person`;
- `WebSite`;
- `AboutPage`.

Use `AboutPage`, not generic `WebPage`, because the homepage functions as a personal/about hub.

Key image:

```text
https://stevanveljkovic.com/images/headshot-1200x630.png
1200 × 630 PNG
```

Homepage canonical:

```text
https://stevanveljkovic.com/
```

Homepage description:

```text
Personal website of Dr Stevan M. Veljkovic.
```

Homepage should include `rel="me"` links for:

```text
https://orcid.org/0000-0002-2599-3227
https://scholar.google.com/citations?user=e42TN4UAAAAJ
https://github.com/smveljkovic
```

### Review content model

Current `reviews` collection should include fields such as:

```ts
draft: z.boolean().default(false),

title: z.string(),
shortTitle: z.string(),
slug: z.string(),

description: z.string(),

dateCreated: z.string(),
datePublished: z.string(),
dateModified: z.string().optional(),

canonicalPath: z.string(),

pdf: z.string().optional(),

openingVersionNote: z.string(),
citationHtml: z.string(),
bylineHtml: z.string(),
originalSubmissionNote: z.string().optional(),

reviewer: z.object({
  name: z.string(),
  orcid: z.string(),
}),

reviewedWork: z.object({
  type: z.string().default("Book"),
  title: z.string(),
  author: ...,
  editor: ...,
  publisher: z.string().optional(),
  place: z.string().optional(),
  year: z.string().optional(),
  isbn: z.array(z.string()).optional(),
  doi: z.string().optional(),
  url: z.string().optional(),
  sameAs: ...,
  image: z.string().optional(),
}),

publishedReview: z.object({
  title: z.string(),
  doi: z.string().optional(),
  url: z.string().optional(),
  sameAs: ...,
  datePublished: z.union([z.string(), z.date()]).optional(),
  journal: ...,
  volume: ...,
  issue: ...,
  pages: z.string().optional(),
  pagination: z.string().optional(),
  pageStart: z.string().optional(),
  pageEnd: z.string().optional(),
}).optional(),

version: z.string().optional(),

publicationList: z.object({
  year: z.number(),
  sortDate: z.string().optional(),
  order: z.number().optional(),
  noteHtml: z.string().optional(),
  noteId: z.string().optional(),
}).optional(),

searchMeta: z.object({
  reviewers: z.string().optional(),
  authors: z.string().optional(),
  title: z.string().optional(),
}).optional()
```

The exact `content.config.ts` shape may differ; check it before adding new files.

Important decision: `openingVersionNote` is required.

Display HTML bridge fields:

```yaml
citationHtml
bylineHtml
originalSubmissionNote
publicationList.noteHtml
```

These are acceptable temporary bridges and may be rendered with `set:html` because content is trusted/local. They are not the ideal final semantic model.

Semantic/schema fields should remain separate from display HTML:

```yaml
title
description
shortTitle
slug
canonicalPath
dateCreated
datePublished
dateModified
pdf
reviewer
reviewedWork
publishedReview
version
publicationList
searchMeta
```

### Cosmic Connections metadata

Canonical local page:

```text
https://stevanveljkovic.com/publications/reviews/cosmic-connections/
```

Local PDF:

```text
/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
```

Published review:

```text
DOI:        10.1177/13684310241249684
DOI URL:    https://doi.org/10.1177/13684310241249684
SAGE URL:   https://journals.sagepub.com/doi/10.1177/13684310241249684
Journal:    European Journal of Social Theory
Journal URL:https://journals.sagepub.com/home/EST
Volume:     28
Issue:      2
Year:       2025
Pages:      339–42
Page start: 339
Page end:   342
Publisher:  SAGE Publications
ISSNs:      1368-4310, 1461-7137
```

Reviewed book:

```text
Title:    Cosmic Connections: Poetry in the Age of Disenchantment
Author:   Charles Taylor
Publisher:The Belknap Press of Harvard University Press
Place:    Cambridge, MA
Year:     2024
Book DOI: 10.4159/9780674297074
DOI URL:  https://doi.org/10.4159/9780674297074
Related:  https://www.degruyterbrill.com/document/doi/10.4159/9780674297074/html
Book image:
https://www.degruyterbrill.com/document/cover/isbn/9780674297074/product_pages
```

ISBNs recorded:

```text
9780674297074
9780674297067
0674297075
0674297067
```

Also visible book details:

```text
640 pp, £31.95 US$37.95 ISBN 9780674296084 (hbk)
```

Dates:

```text
Original submission: 2 April 2024
First published online: 24 May 2024
Version marker: v2 April 2025
```

Important author-manuscript note:

```text
This unabridged Original Submission (2 April 2024) is significantly longer than the Final Published PDF and is made available here according to the publisher’s policy on author reuse.
```

Cosmic Connections special rule:

- local page is an unabridged Original Submission / Author Manuscript;
- it materially differs from final published version;
- do **not** use `sameAs` from local manuscript to DOI article;
- use `isBasedOn` and `citation` pointing to DOI published review;
- include `version: "Author Manuscript"` or equivalent if supported by frontmatter/schema.

### Christian Right metadata

Current/generated local page:

```text
https://stevanveljkovic.com/publications/reviews/christian-right-europe/
```

Published review:

```text
Title: Journal of Church and State review of The Christian Right in Europe
DOI: https://doi.org/10.1093/jcs/csaf039
Oxford Academic URL:
https://academic.oup.com/jcs/article/67/3/csaf039/8213591
Journal:
Journal of Church and State
Volume: 67
Issue: 3
Year: 2025
Identifier/pagination: csaf039
```

Potential journal URL:

```text
https://academic.oup.com/jcs
https://academic.oup.com/jcs/issue/67/3
```

Journal ISSNs need verification:

```text
0021-969X
2040-4867
```

Reviewed book:

```text
Title: The Christian Right in Europe: Movements, Networks, and Denominations
Editor: Gionathan Lo Mascolo
Book DOI: https://doi.org/10.1515/9783839460382
De Gruyter URL:
https://www.degruyterbrill.com/document/doi/10.1515/9783839460382/html/
Transcript URL:
https://www.transcript-publishing.com/978-3-8376-6038-8/the-christian-right-in-europe/
```

Important modelling point:

- This is an edited volume.
- Use Schema.org `editor`, not `author` containing `"Gionathan Lo Mascolo (ed.)"`.
- Display strings may still say “ed. Gionathan Lo Mascolo”.

### Publications currently listed

The publications page should eventually list all of these again.

#### 2025

1. Review of *The Christian Right in Europe: Movements, Networks, and Denominations*, ed. Gionathan Lo Mascolo, `Journal of Church and State` 67 no. 3 (2025): `csaf039`.

   ```text
   https://doi.org/10.1093/jcs/csaf039
   ```

2. Review of *Hell: In Search of a Christian Ecology*, by Tim Morton, `Journal for the Study of Religion, Nature and Culture`, ahead of print, 20 Jan 2025.

   ```text
   https://journal.equinoxpub.com/JSRNC/article/view/30282/30985
   ```

3. Review of *Challenging Modernity*, by Robert Bellah, ed. Madsen/Sullivan/Swidler/Tipton, `Religion, State and Society` 53 no. 4 (2025): 440–41.

   ```text
   https://doi.org/10.1080/09637494.2024.2408091
   ```

4. Review of *Cosmic Connections*, by Charles Taylor, `European Journal of Social Theory` 28 no. 2 (2025): 339–42.

   ```text
   https://doi.org/10.1177/13684310241249684
   ```

   Local:

   ```text
   /publications/reviews/cosmic-connections/
   /publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
   ```

#### 2024

5. Review of *The Evolution of Religions*, by Lance Grande, LSE Review of Books, 18 July 2024.

   ```text
   https://blogs.lse.ac.uk/lsereviewofbooks/2024/07/18/book-review-the-evolution-of-religions-lance-grande/
   ```

#### 2023

6. Review of *The Godless Crusade*, by Tobias Cremer, `Religion, State and Society` 51 nos. 4–5 (2023): 491–92.

   ```text
   https://doi.org/10.1080/09637494.2023.2260684
   ```

7. PhD thesis:

   ```text
   Religious atavism and the climate crisis, with reference to Taylor and Rorty on liberalism
   ```

   DOI:

   ```text
   https://doi.org/10.5287/ora-4rjoobkvk
   ```

   ORA:

   ```text
   https://ora.ox.ac.uk/objects/uuid:7aff13dc-075e-4c17-bee9-5adfc1b2fcf4
   ```

### Publication list notes

Review frontmatter can include `publicationList.noteHtml`.

Cosmic example:

```yaml
publicationList:
  year: 2025
  sortDate: "2025-05-01"
  order: 40
  noteId: "cosmic-connections-note"
  noteHtml: >-
    The original, unabridged version of this review may be found here:
    <a href="/publications/reviews/cosmic-connections/">html</a> |
    <a href="/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf">pdf</a>.
```

Christian Right example:

```yaml
publicationList:
  year: 2025
  sortDate: "2025-07-25"
  order: 30
  noteId: "christian-right-europe-note"
  noteHtml: >-
    The author accepted manuscript of this review may be found here:
    <a href="/publications/reviews/christian-right-europe/">html</a> |
    <a href="/publications/reviews/christian-right-europe/veljkovic-review-christian-right-europe.pdf">pdf</a>.
```

PDF filenames and exact note wording must be verified.

### CV schema/data

CV route:

```text
/cv/
```

CV PDF:

```text
/cv/veljkovic-cv.pdf
```

CV visible heading:

```text
Stevan Veljkovic – curriculum vitae
```

Control line:

```text
pdf | updated May 2026
```

CV page title:

```html
<title>S. Veljkovic curriculum vitae</title>
```

CV JSON-LD includes:

- CV page as `ProfilePage`;
- CV PDF as `MediaObject`;
- University of Oxford;
- Faculty of Theology and Religion, University of Oxford;
- St Cross College;
- University of Cambridge;
- Peterhouse;
- Faculty of History;
- Faculty of Divinity;
- University of Rochester;
- Rochester Zen Center;
- credentials:
  - DPhil;
  - MPhil in Early Modern History;
  - PGDip in Divinity;
  - BA in History;
- roles and affiliations;
- thesis as `Thesis`.

Important CV schema decisions:

- CV page should be `ProfilePage`.
- CV PDF should be `MediaObject`.
- DPhil candidacy should be a time-bounded `Role`.
- Do not use `Person.dissertation`; validator rejected it.
- Do not use `worksFor` on `OrganizationRole`; validator rejected it.
- Do not put `startDate`/`endDate` on `EducationalOccupationalCredential`; validator rejected dates there.
- Put dates on `Role` nodes under `Person.affiliation`.
- Credentials represent earned degrees/diplomas and omit participation dates.

Important education/role facts:

```text
Oxford DPhil period: 2016-10 to 2024-02
St Cross College membership during Oxford DPhil period

Cambridge:
MPhil Early Modern History, Faculty of History, Peterhouse, 2013–2014
PGDip Divinity, Faculty of Divinity, Peterhouse, 2014–2015

Rochester:
BA History, 2009–2013

Rochester Zen Center:
Residential trainee, 2002-11 to 2008-11
Rochester, NY, US
Semi-monastic religious training plus trades/carpentry
```

### Thesis model

Canonical thesis slug finalized as:

```text
/thesis/religious-atavism-climate-crisis/
```

Do not revert to earlier shorter slug:

```text
/thesis/atavism-climate-crisis/
```

Planned thesis PDF:

```text
/thesis/religious-atavism-climate-crisis/veljkovic-phd-thesis.pdf
```

Thesis title:

```text
Religious atavism and the climate crisis, with reference to Taylor and Rorty on liberalism
```

DOI:

```text
10.5287/ora-4rjoobkvk
https://doi.org/10.5287/ora-4rjoobkvk
```

ORA:

```text
https://ora.ox.ac.uk/objects/uuid:7aff13dc-075e-4c17-bee9-5adfc1b2fcf4
```

Date:

```json
"datePublished": "2024-02"
```

Supervisors:

```text
Johannes Zachhuber
ORCID: 0000-0003-2154-0711
https://orcid.org/0000-0003-2154-0711
https://www.trinity.ox.ac.uk/people/johannes-zachhuber

Friederike Otto
ORCID: 0000-0001-8166-5917
https://orcid.org/0000-0001-8166-5917
https://profiles.imperial.ac.uk/f.otto
```

Schema modelling:

- Use `Thesis`, optionally also `ScholarlyArticle`.
- Use DOI and ORA record in `sameAs`.
- Use DOI as `identifier`.
- Supervisors should be `contributor` nodes plus visible/structured description noting supervision, because Schema.org lacks a dedicated supervisor property.

Current issue:

- CV schema references the thesis page URL, but the thesis page may not yet exist or be in the sitemap.
- Treat carefully until route is implemented.

---

## 6. Design and UX decisions

### Visual/design principle

Preserve the site’s existing identity and distinctive design. Do not convert it into a generic academic theme.

### Homepage

Homepage navigation labels:

```text
Contact
Résumé
Writing
Seminars
```

Homepage links:

```html
<a href="mailto:hello@stevanveljkovic.com">Contact</a>
<a href="/cv/">Résumé</a>
<a href="/publications/">Writing</a>
<a href="https://seminars.stevanveljkovic.com/">Seminars</a>
```

Pronunciation link:

```text
https://ipa-reader.com/?text=stεv(%C9%99)n&voice=Brian
```

Displayed IPA:

```text
/ˈstεv(ə)n ˈvεlˌkəːvɪk/
```

Use:

```html
lang="und-fonipa"
```

on the IPA span.

### Accessibility decisions

- Internal CV link should not have `target="_blank"`:

  ```html
  <a href="/cv/">Résumé</a>
  ```

- If any `_blank` links are retained, use:

  ```html
  rel="noopener"
  ```

  or:

  ```html
  rel="noopener noreferrer"
  ```

- Decorative navigation icons should use:

  ```html
  alt="" aria-hidden="true"
  ```

- Homepage nav list should be valid HTML: `<ul>` must contain `<li>` children, not direct `<p>` children.
- Existing CSS depends on `p.Headings`; preserve it unless the CSS is rewritten.
- Acceptable structure:

  ```html
  <ul class="nav-list">
    <li>
      <p class="Headings">
        ...
      </p>
    </li>
  </ul>
  ```

### Review pages

Review pages preserve the original scholarly/manuscript visual style:

- `review_intro`;
- `review_text`;
- `review_par`;
- counters/control links;
- byline.

Current review route renders:

```astro
<ReviewIntro review={review} />

<div class="review_text">
  <Content />
  <ReviewByLine bylineHtml={review.bylineHtml} />
</div>
```

Review byline detail not to change without checking:

```html
<a href="mailto:correspondence@stevanveljkovic.com">stevan.veljkovic@theology.ox.ac.uk</a>
```

This mismatch between visible email and `mailto:` appears intentional or at least historically present.

### Publications page

The `/publications/` page should preserve:

- grouped-by-year bibliography;
- old CSS classes such as `BibEntry`, `counter_bib`, `test#writings`;
- note lines under entries where relevant;
- exact citation formatting where possible.

### Motion/interactivity

Use JavaScript/animation sparingly.

Avoid:

- scrolljacking;
- gimmicky interactions;
- SPA-style client-side navigation for core content.

Respect `prefers-reduced-motion` if adding animation.

### Open Graph/social image

Shared headshot/social image:

```text
https://stevanveljkovic.com/images/headshot-1200x630.png
```

Dimensions:

```text
1200 × 630
```

Homepage Open Graph/Twitter pattern:

```html
<meta property="og:title" content="Stevan Veljkovic" />
<meta property="og:description" content="Personal website of Dr Stevan M. Veljkovic." />
<meta property="og:url" content="https://stevanveljkovic.com/" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://stevanveljkovic.com/images/headshot-1200x630.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://stevanveljkovic.com/images/headshot-1200x630.png" />
```

---

## 7. Major decisions and rationale

### Use Astro, not a SPA

Astro provides static generation, content collections, clean URLs, and future component flexibility without turning the site into a client-side JavaScript app.

### Progressive migration, not redesign

The goal is maintainability while preserving the site’s existing identity. Stage 1 therefore moved the site into Astro without a visual rewrite.

### Content-driven reviews

Review pages should be generated from Markdown content files. This avoids one-off `.astro` pages and one-off schema files per review.

Rationale:

- easier to add future reviews;
- fewer copy-paste errors;
- metadata can drive pages, publication index, sitemap, and JSON-LD;
- structured data remains synchronized with content.

### Full review pages vs list-only publication records

The `reviews` collection is for full generated review pages.

List-only bibliography records should go into a separate lightweight collection:

```text
src/content/publication-items/
```

Rationale:

- not every publication needs a local page immediately;
- full review schema is too heavy for bibliography-only entries;
- avoids generating unwanted review pages;
- `/publications/` can still be fully data-driven.

### DOI-first structured-data IDs

Use DOI URLs as `@id`s for scholarly works when DOI exists.

Rationale:

- DOI URLs are stable, globally recognized scholarly identifiers.
- Publisher landing pages can be `url` or `sameAs`, but not primary IDs when DOI exists.

### Local manuscript and DOI version are distinct

Especially for Cosmic Connections:

- local author manuscript/original submission is materially different from the published article;
- therefore no `sameAs`;
- use `isBasedOn`/`citation` to the DOI version.

### Keep old rich Cosmic schema temporarily

The old Cosmic Connections schema file is not the desired production pattern, but it contains useful rich modelling.

Keep it as a reference until the generated factory reproduces/improves the important parts.

### Manual home/CV schemas remain appropriate

The homepage and CV are one-off pages with distinct graph structures. They should remain manually curated rather than forced through review schema factories.

### Redirect strategy

GitHub Pages cannot emit arbitrary server-side 301/302 redirects.

If staying on GitHub Pages, old HTML URLs should use static HTML redirect stubs.

Old URLs:

```text
/writing.html
/writing/ReviewCosmicConnectionsV2.html
```

Targets:

```text
/writing.html → /publications/
/writing/ReviewCosmicConnectionsV2.html → /publications/reviews/cosmic-connections/
```

Redirect stubs should include:

- canonical link to new URL;
- meta refresh;
- `location.replace`;
- visible fallback link.

Redirect stubs should not contain full JSON-LD.

Do not replace old PDF URLs with HTML redirect pages; keep PDFs as PDFs or later use true HTTP redirects via Cloudflare.

### Cloudflare decision

Cloudflare is not currently required.

If adopted later, no need to transfer domain registration; change nameservers while keeping current registrar.

Cloudflare would be useful for:

- true 301 redirects;
- `X-Robots-Tag` headers for PDFs;
- security headers;
- `www` → apex redirect.

---

## 8. Bugs, errors, and fixes

### Eleventy duplicate output conflict

Error:

```text
[11ty] Output conflict: multiple input files are writing to
`./_site/Website/smvsite/writing/index.html`.
1. ./Website/smvsite/writing/index.html
2. ./Website/smvsite/writing.html
```

Likely cause:

- Eleventy was run from a parent directory above the actual site root;
- both `writing.html` and `writing/index.html` mapped to the same clean output path.

Resolution:

- do not run SSG tools from a broad parent directory;
- run from actual site root or specify `--input` and `--output`;
- Astro path was chosen instead.

### Astro dynamic route masked by static page

Problem:

The dynamic route did not appear to generate `/publications/reviews/cosmic-connections/`.

Cause:

An old static page under `src/pages/publications/reviews/cosmic-connections/` masked the dynamic route.

Resolution:

Move/remove old manual page from `src/pages`.

### Dynamic route 404 because collection empty/not detected

Warning/error:

```text
The collection "reviews" does not exist or is empty.
A `getStaticPaths()` route pattern was matched, but no matching static path was found.
```

Cause:

The `reviews` collection was not correctly detected/loaded.

Resolution:

Use Astro 6 loader-style collection:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
```

and:

```ts
loader: glob({
  base: "./src/content/reviews",
  pattern: "**/*.md",
})
```

Restart dev server after changes.

### Duplicate schema keys in `content.config.ts`

Problematic pattern:

```ts
defineCollection({
  loader: ...,
  schema: ...,
  type: "content",
  schema: ...
})
```

Cause:

Duplicate object keys cause later `schema` to overwrite earlier one; `type: "content"` was unnecessary/confusing for loader-style Astro 6.

Resolution:

Keep one `schema`; remove duplicate and unnecessary `type`.

### Wrong `z` import

Older/deprecated/incorrect patterns:

```ts
import { z } from "astro:content";
import { z } from "astro:schema";
```

Current chosen Astro 6 pattern:

```ts
import { z } from "astro/zod";
```

### `review.id` TypeScript error

Error:

```text
Property 'id' does not exist on type ...
```

Cause:

`review` was `entry.data`, not full collection entry.

Resolution:

Use:

```ts
entry.id
```

or:

```ts
review.slug
```

depending on intent.

### `ReviewIntro` not displaying data

Cause:

`ReviewIntro.astro` expected frontmatter fields at top level but was possibly passed the full entry.

Resolution:

Pass data object:

```astro
<ReviewIntro review={review} />
```

where:

```ts
const review = entry.data;
```

Inside component, use:

```ts
review.citationHtml
review.openingVersionNote
```

not:

```ts
review.data.citationHtml
```

### `openingVersionNote` missing/optional

Problem:

`openingVersionNote` did not render or missing data was hidden.

Resolution:

Make it required:

```ts
openingVersionNote: z.string()
```

### `createReviewSchema()` accidentally imported on homepage

Problem:

`createReviewSchema` appeared in/near `src/pages/index.astro`, which is the homepage.

Resolution:

Remove from homepage. Homepage should use:

```ts
homeSchema
```

Only the dynamic review route should call:

```ts
createReviewSchema(review)
```

### `buildReviewSchema()` vs `createReviewSchema()` conflict

Problem:

Two functions existed:

```ts
buildReviewSchema()
createReviewSchema()
```

Resolution:

Use only:

```ts
createReviewSchema(review)
```

in active dynamic review route.

Keep `src/lib/schema/review.ts` only as legacy/reference for now.

### JSON-LD validation confusion

Problem:

Attempting to validate raw TypeScript object literal as JSON-LD.

Cause:

TypeScript object literals are not JSON; they may include imports, unquoted keys, template strings, trailing commas.

Resolution:

Validate final rendered JSON-LD from page source:

```html
<script type="application/ld+json">...</script>
```

### JSON-LD escaping error

Earlier Google saw:

```html
&quot;@context&quot;
```

Cause:

JSON-LD had been HTML-escaped inside the script.

Resolution:

Use:

```astro
<script
  is:inline
  type="application/ld+json"
  set:html={JSON.stringify(data, null, 2)}
></script>
```

Do not HTML-escape JSON-LD.

### Astro script hints

Astro hinted that scripts with attributes were treated as inline.

Resolution:

Add `is:inline` explicitly to components such as `Analytics.astro` and `JsonLd.astro`.

Example:

```astro
<script
  is:inline
  type="application/ld+json"
  set:html={JSON.stringify(data, null, 2)}
></script>
```

### Double slash in Person URL

Problem:

```json
"url": "https://stevanveljkovic.com//"
```

Cause:

```ts
`${site.url}/`
```

when `site.url` already had a slash or was joined incorrectly.

Resolution:

Use URL helper:

```ts
absoluteUrl("/")
```

### Weak reviewed-work ID

Problem:

Reviewed book used publisher landing page as `@id`.

Resolution:

Use DOI URL as `@id` when DOI exists:

```text
https://doi.org/10.4159/9780674297074
```

Use publisher landing page as `url` or `sameAs`.

### Weak reviewed-work author modelling

Problem:

```json
"author": "Charles Taylor"
```

Resolution:

Factory should output:

```json
"author": {
  "@type": "Person",
  "name": "Charles Taylor"
}
```

### Edited volume model bug

Problem:

```json
"author": {
  "@type": "Person",
  "name": "Gionathan Lo Mascolo (ed.)"
}
```

Resolution:

Use:

```json
"editor": {
  "@type": "Person",
  "name": "Gionathan Lo Mascolo"
}
```

Display strings can still include “ed.”.

### `/publications/` only showed two entries

Cause:

The page queried only:

```ts
getCollection("reviews", ...)
```

and only two reviews had been migrated.

Resolution/plan:

Add `publicationItems` collection and combine it with `reviews`.

### Relative note links

Problem:

```html
reviews/cosmic-connections/
```

could be fragile.

Resolution:

Use root-relative links:

```html
/publications/reviews/cosmic-connections/
```

### Homepage image width/height issue

Problem:

HTML attributes like:

```html
width="41vw" height="27vw"
```

are invalid because `width`/`height` attributes require numeric pixel values.

Resolution:

Remove them and let CSS size icons.

### Safari homepage name invisibility

User reported Safari did not show:

```html
<h1 class="Name">Stevan Veljkovic</h1>
```

Computed Safari styles showed:

```text
color: black
font-size: 32px
```

Likely cause:

Text was black on black/dark background due to CSS cascade.

Likely immediate fix:

```css
h1.Name {
  color: #fff;
}
```

This issue was not fully resolved. Inspect `src/styles/global.css` or old generated CSS in Safari Web Inspector.

---

## 9. Current unresolved issues

### Publications page migration

`/publications/` is only partially content-driven.

Need to implement/finish:

```text
src/content/publication-items/
```

and update:

```text
src/pages/publications/index.astro
```

to combine:

```ts
reviews
publicationItems
```

Need restore all previous bibliography entries.

### Publications page JSON-LD

Need implement:

```text
src/data/schema/publications/createPublicationsSchema.ts
```

Model:

```text
CollectionPage
  mainEntity → ItemList
```

Identifier rules:

1. DOI URL if available.
2. Local page URL if local page exists.
3. Stable `/publications/#fragment` if neither DOI nor local page exists.

### Review JSON-LD refinements

Still open/non-blocking:

- confirm `version` support on local review node;
- add `Periodical`, `PublicationVolume`, `PublicationIssue` nodes;
- add published review `isPartOf` chain;
- decide whether to include both `citation` and `isBasedOn` for all reviews;
- decide whether to split local page into `WebPage` + `#review` article node;
- refine `name` vs `headline`;
- decide what local `datePublished` means:
  - local site publication date;
  - journal online publication date;
  - issue publication date;
- preserve relevant richness from old Cosmic schema.

### Review frontmatter schema shape

Need confirm/finalize `src/content.config.ts`, especially:

- `reviewedWork.author` as string/object/array;
- `reviewedWork.editor`;
- `sameAs` as string or array;
- `publishedReview.journal`;
- `publishedReview.volume`;
- `publishedReview.issue`;
- `version`;
- usage/reuse policy fields;
- DOI normalization/validation.

### Data verification

Need verify:

- Christian Right exact metadata:
  - published date;
  - volume/issue;
  - `csaf039` handling;
  - journal ISSNs;
  - PDF filename/path;
  - version wording.
- Other reviews:
  - DOI;
  - journal;
  - volume/issue/pages/year;
  - book DOI/ISBN;
  - author/editor;
  - whether local page should exist.

### CV/thesis route mismatch

CV schema may reference:

```text
/thesis/religious-atavism-climate-crisis/
```

but the thesis route may not yet exist or be in the sitemap.

Need either:

- implement thesis page; or
- adjust schema until page exists.

### Thesis page

Planned but not implemented/confirmed:

```text
/thesis/religious-atavism-climate-crisis/
```

Need add page and PDF when ready.

### Sitemap

Need verify whether Astro sitemap integration is installed and configured.

If not, install:

```bash
npx astro add sitemap
```

Need ensure future/draft pages are excluded.

### Legacy redirects

Old URLs may need redirect stubs:

```text
/writing.html
/writing/ReviewCosmicConnectionsV2.html
```

Old PDFs should remain available:

```text
/writing/ReviewCosmicConnectionsV2.pdf
/itinerary.pdf
```

Implementation in current Astro project is not confirmed.

### Seminars

Unresolved:

- whether to consolidate `seminars` into main repo;
- whether to preserve repo history if consolidated;
- whether relative links/assets would break under `/seminars/`;
- whether current `seminars` repo has custom domain configured.

### Cloudflare

Undecided.

Potential reasons to adopt later:

- true redirects;
- PDF indexing headers;
- security headers;
- canonical `www` → apex redirect.

### Safari CSS bug

Still unresolved unless fixed since last discussion.

### Deployment workflow

Exact deployment workflow for Astro to GitHub Pages has not been recorded/finalized in these summaries.

Need know whether:

- build output is committed to `smveljkovic.github.io`;
- GitHub Actions builds Astro;
- deployment uses `dist/`;
- custom domain/CNAME handling is configured.

---

## 10. Recommended next steps

### Immediate checks

Run:

```bash
npx astro sync
npx astro check
npm run build
```

Inspect local pages:

```text
http://localhost:4321/
http://localhost:4321/publications/
http://localhost:4321/cv/
http://localhost:4321/publications/reviews/cosmic-connections/
http://localhost:4321/publications/reviews/christian-right-europe/
```

Check generated source for:

```html
application/ld+json
```

Validate rendered JSON-LD at:

```text
https://validator.schema.org/
```

### Clean up review schema use

1. Confirm dynamic review route imports only:

   ```ts
   import { createReviewSchema } from "../../../../data/schema/reviews/createReviewSchema";
   ```

2. Confirm it calls:

   ```ts
   const jsonLd = createReviewSchema(review);
   ```

3. Remove mistaken `createReviewSchema` imports from homepage or other non-review pages.
4. Confirm no active route imports `buildReviewSchema`.
5. Keep old Cosmic schema as reference only.

### Finish `/publications/` Stage 2.4

1. Add `publicationItems` collection to `src/content.config.ts`.
2. Create:

   ```text
   src/content/publication-items/
   ```

3. Add list-only files for non-migrated entries:
   - thesis;
   - Hell review;
   - Challenging Modernity review;
   - Evolution of Religions review;
   - Godless Crusade review;
   - any other old bibliography entries.

4. Update `/publications/index.astro` to query both:

   ```ts
   const reviews = await getCollection("reviews", ({ data }) => !data.draft);
   const standalonePublicationEntries = await getCollection("publicationItems", ({ data }) => !data.draft);
   ```

5. Normalize both to display objects:

   ```ts
   id
   year
   sortDate
   order
   citationHtml
   noteHtml
   noteId
   ```

6. Sort:
   - descending year;
   - descending sort date;
   - ascending manual order.

7. Render with old classes:

   ```text
   BibEntry
   counter_bib
   test#writings
   ```

8. Compare generated page against old hard-coded page.
9. Preserve old page for comparison if useful:

   ```text
   src/_old-pages/publications-index-hardcoded.astro
   ```

### Add publications JSON-LD

Create:

```text
src/data/schema/publications/createPublicationsSchema.ts
```

Pass generated schema to `TextPageLayout`.

Use `CollectionPage` + `ItemList`.

### Add remaining full review pages

For each new full review page:

1. Add Markdown file under:

   ```text
   src/content/reviews/
   ```

2. Add PDF/assets under `public/` if needed.
3. Confirm route is generated.
4. Confirm `/publications/` includes it.
5. Validate JSON-LD.
6. Check sitemap.

Likely next review content files:

```text
hell-christian-ecology.md
challenging-modernity.md
evolution-of-religions.md
godless-crusade.md
```

### Implement thesis page

Add:

```text
src/pages/thesis/religious-atavism-climate-crisis/index.astro
```

or content-driven thesis route later.

Include:

```text
/thesis/religious-atavism-climate-crisis/
/thesis/religious-atavism-climate-crisis/veljkovic-phd-thesis.pdf
```

Update sitemap and CV schema once live.

### Redirect legacy URLs

Add static redirect stubs if still needed:

```text
public/writing.html
public/writing/ReviewCosmicConnectionsV2.html
```

or equivalent Astro static pages, ensuring they output exact old paths.

Stub pattern:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Redirecting…</title>
  <link rel="canonical" href="https://stevanveljkovic.com/publications/" />
  <meta http-equiv="refresh" content="0; url=https://stevanveljkovic.com/publications/" />
  <script>
    location.replace("https://stevanveljkovic.com/publications/");
  </script>
</head>
<body>
  <p>Moved to <a href="https://stevanveljkovic.com/publications/">the new URL</a>.</p>
</body>
</html>
```

No full JSON-LD on redirect stubs.

### Validate deployment

Before deploying:

- `npm run build`;
- check `dist/`;
- check canonical URLs;
- check PDF paths;
- check sitemap;
- check favicons;
- check JSON-LD;
- check Open Graph image;
- check mobile layout;
- check Safari homepage text.

---

## 11. Details that should not be lost

### Core identity

```text
Name: Stevan Veljkovic
Additional name: M.
Alternate name: Stevan M. Veljkovic
Location: Oxford, England
Public email: hello@stevanveljkovic.com
ORCID: https://orcid.org/0000-0002-2599-3227
Google Scholar: https://scholar.google.com/citations?user=e42TN4UAAAAJ
GitHub: https://github.com/smveljkovic
Google Analytics: G-7VMGXMNZZ0
Site language: en-GB
```

### Site title variants

Recorded title variants:

```text
Dr Stevan Veljkovic – theorist and editor
Stevan Veljkovic – theorist and editor
Dr Stevan Veljkovic
S. Veljkovic – theorist and editor
Dr S. Veljkovic
```

Homepage original/aesthetic title was:

```html
<title>Re: Stevan Veljkovic</title>
```

Later homepage/site title was also described as:

```text
Dr Stevan Veljkovic – theorist and editor
```

This may need deliberate final choice.

### Important image

```text
https://stevanveljkovic.com/images/headshot-1200x630.png
1200 × 630
```

### Important favicon paths

```text
/favicon.ico
/favicon.svg
/images/apple-touch-icon.png
/images/favicon-32x32.png
/images/favicon-16x16.png
/site.webmanifest
```

### Review migration goal

Adding a review should require only:

```text
src/content/reviews/<slug>.md
public/... assets if needed
```

No new `.astro` page.

No new per-review schema `.ts` file.

### Important current dynamic route

```text
src/pages/publications/reviews/[slug]/index.astro
```

### Content files live here

```text
src/content/reviews/*.md
```

Not:

```text
src/contents/
src/content/review/
src/content/reviews/<slug>/<slug>.md
```

unless intentionally reconfigured.

### `set:html` policy

Allowed for local/trusted migration fields:

```yaml
citationHtml
bylineHtml
originalSubmissionNote
publicationList.noteHtml
```

Do not use untrusted input.

### JSON-LD policy

- Validate rendered JSON.
- DOI URLs as `@id`.
- ORCID as `Person.@id`.
- Local review pages and published DOI articles are distinct.
- Use `isBasedOn`/`citation`, not false `sameAs`.
- For edited volumes, use `editor`.

### Cosmic special case

Do not lose:

- local Cosmic page is an unabridged Original Submission / Author Manuscript;
- materially different from final published version;
- no `sameAs` to DOI article;
- use `isBasedOn` and `citation`;
- include version/status separately;
- publisher reuse policy link was included:

  ```text
  https://uk.sagepub.com/en-gb/eur/journal-author-archiving-policies-and-re-use
  ```

- copyright:

  ```text
  © 2024 Stevan Veljkovic
  ```

### Thesis canonical slug

Use:

```text
/thesis/religious-atavism-climate-crisis/
```

not:

```text
/thesis/atavism-climate-crisis/
```

### Old URLs/PDFs

Keep old URLs in mind:

```text
/writing.html
/writing/ReviewCosmicConnectionsV2.html
/writing/ReviewCosmicConnectionsV2.pdf
/itinerary.pdf
```

Old CV-ish URL:

```text
/itinerary.pdf
```

should remain working for backward compatibility.

### Seminars architecture fact

DNS CNAME from `seminars.stevanveljkovic.com` to `smveljkovic.github.io` does **not** mean the subdomain maps to a main-repo folder.

GitHub Pages uses the HTTP `Host` header and Pages configuration to decide which site to serve.

Current `/seminars/` behaviour is due to GitHub Pages project-site routing and likely custom-domain canonicalization in the `seminars` repo.

### Domain email catch-all

Domain email uses iCloud catch-all.

Guidance:

- unique invented addresses per account are useful;
- record every address in password manager;
- for critical accounts, configure aliases/addresses explicitly if sending from that address may be needed;
- protect registrar, iCloud, DNS, and renewal because the domain becomes a single point of failure.

### AI workflow

Do not paste huge transcripts into each new request.

Maintain compact durable summaries/memory files.

Suggested local structure:

```text
AI/
  site-project/
    00-current-summary.md
    01-active-question.md
    02-astro-structure.md
    03-jsonld-notes.md
    04-css-notes.md
    archive/
      2026-05-long-conversation.md
```

---

## 12. Possibly superseded or uncertain information

### Superseded

- Eleventy path is superseded by Astro.
- Full Astro theme adoption is superseded by custom progressive migration.
- Earlier generic Astro structures without `src/pages/` were corrected; route files are required.
- Earlier `/publications/book-reviews/` idea was superseded by:

  ```text
  /publications/reviews/
  ```

- Earlier review URL ideas were superseded by:

  ```text
  /publications/reviews/<slug>/
  ```

- Earlier CV PDF ideas were superseded by:

  ```text
  /cv/veljkovic-cv.pdf
  ```

- Earlier thesis slug was superseded by:

  ```text
  /thesis/religious-atavism-climate-crisis/
  ```

- Earlier DPhil event modelling was superseded by dated `Role`.
- Earlier invalid schema properties were superseded:
  - `Person.dissertation`;
  - `OrganizationRole.worksFor`;
  - credential `startDate`/`endDate`.
- Earlier OpenAlex `sameAs` idea was rejected.
- Earlier `review.id` usage was corrected to `entry.id` or `review.slug`.
- Earlier `z` import suggestions were superseded by:

  ```ts
  import { z } from "astro/zod";
  ```

- Earlier `openingVersionNote` optionality was superseded; it is required.
- Earlier `buildReviewSchema()` usage was superseded by:

  ```ts
  createReviewSchema(review)
  ```

- Earlier schema factory path under `src/lib/schema/` was superseded operationally by:

  ```text
  src/data/schema/reviews/createReviewSchema.ts
  ```

  though future reorganization remains possible.

### Uncertain

- Exact current committed shape of `src/content.config.ts`.
- Exact current implementation of `createReviewSchema.ts`.
- Whether `version` currently exists in review frontmatter and generated JSON-LD.
- Whether `sameAs` is normalized to arrays.
- Whether old Cosmic schema is still imported anywhere.
- Whether `publishedReview.image` uses book cover incorrectly.
- Exact current PDF paths for Christian Right and other reviews.
- Whether current `JsonLd.astro` uses `is:inline` and explicit closing `</script>`.
- Whether sitemap integration is already installed or still static/manual.
- Whether deployment workflow uses GitHub Actions, manual build output, or another method.
- Whether old redirect stubs have been implemented in Astro project.
- Whether thesis route exists yet.
- Whether `www.stevanveljkovic.com` redirects to apex.
- Whether Safari homepage CSS issue has been fixed.
- Whether `seminars` should be consolidated into main repo.
- Whether review bodies should eventually become Markdown, MDX, or stay as raw HTML inside Markdown.
- Whether `publicationItems` has already been added since the last worksheet.
