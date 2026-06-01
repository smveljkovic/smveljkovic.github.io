# 2026-06-01 — Stage 3.4–3.6 launch gating, rights tables, draft handling, and deployment prep

## What changed

- Stage planning was reframed around a **minimum responsible launch path** rather than a sequence of broad feature stages.
- User clarified that GTD/org-mode task trees should not be wholesale rewritten by the assistant; future help should provide **targeted comments, small edits, and risk flags** so the trusted system remains personal and usable.
- A rights/permissions table was added to `docs/project-memory/current.md` and later expanded with:
  - rights platform;
  - permission/clarification status;
  - launch status;
  - rights-platform credit language;
  - publisher suggested credit language.
- A canonical publication-version labelling table was added to `master-values.md`.
- A JSON-LD audit table was added to `docs/project-memory/current.md`.
- User reports they made `draft: true` handling work properly so that rights-withheld review pages can be suppressed while bibliography entries remain possible; exact code/files changed were not supplied in the conversation.
- Stage 3.6 moved into focus: legacy URLs, deployment preparation, minimal deployment docs/checklist, and GitHub Pages workflow.

## Decisions made

- **Stage 3.4–3.7 should function as a launch gate.**
  - If a page is uncertain, draft/withhold it.
  - If an enhancement is optional, defer it.
  - If a check prevents rights, broken-link, sitemap, schema, or deployment mistakes, do it now.

- **Do not use a post-build pruning script for draft review PDFs/assets.**
  - Rejected because it would make the small site feel too Rube-Goldberg-like.
  - Adopted policy: `public/` contains only files definitely intended to be public.

- **`draft:true` controls page generation only.**
  - It does not protect static files under `public/`, which Astro copies directly into `dist/`.
  - No rights-uncertain PDF, image, or other publication asset should live under `public/`.
  - Later improvement: implement an explicit asset-publication model/allowlist.

- **Canonical publication-version labels now include:**
  - **Author’s original manuscript (AOM)**
  - **Accepted Manuscript (AM)**
  - **Version of Record (VoR)**
  - **Published web article** — used for edited web-outlet/blog-series cases such as `evolution-of-religions`.

- **For `evolution-of-religions`, use the intro wording:**
  ```text
  The following text reproduces the published web article:
  ```
  This keeps the review-intro template consistent and puts the canonical label in the expected “The following text…” line.

- **Performance issue is not a launch blocker for now.**
  - Disabling Typekit did not clearly improve rendering.
  - `npm run build && npm run preview` still felt sluggish.
  - Serving the same `dist/` via `npx serve dist` felt fine.
  - Conclusion: likely local preview-server/machine condition rather than built-output problem.
  - Recheck live performance after deployment; defer Source Serif 4/font strategy to a later stage unless live measurements require action.

- **PDF UX dead-end is acknowledged but deferred.**
  - Direct PDF links can strand users in browser PDF viewers without site navigation.
  - Launch policy remains: HTML review pages are canonical/contextual; PDFs are secondary resources.
  - Later consider canonical URLs inside PDFs, new-tab policy, landing/download pages, or embedded viewers only if justified.

## Files affected

- `docs/project-memory/current.md`
  - User added/expanded:
    - rights and permissions table;
    - `public/` asset rules;
    - JSON-LD audit;
    - legacy URL notes;
    - deployment notes;
    - launch checklist.
- `master-values.md`
  - User added canonical publication-version labelling table.
- Code changes for improved `draft:true` behaviour were reported but not specified in the conversation.
- Discussed but not confirmed created:
  - `docs/legacy-urls.md`
  - `docs/deployment.md`
  - `docs/launch-checklist.md`
  - `.github/workflows/deploy.yml`
- Discussed but rejected:
  - post-build pruning script such as `scripts/prune-draft-review-assets.mjs`.

## Bugs/fixes

- **Rights-sensitive static assets issue identified:**
  - PDFs under `public/publications/reviews/<slug>/` are copied to `dist/` even if the corresponding review has `draft:true`.
  - Fix/policy: do not place unpermitted or rights-uncertain files in `public/`.

- **JSON-LD audit findings recorded:**
  - `/` passes JSON-LD playground and Google Rich Results test, but Google detects no rich-result item.
  - `/cv/` passes and Google detects `1 Profile page` with no issues.
  - `/publications/` passes validation but Google reports:
    - Articles: non-critical missing image / datetime issues;
    - Review snippets: critical missing `itemReviewed`.
  - Individual review pages pass and Google reports no Review snippet issues, though Article non-critical image/date warnings remain.
  - Follow-up needed: add `reviewedWork`/`itemReviewed` data to `/publications/` JSON-LD later.

- **Google ProfilePage concern clarified:**
  - The old/current vanilla site’s Rich Results behaviour may have changed due to Google tooling rather than site changes.
  - Concrete issue to check remains headshot/OG/JSON-LD image URL mismatch: older `.png` references vs current public `.JPG`.

