# Decisions

This file is a categorized decisions register derived from
`docs/project-memory/current.md`. Treat `current.md` and actual code/build output
as authoritative when they conflict with older notes.

## 1. Platform, Routes, And Build Model

- **Create `/research/` as a compact research hub.**  
  **Decision:** `/research/` is legitimate and should be created as a map/signposting hub, not an essay or manifesto.  
  **Status:** Decided for Stage 4.1; not implemented.

- **Use the settled thesis route under `/research/`.**  
  **Route:** `/research/doctoral-thesis/religious-atavism-climate-crisis/`  
  **Slug:** `religious-atavism-climate-crisis`  
  **Rule:** Do not link the route until the page is actually implemented.  
  **Status:** Decided; implementation pending.

- **Use Astro as the site framework.**  
  **Rationale:** Static-first, GitHub Pages compatible, content collections,
  Markdown/MDX, clean URLs, build-time SEO/JSON-LD, and possible future islands.  
  **Status:** Final.

- **Preserve core aspects of the current visual identity going into Stage 4.0.**  
  **Rationale:** The site is a durable academic/research hub, not a generic portfolio.  
  **Implications:** Keep work on full theme and redesign achievable and constrained. Preserve legacy classes unless a
  targeted fix is needed.  
  **Status:** Current for Stage 4.0.

- **Canonical production domain is `https://stevanveljkovic.com/`.**  
  **Implications:** Astro `site`, canonical links, sitemap, and JSON-LD should use the apex domain.  
  **Status:** Final.

- **Use clean trailing-slash URLs.**  
  **Examples:** `/publications/`, `/cv/`, `/publications/reviews/cosmic-connections/`.  
  **Status:** Final.

- **Current observed static output has 7 pages.**  
  **Current routes:**
  ```text
  /
  /cv/
  /publications/
  /publications/reviews/cosmic-connections/
  /publications/reviews/evolution-of-religions/
  /publications/reviews/godless-crusade/
  /publications/reviews/hell-christian-ecology/
  ```
  **Caution:** Draft state can change the generated route set; verify routes and sitemap from the current build before
  launch.  
  **Status:** Current, subject to rights gating.

- **Stage 3 is complete.**  
  **Decision:** The launch / deployment-hardening phase is complete; current work moves into Stage 4.0 planning and
  foundation.  
  **Status:** Current.

- **Generate review pages from Markdown content collections.**  
  **Decision:** Use `src/pages/publications/reviews/[slug]/index.astro` with `src/content/reviews/*.md`.  
  **Implications:** Adding a review should require Markdown plus public assets, not a new `.astro` route.  
  **Status:** Final architecture.

- **Do not keep static per-review pages under `src/pages`.**  
  **Rationale:** Static routes mask dynamic routes.  
  **Status:** Final.

- **Use Astro 6 loader-style content collections.**  
  **Decision:** Use `defineCollection`, `glob` from `astro/loaders`, and `z` from `astro/zod`.  
  **Status:** Final.

## 2. Content Collections And Publications Page

- **Use `reviews` for review records, with `draft:true` gating page generation.**  
  **Decision:** Review records live in `src/content/reviews/`; non-draft records
  generate full review pages, while drafted records may still generate
  bibliography entries when `publicationList.include !== false`.  
  **Status:** Final.

- **Use `publicationItems` for list-only bibliography records.**  
  **Decision:** `/publications/` combines review records and list-only items.  
  **Current detail:** Duplicate / list-only review records exist but are drafted
  except the thesis item, to avoid duplicate publication-list / schema entries.  
  **Status:** Implemented/current.

- **Current review files are:**
  ```text
  src/content/reviews/challenging-modernity.md
  src/content/reviews/christian-right-europe.md
  src/content/reviews/cosmic-connections.md
  src/content/reviews/evolution-of-religions.md
  src/content/reviews/godless-crusade.md
  src/content/reviews/hell-christian-ecology.md
  ```
  **Status:** Current.

- **Current publication-item files are:**
  ```text
  src/content/publication-items/challenging-modernity.md
  src/content/publication-items/evolution-of-religions.md
  src/content/publication-items/godless-crusade.md
  src/content/publication-items/hell-christian-ecology.md
  src/content/publication-items/religious-atavism-climate-crisis.md
  ```
  **Status:** Current.

