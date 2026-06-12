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

Project-memory maintenance should remain bounded and should not consume more than roughly 10–15% of Stage 4.0 work from
here onward.

## Current Workflow

- `main` = production.
- `stage-4-0` = Stage 4.0 integration branch.
- Merge only coherent public release units.

## 1. Stage 4.1b Research Hub And Later Stage 4 Work

1. **Create `/research/` as a compact hub**
   - It should be a map/signposting page, not an essay or manifesto.
   - Give the doctoral thesis pride of place.
   - Separate outputs from themes.
   - Do not apologise for lack of conventional research articles.
   - Keep v1 modest.

2. **Expose Research in primary nav only after `/research/` exists**
   ```text
   Research → /research/
   ```

3. **Add a short Seminars bridge only if it fits naturally**
   - Keep `https://seminars.stevanveljkovic.com/` separate.
   - Do not import seminar PDFs/assets into the main Astro site during Stage 4.1.

4. **Then implement the thesis page**
   ```text
   /research/doctoral-thesis/religious-atavism-climate-crisis/
   ```
   - Primary thesis ID:
     ```text
     https://doi.org/10.5287/ora-4rjoobkvk
     ```

## 2. Continuing Verification Pass

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
   /publications/reviews/cosmic-connections/
   /publications/reviews/evolution-of-religions/
   /publications/reviews/godless-crusade/
   /publications/reviews/hell-christian-ecology/
   /research/   once created
   ```

2. **Confirm generated route set**
   - Expected generated/live route set before `/research/` contains 8 pages:
     ```text
     /
     /cv/
     /publications/
     /pronunciation/
     /publications/reviews/cosmic-connections/
     /publications/reviews/evolution-of-religions/
     /publications/reviews/godless-crusade/
     /publications/reviews/hell-christian-ecology/
     ```
   - If any drafted review is intentionally made live, update the expected generated route set and sitemap accordingly.
   - Once `/research/` is created, update the expected generated route set, sitemap checks, and primary navigation.
   - Do not expect or link the thesis route until `/research/doctoral-thesis/religious-atavism-climate-crisis/` is
     implemented.

3. **Inspect generated sitemap**
   ```bash
   find dist -name "sitemap*.xml" -print -exec cat {} \;
   ```

   Confirm only intended live canonical pages appear. Current expected sitemap entries are the eight generated routes
   above. Confirm `/pronunciation/` is included and `/research/` remains absent until implemented.

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

## 3. Content And Metadata Cleanup

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

3. **Check headshot / OG image path**
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
6. **Update `hell-christian-ecology` citation DOI URL**
   - Update the `/publications/` citation for `hell-christian-ecology` to use the `doi.org` address.
7. **Check link contrast, especially blue/purple on the dark background**
   - but do not keep tuning link styles unless a real contrast or usability issue is found.

## 4. Deployment, DNS, And Legacy URLs

Before release, verify Netlify deploy, apex/www redirects, sitemap, and forced legacy redirects.

## 5. Repository hygiene / archival cleanup

- Later: review `smvsite-base` and old branches now that the Astro site deploys from `main` to
  Netlify.
- Decide whether to archive / remove obsolete branches, make the repo private, or add a clearer
  README.
- Confirm no old branch / deployment path is still serving public content before deleting anything.