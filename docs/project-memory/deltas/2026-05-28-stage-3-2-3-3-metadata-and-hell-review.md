# 2026-05-28 — Stage 3.2 metadata hardening and Stage 3.3 Hell review
developments

## Context

This delta records developments after the earlier Stage 3 project memory. It
covers:

- completion of the metadata master-values/audit task;
- closure of Stage 3.2 schema and metadata hardening;
- start of Stage 3.3 review-page expansion;
- substantial refinement of review frontmatter, ReviewIntro display logic, and
  review JSON-LD;
- addition/development of the `hell-christian-ecology` review page;
- `/publications/` JSON-LD cleanup.

## Metadata registry and audit files added

The following documentation files have been added:

```text
docs/metadata/master-values.md
docs/metadata/stage-3-2-audit.md
```

`docs/metadata/master-values.md` is the human-readable master registry for site
metadata values, title rules, URL/node-ID conventions, JSON-LD conventions,
sitemap rules, thesis handling, and known cleanup items.

`docs/metadata/stage-3-2-audit.md` is a longer project-aware metadata audit
generated in WebStorm/GPT using access to the current project files.

The metadata registry is a checking aid, not necessarily the code source of
truth. Stable reusable values should continue to live in TypeScript constants
and be consumed by layouts/schema generators where possible.

## Stage transition

The org-mode task:

```text
Set master list of field values for website metadata
```

is considered complete.

This closes:

```text
Astro site stage 3.2 schema and metadata hardening
```

Work has moved to:

```text
Astro site stage 3.3 add new review pages as drafts
```

Stage 3.3 remains a hardening/expansion phase, not a redesign.

## Audit cleanup items completed

The Stage 3.2 audit identified several cleanup items. The following have now
been completed or substantially addressed:

### CV metadata prop typo fixed

The typo:

```astro
ogtype={meta.ogType}
```

was corrected to:

```astro
ogType={meta.ogType}
```

### `/publications/` schema strings aligned

Old strings such as:

```text
Publications | Dr Stevan Veljkovic
Publications of Dr Stevan Veljkovic.
Publications of Dr Stevan Veljkovic
```

have been replaced with:

```text
Publications | Stevan Veljkovic
Publications of Stevan Veljkovic.
Publications of Stevan Veljkovic
```

### Placeholder-like dates removed from `/publications/`

The `/publications/` JSON-LD no longer emits placeholder-like
`datePublished` values for items where the date was not sufficiently exact.

Removed/avoided examples include:

```text
2025-01-01
2023-01-01
```

This affects items such as *Challenging Modernity*, *The Godless Crusade*, and
the thesis.

Internal sorting dates should not automatically become Schema.org
`datePublished` values when they are only internal sort metadata.

### Publication-list review schema type updated

Book-review items on `/publications/` are now typed as:

```json
"@type": ["ScholarlyArticle", "Review"]
```

rather than only:

```json
"@type": "ScholarlyArticle"
```

This aligns the publications-page bibliography nodes more closely with the
dedicated review-page schema.

### Christian Right title punctuation improved

The Christian Right publication-list title now uses:

```text
Edited by
```

rather than:

```text
Edited By
```

Current title pattern:

```text
The Christian Right in Europe: Movements, Networks, and Denominations. Edited by
Gionathan Lo Mascolo
```

### Christian Right issue date reduced in precision

The Christian Right issue date on `/publications/` was reduced from exact-day
precision:

```json
"datePublished": "2025-07-01"
```

to month precision:

```json
"datePublished": "2025-07"
```

This follows the project rule not to invent exact day precision when only
month-level certainty is appropriate.

## Thesis handling reaffirmed

The thesis remains **bibliography-only until Stage 4**.

For Stage 3:

- do not create a substantive thesis page;
- do not add `/thesis/religious-atavism-climate-crisis/` to the sitemap unless
  an actual generated page exists;
- do not link CV schema to a non-existent thesis page;
- use the thesis DOI URL as the safest thesis work `@id` where schema references
  are needed:

