# Next Steps

Source of truth: current code/build output, then `current.md`.

Workflow: `main` is production; `stage-4-0` is the Stage 4 integration branch; merge only coherent public release units.

## 1. Release the `progress-and-regression` publications update

1. **Review and validate the release**
   - Review the aggregate `main...stage-4-0` diff.
   - Rerun final checks.

2. **Merge and deploy**
   - Merge the coherent release into `main`.
   - Push `main` and confirm the Netlify deployment.

3. **Verify live `/publications/`**
   - Confirm the review appears exactly once.
   - Confirm the DOI, formal title, date, and pagination are correct.
   - Confirm no local webpage or PDF pill appears.
   - Confirm rendered JSON-LD emits `inLanguage: "en"`.

4. **Verify routes and sitemap**
   - Confirm the sitemap remains at 12 routes.
   - Confirm it excludes `/publications/reviews/progress-and-regression/`.

## 2. Stage 4.3: Creating a proper web CV page

Resume this work after releasing the `progress-and-regression` publications update.

1. **Process standing queries from stage 4.2.1 end**
   - Find file at `~/Projects/website-admin/rights/2026-06-23_outstanding-queries.md`

2. **Do cursory run through web CV creation**
   - Decide relation of web CV and PDF CV
   - Define CV page sections
   - Implement expanded CV page
   - Ensure PDF CV link remains available
   - Check structured data / ProfilePage assumptions
   - Validate Build and page display

## 3. Prepare the local `progress-and-regression` review page

Treat this as a later, separate coherent release.

1. **Prepare the permitted local version**
   - Add the permitted Accepted Author Manuscript body.
   - Add the required Johns Hopkins University Press credit and version wording.
   - Decide whether to create a locally hosted permitted AAM PDF.

2. **Validate schema and release**
   - Verify that the published review’s `isPartOf` reference resolves to an emitted `PublicationIssue` node.
   - Build, validate, deploy, and verify the page as a separate coherent release.

## 4. Content And Metadata Cleanup

1. **Remove accidental macOS files if tracked**
   - `.DS_Store` files are present in source/public tree.
   - Remove them from the repo if tracked or accidentally committed.

2. **Review analytics script duplication**
   - `Analytics.astro` uses `site.analyticsId` for the script URL but hardcodes:
     ```js
     gtag("config", "G-7VMGXMNZZ0")
     ```
   - Fine if matching, but not DRY.

3. **Update `hell-christian-ecology` citation DOI URL**
   - Update the `/publications/` citation for `hell-christian-ecology` to use the `doi.org` address.

4. **Add reviewedWork / itemReviewed data to `publications` JSON-LD**
   - For remediating complaints from Google
   - Use reviewedWork data from review content files

5. **Audit published-review language metadata**
   - Audit existing `publishedReview.inLanguage` values.
   - Decide whether neutral `en` should be adopted consistently.

## 5. Technical Validation and closing out

1. **Do standard checking procedure / deployment hygiene**
   - Run local checks
   - Check Netlify deploy from main
   - Check live pages after deployment
   - Validate representative JSON-LD
   - Check sitemap
   - Check legacy redirects

2. **Complete close-out tasks and due diligence**
   - Record stage 4.0 objectives vs. outcomes achieved
   - Update project memory
   - Decide stage 5.0 scope and aims
