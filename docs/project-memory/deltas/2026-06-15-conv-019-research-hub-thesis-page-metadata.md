# 2026-06-15 — Stage 4.1b release and Stage 4.2 thesis setup

## What changed

- Stage 4.1b research hub was implemented, merged to `main`, deployed on Netlify, verified live, and then merged back into `stage-4-0`.
- `/research/` now exists as a compact research hub and `Research → /research/` is live in primary navigation.
- Generated sitemap now contains 9 pages, including `/research/`.
- Site shell/design changes made alongside `/research/`:
  - header changed from one-line brand/nav to stacked brand-then-nav;
  - primary nav remains left-aligned and accommodates `Research`;
  - nav/footer spacing now uses shared gap variables;
  - homepage header/main/footer share a narrower `--home-cluster-width`;
  - homepage card rhythm/padding/wrapping was tuned;
  - `/research/` and `/pronunciation/` now share a framed white-border text-page motif on desktop and top/bottom borders on mobile.
- Social image metadata bug was fixed:
  - public file renamed from `public/images/headshot-1200x630.JPG` to `public/images/headshot-1200x630.jpg`;
  - metadata now emits `/images/headshot-1200x630.jpg`;
  - live `curl -I https://stevanveljkovic.com/images/headshot-1200x630.jpg` returns `HTTP/2 200`.
- Stage 4.2 thesis-page work has begun. The org subtree is active and source material has been gathered for the thesis page.

## Decisions made

- Stage 4.1 is complete. Current phase should now be treated as Stage 4.2 thesis page v1.
- Stage 4.2 should begin with a factual thesis metadata inventory / page content structure, then implementation, then schema/validation.
- Thesis page route remains:
  ```text
  /research/doctoral-thesis/religious-atavism-climate-crisis/
  ```
- Thesis page should use a structure like:
  - title / metadata block;
  - short authored “About this thesis” overview;
  - abstract;
  - citation;
  - resources;
  - identifiers;
  - supervision and examination;
  - licence / PDF availability.
- Use the Oxford Research Archive / DOI metadata version of the thesis abstract on the local thesis page.
- Do **not** add a public note drawing attention to the abstract discrepancy between the thesis PDF and ORA record.
- Do **not** claim the abstract is transcribed from the PDF if using the ORA version.
- Preserve the PDF/ORA abstract discrepancy and rationale privately in project memory.
- The thesis DOI should be the primary scholarly identifier / schema `@id`:
  ```text
  https://doi.org/10.5287/ora-4rjoobkvk
  ```
- Local thesis PDF may be made available under CC BY 4.0.
- Withheld review-rights work may remain in the Stage 4.2 org subtree as a non-blocking forward-movement task, but it must not block the thesis page.
- Simple text pages may lack JSON-LD initially if ordinary SEO metadata is present; the more important issue for search snippets is authored `<meta name="description">`.
- Canonical pages should use hand-authored, display-ready, SEO-aligned meta descriptions where practical, rather than generic descriptions such as `Research by Stevan Veljkovic.`
- Future git merge commits should ideally use descriptive merge messages, but leaving Git’s default merge message was acceptable during the 4.1b release.

## Files affected

Known files changed during the implemented/released work:

- `src/pages/research/`
  - new `/research/` route.
- `src/data/navigation.ts`
  - `Research → /research/` activated in primary nav.
- `src/data/pageMeta.ts`
  - `/research/` metadata added.
- `src/pages/index.astro`
  - homepage pronunciation/card markup/wrapping adjusted.
- `src/styles/global.css`
  - site-shell, homepage, text-page, research/pronunciation framing, and section-marker styling adjusted.
- `src/data/site.ts`
  - social image path updated to lowercase `.jpg`.
- `public/images/headshot-1200x630.jpg`
  - renamed from uppercase `.JPG`.
- `docs/project-memory/current.md`
  - updated during the session for metadata/image notes, but current file still contains some stale Stage 4.1b language needing consolidation.
- `docs/project-memory/NEXT-STEPS.md`
  - updated with metadata-description cleanup and repository hygiene notes.
