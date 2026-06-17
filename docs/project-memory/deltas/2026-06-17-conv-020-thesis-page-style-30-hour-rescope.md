# 2026-06-17 — Stage 4.2 thesis page polish and 30-hour rescope

[lightly edited by Stevan following generation]

## What changed

- Stage 4.2 thesis page work is now reported as substantially implemented / near release at:
  ```text
  /research/doctoral-thesis/religious-atavism-climate-crisis/
  ```
- The page structure now includes:
   - thesis header and metadata block;
   - resource actions;
   - “About this thesis” section;
   - abstract;
   - citation;
   - resources;
   - identifiers / technical identifiers;
   - supervision and examination;
   - thesis JSON-LD.
- A thesis-specific schema helper is now in use or under active implementation:
  ```ts
  createThesisSchema(thesis, meta)
  ```
- A thesis data object is now in use or under active implementation:
  ```ts
  thesis
  ```
- Thesis-specific CSS was added/refined for:
   - page header;
   - eyebrow label;
   - action links;
   - citation hanging indent;
   - identifier grid;
   - people/supervisors/examiners grid;
   - mobile title scale / grid fallback / border weight / link clusters.
- The thesis page visual state is considered tolerable and shippable after light polish, not final design.
- Stage 4.0 has reached the mandatory 30-hour scope-review checkpoint.

## Decisions made

- Use a short thesis title for page/browser/link contexts:
  ```text
  Religious atavism and the climate crisis
  ```
  while retaining the formal thesis title for the visible thesis title, citation, and thesis entity:
  ```text
  Religious atavism and the climate crisis, with reference to Taylor and Rorty on liberalism
  ```
- Keep the browser title:
  ```text
  Religious atavism and the climate crisis | Stevan Veljkovic
  ```
  despite its length; it is still acceptable and more useful than a generic “Thesis” title.
- Thesis date handling:
   - citation year: `2023`;
   - `copyrightYear`: `2023`;
   - `datePublished`: `2024-02-11`, using ORA deposit/public availability date;
   - `dateCreated`: use `2023` or, if precise submission date is wanted, `2023-04-21`.
- Important note: the thesis `datePublished` value should be `2024-02-11` (not the accidentally input `2026-02-11`).
- The thesis metadata block should include the author name; the site header alone is not enough for the thesis work’s
  authorship.
- Current preferred top metadata block:
  ```text
  By Stevan Veljkovic.
  DPhil thesis, University of Oxford, 2023.
  Held in Oxford University Research Archive (ORA).
  Deposited on 11 February 2024.
  Licensed under CC BY 4.0.
  ```
  A previous variant “Repository:” was preferred by the assistant as compact and unambiguous, but “Held by / in the
  Oxford University Research Archive (ORA)” is regarded by Stevan as more natural.
- Repository naming convention:
   - full name is **Oxford University Research Archive**, not “Oxford Research Archive”;
   - first mention may be:
     ```text
     the Oxford University Research Archive (ORA)
     ```
   - later references should use `ORA`;
   - avoid “the ORA” when ORA stands alone, but phrases like “the ORA record” are fine.
- Do not add Faculty of Theology and Religion / St Cross College to the top metadata block for Stage 4.2 v1. If included
  later, put it lower down as “Institutional details” and use documentary wording such as:
  ```text
  Submitted to the Board of the Faculty of Theology and Religion, University of Oxford.
  College: St Cross College.
  ```
- For public-facing thesis copy, preserve Stevan’s authorial voice and argumentative edge rather than smoothing into
  generic keyword copy.
- Candidate thesis meta description aligned with the revised authorial wording:
  ```text
  Stevan Veljkovic’s Oxford DPhil thesis argues that the climate crisis paradigm is shaped by inherited anxieties of Western modernity and its discontents.
  ```
- Revised “About this thesis” direction:
   - frame the thesis as a theory/theoretical account of the climate crisis paradigm, not climate policy or
     natural-science empirical research;
   - explain “religious atavism” as a return, within ostensibly secular accounts of crisis/emergency, of older
     religious/prophetic patterns of historical orientation;
   - preserve primary focus on Charles Taylor and Richard Rorty, with secondary reference to Bruno Latour, Carl Schmitt,
     and Ivan Illich.
- Use British/logical punctuation for quoted terms where appropriate:
  ```text
  By ‘religious atavism’, ...
  ```