- **`/publications/` JSON-LD should remain `CollectionPage` plus `ItemList`.**  
  **Model:**
  ```text
  CollectionPage
    mainEntity -> ItemList
      itemListElement -> ListItem[]
  ```
  **Status:** Implemented/current.

- **Richer `/publications/` JSON-LD is deferred.**  
  **Deferred examples:** reviewed-book nodes, license/copyright-holder modelling,
  external WebPage nodes.  
  **Status:** Deferred; do not over-model before launch unless necessary.

- **Publications page should preserve grouped bibliography style.**  
  **Implications:** Keep year grouping, `BibEntry`, `counter_bib`,
  `test#writings`, note lines, and citation formatting where possible.  
  **Status:** Final for Stage 3.

## 3. Structured Data And Schema Decisions

- **Use ORCID as canonical `Person.@id`.**  
  **ID:** `https://orcid.org/0000-0002-2599-3227`  
  **Status:** Final.

- **Reject the conflated OpenAlex profile as `sameAs`.**  
  **Rejected:** `https://openalex.org/A5056034517`  
  **Status:** Final.

- **Use the fresh and true OpenAlex profile as one canonical identity source.**
  **Verified:** `https://openalex.org/authors/A5115945824`
  **Status:** Current.

- **Use DOI URLs as primary scholarly `@id`s where available.**  
  **Implications:** Publisher pages can be `url` or `sameAs`, but DOI URLs
  identify DOI-bearing books / articles / reviews.  
  **Status:** Final.

- **Keep local manuscripts / pages distinct from DOI-published articles.**  
  **Implications:** Do not use false `sameAs`; use `isBasedOn` and/or `citation`
  where appropriate.  
  **Status:** Final.

- **Use the reusable review schema factory for active review pages.**  
  **Decision:** Dynamic review pages call `createReviewSchema(review)`.  
  **Status:** Final/current.

- **Homepage and CV schemas remain manual one-off schemas.**  
  **Decision:** Homepage uses `homeSchema`; CV uses `cvSchema`.  
  **Status:** Final.

- **Homepage schema is `AboutPage`; CV schema is `ProfilePage`.**  
  **CV PDF:** model as `MediaObject`.  
  **Status:** Final.

- **Use dated `Role` nodes for education/affiliation periods.**  
  **Do not use:** credential `startDate`/`endDate`,
  `Person.dissertation`, or `OrganizationRole.worksFor`.  
  **Status:** Final.

- **Review-page graph is now decided.**
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
  **Status:** Current decision.

- **LSE Review of Books uses a blog / post container model.**  
  **For `evolution-of-religions`:**
  ```text
  BlogPosting / Review
    isPartOf -> Blog: LSE Review of Books
      isPartOf -> WebSite: LSE Blogs
  ```
  **Do not invent:** journal, volume, issue, or fake issue images.  
  **Status:** Final for this review.

- **Pagination belongs on the published article / review node.**  
  **Fields:** `pagination`, `pageStart`, `pageEnd`.  
  **Issue-level pagination:** only for whole-issue pagination and only if verified.
  **Status:** Final.

- **Article / review date convention is decided.**  
  **Rule:** `publishedReview.datePublished` means the publisher-recognised first publication date, normally first
  online.  
  **Internal helper:** `firstPublishedOnline` may be used internally and should map to Schema.org `datePublished`; do
  not emit a non-standard `firstPublishedOnline`.  
  **Issue rule:** `PublicationIssue.datePublished` means issue date / month / year where known.  
  **Status:** Final.

- **Do not emit `PublicationIssue.name` merely as an issue number.**  
  **Use:** `issueNumber` for numbers.  
  **Use `name` only for:** real publisher-supplied issue labels.  
  **Status:** Final.

- **Render JSON-LD with unescaped inline script HTML.**  
  **Pattern:** `<script is:inline type="application/ld+json" set:html={JSON.stringify(data, null, 2)}>`  
  **Status:** Final.

- **Validate rendered page-source JSON-LD, not TypeScript literals.**  
  **Status:** Final.

## 4. Review-Specific Decisions