- Legacy/archival `~/Projects/smvsite-base`
  - `testing` branch cleanup completed.
  - Remote is named `page`, not `origin`.
  - Local CV-file update was merged with remote `Delete CNAME` commit.
  - Backup branch created:
    ```text
    backup/testing-before-merge-20260611
    ```
  - `testing` now up to date with `page/testing`; `CNAME` no longer tracked there.

Discussed but not yet implemented:

- Thesis page route file:
  ```text
  src/pages/research/doctoral-thesis/religious-atavism-climate-crisis/index.astro
  ```
- Possible thesis data file:
  ```text
  src/data/thesis.ts
  ```
- Possible local thesis PDF path, e.g.:
  ```text
  public/research/doctoral-thesis/religious-atavism-climate-crisis/veljkovic-dphil-thesis.pdf
  ```

## Bugs/fixes

- Fixed live Open Graph / Twitter image metadata bug:
  - previous rendered metadata pointed to `/images/headshot-1200x630.png`, which returned `404`;
  - actual asset was `.JPG`;
  - final canonical asset/URL is now lowercase:
    ```text
    /images/headshot-1200x630.jpg
    ```
- Remaining image/schema check:
  - home/CV JSON-LD schema may still contain stale `.png` references and should be checked.
- CSS-generated research section numbering is acceptable for now:
  - currently generated via CSS pseudo-elements;
  - does not appear in HTML heading text;
  - caveat: some browser/screen-reader combinations may expose generated content inconsistently;
  - if stricter accessibility is later needed, use explicit hidden markup such as:
    ```html
    <span aria-hidden="true">01</span>
    ```
- Known homepage typography issue:
  - pronunciation brackets on the home card remain optically imperfect;
  - possible future micro-fix is to adjust the closing bracket baseline/vertical position locally.
- Known Meta Serif italic issue:
  - roman–italic boundaries can have poor optical spacing/kerning;
  - observed on `/research/` around italicised “climate crisis” after “of”;
  - preferred bounded fixes are to rephrase to avoid unnecessary italics or use a local term class with small spacing adjustment;
  - do not globally alter all italic/em styling unless the issue recurs widely.

## Current state

- `main` is live production and includes Stage 4.1b and the social image fix.
- `stage-4-0` has been fast-forwarded/merged back from `main`, pushed, and was left clean.
- Stage 4.1b is complete and live:
  - `/research/` exists;
  - Research appears in primary navigation;
  - `/research/` is a compact signposting hub;
  - thesis has pride of place without linking to an unimplemented internal thesis page;
  - sitemap includes 9 pages.
- Current active work is Stage 4.2: thesis page v1.
- Active project memory currently has stale items that should be corrected during consolidation:
  - “Current phase” still says Stage 4.1b;
  - expected route set still describes the pre-`/research/` 8-page state;
  - “Research should remain absent…” is now superseded because `/research/` exists and is live.
- `/research/` copy remains hand-authored and should not be over-expanded.
- `/publications/` visual/form standardisation is desirable before Stage 4.0 is complete, but should be a bounded visual/form pass, not a schema/data rewrite. It should not block the thesis page unless the mismatch becomes a real problem.
- `smvsite-base` cleanup is resolved, but later repo/archive governance remains on the agenda:
  - decide whether the old/base working copy and obsolete branches still serve a purpose;
  - consider clearer README, branch cleanup, or making the repo private;
  - confirm no old branch/deployment path is still serving public content before deleting anything.

## Next steps

1. Update active memory to reflect:
   - Stage 4.1b complete/live;
   - Stage 4.2 now active;
   - `/research/` included in generated route set and nav;
   - expected route count is 9 before thesis page, then 10 once thesis page is implemented.
2. Implement thesis page at:
   ```text
   /research/doctoral-thesis/religious-atavism-climate-crisis/
   ```
3. Use gathered thesis metadata:
   - title;
   - DOI;
   - ORA URL;
   - ARK;
   - ORA IDs;
   - deposit date;
   - copyright year;
   - CC BY 4.0 licence;
   - citation;
   - supervisors;
   - examiners;
   - PDF/download policy.