- Do not standardise all text-page borders/frames now just because thesis-page border weight was improved. Defer broader
  frame/border consistency to a later design pass.
- Stage 4.0 30-hour scope-review recommendation:
   - finish and deploy Stage 4.2 thesis page v1;
   - keep Stage 4.7 validation and Stage 4.8 close-out in scope;
   - treat Stage 4.3 CV v1 as conditional on time/energy after Stage 4.2 deploys;
   - treat Stage 4.2.1 withheld-review work as triage only, not a commitment to make pages live;
   - defer full design foundation implementation, light/dark mode, review reading aids, and publications/reviews
     refinements to Stage 5 or later unless separately re-scoped.

## Files affected

Reported or discussed as affected; actual working-tree state was not independently verified in this conversation.

- `src/pages/research/doctoral-thesis/religious-atavism-climate-crisis/index.astro`
   - new thesis page route / page component.
- `src/data/thesis`
   - thesis metadata, abstract, identifiers, dates, citation, supervisors/examiners, resource URLs.
- `src/data/schema/thesis/createThesisSchema`
   - thesis JSON-LD graph generation.
- `src/data/pageMeta.ts`
   - thesis page title/description and proposed improved descriptions for `/pronunciation/`, `/research/`,
     `/publications/`.
- `src/styles/global.css`
   - thesis-page CSS blocks and visual refinements.
- `src/pages/research/`
   - received the implemented thesis link.
- `src/pages/publications/index.astro` / publication item data
   - should be checked so the thesis entry appears correctly and is not duplicated.
- Potential thesis PDF path to verify:
  ```text
  public/research/doctoral-thesis/religious-atavism-climate-crisis/veljkovic-dphil-thesis.pdf
  ```

## Bugs/fixes

- Corrected mistaken “Oxford Research Archive” wording to:
  ```text
  Oxford University Research Archive
  ```
- Corrected ORA article guidance:
   - “the Oxford University Research Archive (ORA)” is idiomatic at first mention;
   - later “ORA” stands without article;
   - “the ORA record” is fine.
- Corrected possible typo:
  ```text
  isAccessibleForFree
  ```
  not `isAccessibleFor Free`.
- Corrected typo in prose:
  ```text
  antecedent
  ```
  not `antecendent`.
- Noted that the thesis page should use controlled identifier wrapping and mobile fallbacks to avoid DOI/ARK overflow or
  ungainly wrapping.
- Noted that the DOI and ORA currently point to the same underlying ORA record; resource wording should avoid implying
  multiple independent records.
- Noted that secondary identifiers may be too technical for general visitors; options are:
   - rename section to “Technical identifiers”;
   - keep DOI visible and put ARK / ORA IDs in `<details>`;
   - leave visible if a repository-style page is desired.

## Current state

- Stage 4.2 thesis page is close to release but not confirmed deployed.
- No merge to `main` or Netlify production deployment was reported in this conversation.
- Remaining Stage 4.2 work should be treated as a release checklist, not an open-ended writing/design exercise.
- Stage 4.0 has reached 30 hours clocked and now needs an explicit scope decision before further expansion.
- The original later Stage 4.0 plan is probably too large for the 40–50 hour target if kept intact:
   - full light/dark mode;
   - theme toggle;
   - review-page reading aid;
   - broad design foundation;
   - publications/reviews refinements;
   - withheld review publication work.
- The strongest recommended rescope is:
  ```text
  committed: Stage 4.2 thesis page v1 + validation + close-out
  conditional: bounded Stage 4.3 CV v1
  optional triage only: withheld reviews rights/status
  defer: full design foundation, light/dark mode, review reading aid, publications/reviews refinements
  ```

## Next steps

- Finish Stage 4.2 release blockers:
   - final thesis copy;
   - top metadata block;
   - About section;
   - meta description;
   - short-title handling;
   - date/schema choices;
   - PDF asset/path verification;
   - `/research/` link;
   - `/publications/` thesis entry check;
   - rendered JSON-LD validation;
   - mobile sanity check.
- Verify local thesis PDF if hosted:
  ```text
  public/research/doctoral-thesis/religious-atavism-climate-crisis/veljkovic-dphil-thesis.pdf
  ```
  and confirm generated/live URL returns 200.
