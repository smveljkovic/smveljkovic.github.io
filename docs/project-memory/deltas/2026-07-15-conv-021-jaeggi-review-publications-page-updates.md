# 2026-07-15 — Add Progress and Regression review metadata

## What changed

- Added the newly published *Theory & Event* review, `progress-and-regression`, to the `/publications/` bibliography while keeping its local review page drafted.
- Added optional `publishedReview.inLanguage` metadata with `site.language` as fallback.
  - The new published-review DOI node emits `inLanguage: "en"`.
  - Existing records without overrides continue to emit `en-GB`.
  - Local site/page entities remain `en-GB`.
- Made `rights.license.url` optional to support correspondence-based permissions without inventing a public licence URL.
- Made the `/publications/` `webpage` resource pill optional.
- Added reviewed-work and issue-cover assets under the new review’s image directory.
- `npx astro check` passed with no errors, warnings, or hints; `npm run build` succeeded with 12 generated pages.
- Four new commits were pushed to `origin/stage-4-0`, ending at `65110e4`.

## Decisions made

- Use slug `progress-and-regression`.
- Publish the eventual local review page using the Accepted Author Manuscript/final manuscript permitted by Johns Hopkins University Press; do not host the Version of Record or publisher PDF.
- Required rights substance:
  - copyright holder: Johns Hopkins University Press;
  - permission statement includes: “Copyright © 2026 Johns Hopkins University Press. This article first appeared in Theory & Event, Volume 29, Number 3, July 2026. Published with permission by Johns Hopkins University Press.”
- Do not invent a licence URL for private correspondence-based permission.
- Use the journal’s formal published title in metadata and JSON-LD:
  `Progress and Regression by Rahel Jaeggi (review)`.
- Keep the manuscript’s literary heading, `“A path back” to the future`, in the review body rather than formal publication metadata.
- Model the reviewed edition using:
  - ISBN `9780674298019`;
  - HUP URL `https://www.hup.harvard.edu/books/9780674298019`;
  - author Rahel Jaeggi;
  - translator Robert Savage.
- Omit the e-book/JSTOR DOIs from the reviewed-edition node and do not use their platform pages as `sameAs`; they identify alternate electronic manifestations.
- Do not use the Project MUSE direct-PDF URL as a resource pill because it leads through verification. Do not substitute the questionable ORA-hosted file. A future PDF should be a locally hosted permitted AAM PDF, if desired.
- For new JPEG assets, prefer `.jpg` over `.jpeg` for consistency, but preserve appropriate existing PNG files; no global format conversion is needed.
- Codex should not commit, push, merge, or deploy unless explicitly instructed; repository-aware agents may inspect, edit, validate, and report changes.

## Files affected

- `src/content.config.ts`
  - `rights.license.url` made optional.
  - optional validated `publishedReview.inLanguage` added.
- `src/content/reviews/progress-and-regression.md`
  - new drafted review record and `inLanguage: "en"`.
- `src/pages/publications/index.astro`
  - new review data passed into publications schema; optional webpage-resource handling.
- `src/data/schema/publications/createPublicationsSchema.ts`
  - published-review language override with site fallback.
- `src/data/schema/reviews/createReviewSchema.ts`
  - matching language fallback for the eventual local review graph.
- `public/images/publications/reviews/progress-and-regression/`
  - reviewed-work cover and *Theory & Event* issue-cover assets.
- Commits pushed:
  - `e97ff09` — Make `license.url` optional in publications schema
  - `b2e0848` — Make webpage pill optional and update date on publications page
  - `a4a97c7` — Add Progress and Regression review to publications
  - `65110e4` — Make emitted JSON-LD language values more flexible

## Bugs/fixes

- Fixed content validation failure caused by mandatory `rights.license.url` when the JHU Press permission has no public URL.
- Prevented the drafted review from receiving a misleading local `webpage` pill.
- Corrected the published review’s language from inherited `en-GB` to explicit neutral `en`.
- Clarified that the review’s official title is `Progress and Regression by Rahel Jaeggi (review)`, not the literary manuscript heading.
- Avoided conflating the reviewed print/PDF edition with electronic editions carrying DOI `10.4159/9780674301962` or JSTOR DOI `10.2307/jj.31106770`.

## Current state

- `stage-4-0` and `origin/stage-4-0` are at `65110e4`.
- The new review appears on `/publications/`, bringing the expected publication-list count from 7 to 8.
- `progress-and-regression` remains drafted:
  - no local review route is generated;
  - no sitemap entry exists for it;
  - generated route count remains 12.
- The rendered `/publications/` DOI node uses:
  - DOI `https://doi.org/10.1353/tae.2026.a993505`;
  - title `Progress and Regression by Rahel Jaeggi (review)`;
  - publication date `2026-06-26`;
  - pagination `662–664`;
  - `inLanguage: "en"`.
- Merge to `main`, Netlify deployment, and live verification of this update were discussed but not confirmed.
- Active memory contains a stale statement that the thesis merge/deployment is unconfirmed. The conversation confirms that the thesis and both formerly withheld reviews are live; production had 12 sitemap routes before this drafted-review update.

## Next steps

1. Review the aggregate `main...stage-4-0` release diff and rerun final checks.
2. Merge `stage-4-0` into `main` as a coherent release, push `main`, and confirm the Netlify production deployment.
3. Verify live `/publications/`:
   - new review appears exactly once;
   - DOI/title/date/pagination are correct;
   - no local webpage or PDF pill appears yet;
   - JSON-LD emits `inLanguage: "en"`.
4. Confirm the production sitemap remains at 12 routes and excludes `/publications/reviews/progress-and-regression/`.
5. Before making the local review live:
   - add the AAM body and JHU Press credit/version wording;
   - decide whether to create a local AAM PDF;
   - verify the published review’s `isPartOf` reference resolves to an emitted `PublicationIssue` node;
   - build, validate, and deploy as a separate coherent review-page release.
6. Later, audit existing published-review `inLanguage` values and decide whether neutral `en` should be used consistently.
7. Resume the bounded Stage 4.3 web-CV work after the new review release.

## Details not to lose

- JHU Press permits the final manuscript on the author’s personal online site but not the final published version or publisher PDF.
- The reviewed copy is the edition with ISBN `9780674298019`; the HUP catalogue URL is its primary reviewed-work URL.
- The e-book DOI and JSTOR DOI are legitimate identifiers for alternate manifestations, not competing IDs for the reviewed edition.
- `PublicationIssue` fragment IDs such as `#review-progress-and-regression-issue` are valid internal graph identifiers only if a node with the exact same `@id` is emitted.
- Existing trimmed-memory warnings about `challenging-modernity` and `christian-right-europe` being withheld are historical and superseded; both pages are live.