```text
https://doi.org/10.5287/ora-4rjoobkvk
```

The thesis JSON-LD on `/publications/` now includes DOI, ARK, ORA pubs id, and
ORA local pid identifiers. The ARK remains a secondary archival/repository
identifier, not the primary `@id` and not `sameAs`.

Current thesis identifiers:

```text
DOI: 10.5287/ora-4rjoobkvk
ARK: ark:/29072/ora_7aff13dc075e4c17bee95adfc1b2fcf4
Oxford Research Archive pubs id: 1624720
Oxford Research Archive local pid: pubs:1624720
```

The thesis `name`/`headline` remains the full thesis title because this matches
the visible citation and DOI/ORA record more closely. If a shorter title is
desired later, add a separate field such as `shortTitle` or `schemaName`.

## Draft-page development decision

A practical issue arose with adding new review pages as drafts: if
`draft: true` entries are filtered out of `getStaticPaths()`, they cannot be
viewed at `localhost:4321` during development.

Recommended pattern:

```ts
const reviews = await getCollection("reviews", ({ data }) => {
  if (import.meta.env.DEV) return true;
  return data.draft !== true;
});
```

or equivalent logic.

Principle:

- in development, draft review pages may be generated so they can be worked on
  locally;
- in production builds, draft review pages should be excluded from canonical
  generated routes and the sitemap.

Do not add planned/draft pages to production sitemap/schema until they are
intentionally published.

## Review frontmatter standardisation decisions

Adding `hell-christian-ecology` exposed several assumptions in the existing
review frontmatter and `ReviewIntro.astro`. The review metadata model has been
refined.

### `license` vs `licence`

Use:

```yaml
license
```

as the canonical frontmatter/code/schema key, because Schema.org uses
`license`.

Visible British-English prose may still use:

```text
licence
```

where appropriate.

Do not use `licence` as the data key.

Preferred shape:

```yaml
rights:
  license:
    name: "CC BY-NC-ND 4.0"
    fullName: "Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
International"
    url: "https://creativecommons.org/licenses/by-nc-nd/4.0/"
```

Use `fullName`, not `fullname`.

### Author and publisher values

Canonical new/revised metadata should use object-shaped author, editor, and
publisher values, for example:

```yaml
author:
  name: "Timothy Morton"
  alternateName: "Tim Morton"

publisher:
  name: "Equinox Publishing Ltd"
  url: "https://www.equinoxpub.com/"
```

Existing string values may be supported temporarily through normalisation in
template/schema code. Do not force a disruptive full-site refactor solely for
this.

### Copyright year

Use a number for exact single copyright years:

```yaml
copyrightYear: 2025
```

This maps cleanly to Schema.org `copyrightYear`.

### Rights object

Rights metadata for the locally displayed review text should live under a
root-level `rights` object:

```yaml
rights:
  copyrightYear: 2025
  copyrightHolder:
    type: "Organization"
    name: "Equinox Publishing Ltd"
    url: "https://www.equinoxpub.com/"
  license:
    name: "CC BY-NC-ND 4.0"
    fullName: "Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
International"
    url: "https://creativecommons.org/licenses/by-nc-nd/4.0/"
```

This `rights` object describes the local page/text representation. If a future
case requires different rights metadata for the DOI/publisher version, a nested
`publishedReview.rights` object can be added later.

### Publisher locations

Distinguish these fields:

```text
reviewedWork.publisher
```

= publisher of the book being reviewed.

```text
publishedReview.periodical.publisher
```

= publisher of the journal/periodical.

```text
publishedReview.publisher
```

= publisher of the published review/article. This may duplicate the periodical
publisher for journal reviews and is acceptable.

### `reuseNoteHtml`, `originalSubmissionNote`, and `modificationNote`

`originalSubmissionNote` had become too narrow as a field name. New/revised
review pages should prefer:

```yaml
reuseNoteHtml
```