- Confirm thesis JSON-LD from rendered page source:
   - `WebPage.mainEntity` points to DOI thesis node;
   - thesis `@id` is DOI URL;
   - `Person.@id` remains ORCID;
   - no `@id` arrays;
   - date-only values only;
   - `encoding.contentUrl` resolves;
   - confirm addition of `isAccessibleForFree: true`.
- Confirm generated route set and sitemap:
   - thesis page generated;
   - expected route count becomes 10;
   - drafted/withheld reviews remain absent.
- Run:
  ```bash
  npx astro sync
  npx astro check
  npm run build
  npm run preview
  ```
- Inspect at least:
  ```text
  /
  /research/
  /research/doctoral-thesis/religious-atavism-climate-crisis/
  /publications/
  /pronunciation/
  ```
- Complete and record the 30-hour Stage 4.0 scope decision before resuming expanded Stage 4 work.
- If Stage 4.2 deploys with enough time remaining, decide whether to do a bounded Stage 4.3 CV v1.
- Move or defer Stage 4.4–4.6 material unless separately re-scoped.

## Details not to lose

- Important thesis dates inventory:
  ```text
  Submission: 21 April 2023
  Viva: 28 September 2023
  Leave to supplicate: 1 February 2024
  Deposit: 11 February 2024
  Graduation: July 2024
  Copyright year: 2023
  ```
- LTS means “leave to supplicate” and is effectively Oxford’s administrative completion point for the degree, but it
  should not be forced into Schema.org unless a clear property is identified.
- Graduation date is probably not thesis metadata.
- Candidate thesis dates object:
  ```ts
  dates: {
    submitted: "2023-04-21",
    viva: "2023-09-28",
    leaveToSupplicate: "2024-02-01",
    deposited: "2024-02-11",
    copyrightYear: 2023,
    citationYear: 2023,
    graduation: "2024-07"
  }
  ```
- Candidate final “About this thesis” draft direction from Stevan’s own wording:
  ```text
  This doctoral thesis is a theoretical account of the climate crisis paradigm rather than a work of climate policy or empirical research in the natural sciences. It argues that the idea of climate crisis is shaped by inherited anxieties of Western modernity and its discontents.

  By ‘religious atavism’, the thesis refers to a return – within ostensibly secular accounts of crisis and emergency – of religious and prophetic patterns of historical orientation: the sense that history has a direction, that the present is a moment of judgment, that liberal modernity stands in need of rupture or renewal, and that personal and collective deliverance depends on right discernment of the times. The argument is developed chiefly through philosophers Charles Taylor and Richard Rorty, with secondary reference to figures such as Bruno Latour, Carl Schmitt, and Ivan Illich.
  ```
- Proposed snippet-friendly descriptions discussed:
  ```text
  /pronunciation/
  A short guide to pronouncing Stevan Veljkovic in English, with practical phonetic guidance, IPA transcription, and notes on common mispronunciations.

  /research/
  Research by Stevan Veljkovic: Oxford DPhil thesis, review essays, seminars, and work on religion, secularity, liberalism, high theory, and ecological thought.

  /publications/
  Publications, reviews, and academic writing by Stevan Veljkovic, with citation details, DOI and publisher links, and local HTML reproductions where available.

  /research/doctoral-thesis/religious-atavism-climate-crisis/
  Stevan Veljkovic’s Oxford DPhil thesis argues that the idea of climate crisis takes shape within the postsecular anxieties of Western modernity and its discontents.
  ```
- Vision/design feedback from WebStorm image-capable assistant was already used and is not a new site decision, but it
  reinforced: fix title scale, border weight, link clusters, identifier wrapping, and section spacing; defer whole-site
  redesign.
- For future design-review prompts, use bounded screenshot critique with:
   - screenshots at desktop/mobile widths;
   - page purpose and target impression;
   - constraints;
   - relevant CSS;
   - request for ranked, implementable changes.
- For large BBEdit / `.bbaiworksheet` context blocks, robust demarcation convention adopted:
  ```text
  <<< BEGIN PROJECT MEMORY >>>
  ...
  <<< END PROJECT MEMORY >>>
  ```
  or similarly explicit begin/end markers, rather than huge backtick fences that confuse syntax highlighting.
- Trimmed reference memory already covered much of the historical Stage 4.0 scope, rights cautions, deployment checks,
  and public-asset caveats. The new material is the 30-hour rescope pressure and the recommendation to defer several
  originally planned Stage 4.0 parts to Stage 5 or later.
