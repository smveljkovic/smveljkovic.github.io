# Decisions

This file is a categorized decisions register derived from
`docs/project-memory/current.md`. Treat `current.md` and actual code/build output
as authoritative when they conflict with older notes.

- **Keep active repo memory compact and operational.**  
  **Decision:** `docs/project-memory/` is the active operational memory. Expanded/trimmed material in the external
  `website-admin` archive is contextual background, not a co-equal canonical source.  
  **Implication:** Do not restore trimmed historical/background material unless a later conversation reactivates,
  changes, contradicts, or materially clarifies it.  
  **Status:** Current memory-maintenance rule.

## 1. Platform, Routes, And Build Model

- **Use the settled thesis route under `/research/`.**  
  **Route:** `/research/doctoral-thesis/religious-atavism-climate-crisis/`  
  **Slug:** `religious-atavism-climate-crisis`  
  **Rule:** Do not link the route until the page is actually implemented.
  **Current state:** Implemented and linked in the working tree; confirm build/generated output and live production
  state
  before release.
  **Status:** Decided; working-tree implementation present.

- **Platform baseline:** Use Astro, clean trailing-slash URLs, Astro 6 loader-style content collections, and
  Markdown-driven dynamic review routes. Do not keep static per-review pages under `src/pages`.

- **Use the thesis DOI as the primary scholarly identifier / schema `@id`.**  
  **ID:** `https://doi.org/10.5287/ora-4rjoobkvk`  
  **Implications:** The local thesis page may have its own `WebPage` node, but the thesis entity itself should use the
  DOI URL as its primary scholarly identifier. Include ARK and ORA IDs as secondary identifiers where useful.  
  **Status:** Decided for Stage 4.2.

## 2. Content Collections And Publications Page

- **Publication content model:** Use `reviews` for review records and `publicationItems` for list-only bibliography
  records. Non-draft reviews generate pages; drafted reviews may still appear as bibliography entries when
  `publicationList.include !== false`. Duplicate/list-only review records are drafted except the thesis item to avoid
  duplicate list/schema entries.

- **Publications schema:** `/publications/` should remain `CollectionPage -> ItemList -> ListItem[]`. Richer JSON-LD,
  such as reviewed-book nodes, license modelling, and external WebPage nodes, is deferred unless needed.

- **Bibliography style:** Preserve grouped bibliography style, year grouping, `BibEntry`, `counter_bib`,
  `test#writings`, note lines, and citation formatting where possible.

## 3. Structured Data And Schema Decisions

- **Canonical identity IDs:** Use ORCID as canonical `Person.@id`: `https://orcid.org/0000-0002-2599-3227`. Reject the
  conflated OpenAlex profile `https://openalex.org/A5056034517`; the current OpenAlex profile is
  `https://openalex.org/authors/A5115945824`.

- **Scholarly IDs:** Use DOI URLs as primary `@id`s for DOI-bearing works, articles, reviews, and the thesis. Keep local
  manuscripts/pages distinct from DOI-published versions; prefer `isBasedOn` and/or `citation`, not false `sameAs`.

- **Schema factories:** Active review pages use `createReviewSchema(review)`. Homepage and CV schemas remain manual
  one-off schemas: homepage as `AboutPage`, CV as `ProfilePage`, with the CV PDF as `MediaObject`.

- **Education/affiliation modelling:** Use dated `Role` nodes for education/affiliation periods. Do not use credential
  `startDate`/`endDate`, `Person.dissertation`, or `OrganizationRole.worksFor`.

- **Journal review graph:** Local review pages use `WebPage -> local #review -> reviewed Book`; the local review links
  to the DOI/published review using `isBasedOn`/`citation`; the DOI/published review links to
  `PublicationIssue -> PublicationVolume -> Periodical`.

- **LSE Review of Books model:** `evolution-of-religions` uses a blog/post container model: published LSE post as
  `BlogPosting/Review`, local reproduction as `Article/Review`, with no invented journal, volume, issue, pagination, or
  fake issue images.

- **Dates and pagination:** `publishedReview.datePublished` means publisher-recognised first publication date, usually
  first online. `PublicationIssue.datePublished` means issue date/month/year where known. Do not emit non-standard
  `firstPublishedOnline`; map it to Schema.org `datePublished`. Article/review pagination belongs on the article/review
  node, not the issue, unless whole-issue pagination is verified.

