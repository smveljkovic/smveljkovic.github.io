# Next Steps

Source of truth: current code/build output, then `current.md`.

Workflow: `main` is production; `stage-4-0` is the Stage 4 integration branch; merge only coherent public release units.

## 1. Stage 4.2 Thesis Page V1 Release Checklist

1. **Finish thesis page blockers**
   - final thesis copy;
   - top metadata block;
   - About section;
   - meta description;
   - short-title handling;
   - date/schema choices;
   - PDF asset/path verification;
   - `/research/` thesis link check;
   - `/publications/` thesis entry check;
   - rendered JSON-LD validation;
   - mobile sanity check.

2. **Run checks**
   ```bash
   npx astro sync
   npx astro check
   npm run build
   npm run preview
   ```

3. **Verify generated output**
   - thesis page generated;
   - expected route count is 10 in the current thesis-page working tree;
   - drafted/withheld reviews remain absent;
   - generated sitemap includes only intended canonical pages.

4. **Inspect key pages**
   /
   /cv/
   /publications/
   /pronunciation/
   /research/
   /research/doctoral-thesis/religious-atavism-climate-crisis/

5. **Validate release details**
   - local thesis PDF URL returns 200 if hosted;
   - rendered thesis JSON-LD has DOI thesis @id, ORCID Person.@id, no @id arrays, date-only values, and valid
     encoding.contentUrl if emitted;
   - generated asset references resolve;
   - HTML/accessibility basics pass for touched pages.

6. **Deploy only as a coherent release unit**
   - merge to main only after checks pass;
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

## 4. Deployment, DNS, And Legacy URLs

Before release, verify Netlify deploy, apex/www redirects, sitemap, and forced legacy redirects.

