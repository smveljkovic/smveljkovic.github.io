# Next Steps

## 1. Immediate next actions

1. **Confirm the current project state**
   - Work from:
     ```text
     /Users/stevan/Projects/smvsite-astro
     ```
   - Run:
     ```bash
     npx astro sync
     npx astro check
     npm run build
     ```
   - Fix any TypeScript/content-collection/build errors before adding new features.

2. **Inspect the live/generated route set**
   - Confirm these pages build and load locally:
     ```text
     /
     /publications/
     /cv/
     /publications/reviews/cosmic-connections/
     /publications/reviews/christian-right-europe/
     ```
   - In dev:
     ```bash
     npm run dev
     ```
     then visit:
     ```text
     http://localhost:4321/
     http://localhost:4321/publications/
     http://localhost:4321/cv/
     http://localhost:4321/publications/reviews/cosmic-connections/
     http://localhost:4321/publications/reviews/christian-right-europe/
     ```

3. **Check for dynamic-route masking**
   - Run:
     ```bash
     find src/pages/publications/reviews -type f
     ```
   - Ensure the only active review page route is:
     ```text
     src/pages/publications/reviews/[slug]/index.astro
     ```
   - Remove or archive old static per-review pages under `src/pages/publications/reviews/`, because they will mask the dynamic route.

4. **Confirm review schema usage**
   - In the dynamic review route, confirm it imports:
     ```ts
     import { createReviewSchema } from "../../../../data/schema/reviews/createReviewSchema";
     ```
   - Confirm it calls:
     ```ts
     const jsonLd = createReviewSchema(review);
     ```
   - Confirm homepage and CV do **not** import or call `createReviewSchema`.
   - Homepage should use `homeSchema`; CV should use `cvSchema`.

5. **Verify current sitemap setup**
   - Check `astro.config.mjs` for:
     ```js
     site: "https://stevanveljkovic.com",
     trailingSlash: "always",
     integrations: [sitemap()],
     ```
   - If sitemap integration is absent, install it:
     ```bash
     npx astro add sitemap
     ```
   - Ensure only actual generated pages appear in the sitemap.

---

## 2. Implementation tasks

1. **Finish the publications index migration**
   - Add a lightweight list-only publication collection:
     ```text
     src/content/publication-items/
     ```
   - Add it to:
     ```text
     src/content.config.ts
     ```
   - Use Astro 6 loader-style imports:
     ```ts
     import { defineCollection } from "astro:content";
     import { glob } from "astro/loaders";
     import { z } from "astro/zod";
     ```
   - The collection should support fields such as:
     ```ts
     draft
     year
     sortDate
     order
     citationHtml
     noteHtml
     noteId
     doi
     url
     localPath
     ```
   - This collection is for bibliography records that do **not** yet need full generated review pages.

2. **Restore all bibliography entries on `/publications/`**
   - Add list-only files for the publications not yet migrated as full reviews:
     ```text
     src/content/publication-items/phd-thesis.md
     src/content/publication-items/hell-christian-ecology.md
     src/content/publication-items/challenging-modernity.md
     src/content/publication-items/evolution-of-religions.md
     src/content/publication-items/godless-crusade.md
     ```
   - The publications page should eventually list:
     - 2025 Christian Right review;
     - 2025 Hell review;
     - 2025 Challenging Modernity review;
     - 2025 Cosmic Connections review;
     - 2024 Evolution of Religions review;
     - 2023 Godless Crusade review;
     - 2023/2024 PhD thesis.

3. **Update `/publications/index.astro` to combine both collections**
   - Query full review pages:
     ```ts
     const reviews = await getCollection("reviews", ({ data }) => !data.draft);
     ```
   - Query list-only records:
     ```ts
     const publicationItems = await getCollection("publicationItems", ({ data }) => !data.draft);
     ```
   - Normalize both to a shared display shape:
     ```ts
     {
       id,
       year,
       sortDate,
       order,
       citationHtml,
       noteHtml,
       noteId
     }
     ```
   - Sort by:
     1. descending year;
     2. descending `sortDate`;
     3. ascending manual `order`.
   - Preserve existing visual classes:
     ```text
     BibEntry
     counter_bib
     test#writings
     ```

4. **Add publications-page JSON-LD**
   - Create:
     ```text
     src/data/schema/publications/createPublicationsSchema.ts
     ```
   - Model `/publications/` as:
     ```text
     CollectionPage
       mainEntity → ItemList
     ```
   - Use identifiers in this order:
     1. DOI URL if available;
     2. local page URL if a local page exists;
     3. stable fragment such as `/publications/#<slug>` if neither exists.
   - Pass the generated schema into the publications page layout.