4. Add authored, snippet-length `pageMeta` description for the thesis page.
5. Add local thesis PDF if hosting it:
   - choose stable filename/path;
   - ensure file is permitted under CC BY 4.0;
   - verify generated/live link.
6. Add JSON-LD for the thesis page:
   - `WebPage` with `mainEntity` thesis;
   - DOI URL as primary thesis `@id`;
   - identifiers for ARK and ORA IDs;
   - date-only values;
   - validate rendered page source.
7. Once thesis page exists, link it from `/research/`.
8. Continue metadata polish:
   - improve generic page descriptions for `/research/`, `/pronunciation/`, `/cv/`, `/publications/`;
   - confirm `<meta name="description">` renders;
   - check stale `.png` JSON-LD references.
9. Keep withheld review-rights work non-blocking for thesis page.
10. Before Stage 4.2 release merge:
    ```bash
    npx astro sync
    npx astro check
    npm run build
    npm run preview
    ```
    Inspect key pages plus the new thesis page and sitemap.

## Details not to lose

- Thesis title:
  ```text
  Religious atavism and the climate crisis, with reference to Taylor and Rorty on liberalism
  ```
- Formal citation:
  ```text
  Veljkovic, Stevan. ‘Religious atavism and the climate crisis, with reference to Taylor and Rorty on liberalism.’ PhD thesis, University of Oxford, 2023. https://doi.org/10.5287/ora-4rjoobkvk.
  ```
- Thesis metadata gathered:
  ```text
  Author: Stevan Veljkovic
  Institution: University of Oxford
  Degree: DPhil / PhD
  Year: 2023
  Deposit date: 2024-02-11
  Copyright year: 2023
  Licence: CC BY 4.0
  DOI: https://doi.org/10.5287/ora-4rjoobkvk
  ORA URL: https://ora.ox.ac.uk/objects/uuid:7aff13dc-075e-4c17-bee9-5adfc1b2fcf4
  ARK: ark:/29072/ora_7aff13dc075e4c17bee95adfc1b2fcf4
  ORA pubs id: 1624720
  ORA local pid: pubs:1624720
  Supervisors: Friederike Otto; Johannes Zachhuber
  Examiners: Douglas Hedley; Gavin Flood
  ```
- Thesis abstract discrepancy:
  - PDF version has:
    ```text
    This thesis finds critical resources in theorists of liberalism for reading accounts of climate crisis that put climate at the centre of contemporary Western self-understanding as expressions of religious atavism.
    ```
  - ORA version has:
    ```text
    This thesis finds critical resources in theorists of liberalism for reading accounts of climate crisis – that put climate at the centre of contemporary Western self-understanding – as expressions of religious atavism.
    ```
  - Decision: use the ORA version on the local thesis page.
  - Rationale: ORA is the public institutional DOI metadata record; difference is punctuation-only/non-substantive; punctuation improves readability.
  - Public rule: do not mention the discrepancy; do not claim the abstract is transcribed from the PDF.
  - Private rule: preserve discrepancy/rationale in project memory; consider ORA correction later only if it becomes substantively important.
- Use a short authored “About this thesis” section before the formal abstract so the page first presents the thesis in a clearer current voice.
- Suggested “About this thesis” direction:
  ```text
  The thesis examines the climate-crisis idea not only as a scientific description, but also as a political and cultural formation. It reads contemporary accounts of climate crisis through Charles Taylor and Richard Rorty, asking how ecological radicalism may inherit older theological and post-theological patterns of legitimation.
  ```
- Possible thesis page meta description:
  ```text
  Oxford DPhil thesis by Dr Stevan M. Veljkovic on religious atavism, climate crisis, Taylor, Rorty, liberalism, and postsecularity.
  ```
- Possible local PDF filename preference:
  ```text
  veljkovic-dphil-thesis.pdf
  ```
- Future typeface note:
  - current visual system uses Case VAR and Meta Serif;
  - possible future typeface acknowledgements/info element or page;
  - verify exact designer/foundry credits before publishing acknowledgements.