- **Cosmic Connections is a distinct local Author's Original Manuscript.**  
  **Implications:** It is not `sameAs` the DOI article; use `isBasedOn` and/or
  `citation`.  
  **Status:** Final.

- **Christian Right uses `editor`, not `author`, for Gionathan Lo Mascolo.**  
  **Also:** `csaf039` is article ID, not pagination. Issue date is month
  precision in frontmatter: `2025-07`.  
  **Status:** Final/current.

- **Evolution of Religions is complete for Stage 3.**  
  **Model:** published LSE post as `BlogPosting/Review`; local reproduction as
  `Article/Review`.  
  **Status:** Final for Stage 3.

- **Hell: In Search of a Christian Ecology is complete for Stage 3.**  
  **Known:** DOI review `https://doi.org/10.1558/jsrnc.30282`; reviewed book DOI
  `https://doi.org/10.7312/mort21470`; license CC BY-NC-ND 4.0.  
  **Checked:** Wersion wording, first-published note, issue date `2024-10-03`, referenced PDF path.  
  **Status:** Final for Stage 3.

- **Godless Crusade should be an Accepted Manuscript locally.**  
  **Not:** Version of Record.  
  **Known:** published review DOI
  `https://doi.org/10.1080/09637494.2023.2260684`; reviewed book DOI
  `https://doi.org/10.1017/9781009262125`; journal volume 51, issue `4–5`;
  article/review pagination `491–492`, `491`, `492`.  
  **Still check:** T&F AM wording, Goodhart correction note, version / text
  accuracy, schema, sitemap, and absence of VoR PDF/text.  
  **Status:** Active unresolved checks.

- **Challenging Modernity must be withheld unless rights are clarified.**  
  **Known:** current code has it drafted / withheld; local version is a Taylor &
  Francis Version-of-Record reproduction.  
  **Decision:** keep withheld unless CCC/T&F permission is confirmed.
  **Status:** Active caution.

## 5. Assets, URLs, And Deployment

- **Treat `main` as production.**  
  **Reason:** Netlify deploys from `origin/main`.  
  **Workflow:** Use `stage-4-0` as the Stage 4.0 work/integration branch; merge to `main` only for coherent public
  release units.  
  **Status:** Current.

- **Deploy Stage 4.0 in coherent public release units.**  
  **Decision:** Do not deploy Stage 4.0 as one big-bang release, and do not deploy every micro-step.  
  **Release units:**
  ```text
  4.1a shell v1: header + footer + stable nav, no broken links
  4.1b research hub v1: /research/ exists and Research appears in nav
  4.2 thesis page v1
  4.3 CV expansion v1
  4.4+ bounded design / interaction improvements
  ```
  **Status:** Current for Stage 4.0.

- **Use root-relative public asset and internal URLs.**  
  **Examples:** `/cv/veljkovic-cv.pdf`,
  `/images/publications/reviews/<slug>/reviewed-work/cover.jpg`.  
  **Status:** Final.

- **Preferred review image convention is:**
  ```text
  public/images/publications/reviews/<slug>/
    reviewed-work/cover.jpg
    issue/cover.jpg
    periodical/poster.jpg
    periodical/banner.jpg
    article/image.jpg
    page/social-card.jpg
  ```
  **Attachment rule:** reviewed-work image -> reviewed work; issue cover ->
  `PublicationIssue`; periodical images -> `Periodical`; article image ->
  article / post / review only if rights are clear; page / social-card -> local page
  or Open Graph.  
  **Status:** Final convention.

- **Current PDF reality has exceptions.**  
  **Preferred future convention:** `veljkovic-review-<slug>.pdf`.  
  **Current public tree confirms:** Cosmic Connections and Hell PDFs.  
  **Missing/unchecked:** PDFs for `christian-right-europe`, `godless-crusade`,
  and `challenging-modernity` are not confirmed in the latest selected public
  tree.  
  **Status:** Current caution.

- **Only actual / generated pages should appear in the sitemap.**  
  **Caution:** A generated page still needs to be intended live; rights-blocked
  routes should be drafted or otherwise excluded.  
  **Status:** Final.

- **Do not use post-build pruning for draft review assets.**  
  **Decision:** `public/` should contain only files definitely intended to be
  public.  
  **Implications:** `draft:true` controls page generation only; Astro still
  copies static files under `public/` into `dist/`.  
  **Status:** Final.