5. **Add remaining full review pages when ready**
   - For each review that should have a local HTML page, add one Markdown file under:
     ```text
     src/content/reviews/
     ```
   - Likely future files:
     ```text
     hell-christian-ecology.md
     challenging-modernity.md
     evolution-of-religions.md
     godless-crusade.md
     ```
   - Add corresponding PDFs/assets under `public/` only if needed.
   - Do **not** create new `.astro` pages per review.
   - Do **not** create per-review schema files unless the shared factory cannot handle the case.

6. **Implement the thesis page or adjust references**
   - Current planned route:
     ```text
     /thesis/religious-atavism-climate-crisis/
     ```
   - Add:
     ```text
     src/pages/thesis/religious-atavism-climate-crisis/index.astro
     ```
     or design a content-driven thesis route.
   - Planned PDF path:
     ```text
     /thesis/religious-atavism-climate-crisis/veljkovic-phd-thesis.pdf
     ```
   - Until this page exists, avoid having live schema imply that a non-existent page is available.

7. **Add legacy redirect stubs**
   - Add static HTML redirect stubs for old URLs if they are not already implemented:
     ```text
     /writing.html
     /writing/ReviewCosmicConnectionsV2.html
     ```
   - Targets:
     ```text
     /writing.html → /publications/
     /writing/ReviewCosmicConnectionsV2.html → /publications/reviews/cosmic-connections/
     ```
   - Stubs should include:
     - canonical link;
     - meta refresh;
     - `location.replace`;
     - visible fallback link.
   - Do **not** include full JSON-LD on redirect stubs.

8. **Preserve old PDF URLs where possible**
   - Keep these old assets available if they exist:
     ```text
     /writing/ReviewCosmicConnectionsV2.pdf
     /itinerary.pdf
     ```
   - Do not replace PDF URLs with HTML redirect pages unless moving to a platform that supports true HTTP redirects.

---

## 3. Verification/testing tasks

1. **Run build and inspect output**
   - Run:
     ```bash
     npm run build
     ```
   - Inspect generated review directories:
     ```bash
     ls dist/publications/reviews/
     ls dist/publications/reviews/cosmic-connections/
     ls dist/publications/reviews/christian-right-europe/
     ```
   - Confirm both current review pages produce `index.html`.

2. **Verify content collection loading**
   - Run:
     ```bash
     find src/content -maxdepth 4 -type f -print
     ```
   - Confirm current review Markdown files exist:
     ```text
     src/content/reviews/cosmic-connections.md
     src/content/reviews/christian-right-europe.md
     ```
   - After adding `publication-items`, confirm those files are detected by Astro with no collection-empty warnings.

3. **Validate rendered JSON-LD**
   - Inspect final page source, not TypeScript literals.
   - Search for:
     ```html
     application/ld+json
     ```
   - Validate rendered pages with:
     ```text
     https://validator.schema.org/
     ```
   - Priority pages:
     ```text
     /
     /cv/
     /publications/
     /publications/reviews/cosmic-connections/
     /publications/reviews/christian-right-europe/
     ```
   - Confirm JSON-LD is not HTML-escaped as `&quot;`.

4. **Check review structured data**
   - For Cosmic Connections:
     - local manuscript and DOI article should be distinct;
     - no misleading `sameAs` between local manuscript and DOI article;
     - use `isBasedOn` and/or `citation` to the published DOI article;
     - reviewed book should use DOI URL as `@id`.
   - For Christian Right:
     - reviewed volume should use `editor`, not `author`;
     - editor should be `Gionathan Lo Mascolo`, not `"Gionathan Lo Mascolo (ed.)"` in structured data;
     - DOI and journal metadata should be verified.

5. **Check internal links and asset paths**
   - Confirm root-relative links resolve:
     ```text
     /cv/veljkovic-cv.pdf
     /publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
     /publications/reviews/christian-right-europe/veljkovic-review-christian-right-europe.pdf
     ```
   - Avoid deep relative paths such as:
     ```text
     ../../../images/...
     ```

6. **Verify sitemap**
   - After build, inspect generated sitemap.
   - It should include only actual live pages:
     ```text
     /
     /publications/
     /cv/
     /publications/reviews/cosmic-connections/
     /publications/reviews/christian-right-europe/
     ```
   - Future review routes should not appear until their pages are generated and intended to be live.

