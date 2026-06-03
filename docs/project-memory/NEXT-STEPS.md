# Next Steps

This file is an active checklist derived from `docs/project-memory/current.md`.
Treat `current.md` and the actual code/build output as authoritative. Older
migration-era assumptions, especially notes that only Cosmic Connections and
Christian Right exist as review pages, are superseded.

## 1. Post-Launch Follow-Up

1. **Fix or deliberately resolve the OG/headshot image mismatch**
   - Current code/build output references:
     ```text
     /images/headshot-1200x630.png
     ```
   - Current public file is:
     ```text
     /images/headshot-1200x630.JPG
     ```

2. **Repeat PageSpeed checks and record metrics**
   - Check the homepage and at least one representative review page.
   - Record the metrics in project memory or a validation note.

3. **Recheck legacy URL behaviour after deployment**
   - HTML stubs should forward correctly and stay out of the sitemap.
   - PDF compatibility URLs should load PDFs.
   - Check:
     ```text
     /writing.html
     /writing/ReviewCosmicConnectionsV2.html
     /writing/ReviewCosmicConnectionsV2.pdf
     /itinerary.pdf
     ```

4. **Keep withheld reviews withheld unless decisions change**
   - `challenging-modernity` and `christian-right-europe` are drafted/withheld.
   - Their temporarily removed review materials are stored at:
     ```text
     ~/Projects/website-admin/withheld-images-folders/
     ```

5. **Enable automatic deployment on push to `main`**
   - Current workflow is manual-only with `workflow_dispatch`.
   - Updating it to build on push is intended as the final Stage 3 subtask.

## 2. Continuing Verification Pass

1. **Run project checks**
   ```bash
   npx astro sync
   npx astro check
   npm run build
   ```

   Rerun after any content/schema changes.

2. **Confirm generated route set**
   - Current observed `dist/` snapshot contains 7 pages:
     ```text
     /
     /cv/
     /publications/
     /publications/reviews/cosmic-connections/
     /publications/reviews/evolution-of-religions/
     /publications/reviews/godless-crusade/
     /publications/reviews/hell-christian-ecology/
     ```
   - If any drafted review is intentionally made live, update the expected
     generated route set and sitemap accordingly.

3. **Inspect generated sitemap**
   ```bash
   find dist -name "sitemap*.xml" -print -exec cat {} \;
   ```

   Confirm only intended live canonical pages appear. Current expected sitemap
   entries are the seven generated routes above.

4. **Verify generated-page asset references**
   - PDFs.
   - Reviewed-work cover images.
   - Issue/periodical images.
   - Favicon files.
   - Open Graph/social image.
   - Current selected public tree confirms only these review PDFs:
     ```text
     public/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
     public/publications/reviews/hell-christian-ecology/veljkovic-review-hell-christian-ecology.pdf
     ```
   - Keep references for drafted/withheld `christian-right-europe` and
     `challenging-modernity` from becoming public routes or public assets unless
     rights/publication decisions change.

5. **Validate rendered JSON-LD**
   - Inspect built page source, not TypeScript literals.
   - Search for:
     ```html
     application/ld+json
     ```
   - Validate:
     ```text
     /
     /cv/
     /publications/
     all intended live review pages
     ```
   - External tools:
     ```text
     https://validator.schema.org/
     https://search.google.com/test/rich-results
     ```

6. **Validate HTML/accessibility basics**
   - Use:
     ```text
     https://validator.w3.org/
     ```
   - Check homepage navigation markup.
   - Decorative icons should use:
     ```html
     alt="" aria-hidden="true"
     ```
   - Internal CV links should not use `target="_blank"`.

## 3. Content And Metadata Cleanup

1. **Fix schema/frontmatter mismatches where fields are meant to matter**
   - Check any frontmatter keys not declared in `src/content.config.ts`.
   - Pay attention to display-only date labels:
     - `publicationIssueSchema` currently has `dateLabel`;
     - older notes mention `issueDateLabel`;
     - keep display-only labels out of Schema.org unless mapped intentionally.

2. **Clean placeholder-like sorting/date metadata**
   - `godless-crusade` has `publicationList.sortDate: "2023-01-01"`, which may
     be placeholder-like.
   - `christian-right-europe` issue date is month precision, but sort date may
     use `"2025-07-01"`.
   - `challenging-modernity` citation issue-year is 2025, but list year/sort
     date may follow first-online publication in 2024.

3. **Check headshot/OG image path**
   - Current selected public tree has:
     ```text
     /images/headshot-1200x630.JPG
     ```
   - Older notes expected:
     ```text
     /images/headshot-1200x630.png
     ```
   - Inspect `src/data/site.ts` and generated page source for broken image URLs.

4. **Remove accidental macOS files if tracked**
   - `.DS_Store` files are present in source/public tree.
   - Remove them from the repo if tracked or accidentally committed.

5. **Review analytics script duplication**
   - `Analytics.astro` uses `site.analyticsId` for the script URL but hardcodes:
     ```js
     gtag("config", "G-7VMGXMNZZ0")
     ```
   - Fine if matching, but not DRY.

## 4. Structured Data Rules To Preserve

