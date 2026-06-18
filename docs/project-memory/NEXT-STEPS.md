# Next Steps

Source of truth: current code/build output, then `current.md`.

This file is an active checklist derived from `docs/project-memory/current.md`.
Stage 3 is complete; production hosting is now Netlify, not GitHub Pages.

Stage 4.0 budget:

  ```text
  Target: 40–50 hours
  Mandatory scope review: 30 hours
  Re-scope / stop-and-decide threshold: 55 hours
  ```

Stage 4.0 has reached the mandatory 30-hour scope-review checkpoint. Before expanding further Stage 4 work, make and
record an explicit scope decision.

Project-memory maintenance should remain bounded and should not consume more than roughly 10–15% of Stage 4.0 work from
here onward.

## Current Workflow

- `main` = production.
- `stage-4-0` = Stage 4.0 integration branch.
- Merge only coherent public release units.

  ## 1. Stage 4.2 Thesis Page V1 Release Checklist

   1. **Finish thesis page release blockers**
      - final thesis copy;
      - top metadata block;
      - About section;
      - meta description;
      - short-title handling;
      - date/schema choices;
      - PDF asset/path verification;
      - confirm `/research/` thesis link is present, correct, and appropriate for release;
      - `/publications/` thesis entry check;
      - rendered JSON-LD validation;
      - mobile sanity check.

   2. **Verify thesis PDF if hosted locally**
      ```text
      public/research/doctoral-thesis/religious-atavism-climate-crisis/veljkovic-dphil-thesis.pdf
      ```
      Confirm the generated/live URL returns `200`.

   3. **Validate rendered thesis JSON-LD**
      - `WebPage.mainEntity` points to the DOI thesis node;
      - thesis `@id` is DOI URL;
      - `Person.@id` remains ORCID;
      - no `@id` arrays;
      - date-only values only;
      - `encoding.contentUrl` resolves if emitted;
      - include / confirm `isAccessibleForFree: true` where appropriate.

   4. **Confirm generated route set and sitemap**
      - thesis page generated;
      - for the current thesis-page working tree, confirm expected route count becomes 10 after build;
      - drafted/withheld reviews remain absent.

   5. **Run project checks**
      ```bash
      npx astro sync
      npx astro check
      npm run build
      npm run preview
      ```

   6. **Inspect at least**
      ```text
      /
      /research/
      /research/doctoral-thesis/religious-atavism-climate-crisis/
      /publications/
      /pronunciation/
      ```

   7. **Deploy Stage 4.2 only as a coherent release unit**
      - merge to `main` only after checks pass;
      - confirm Netlify production deployment;
      - confirm live route and PDF/resource links.

## 2. Stage 4.0 30-Hour Scope Decision

1. **Complete and record the 30-hour scope decision before expanding Stage 4 work**

2. **Current recommended rescope, pending explicit confirmation**
   - committed: Stage 4.2 thesis page v1, validation, and close-out;
   - conditional: bounded Stage 4.3 CV v1 after Stage 4.2 deploys;
   - optional triage only: withheld reviews rights/status;
   - defer unless separately re-scoped: full design foundation, light/dark mode, review reading aid, and
     publications/reviews refinements.

3. **If Stage 4.2 deploys with enough time remaining**
   - decide whether to do a bounded Stage 4.3 CV v1.

4. **Move or defer Stage 4.4–4.6 material unless separately re-scoped.**

## 3. Continuing Verification Pass

1. **Run project checks**
   ```bash
   npx astro sync
   npx astro check
   npm run build
   npm run preview
   ```

   Rerun after any content / schema changes.

   Inspect before merging a Stage 4.0 release unit to `main`:

   ```text
     /
     /cv/
     /publications/
     /pronunciation/
     /research/
     /publications/reviews/cosmic-connections/
     /publications/reviews/evolution-of-religions/
     /publications/reviews/godless-crusade/
     /publications/reviews/hell-christian-ecology/
     /research/doctoral-thesis/religious-atavism-climate-crisis/   current working tree; verify build/live state
   ```