for the human-facing note explaining why/how the local text is available.

Keep backward compatibility:

```ts
const reuseNoteHtml = review.reuseNoteHtml ?? review.originalSubmissionNote;
```

`modificationNote` is separate and should not replace `reuseNoteHtml` or
`originalSubmissionNote`.

Meanings:

```text
reuseNoteHtml / originalSubmissionNote:
  explains the availability/reuse/licence basis for the local text.

modificationNote:
  explains whether/how the local displayed text differs from the relevant source
  text.
```

Render both when both are present.

Example for Cosmic:

```text
This unabridged original is significantly longer than the Version of Record text
and is made available here under the publisher’s policy on author reuse.
Errors have been corrected silently. © 2024 Stevan Veljkovic.
```

Example for Hell:

```text
Published by Equinox Publishing Ltd and reproduced here under CC BY-NC-ND 4.0.
No changes have been made to the text, apart from HTML formatting. © 2025
Equinox Publishing Ltd.
```

### CC BY-NC-ND caution

For works reproduced under CC BY-NC-ND, avoid saying:

```text
Errors have been corrected silently.
```

unless rights have been checked, because NoDerivatives licences may restrict
modified/adapted versions.

For the Hell review, preferred modification wording is:

```text
No changes have been made to the text, apart from HTML formatting.
```

provided that this is true.

## Review title/name system standardised

The review title fields should be understood as follows:

```text
reviewedWork.title
  full title of the reviewed book/work.

reviewedWork.shortTitle
  optional short title of the reviewed work.

title
  local review title/headline.

shortTitle
  short title used where needed, but should not force an over-short or awkward
  form.

pageHeading
  visible h1.

seoTitle
  page title before the site-name suffix.

publishedReview.title
  publisher’s title for the DOI/publisher-hosted review/article.

citationHtml
  formatted human-readable citation.
```

For review pages, the adopted page-title rule remains:

```text
Review of {Reviewed work short title} | Stevan Veljkovic
```

But `shortTitle` is editorial, not a mechanical subtitle-stripping rule.

### Cosmic title decision

Use:

```yaml
title: "Review of Cosmic Connections"
shortTitle: "Cosmic Connections"
pageHeading: "Review of Cosmic Connections"
seoTitle: "Review of Cosmic Connections"
```

with:

```yaml
reviewedWork:
  title: "Cosmic Connections: Poetry in the Age of Disenchantment"
  shortTitle: "Cosmic Connections"
```

### Hell title decision

Do not use:

```text
Review of Hell
```

because it is too short and misleading.

Use the full title:

```yaml
title: "Review of Hell: In Search of a Christian Ecology"
shortTitle: "Hell: In Search of a Christian Ecology"
pageHeading: "Review of Hell: In Search of a Christian Ecology"
seoTitle: "Review of Hell: In Search of a Christian Ecology"
```

with:

```yaml
reviewedWork:
  title: "Hell: In Search of a Christian Ecology"
  shortTitle: "Hell: In Search of a Christian Ecology"
```

## ReviewIntro display decisions

`ReviewIntro.astro` has been refined or should be refined to render:

```text
heading
dek
version/citation block
optional first-published-online note
reuse/licence/availability note
modification note
copyright notice
```

The first-published-online note should be editorially controlled, not inferred
only from whether `firstPublishedOnline` equals `datePublished`.

Use:

```yaml
showFirstPublishedOnlineNote: true
```

for Cosmic because the citation year/issue date differs from the first-online
date.

Use:

```yaml
showFirstPublishedOnlineNote: false
```

for Hell because the citation already includes the relevant ahead-of-print date.

## `openingVersionNote` and `version`

Use:

```yaml
version
```

as the structured version value.

Use:

```yaml
openingVersionNote
```

only as an optional display override.

Preferred logic:

```ts
const openingVersionLabel = review.openingVersionNote ?? `the
${review.version}`;
```

Cosmic should align around:

```yaml
version: "Author’s Original Manuscript"
openingVersionNote: "the Author’s Original Manuscript"
```

Hell should use:

```yaml
version: "Version of Record"
openingVersionNote: "the Version of Record"
```

## Issue metadata decisions

`publishedReview.issue.number` should not be required.

Some issues have conventional issue numbers:

```yaml
issue:
  number: "2"
```

Some publisher issue containers may have a label but no conventional issue
number:

```yaml
issue:
  name: "Book Reviews: Volume 19, 2025–Open Access"
```

Schema generation should support optional:

```text
issueNumber
name
url
datePublished
image
```

Do not emit `PublicationIssue.name` merely as the issue number. It is acceptable
to emit `PublicationIssue.name` when it is a genuine publisher-supplied issue
label.

## Hell: In Search of a Christian Ecology review added/developed

A new review content file has been added or substantially developed:

```text
src/content/reviews/hell-christian-ecology.md
```

Route:

```text
/publications/reviews/hell-christian-ecology/
```

Core metadata:

```text
Reviewed work:
Hell: In Search of a Christian Ecology

Author:
Timothy Morton
alternateName: Tim Morton

Reviewed book DOI:
https://doi.org/10.7312/mort21470

Published review DOI:
https://doi.org/10.1558/jsrnc.30282

Publisher article URL:
https://journal.equinoxpub.com/JSRNC/article/view/30282/

Periodical:
Journal for the Study of Religion, Nature and Culture

Periodical ISSNs:
1749-4907
1749-4915

Periodical publisher:
Equinox Publishing Ltd

Volume:
19

Issue/container label:
Book Reviews: Volume 19, 2025–Open Access

Issue/container URL:
https://journal.equinoxpub.com/JSRNC/issue/view/2718

Version:
Version of Record

Licence:
CC BY-NC-ND 4.0
https://creativecommons.org/licenses/by-nc-nd/4.0/

Copyright holder:
Equinox Publishing Ltd

Copyright year:
2025
```

The local Hell review page is modelled as a local `#review` node distinct from
the DOI-published review node.

Preferred local node ID:

```text
https://stevanveljkovic.com/publications/reviews/hell-christian-ecology/#review
```

Published DOI node:

```text
https://doi.org/10.1558/jsrnc.30282
```

Reviewed book node:

```text
https://doi.org/10.7312/mort21470
```

No false `sameAs` should be used between the local page and DOI review node.
Use:

```json
"isBasedOn": { "@id": "https://doi.org/10.1558/jsrnc.30282" },
"citation": { "@id": "https://doi.org/10.1558/jsrnc.30282" }
```

## Hell rights/licence display

For Hell, the visible reuse/licence note should say substantially:

```html
Published by Equinox Publishing Ltd and reproduced here under
<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND
4.0</a>.
```

Modification note:

```text
No changes have been made to the text, apart from HTML formatting.
```

Copyright notice:

```text
© 2025 Equinox Publishing Ltd.
```

Use organisation name in metadata without the final full stop:

```yaml
name: "Equinox Publishing Ltd"
```

The final full stop belongs to the sentence, not to the organisation name.

## Hell issue date caution

The Hell issue/container page displays a date:

```text
2024-10-03
```

This appears to be the date associated with the issue landing page. It may
indicate that the issue object/container was first created, while reviews were
added later.

Do not treat this as a confident `PublicationIssue.datePublished` unless it is
verified as the actual publication date of the issue/container. Since the issue
label is:

```text
Book Reviews: Volume 19, 2025–Open Access
```

and the review date is:

```text
2025-01-20
```

it may be better to omit `PublicationIssue.datePublished` for the Hell issue in
final launch metadata unless the meaning of `2024-10-03` is clear.

This is not a blocker for continuing Stage 3.3, but remains a cleanup item.

## Cosmic Connections refinements

Cosmic review frontmatter and JSON-LD have been brought closer to the refined
model.

Current key decisions retained:

```text
Local version:
Author’s Original Manuscript

Published DOI review:
https://doi.org/10.1177/13684310241249684

Reviewed book DOI:
https://doi.org/10.4159/9780674297074

DOI article datePublished:
2024-05-24

Issue date:
2025-05
```

The local Cosmic `#review` remains distinct from the DOI article. Do not use
`sameAs` between them.

The local Cosmic node should continue to point to the DOI node through:

```json
"isBasedOn": { "@id": "https://doi.org/10.1177/13684310241249684" },
"citation": { "@id": "https://doi.org/10.1177/13684310241249684" }
```

The Cosmic description duplication was fixed. The description should be:

```text
A book which bids fair to be Taylor's culminating output joins up the facets of
an extraordinary career, writes Stevan Veljkovic.
```

or typographically equivalent.

## `/publications/` JSON-LD state after cleanup

The `/publications/` JSON-LD is now Stage-3-good-enough.

Current pattern remains:

```text
CollectionPage
  mainEntity → ItemList
    itemListElement → ListItem[]
```

The publications page currently lists seven items in the `ItemList`.

The duplicate Hell item was removed. The Hell review should appear once on
`/publications/`, identified by DOI:

```text
https://doi.org/10.1558/jsrnc.30282
```

The publisher article URL should not appear as a second bibliography item unless
there is a deliberate visible duplicate entry.

Current `/publications/` review entries use:

```json
"@type": ["ScholarlyArticle", "Review"]
```

for book reviews.

The thesis remains typed as:

```json
"@type": "Thesis"
```

The `/publications/` page may use page-local periodical/volume/issue node IDs,
for example:

```text
https://stevanveljkovic.com/publications/#review-hell-christian-ecology-
periodical
https://stevanveljkovic.com/publications/#review-hell-christian-ecology-volume
https://stevanveljkovic.com/publications/#review-hell-christian-ecology-issue
```

This continues the existing Stage 3 practice of allowing page-local container
node IDs.

## Dedicated review-page JSON-LD state

The dedicated Cosmic and Hell review pages now broadly match the intended review
schema model:

```text
Person
WebSite
WebPage
Reviewed Book
Published DOI Review
Periodical
PublicationVolume
PublicationIssue
Local Review
```

Relationship pattern:

```text
WebPage.mainEntity → local #review
WebPage.about → reviewed book
local #review.itemReviewed → reviewed book
local #review.isBasedOn/citation → DOI review
DOI review.itemReviewed → reviewed book
DOI review.isPartOf → issue → volume → periodical
```

For Hell and Cosmic, this pattern is considered good enough for Stage 3, subject
to ordinary validation and the Hell issue-date caution above.

## Remaining cleanup items

The following are not blockers to continuing Stage 3.3, but should remain on the
cleanup list:

1. Verify or remove Hell `PublicationIssue.datePublished: "2024-10-03"`.

2. Confirm whether `hell-christian-ecology` should be production-live
   (`draft: false`) or remain draft while rights/licence/text checks continue.

3. Ensure draft review pages can be viewed locally in dev without appearing in
   production builds/sitemap.

4. Continue validating rendered JSON-LD from page source, especially:
    - `/publications/`
    - `/publications/reviews/cosmic-connections/`
    - `/publications/reviews/hell-christian-ecology/`
    - `/publications/reviews/christian-right-europe/`

5. Continue checking rights/version wording before publishing additional full
   review texts.

6. Planned review pages still require draft-first handling:
    - `/publications/reviews/godless-crusade/`
    - `/publications/reviews/challenging-modernity/`

7. Do not publish additional rights-sensitive full text until reuse status,
   copyright holder, version wording, required credit line, and local PDF/text
   permissions are checked.

## Commands to run after these changes

After significant changes, continue to run:

```bash
npx astro sync
npx astro check
npm run build
```

Also inspect sitemap output to ensure only generated, non-draft canonical pages
appear:

```bash
find dist -name "sitemap*.xml" -print -exec cat {} \;
```