- **Use canonical publication-version labels.**  
  **Labels:** Author's Original Manuscript (AOM), Accepted Manuscript (AM),
  Version of Record (VoR), and Published web article.  
  **Implications:** Use `Published web article` for edited web-outlet / blog-series cases such as
  `evolution-of-religions`; do not call these VoR unless the
  publisher uses that terminology.  
  **Status:** Final.

- **Use Netlify as the production deployment host.**  
  **Rationale:** Frictionless deploy workflow, real redirects, private-repo-capable deployment, and lower conceptual
  overhead than Cloudflare.  
  **Implications:** Netlify builds from `main` with `npm run build` and publishes `dist`. GitHub Pages deployment for
  the Astro site is retired.  
  **Status:** Final/current.

- **Keep the apex domain canonical.**  
  **Decision:** Use `https://stevanveljkovic.com/` as canonical despite Netlify’s recommendation to prefer `www` for
  optimal CDN behaviour.  
  **Status:** Final/current.

- **Keep DNS hosted at Hover for now.**  
  **Decision:** Do not move DNS to Netlify for the foreseeable future. Accept Netlify’s Hover fallback A-record setup
  for now.  
  **Current apex A record:** `75.2.60.5`  
  **Revisit if:** Evidence of performance problems emerges. One possible future route is Cloudflare DNS while continuing
  to host on Netlify.  
  **Status:** Final/current.

- **Bridge to Seminars; do not migrate it in Stage 4.1.**  
  **Decision:** Keep `https://seminars.stevanveljkovic.com/` separate for now; expose it in footer / secondary nav;
  optionally add a short Seminars card/section on `/research/`; do not import seminar PDFs/assets into the main Astro
  site during Stage 4.1.  
  **Status:** Current.

- **Use forced Netlify redirects for legacy URLs.**  
  **Decision:** Use `301!` rules in `public/_redirects` while old compatibility files still exist.  
  **Rationale:** Without forced redirects, Netlify may serve an existing physical legacy file with `200`.  
  **Current rules:**
  ```text
  /writing.html /publications/ 301!
  /writing/ReviewCosmicConnectionsV2.html /publications/reviews/cosmic-connections/ 301!
  /writing/ReviewCosmicConnectionsV2.pdf /publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf 301!
  /itinerary.pdf /cv/veljkovic-cv.pdf 301!
  ```
  **Status:** Final/current.

- **Cloudflare is not needed now.**  
  **Decision:** Netlify was chosen over Cloudflare Pages after testing. Cloudflare remains a possible future option,
  especially for DNS/performance routing, but should not be introduced now.  
  **Do not add:** `@astrojs/cloudflare`, `wrangler.toml`, Workers, KV, D1, R2, or Cloudflare adapter config.  
  **Status:** Deferred option only.

- **Submit the sitemap index to Google Search Console.**
  **URL:** `https://stevanveljkovic.com/sitemap-index.xml`, not `sitemap-0.xml`.
  **Status:** Final/current.

- **Calibrate warnings proportionately.**
  **Rule:** Treat rights-uncertain assets under `public/` as serious because
  they deploy live; treat draft/source Markdown visibility in a public repo as a
  minor caveat unless Stevan says otherwise. Do not repeatedly escalate
  low-probability risks once an informed judgment has been made.
  **Status:** Final working rule.

## 6. Design, Accessibility, And Content-Rendering Decisions

- **Research page should be a compact hub, not an apology or manifesto.**  
  **Principles:** Do not apologise for lack of conventional research articles; do not overclaim; separate outputs from
  themes; give the doctoral thesis pride of place; keep the first version modest.  
  **Status:** Current for `/research/` v1.

- **Stage 4.1 primary navigation is settled.**  
  **Items:**
  ```text
  Stevan Veljkovic → /
  CV → /cv/
  Publications → /publications/
  Research → /research/
  ```
  **Rule:** `Research` should not appear live until `/research/` exists.  
  **Status:** Decided for Stage 4.1.