7. **Validate HTML and accessibility**
   - Use:
     ```text
     https://validator.w3.org/
     ```
   - Check homepage navigation markup:
     - `<ul>` should contain `<li>` children;
     - preserve `p.Headings` inside list items if CSS depends on it.
   - Decorative icons should use:
     ```html
     alt="" aria-hidden="true"
     ```
   - Internal CV link should not use `target="_blank"`.

8. **Cross-browser visual check**
   - Specifically re-check the Safari homepage issue where:
     ```html
     <h1 class="Name">Stevan Veljkovic</h1>
     ```
     may appear invisible.
   - Likely fix to test:
     ```css
     h1.Name {
       color: #fff;
     }
     ```
   - Inspect cascade in Safari Web Inspector before finalizing.

9. **Check deployment/DNS behaviour**
   - Run:
     ```bash
     curl -I https://stevanveljkovic.com/
     curl -I https://www.stevanveljkovic.com/
     curl -I https://seminars.stevanveljkovic.com/
     curl -I https://stevanveljkovic.com/seminars/
     curl -I -L https://stevanveljkovic.com/seminars/
     ```
   - Confirm apex canonical behaviour and whether `www` redirects correctly.

---

## 4. Cleanup/refactoring tasks

1. **Remove stale schema imports**
   - Search for old or mistaken schema imports:
     ```bash
     grep -R "buildReviewSchema\|createReviewSchema" src/pages src/layouts src/components src/data -n
     ```
   - Active review pages should use only:
     ```ts
     createReviewSchema(review)
     ```
   - Homepage should use:
     ```ts
     homeSchema
     ```
   - CV should use:
     ```ts
     cvSchema
     ```

2. **Keep old Cosmic schema as reference only**
   - Old/reference files:
     ```text
     src/data/schema/reviews/cosmic-connections/cosmic-connections.ts
     src/lib/schema/review.ts
     ```
   - Do not import them in active routes unless deliberately restoring needed logic.
   - Once the shared factory fully reproduces required detail, archive or remove stale schema code.

3. **Normalize naming around review entries**
   - In dynamic review route, maintain the distinction:
     ```ts
     const entry = ...;
     const review = entry.data;
     ```
   - Use:
     ```ts
     entry.id
     review.slug
     review.title
     review.citationHtml
     ```
   - Avoid:
     ```ts
     review.id
     review.data.title
     ```

4. **Avoid duplicate collection schema keys**
   - In `src/content.config.ts`, ensure each collection has a single `schema` key.
   - Do not mix old `type: "content"` patterns with Astro 6 loader-style config unless intentionally required.

5. **Centralize URL generation**
   - Use the shared site data in:
     ```text
     src/data/site.ts
     ```
   - Ensure helper avoids double slashes:
     ```ts
     function absoluteUrl(path: string) {
       return new URL(path, site.url).toString();
     }
     ```
   - Use:
     ```ts
     absoluteUrl("/")
     ```
     instead of manually concatenating:
     ```ts
     `${site.url}/`
     ```

6. **Postpone CSS rewrite**
   - Do not rename or aggressively refactor legacy classes yet.
   - Preserve classes such as:
     ```text
     Basic-Text-Frame
     Name
     Details
     Headings
     BibHeading
     BibEntry
     counter_bib
     review_intro
     review_text
     review_par
     byline
     review_byline
     CVEntry
     nav-list
     pronunciation
     ```
   - Only make targeted fixes required for bugs, accessibility, or layout.

7. **Check `JsonLd.astro` and `Analytics.astro`**
   - Ensure inline scripts explicitly use:
     ```astro
     is:inline
     ```
   - JSON-LD component should use:
     ```astro
     <script
       is:inline
       type="application/ld+json"
       set:html={JSON.stringify(data, null, 2)}
     ></script>
     ```

8. **Remove invalid image dimensions**
   - On homepage and elsewhere, remove invalid attributes such as:
     ```html
     width="41vw" height="27vw"
     ```
   - Let CSS control responsive sizing instead.

---

## 5. Documentation/content tasks

1. **Document the review-adding workflow**
   - Add or update a local project note explaining:
     - add one Markdown file under `src/content/reviews/`;
     - add PDFs/assets under `public/`;
     - no new `.astro` page;
     - no new per-review schema file;
     - dynamic route is:
       ```text
       src/pages/publications/reviews/[slug]/index.astro
       ```

2. **Document the publication item model**
   - Explain the distinction:
     ```text
     src/content/reviews/
       Full local review pages.

     src/content/publication-items/
       List-only bibliography records.
     ```
   - Note that `/publications/` combines both.

