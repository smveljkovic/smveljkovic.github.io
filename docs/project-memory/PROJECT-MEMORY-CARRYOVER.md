# Project Memory Carryover

## 1. Project purpose

This is Stevan Veljkovic’s personal academic/professional website:

```text
https://stevanveljkovic.com/
```

It should function as a durable academic/research hub, not a generic portfolio. Public identity:

```text
Stevan Veljkovic
Theory and editing
Oxford, England
```

Subject identity: religious studies, modern history, social theory, secularism, climate change, liberalism.

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

The site has been migrated from hand-authored HTML/CSS to Astro while preserving existing URLs, scholarly metadata, PDFs, JSON-LD, and the distinctive visual identity.

## 2. Current state

Current Astro project root:

```text
/Users/stevan/Projects/smvsite-astro
```

Earlier vanilla site was `smvsite` / possibly `/Users/stevan/Website/smvsite`.

Current preserved/live routes:

```text
/
 /publications/
 /cv/
 /publications/reviews/cosmic-connections/
 /publications/reviews/christian-right-europe/
```

Stage 1 Astro migration is complete: existing routes/assets/CSS were preserved; repeated head/SEO/favicon/analytics/schema logic was extracted into layouts/components; homepage, publications, CV, and review pages were represented in Astro.

Stage 2 is in progress: review pages are now content-driven from Markdown. Current Markdown-driven review pages:

```text
src/content/reviews/cosmic-connections.md
src/content/reviews/christian-right-europe.md
```

Generated URLs:

```text
/publications/reviews/cosmic-connections/
/publications/reviews/christian-right-europe/
```

Dynamic review route is active:

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

`/publications/` is only partially content-driven and currently only shows migrated review entries unless list-only publication data has since been added. A separate lightweight `publicationItems` collection is planned for bibliography records without full local pages.

Current intended sitemap entries should include only actual generated pages:

```text
/
 /publications/
 /publications/reviews/cosmic-connections/
 /publications/reviews/christian-right-europe/
 /cv/
```

Do not include planned-but-not-live review routes until they are generated intentionally.

## 3. Key architecture / implementation details

Framework: Astro. Keep Astro; do not switch back to Eleventy or adopt a full theme. Astro is used for static generation, clean trailing-slash routes, content collections, Markdown, build-time SEO/JSON-LD, and possible future islands.

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
src/pages/index.astro                                  → /
src/pages/publications/index.astro                    → /publications/
src/pages/cv/index.astro                              → /cv/
src/pages/publications/reviews/[slug]/index.astro     → /publications/reviews/<slug>/
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

Static route masking warning: Astro static routes take priority over dynamic routes. Do not keep old per-review files under `src/pages/publications/reviews/...`, e.g.:

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

Do not use duplicate `schema` keys. Avoid older imports from `astro:content` or `astro:schema` for `z`.

CSS: preserve legacy/generated CSS globally for now. Preferred location:

```text
src/styles/global.css
```

imported once in `BaseLayout.astro`. Do not casually rename legacy classes yet, especially:

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

Structured data principles:

- ORCID URL is stable `Person.@id`.
- DOI URLs are stable IDs for scholarly works when available.
- JSON-LD belongs on canonical pages, not redirect stubs.
- Visible content and JSON-LD should agree.
- Validate rendered page-source JSON-LD, not TypeScript object literals.
- Do not include the rejected/conflated OpenAlex profile.

Review schema modelling:

- Distinguish Stevan as `Person`, the reviewed work, the published review/article, and the local hosted manuscript/page.
- Local hosted manuscript and DOI article are distinct if materially different.
- Do not use false `sameAs`.
- Use `isBasedOn` and/or `citation` from local version to published DOI version.
- Use `itemReviewed` for reviewed work.
- Edited volumes should use `editor`, not an `author` string containing “(ed.)”.
- Current local review type `["ScholarlyArticle", "Review"]` is acceptable; later may split `WebPage` and `#review`.