- **Stage 4.1 footer / secondary navigation is settled.**  
  **Items:**
  ```text
  Contact → mailto:stevan@stevanveljkovic.com
  ORCID → https://orcid.org/0000-0002-2599-3227
  Google Scholar → https://scholar.google.com/citations?user=e42TN4UAAAAJ
  GitHub → https://github.com/smveljkovic
  Pronunciation → /pronunciation/
  Seminars → https://seminars.stevanveljkovic.com/
  ```

  **Status:** Decided for Stage 4.1.

- **First-pass header should be simple, accessible, and Astro/CSS-led.**  
  **Decision:** Implement header/navigation in Astro/CSS/browser iteration, not by starting in Figma or Adobe tools. Use
  a no-JavaScript responsive layout; no hamburger menu for the first pass.  
  **Implications:** Header, homepage masthead, and page heading remain conceptually distinct.  
  **Status:** Current for Stage 4.1.

- **Homepage navigation labels and targets are fixed for Stage 3.**  
  **Labels:** Contact, Résumé, Writing, Seminars.  
  **Targets:** `/cv/`, `/publications/`,
  `https://seminars.stevanveljkovic.com/`.  
  **Status:** Final for Stage 3.

- **Inherieted homepage navigation labels now historical**  
  **Labels:** Contact, Résumé, Writing, Seminars.  
  **Targets:** `/cv/`, `/publications/`, `https://seminars.stevanveljkovic.com/`.  
  **Status:** Current in Stage 4.0.

- **Accessibility fixes should be preserved.**  
  **Rules:** Internal CV link should not use `_blank`; decorative icons should
  have `alt="" aria-hidden="true"`; `_blank` links need `rel`; homepage nav list
  should remain valid list markup.  
  **Status:** Final.

- **Use JavaScript / animation sparingly.**  
  **Rationale:** Core content should remain static, durable, and accessible.  
  **Status:** Final.

- **Trusted HTML bridge fields are acceptable for migration.**  
  **Fields:** `citationHtml`, `bylineHtml`, `reuseNoteHtml`,
  `modificationNote`, `publicationList.noteHtml`.  
  **Rationale:** Preserve legacy citation formatting while semantic modelling improves.  
  **Status:** Final for Stage 3; long-term refactor deferred.

- **Stage 4.0 is a constrained core architecture / design foundation phase.**  
  **In scope:** thesis page; expanded / web-native CV page; header / navigation/footer; first-pass design foundation;
  constrained light / dark mode; one review-page reading aid; seminars bridge.  
  **Deferred:** full thesis HTML edition; full seminars reconstruction; blog launch; broad React / Vue experimentation;
  full redesign; complete CSS refactor; multiple experimental UI features.  
  **Principle:** Touch the broader vision, but do not try to realise all of it.  
  **Status:** Final / urrent for Stage 4.0 planning.
   -

## 7. Active Decisions Still Needed

- Confirm `/research/` implementation before exposing `Research` in primary navigation.
- Confirm shell v1 meets responsive/accessibility/build acceptance criteria before merging to `main`.
- Long-term seminars consolidation remains deferred beyond the Stage 4.1 bridge.

- **Resolve `challenging-modernity` rights before making it live.**
- **Verify `godless-crusade` AM wording, correction note, assets, and schema.**
- **Resolve Hell metadata and asset questions.**
- **Check OG / headshot image path.** Current selected public file is `/images/headshot-1200x630.JPG`; older notes
  expected `.png`.
- **Clean questionable sort / date metadata.** Especially `godless-crusade`, `christian-right-europe`, and
  `challenging-modernity`.
- **Fix schema/frontmatter mismatches where fields are meant to matter.** `dateLabel` vs older `issueDateLabel` needs
  care.
- **Confirm no accidental Cloudflare Workers configuration entered `main`.**
- **Resolve Safari homepage name visibility if still reproducible.**
- **Confirm final homepage / site identity wording.** Current homepage code says `Theory and design, Oxford, England.`
- **Bridge to Seminars; do not migrate it in Stage 4.1.**  
  **Decision:** Keep `https://seminars.stevanveljkovic.com/` separate for now; expose it in footer / secondary nav;
  optionally add a short Seminars card/section on `/research/`; do not import seminar PDFs/assets into the main Astro
  site during Stage 4.1.  
  **Status:** Current.

## 8. Deferred Decisions

