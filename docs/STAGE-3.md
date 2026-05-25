# Stage 3: Harden, expand, and launch

## Aim

Stage 3 takes the Astro migration from a substantially working local rebuild to
a production-ready live website.

The purpose of this stage is to:

1. harden the existing Astro site;
2. validate and improve scholarly metadata;
3. add the next set of review pages;
4. preserve old URLs where possible;
5. document and execute the first live deployment.

Stage 3 is not primarily a redesign stage. The priority is correctness,
stability, metadata truthfulness, copyright caution, URL continuity, validation,
and maintainability.

In short:

```text
Stage 3 = harden + expand + launch
```

## Current premise

The site already has the main Astro architecture in place:

- Astro configuration with canonical site URL and trailing-slash routing;
- content collections for reviews and publication-list items;
- a dynamic review route;
- a generated `/publications/` page;
- centralized JSON-LD generation for reviews and publications;
- preserved legacy visual identity.

The remaining work is not another structural migration. It is a disciplined
hardening and launch phase.

## Non-goals

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

## Core principles

- Validate rendered output, not only source files.
- Prefer truthful modest schema over ambitious inaccurate schema.
- Keep local author manuscripts, accepted manuscripts, submitted manuscripts,
  versions of record, DOI articles, and local webpages conceptually distinct.
- Preserve the site’s existing scholarly visual identity.
- Keep old URLs and PDFs working where feasible.
- Make deployment boring, documented, and repeatable.

## Workstreams

### 1. Existing-site hardening

Harden the currently live/generated pages before adding more review pages.

Tasks:

- Run baseline checks.
- Remove production debugging output, especially any `console.log()` in page
  generation.
- Ensure review pages pass SEO props correctly through:

```text
review page → ReviewLayout → BaseLayout → SeoHead
```

- Ensure review pages receive the intended Open Graph type, normally:

```html
<meta property="og:type" content="article">
```

- Harden JSON-LD node IDs so no `@id` can become an array.
- Normalize DOI handling consistently, including `doi.org` and `dx.doi.org`
  variants.
- Inspect generated routes.
- Inspect generated sitemap.

### 2. Publications data integrity

Ensure `/publications/` is the authoritative bibliography page.

Tasks:

- Confirm that `/publications/` is generated from both `reviews` and
  `publicationItems`.
- Compare the rendered bibliography against the intended bibliography.
- Confirm year grouping, sort dates, manual order, citation formatting, DOI
  links, local links, PDF links, and note lines.
- Keep `citationHtml` where needed for exact scholarly citation formatting.
- Do not force every bibliography item into the `reviews` collection.

### 3. Publications-page JSON-LD

Harden the `/publications/` structured data.

Target model:

```text
CollectionPage
  mainEntity → ItemList
    itemListElement → ListItem[]
```

Identifier preference for publication items:

1. DOI URL, if available;
2. canonical local page URL, if available;
3. stable local fragment URL.

The visible bibliography and the JSON-LD item list should agree.

### 4. Review schema refinement

Improve the generated review schema without returning to per-page hardcoded
schema files.

Review JSON-LD should distinguish:

1. Stevan as `Person`, identified by ORCID;
2. the reviewed work;
3. the published review/article, if applicable;
4. the local hosted review page or manuscript.

Tasks:

- Add or finalize a `WebPage` node pattern if appropriate.
- Decide and document `name` vs `headline` behaviour.
- Fix node ID behaviour.
- Add journal, volume, issue, article ID, pagination, DOI, and ISSN data where
  available and appropriate.
- Add `firstPublishedOnline` or equivalent date fields where useful.
- Validate rendered JSON-LD from page source.

Special rules:

- Do not identify local manuscripts and DOI versions with `sameAs` unless they
  are genuinely the same work/version.
- For `Cosmic Connections`, preserve the distinction between the local
  unabridged Original Submission / Author Manuscript and the published DOI
  version.
- For `Christian Right in Europe`, model the reviewed edited volume with
  `editor`, not an author string containing “(ed.)”.

### 5. Add three further review pages

Add the next three full review pages:

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

For each review, confirm:

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

### 6. Copyright, version, and review-page display rules

Before publishing additional local review texts, define a consistent policy for
review-page introductory matter.

Decide how to label and display, where relevant:

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

Do not publish rights-sensitive full text until reuse status is clear.

### 7. Legacy URL preservation

Inventory and preserve old URLs where possible.

Important known legacy URLs include:

```text
/writing.html
/writing/ReviewCosmicConnectionsV2.html
/writing/ReviewCosmicConnectionsV2.pdf
/itinerary.pdf
```

Tasks:

- Create `docs/legacy-urls.md`.
- Identify old HTML pages, PDFs, CV paths, image paths, and externally linked
  assets.
- Add static redirect stubs for GitHub Pages where needed.
- Keep old PDF URLs serving PDFs where feasible.
- Do not put full JSON-LD on redirect stubs.
- Use real 301 redirects later if moving to Netlify or Cloudflare.

### 8. Thesis page decision

Decide whether the thesis page is in scope for Stage 3.

Canonical future slug:

```text
/thesis/religious-atavism-climate-crisis/
```

Do not use:

```text
/thesis/atavism-climate-crisis/
```

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
- validate the rendered JSON-LD.

### 9. Deployment preparation

Document and prepare the first live deployment.

Tasks:

- Create `docs/deployment.md`.
- Create `docs/launch-checklist.md`.
- Decide the initial deployment method.
- Begin with GitHub Pages unless a better first-launch target is chosen.
- Confirm custom domain handling.
- Confirm whether `public/CNAME` is needed.
- Confirm DNS records.
- Confirm build output and deployment branch/workflow.
- Add a GitHub Actions workflow if deploying through GitHub Pages.

The likely initial deployment path is:

```text
Astro build → GitHub Pages → stevanveljkovic.com
```

A later hosting move may be considered for better redirects and deployment
features:

```text
GitHub Pages → Netlify or Cloudflare Pages
```

### 10. First live deployment

Push the Astro site live.

Tasks:

- Run final local checks.
- Run local preview.
- Deploy.
- Verify the live site.
- Verify live PDFs and assets.
- Verify sitemap.
- Validate live JSON-LD.
- Check canonical URLs and trailing slashes.
- Check old URL stubs.
- Monitor Google/Search Console behaviour if available.

### 11. Post-launch hosting decision

After the first live deployment, decide whether GitHub Pages is sufficient.

If moving to Netlify or Cloudflare Pages, use that move to implement proper
server-side redirects.

For old HTML routes, prefer permanent redirects:

```text
301 → new canonical URL
```

Do not use 303 for ordinary old-page-to-new-page redirects.

### 12. Small accessibility and design fixes

Fix small issues without redesigning the site.

Checklist:

- homepage `h1.Name` visible in Safari;
- homepage nav uses valid list structure;
- decorative icons use `alt="" aria-hidden="true"`;
- external `_blank` links use `rel="noopener"` or `rel="noopener noreferrer"`;
- internal CV links do not open in a new tab unnecessarily;
- pages have appropriate landmarks where possible;
- long review pages remain readable on mobile;
- review pages have acceptable heading/link structure.

## Checks

Run after significant changes:

```bash
npx astro sync
npx astro check
npm run build
```

For local inspection:

```bash
npm run dev
npm run preview
```

Useful route/content inspections:

```bash
find src/pages -type f | sort
find src/content -maxdepth 4 -type f | sort
find dist -maxdepth 5 -type f | sort
find dist -name "sitemap*.xml" -print -exec cat {} \;
```

## Validation

Validate rendered pages, not source objects:

- https://validator.w3.org/
- https://validator.schema.org/
- https://pagespeed.web.dev/

Use Schema Markup Validator for general scholarly JSON-LD. Google Rich Results
may report “no items detected” for valid schema types that do not produce rich
results.

Validate at least:

```text
/
 /publications/
 /cv/
 /publications/reviews/cosmic-connections/
 /publications/reviews/christian-right-europe/
```

After the new reviews become live, also validate:

```text
/publications/reviews/godless-crusade/
/publications/reviews/hell-christian-ecology/
/publications/reviews/challenging-modernity/
```

## Initial Stage 3 sequence

The preferred order is:

1. baseline checks;
2. production-cleanliness fixes;
3. current route audit;
4. current JSON-LD validation;
5. review/publications schema hardening;
6. add three new review pages as drafts;
7. resolve copyright/version/display rules;
8. publish new review pages one by one;
9. inventory and preserve legacy URLs;
10. prepare GitHub Pages deployment;
11. deploy live;
12. validate live site;
13. decide whether to remain on GitHub Pages or move to Netlify/Cloudflare.

## Stage 3 completion criteria

Stage 3 is complete when:

- `npx astro sync` passes.
- `npx astro check` passes.
- `npm run build` passes.
- `/`, `/publications/`, `/cv/`, and all live review pages render correctly.
- `/publications/` includes the intended bibliography.
- Publications data is generated from content collections.
- `/publications/` has truthful `CollectionPage` / `ItemList` JSON-LD.
- Review JSON-LD validates and accurately distinguishes:
    - local page/manuscript;
    - published DOI article;
    - reviewed work;
    - Stevan as ORCID-identified person.
- No schema node has an array-valued `@id`.
- DOI URLs are normalized consistently.
- Review pages use the intended Open Graph article metadata.
- The three additional review pages have either been published or explicitly
  left as drafts with documented blockers.
- Copyright/version status is documented for all live local review texts.
- Legacy URLs are inventoried and preserved or redirected where feasible.
- Sitemap contains only real canonical pages.
- Deployment process is documented.
- The Astro site has been deployed live at `https://stevanveljkovic.com/`.
- Live canonical pages and JSON-LD have been validated.
- Thesis-page scope has been explicitly decided.
- Known accessibility/design regressions are fixed or consciously deferred.

## Deferred or optional work

The following are useful but should not block Stage 3 unless explicitly
promoted:

- full replacement of `citationHtml` with automated citation rendering;
- favicon redesign;
- progress indicators for long review pages;
- Wikidata entry;
- Semantic Scholar link, unless a stable and correct profile is confirmed;
- major redesign of review intro sections;
- post-launch move from GitHub Pages to Netlify or Cloudflare.