- **Performance triage outcome:**
  - Typekit is probably not the primary cause.
  - `astro preview` can feel slower than plain static serving.
  - If `npx serve dist` feels fine, built output is probably acceptable for launch.

## Current state

- Rights table launch statuses now distinguish “Live” from “Live if AM only”.
- Current rights/launch posture from the table:
  - `cosmic-connections`: AOM, Sage policy, Launch status `Live`.
  - `hell-christian-ecology`: VoR, CC BY-NC-ND, Launch status `Live`.
  - `evolution-of-religions`: Published web article / URL, LSE Blogs CC BY, Launch status `Live`.
  - `godless-crusade`: AM, T&F policy, clarification sought, Launch status `Live if AM only`.
  - `challenging-modernity`: VoR, T&F/CCC permission unresolved, Launch status `Live if AM only`.
  - `christian-right-europe`: VoR, OUP/CCC permission/clarification status still marked `Yes`, Launch status `Live if AM only`.
- All items, regardless of full-page launch status, should appear in the bibliography.
- `publication-items` duplicate review records are still considered a stop-gap for reviews; long-term direction is:
  - reviews collection = source of truth for review publications, even bibliography-only;
  - `publicationItems` = genuinely list-only/non-review works such as thesis.
- `createPublicationsSchema.ts` should not be treated as a stop-gap; it remains the likely permanent `/publications/` schema generator, but needs better data/input for review-derived entries.
- Stage 3.6 purpose clarified:
  - record known legacy URLs and launch actions;
  - create minimal deployment notes/checklist;
  - add GitHub Pages workflow;
  - do not let full redirect strategy delay first launch.
- GitHub Pages is still the first deployment target; migration to Cloudflare/Netlify for real redirects/headers remains post-launch.

## Next steps

- Rebuild and verify actual route/sitemap state after the reported `draft:true` changes:
  ```bash
  npx astro sync
  npx astro check
  npm run build
  find dist -name "sitemap*.xml" -print -exec cat {} \;
  find dist/publications -type f | sort
  npx serve dist
  ```
- Confirm that any withheld review:
  - has no generated route;
  - is absent from sitemap;
  - has no unpermitted static assets in `public/` or `dist/`;
  - still appears bibliographically if intended.
- Apply the rights table to the launch build, especially:
  - `challenging-modernity`;
  - `godless-crusade`;
  - `christian-right-europe`.
- Rename/preserve the deferred JSON-LD task clearly:
  ```text
  Add reviewedWork/itemReviewed data to /publications/ JSON-LD
  ```
  or:
  ```text
  Resolve /publications/ Review snippet itemReviewed issue
  ```
- Stage 3.6:
  - create or finalise minimal `docs/legacy-urls.md`;
  - create or finalise minimal `docs/deployment.md`;
  - create or finalise minimal `docs/launch-checklist.md`;
  - add `.github/workflows/deploy.yml`;
  - confirm GitHub Pages source is GitHub Actions;
  - confirm custom domain/CNAME handling.
- Legacy URL candidates to track:
  ```text
  /writing.html
  /writing/ReviewCosmicConnectionsV2.html
  /writing/ReviewCosmicConnectionsV2.pdf
  /itinerary.pdf
  ```
- Defer:
  - sitemap `lastmod`;
  - full legacy URL inventory;
  - real 301 redirects;
  - Cloudflare/Netlify decision;
  - embedded PDF viewer;
  - Source Serif 4 migration;
  - large typography/layout redesign.

## Details not to lose

- `public/` policy:
  ```text
  If it is in public/, it is public.
  draft:true does not protect public assets.
  ```
- Future asset-publication model should:
  - keep source publication assets outside `public/`;
  - store explicit publish/permission metadata for assets;
  - copy only permitted assets into `dist`;
  - avoid relying on `public/` as the source of truth for rights-sensitive files.

- `/publications/` schema caution:
  - If a review is drafted/withheld, do not emit nonexistent local page IDs such as:
    ```text
    https://stevanveljkovic.com/publications/reviews/<slug>/#review
    ```
  - For bibliography-only DOI items, prefer DOI/publisher IDs where appropriate.

- `evolution-of-religions` display/schema distinction:
  - visible label: **Published web article**;
  - published source schema: `BlogPosting` + `Review`;
  - local reproduction schema: `Article` + `Review`;
  - no fake journal/volume/issue metadata.

- GTD/workflow preference:
  - Do not replace the user’s org-mode subtrees wholesale unless asked.
  - Provide targeted comments, risk flags, and small suggested insertions that preserve the trusted system.

- Performance observation:
  - `astro preview` felt slow;
  - `npx serve dist` felt fine;
  - built static output probably acceptable;
  - validate live with PageSpeed/Lighthouse after deployment rather than blocking launch now.