- **Thesis page route is settled, but implementation is pending.**  
  **Route:** `/research/doctoral-thesis/religious-atavism-climate-crisis/`  
  **Rule:** Do not link or advertise the local route until actually implemented.  
  **Primary ID:** `https://doi.org/10.5287/ora-4rjoobkvk`.

- **Large CSS/layout rewrite is deferred.**  
  **Current approach:** targeted fixes only.  
  **Deferred:** rethinking or discarding the inherited margin-counter / year-marker layout.

- **Publication / review component extraction is deferred.**  
  **Possible future components:** `ReviewListItem.astro`, `PublicationCitation.astro`, byline components.  
  **Rule:** avoid premature refactor before launch.

- **Trusted HTML migration is deferred.**  
  **Future question:** whether review bodies remain Markdown with raw HTML, move to MDX, or become more semantic
  Markdown.

## 9. Superseded Or Updated Decisions

- **Earlier thesis-route options were pending.**  
  **Superseded by:** settled route `/research/doctoral-thesis/religious-atavism-climate-crisis/`.

- **Stage 4.1 navigation labels were undecided.**  
  **Superseded by:** settled primary nav: Stevan Veljkovic, CV, Publications, Research once `/research/` exists.

- **Only Cosmic Connections and Christian Right are live review pages.**  
  **Superseded by:** six review routes exist; four review routes currently build; two are excluded pending rights
  clarity.

- **`publicationItems` still needs to be created.**  
  **Superseded by:** implemented `publicationItems` collection and current files.

- **`createPublicationsSchema.ts` still needs to be created.**  
  **Superseded by:** current publications schema implementation.

- **Hell, Challenging Modernity, Evolution of Religions, and Godless Crusade are future review pages.**  
  **Superseded by:** current review Markdown files and generated routes, subject to rights / asset validation.

- **Review graph split, periodical chain, date rule, and pagination rule are tentative.**  
  **Superseded by:** current decided review graph and conventions in `current.md`.

- **Local review `datePublished` meaning is open.**  
  **Superseded by:** current convention for article/review first publication dates and issue dates.

- **Thesis page should be implemented now or CV schema adjusted immediately.**  
  **Superseded by:** thesis remains bibliography-only until Stage 4.

- **Earlier `/publications/book-reviews/` route idea.**  
  **Superseded by:** `/publications/reviews/<slug>/`.

- **Earlier thesis slug `/thesis/atavism-climate-crisis/`.**  
  **Superseded by:** `/research/doctoral-thesis/religious-atavism-climate-crisis`.

- **Per-review static Astro pages and per-review schema files.**  
  **Superseded by:** dynamic review route, Markdown content, and `createReviewSchema(review)`.

- **`buildReviewSchema()` active usage.**  
  **Superseded by:** `createReviewSchema(review)`. Old schema files may remain reference material only.

- **Old Astro content imports and `z.string().url()` style.**  
  **Superseded by:** Astro 6 loader-style imports and `z.url()` where URL validation is needed.

- **Optional / required `openingVersionNote` assumptions from older notes.**  
  **Updated by:** actual `src/content.config.ts`; verify schema before relying on old memory.

- **Publisher landing page as reviewed-work `@id` when DOI exists.**  
  **Superseded by:** DOI URL as the stronger `@id`.

- **String author modelling for edited reviewed works.**  
  **Superseded by:** structured `Person`/`editor` modelling where appropriate.

- **HTML-escaped JSON-LD output.**  
  **Superseded by:** unescaped inline JSON-LD via `JsonLd.astro`.

- **Deep relative asset paths.**  
  **Superseded by:** root-relative URLs.

- **Older expected headshot path `/images/headshot-1200x630.png`.**  
  **Updated by:** current selected public tree showing `/images/headshot-1200x630.JPG`; verify code/generated output.

- **Use GitHub Pages as the deployment target for launch.**  
  **Superseded by:** Netlify production hosting.

- **Enable GitHub Actions build-on-push as final Stage 3 subtask.**  
  **Superseded by:** Netlify build-on-push from `main`.

- **GitHub Pages-compatible redirect stubs/PDF compatibility as long-term deployment workaround.**  
  **Superseded by:** Netlify forced `301!` redirects.