Home and CV schemas remain manual:

```text
src/data/schema/home.ts
src/data/schema/cv.ts
```

Do not use `createReviewSchema()` on homepage or CV.

## 4. Important files and commands

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
src/data/schema/home.ts
src/data/schema/cv.ts
src/data/schema/reviews/createReviewSchema.ts
```

Old/reference schema files may exist:

```text
src/data/schema/reviews/cosmic-connections/cosmic-connections.ts
src/lib/schema/review.ts
```

Keep the rich old Cosmic schema as a benchmark/reference until generated schema fully reproduces needed detail.

Current content:

```text
src/content/reviews/cosmic-connections.md
src/content/reviews/christian-right-europe.md
```

Planned content:

```text
src/content/publication-items/
src/content/reviews/hell-christian-ecology.md
src/content/reviews/challenging-modernity.md
src/content/reviews/evolution-of-religions.md
src/content/reviews/godless-crusade.md
```

Important assets:

```text
public/images/headshot-1200x630.png
public/favicon.ico
public/favicon.svg
public/site.webmanifest
public/cv/veljkovic-cv.pdf
public/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
public/publications/reviews/christian-right-europe/veljkovic-review-christian-right-europe.pdf
```

Development/build:

```bash
npm run dev
npx astro sync
npx astro check
npm run build
```

Inspect generated reviews:

```bash
ls dist/publications/reviews/
ls dist/publications/reviews/cosmic-connections/
ls dist/publications/reviews/christian-right-europe/
```

Find static files that may mask dynamic route:

```bash
find src/pages/publications/reviews -type f
```

Find content:

```bash
find src/content -maxdepth 4 -type f -print
```

Validation:

```text
https://validator.w3.org/
https://validator.schema.org/
https://search.google.com/test/rich-results
https://pagespeed.web.dev/
```

Rich Results may report “no items detected” for general schema types; use Schema Markup Validator for general JSON-LD.

## 5. Decisions and constraints to preserve

Preserve the custom visual/design identity. Do not convert the site into a generic academic Astro theme. Refactor only after routing/content/schema migration is stable.

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

Review pages should preserve original scholarly/manuscript visual style:

```astro
<ReviewIntro review={review} />

<div class="review_text">
  <Content />
  <ReviewByLine bylineHtml={review.bylineHtml} />
</div>
```

Do not change review byline email behavior casually; historical mismatch may be intentional:

```html
<a href="mailto:correspondence@stevanveljkovic.com">stevan.veljkovic@theology.ox.ac.uk</a>
```

Publications page should preserve grouped-by-year bibliography, old classes such as `BibEntry`, `counter_bib`, `test#writings`, exact citation formatting, and note lines.

`set:html` is acceptable for trusted local migration fields only:

```yaml
citationHtml
bylineHtml
originalSubmissionNote
publicationList.noteHtml
```

Content model decision: full local review pages belong in `src/content/reviews/`; bibliography-only items belong in planned `src/content/publication-items/`. Do not force every bibliography entry into `reviews`.

Important site constants in `src/data/site.ts` should include:

```ts
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
```

Use an `absoluteUrl(path)` helper via `new URL(path, site.url).toString()` to avoid double slashes.

Open Graph image:

```text
/images/headshot-1200x630.png
1200 × 630 PNG
```

Cosmic Connections special rule: local page is an unabridged Original Submission / Author Manuscript and materially different from published version. Do not use `sameAs` to DOI article. Use `isBasedOn`/`citation`; include version/status.

Christian Right special rule: reviewed book is an edited volume, so use `editor: Gionathan Lo Mascolo`, not author with “(ed.)”.

Thesis canonical slug:

```text
/thesis/religious-atavism-climate-crisis/
```

Do not revert to `/thesis/atavism-climate-crisis/`.

Old URLs to preserve/redirect/keep in mind:

```text
/writing.html
/writing/ReviewCosmicConnectionsV2.html
/writing/ReviewCosmicConnectionsV2.pdf
/itinerary.pdf
```

GitHub Pages cannot do arbitrary server redirects. If staying on GitHub Pages, use static HTML redirect stubs with canonical, meta refresh, `location.replace`, and visible fallback link. No full JSON-LD on redirect stubs. Do not replace old PDF URLs with HTML redirects; keep PDFs as PDFs unless true HTTP redirects are available later.

## 6. Open issues

1. `/publications/` is incomplete: it currently depends on `reviews` and only migrated review entries show unless `publicationItems` has been added since.
2. Need implement `src/content/publication-items/` for list-only bibliography records: thesis, Hell review, Challenging Modernity, Evolution of Religions, Godless Crusade, etc.
3. Need publications-page JSON-LD factory, likely:

```text
src/data/schema/publications/createPublicationsSchema.ts
```

Model as `CollectionPage` with `mainEntity → ItemList`; IDs should prefer DOI URL, then local page URL, then stable fragment.
4. Review JSON-LD needs refinements: periodical/volume/issue chain, final decision on `version`, local `datePublished` semantics, `name` vs `headline`, whether to split `WebPage` + article node.
5. Confirm/finalize `src/content.config.ts` shape, especially `reviewedWork.author/editor`, `sameAs`, `publishedReview.journal/volume/issue`, version/reuse-policy fields.
6. Verify Christian Right metadata: exact published date, volume/issue, `csaf039`, ISSNs, PDF filename/path, version wording.
7. CV schema may reference thesis URL before thesis page exists.
8. Thesis page planned but not confirmed implemented:

```text
src/pages/thesis/religious-atavism-climate-crisis/index.astro
```

9. Sitemap integration/status unknown; ensure only real non-draft pages are included.
10. Legacy redirect stubs may not yet be implemented.
11. Deployment workflow to GitHub Pages is not recorded/finalized: need know whether GitHub Actions builds Astro, `dist/` is deployed, or output is committed manually.
12. Safari homepage bug may remain: `h1.Name` invisible due to black text on dark background. Likely quick fix:

```css
h1.Name { color: #fff; }
```

13. Seminars consolidation remains undecided.

## 7. Immediate next steps

Run checks:

```bash
npx astro sync
npx astro check
npm run build
```

Inspect locally:

```text
http://localhost:4321/
http://localhost:4321/publications/
http://localhost:4321/cv/
http://localhost:4321/publications/reviews/cosmic-connections/
http://localhost:4321/publications/reviews/christian-right-europe/
```

Confirm review schema usage:

- Dynamic review route imports only:

```ts
import { createReviewSchema } from "../../../../data/schema/reviews/createReviewSchema";
```

- It calls:

```ts
const jsonLd = createReviewSchema(review);
```

- Homepage uses `homeSchema`; CV uses `cvSchema`.
- No active route imports `buildReviewSchema`.
- Old Cosmic schema remains reference only.

Finish publications Stage 2:

1. Add `publicationItems` collection in `src/content.config.ts`.
2. Create `src/content/publication-items/`.
3. Add list-only files for missing bibliography entries.
4. Update `src/pages/publications/index.astro` to query both:

```ts
const reviews = await getCollection("reviews", ({ data }) => !data.draft);
const standalonePublicationEntries = await getCollection("publicationItems", ({ data }) => !data.draft);
```

5. Normalize to objects with:

```text
id, year, sortDate, order, citationHtml, noteHtml, noteId
```

6. Sort descending year, descending sort date, ascending manual order.
7. Render using old classes.
8. Compare against old hard-coded publications page.

Then add publications JSON-LD, add remaining full review Markdown pages as needed, implement thesis page/PDF when ready, verify sitemap, add legacy redirect stubs, and validate rendered JSON-LD from page source.