3. **Record exact metadata for Christian Right**
   - Verify and document:
     - exact publication date;
     - volume/issue;
     - `csaf039` handling;
     - journal ISSNs;
     - PDF filename/path;
     - author manuscript/version wording.
   - Current known data:
     ```text
     DOI: https://doi.org/10.1093/jcs/csaf039
     Journal: Journal of Church and State
     Volume: 67
     Issue: 3
     Year: 2025
     Identifier/pagination: csaf039
     ```

4. **Record metadata for remaining reviews**
   - For each of these:
     ```text
     Hell: In Search of a Christian Ecology
     Challenging Modernity
     The Evolution of Religions
     The Godless Crusade
     ```
   - Verify:
     - reviewed work title;
     - author/editor;
     - journal/blog;
     - DOI or URL;
     - year/date;
     - volume/issue/pages if applicable;
     - book DOI/ISBN if useful;
     - whether a local HTML page/PDF should exist.

5. **Document thesis-page plan**
   - Canonical slug:
     ```text
     /thesis/religious-atavism-climate-crisis/
     ```
   - Do not use:
     ```text
     /thesis/atavism-climate-crisis/
     ```
   - Record:
     ```text
     DOI: https://doi.org/10.5287/ora-4rjoobkvk
     ORA: https://ora.ox.ac.uk/objects/uuid:7aff13dc-075e-4c17-bee9-5adfc1b2fcf4
     Date: 2024-02
     ```

6. **Document deployment workflow**
   - Determine and record whether deployment uses:
     - GitHub Actions building Astro;
     - committed `dist/`;
     - separate deployment to `smveljkovic.github.io`;
     - another workflow.
   - Record where the CNAME file/domain configuration lives.

7. **Maintain compact AI project memory**
   - Use a local notes structure such as:
     ```text
     AI/
       site-project/
         00-current-summary.md
         01-active-question.md
         02-astro-structure.md
         03-jsonld-notes.md
         04-css-notes.md
         archive/
     ```
   - Keep this updated instead of relying on long chat transcripts.

---

## 6. Open questions to resolve

1. **Should the thesis page be implemented now?**
   - CV schema may already reference:
     ```text
     /thesis/religious-atavism-climate-crisis/
     ```
   - Decide whether to:
     - create the page now; or
     - remove/defer schema references until the route exists.

2. **What is the final homepage/site title?**
   - Recorded variants include:
     ```text
     Re: Stevan Veljkovic
     Dr Stevan Veljkovic – theorist and editor
     Stevan Veljkovic – theorist and editor
     S. Veljkovic – theorist and editor
     ```
   - Choose the canonical browser title and SEO title pattern.

3. **Should remaining reviews become full local pages or list-only records?**
   - Decide case by case for:
     ```text
     Hell: In Search of a Christian Ecology
     Challenging Modernity
     The Evolution of Religions
     The Godless Crusade
     ```
   - If no local manuscript/PDF is available or intended, keep them as `publicationItems`.

4. **How rich should review JSON-LD become in the next pass?**
   - Open refinements:
     - split local page into `WebPage` plus `#review` article node;
     - add `Periodical`, `PublicationVolume`, and `PublicationIssue`;
     - clarify `datePublished` meaning;
     - decide when to use both `citation` and `isBasedOn`;
     - confirm whether `version` is valid/useful enough to include.

5. **What should happen with old URLs long-term?**
   - GitHub Pages cannot create true arbitrary 301 redirects.
   - Decide whether static HTML redirect stubs are sufficient or whether Cloudflare should be adopted later for:
     - true 301 redirects;
     - PDF headers;
     - security headers;
     - `www` to apex redirect.

6. **Should the seminars site remain separate?**
   - Current seminars URL:
     ```text
     https://seminars.stevanveljkovic.com/
     ```
   - Resolve whether to:
     - leave it as a separate repo/site;
     - consolidate it into the main Astro repo;
     - preserve repo history if consolidated.

7. **Has the Safari homepage CSS bug been fixed?**
   - If not, inspect and fix the `h1.Name` visibility issue.
   - Do not broadly rewrite CSS until the bug is isolated.

8. **What is the canonical deployment setup?**
   - Need to confirm:
     - source repo;
     - GitHub Pages settings;
     - build command;
     - publish directory;
     - CNAME handling;
     - whether `dist/` is committed or generated by CI.

9. **Should Cloudflare be introduced?**
   - Not currently required.
   - Revisit only if true redirects, headers, or canonical hostname management become important.

10. **How should trusted HTML fields be phased out later?**
   - Current bridge fields are acceptable:
     ```yaml
     citationHtml
     bylineHtml
     originalSubmissionNote
     publicationList.noteHtml
     ```
   - Decide later whether to replace them with a more semantic citation/content model.