2. **Confirm generated route set**
   - Current expected production sitemap may remain the 9-route set until Stage 4.2 is merged/deployed.
   - For the current thesis-page working tree, confirm build output contains 10 generated routes including
     `/research/doctoral-thesis/religious-atavism-climate-crisis/`.
     ```text
     /
     /cv/
     /publications/
     /pronunciation/
     /research/
     /publications/reviews/cosmic-connections/
     /publications/reviews/evolution-of-religions/
     /publications/reviews/godless-crusade/
     /publications/reviews/hell-christian-ecology/
     ```
   - For the current thesis-page working tree, confirm the generated route count is 10.
   - If any drafted review is intentionally made live, update the expected generated route set and sitemap accordingly.

3. **Inspect generated sitemap**
   ```bash
   find dist -name "sitemap*.xml" -print -exec cat {} \;
   ```

   Confirm only intended live canonical pages appear. Production may remain the 9-route set until Stage 4.2 is
   merged/deployed; the Stage 4.2 build should include the thesis page and 10 routes.

4. **Verify generated-page asset references**
   - PDFs.
   - Reviewed-work cover images.
   - Issue / periodical images.
   - Favicon files.
   - Open Graph / social image.
   - Current selected public tree confirms only these review PDFs:
     ```text
     public/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
     public/publications/reviews/hell-christian-ecology/veljkovic-review-hell-christian-ecology.pdf
     ```
   - Keep references for drafted /withheld `christian-right-europe` and
     `challenging-modernity` from becoming public routes or public assets unless
     rights / publication decisions change.

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

6. **Validate HTML / accessibility basics**
   - Verify the old invalid image path issue is gone or fix the offending reference if still present:
       ```text
       /images/Asset 1.png
       ```
   - Footer navigation should not reuse `aria-label="Primary"`; use a separate label such as `Footer` or `Secondary`.
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

## 4. Content And Metadata Cleanup

1. **Fix schema / frontmatter mismatches where fields are meant to matter**
   - Check any frontmatter keys not declared in `src/content.config.ts`.
   - Pay attention to display-only date labels:
      - `publicationIssueSchema` currently has `dateLabel`;
      - older notes mention `issueDateLabel`;
      - keep display-only labels out of Schema.org unless mapped intentionally.

2. **Clean placeholder-like sorting / date metadata**
   - `godless-crusade` has `publicationList.sortDate: "2023-01-01"`, which may
     be placeholder-like.
   - `christian-right-europe` issue date is month precision, but sort date may
     use `"2025-07-01"`.
   - `challenging-modernity` citation issue-year is 2025, but list year/sort
     date may follow first-online publication in 2024.

3. **Clean remaining headshot JSON-LD image references**
   - `site.image` and the public file now use:
     ```text
     /images/headshot-1200x630.jpg
     ```
   - Update home/CV schema references still pointing at:
     ```text
     /images/headshot-1200x630.png
     ```

4. **Remove accidental macOS files if tracked**
   - `.DS_Store` files are present in source/public tree.
   - Remove them from the repo if tracked or accidentally committed.

5. **Review analytics script duplication**
   - `Analytics.astro` uses `site.analyticsId` for the script URL but hardcodes:
     ```js
     gtag("config", "G-7VMGXMNZZ0")
     ```
   - Fine if matching, but not DRY.
6. **Update `hell-christian-ecology` citation DOI URL**
   - Update the `/publications/` citation for `hell-christian-ecology` to use the `doi.org` address.
7. **Check link contrast, especially blue/purple on the dark background**
   - but do not keep tuning link styles unless a real contrast or usability issue is found.
8. **Improve page descriptions**
   - Replace generic descriptions in `src/data/pageMeta.ts` for `/cv/`, `/pronunciation/`,
     `/publications/`, and `/research/`.
   - Prefer hand-authored, display-ready descriptions around 130-170 characters where
     practical.

## 5. Deployment, DNS, And Legacy URLs

Before release, verify Netlify deploy, apex/www redirects, sitemap, and forced legacy redirects.

## 6. Repository hygiene / archival cleanup

- Initial `smvsite-base` `testing` branch cleanup is resolved.
- Later: review `smvsite-base` and old branches now that the Astro site deploys from `main` to Netlify.
- Decide whether the old/base working copy and obsolete branches still serve a purpose, whether to archive/remove
  branches, make the repo private, or add a clearer README.
- Confirm no old branch / deployment path is still serving public content before deleting anything.