1. **Journal review graph**
   ```text
   local WebPage
     mainEntity -> local #review
     about -> reviewed Book

   local #review
     itemReviewed -> reviewed Book
     isBasedOn/citation -> DOI/published review

   DOI/published review
     itemReviewed -> reviewed Book
     isPartOf -> PublicationIssue -> PublicationVolume -> Periodical
   ```

2. **Pagination**
   - Article/review pagination belongs on the published article/review node:
     ```text
     pagination
     pageStart
     pageEnd
     ```
   - Issue-level pagination should only describe the whole issue and only be
     added if verified.
   - `csaf039` is an article ID, not pagination.

3. **Dates**
   - `publishedReview.datePublished` means publisher-recognised first
     publication date, usually first online.
   - `publishedReview.firstPublishedOnline` may be used internally, but should
     map to Schema.org `datePublished`.
   - Do not emit a non-standard Schema.org `firstPublishedOnline`.
   - `PublicationIssue.datePublished` means issue date/month/year where known.
   - Do not put article first-online dates on issue nodes.

4. **Issue names**
   - Do not emit `PublicationIssue.name` merely as the issue number.
   - Use `issueNumber` for numbers.
   - Use `name` only for real publisher-supplied issue labels.

5. **Images**
   - Preferred convention:
     ```text
     public/images/publications/reviews/<slug>/
       reviewed-work/cover.jpg
       issue/cover.jpg
       periodical/poster.jpg
       periodical/banner.jpg
       article/image.jpg
       page/social-card.jpg
     ```
   - Frontmatter should use root-relative URLs:
     ```yaml
     reviewedWork:
       image: "/images/publications/reviews/<slug>/reviewed-work/cover.jpg"
     ```
   - Attach images to the correct entity:
     - `reviewed-work/cover.jpg` -> reviewed `Book` / work;
     - `issue/cover.jpg` -> `PublicationIssue`;
     - `periodical/poster.jpg` or `periodical/banner.jpg` -> `Periodical`;
     - `article/image.jpg` -> article/post/review only if rights are clear;
     - `page/social-card.jpg` -> local page/Open Graph image.

## 5. Deployment And Legacy URLs

1. **Recheck deployment/DNS behaviour periodically during post-launch hardening**
   ```bash
   curl -I https://stevanveljkovic.com/
   curl -I https://www.stevanveljkovic.com/
   curl -I https://seminars.stevanveljkovic.com/
   curl -I https://stevanveljkovic.com/seminars/
   curl -I -L https://stevanveljkovic.com/seminars/
   ```

2. **Enable build-on-push to `main` as the final Stage 3 subtask**
   - Current workflow is manual-only with `workflow_dispatch`.
   - Preserve the manual trigger if useful.

3. **Keep legacy stop-gaps working**
   - HTML stubs currently cover:
     ```text
     /writing.html
     /writing/ReviewCosmicConnectionsV2.html
     ```
   - PDF compatibility files currently cover:
     ```text
     /writing/ReviewCosmicConnectionsV2.pdf
     /itinerary.pdf
     ```
   - A later Netlify/Cloudflare move can replace these with true redirects if
     desired.

## 6. Deferred Until Stage 4

1. **Thesis page**
   - Thesis remains bibliography-only until Stage 4.
   - Do not create or link:
     ```text
     /thesis/religious-atavism-climate-crisis/
     ```
     unless actually implemented.
   - Primary thesis ID:
     ```text
     https://doi.org/10.5287/ora-4rjoobkvk
     ```

2. **Larger CSS/layout rewrite**
   - Preserve migrated visual identity for Stage 3.
   - Do not rename or aggressively refactor legacy classes before launch.
   - The inherited margin-counter/year-marker layout may be rethought or
     discarded in Stage 4.

3. **Richer `/publications/` JSON-LD**
   - Richer reviewed-book nodes, license/copyright-holder modelling, and
     external WebPage nodes are deferred.
   - Keep current `/publications/` model:
     ```text
     CollectionPage
       mainEntity -> ItemList
         itemListElement -> ListItem[]
     ```

4. **Trusted HTML migration**
   - Current trusted local bridge fields remain acceptable:
     ```text
     citationHtml
     bylineHtml
     reuseNoteHtml
     modificationNote
     publicationList.noteHtml
     ```
   - Decide later whether to replace them with a more semantic citation/content
     model.

5. **Seminars site consolidation**
   - Current seminars URL:
     ```text
     https://seminars.stevanveljkovic.com/
     ```
   - Leave separate for now unless a deliberate consolidation plan is made.

## 7. Superseded Assumptions Removed

- Only Cosmic Connections and Christian Right are live review pages.
- `publicationItems` still needs to be created.
- `/publications/index.astro` still needs to be migrated to combine reviews and
  list-only publication items.
- `createPublicationsSchema.ts` still needs to be created.
- Hell, Challenging Modernity, Evolution of Religions, and Godless Crusade are
  merely future review files.
- The thesis page should be implemented immediately.
- Review JSON-LD still needs its basic `WebPage` / local `#review` / DOI review
  split, periodical chain, pagination rule, and first-online date rule decided.