- **Issue naming:** Do not emit `PublicationIssue.name` merely as an issue number. Use `issueNumber` for numbers; use
  `name` only for real publisher-supplied issue labels.

- **JSON-LD rendering and validation:** Render JSON-LD with unescaped inline script HTML using
  `set:html={JSON.stringify(data, null, 2)}`. Validate rendered page-source JSON-LD, not TypeScript literals.

- **SEO descriptions:** Treat page descriptions as ordinary SEO metadata, not JSON-LD. Canonical pages should use
  hand-authored display-ready descriptions where practical, roughly 130-170 characters. Simple text pages may launch
  without JSON-LD if title, canonical URL, and meta description are present.

- **Thesis page model:** Build the thesis page around factual metadata plus a short authored overview: title/metadata
  block, “About this thesis”, abstract, citation, resources, identifiers, supervision/examination, licence/PDF
  availability.

- **Thesis titles and dates:** Use the formal thesis title for visible title, citation, and thesis entity; use
  `Religious atavism and the climate crisis` for browser/link contexts. Use citation year `2023`, copyright year `2023`,
  and `datePublished: 2024-02-11`; whether to use precise `dateCreated: 2023-04-21` remains open.

- **ORA naming:** Use `Oxford University Research Archive`; first mention may be
  ```text
  Oxford University Research Archive (ORA)
  ```
   - later references `ORA`. Avoid “the ORA” except in phrases like “the ORA record”.

- **Thesis top metadata:** Include `By Stevan Veljkovic`; do not add Faculty of Theology and Religion / St Cross College
  to the top metadata block for v1. Preserve Stevan’s authorial voice in public-facing thesis copy.

## 4. Review-Specific Decisions

- **Cosmic Connections:** Treat the local version as a distinct Author's Original Manuscript, not `sameAs` the DOI
  article; use `isBasedOn` and/or `citation`.

- **Christian Right:** Use `editor`, not `author`, for Gionathan Lo Mascolo. `csaf039` is article ID, not pagination.
  Issue date has month precision: `2025-07`.

- **Evolution of Religions:** Model the published LSE post as `BlogPosting/Review` and the local reproduction as
  `Article/Review`.

- **Hell:** Model is settled, but minor citation/metadata checks remain. Known values: DOI review
  `https://doi.org/10.1558/jsrnc.30282`; reviewed book DOI `https://doi.org/10.7312/mort21470`; license CC BY-NC-ND 4.0.

- **Godless Crusade:** Treat the local version as an Accepted Manuscript, not Version of Record. Known values: published
  review DOI `https://doi.org/10.1080/09637494.2023.2260684`; reviewed book DOI `https://doi.org/10.1017/9781009262125`;
  journal volume 51, issue `4–5`; pagination `491–492`. Still check T&F AM wording, Goodhart correction note,
  text/version accuracy, schema, sitemap, and absence of VoR PDF/text.

- **Challenging Modernity:** Keep withheld unless CCC/T&F permission is confirmed. Current local version is a Taylor &
  Francis Version-of-Record reproduction.

## 5. Assets, URLs, and Deployment

- **Stage 4 workflow and deployment:** Use `stage-4-0` as the Stage 4 integration branch and `main` as production.
  Netlify deploys from `origin/main` with `npm run build` and publishes `dist`. Merge only coherent public release
  units.

- **Canonical host and DNS:** Keep `https://stevanveljkovic.com/` as canonical despite Netlify’s `www` recommendation.
  Keep DNS hosted at Hover for now; current apex A record is `75.2.60.5`. Revisit DNS only if performance evidence
  justifies it.

- **Seminars bridge:** Keep `https://seminars.stevanveljkovic.com/` separate for now; expose it in footer/secondary nav;
  do not import seminar PDFs/assets into the main Astro site during Stage 4.1.

- **Forced Netlify redirects:** Use `301!` rules in `public/_redirects` while old compatibility files still exist,
  otherwise Netlify may serve a physical legacy file with `200`. Current rules cover `/writing.html`, Cosmic Connections
  legacy HTML/PDF, and `/itinerary.pdf`.

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

- **Local thesis PDF may be hosted under CC BY 4.0 if verified.**  
  **Decision:** The local thesis PDF may be made available under CC BY 4.0, using a stable public path/filename.  
  **Caution:** Verify the file and generated/live link before release.  
  **Status:** Permitted; working-tree implementation present; generated/live link verification pending.

## 6. Design, Accessibility, and Content-Rendering Decisions

- **Treat the current 4.1a link/focus/current-page styling as acceptable unless a real issue appears.**  
  **Decision:** Do not continue link-style tuning without an observed contrast, accessibility, or usability problem.  
  **Status:** Current.

- **Navigation and shell:** Stage 4.1 primary nav is `Stevan Veljkovic`, `CV`, `Publications`, `Research`;
  footer/secondary nav is Contact, ORCID, Google Scholar, GitHub, Pronunciation, Seminars. Header should remain simple,
  accessible, Astro/CSS-led, and no-JavaScript for the first pass.

- **Pronunciation page:** `/pronunciation/` is canonical. V1 transcription: `/ˈstɛv(ə)n ˈvɛl.kə.vɪk/`; first syllable is
  `STEV`, not `STEEV`, and not pronounced like “Steven” or “Steve”.

- **Research page:** Keep `/research/` compact: not an apology or manifesto; do not overclaim; separate outputs from
  themes; give the thesis pride of place.

- **Accessibility and rendering:** Preserve basic accessibility fixes: no unnecessary `_blank`; `_blank` links need
  `rel`; decorative icons use `alt="" aria-hidden="true"`; homepage nav remains valid list markup. Use
  JavaScript/animation sparingly. Trusted HTML bridge fields remain acceptable for migration.

- **Stage 4.0 is a constrained core architecture / design foundation phase.**  
  **In scope:** thesis page; expanded / web-native CV page; header / navigation/footer; seminars bridge.  
  **Deferred:** full thesis HTML edition; full seminars reconstruction; blog launch; broad React / Vue experimentation;
  full redesign; complete CSS refactor; multiple experimental UI features; first-pass design foundation;
  constrained light / dark mode; one review-page reading aid.  
  **Principle:** Touch the broader vision, but do not try to realise all of it.  
  **Status:** Pre-30-hour planning baseline; subject to active scope-review decision.

- **Stage 4.0 has reached the 30-hour scope-review checkpoint.**  
  **Status:** Active review point.  
  **Current recommendation:** commit to Stage 4.2 thesis page v1, validation, and close-out; make Stage 4.3 CV v1
  conditional on time/energy; treat withheld-review work as triage only; defer full design foundation, light/dark
  mode, review reading aid, and publications/reviews refinements unless separately re-scoped.
  **Review needed:** Pending explicit Stevan confirmation before treating this as the official Stage 4.0 rescope.

- **Use the ORA / DOI metadata abstract for the local thesis page.**  
  **Decision:** Use the Oxford University Research Archive / DOI metadata version of the thesis abstract as the source
  text for the
  local thesis page.
  **Implementation rule:** Do not describe the abstract as transcribed from the PDF unless the PDF text is being used
  and checked directly.
  **Rationale:** ORA is the public institutional DOI metadata record and is the most stable source for page metadata.
  **Status:** Decided for Stage 4.2.

- **Do not broaden thesis-page visual fixes into a whole-site frame/border pass now.**  
  **Decision:** Thesis-page border/frame refinements may be made locally, but broader text-page border/frame
  consistency is deferred to a later design pass.  
  **Status:** Decided for Stage 4.2.

## 7. Deferred Decisions

- **Large CSS/layout rewrite is deferred.**  
  **Current approach:** targeted fixes only.  
  **Deferred:** rethinking or discarding the inherited margin-counter / year-marker layout.

- **Publication / review component extraction is deferred.**  
  **Possible future components:** `ReviewListItem.astro`, `PublicationCitation.astro`, byline components.  
  **Rule:** avoid premature refactor before launch.

- **Trusted HTML migration is deferred.**  
  **Future question:** whether review bodies remain Markdown with raw HTML, move to MDX, or become more semantic
  Markdown.
