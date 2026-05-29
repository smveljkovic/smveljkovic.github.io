2026-05-29 — Stage 3.3.2.5 carryover delta: post-`challenging-modernity`,
publications-page links, slug policy, PDF/image conventions

Context

This delta records decisions and developments after completion of:

```text
Stage 3.3.2.4 — putting up challenging-modernity
```

and immediately before/while beginning:

```text
Stage 3.3.2.5 — adding godless-crusade
```

A further review page has also been identified for later addition:

```text
Review of The Evolution of Religions
```

No slug has yet been finally adopted for that new page.

This remains Stage 3.3 work: launch hardening, review-page expansion, URL
preservation, schema correctness, and modest usability improvements. It is not
the Stage 4 redesign.

---

Challenging Modernity completion status

The `challenging-modernity` review page is now considered complete for Stage 3.3
after JSON-LD inspection.

Canonical route:

```text
publications/reviews/challenging-modernity/
```

Content file:

```text
src/content/reviews/challenging-modernity.md
```

Status:

```yaml
draft: false
slug: "challenging-modernity"
canonicalPath: "/publications/reviews/challenging-modernity/"
```

Adopted visible/page metadata:

```yaml
title: "Review of Challenging Modernity"
shortTitle: "Challenging Modernity"
pageHeading: "Review of Challenging Modernity"
seoTitle: "Review of Challenging Modernity"
description: "The spirit of Robert Bellah’s era-defining research lives on in
this deeply felt compilation of Bellah disciples, writes Stevan Veljkovic."
datePublished: "2024-10-08"
```

The h1 remains editorially concise:

```text
Review of Challenging Modernity
```

Full bibliographic complexity is handled in `citationHtml`, frontmatter, and
JSON-LD rather than in the h1.

---

Challenging Modernity reviewed-work modelling

The reviewed work has unusual title-page authorship/creation data.

Adopted model:

```text
Book.author       → Robert N. Bellah
Book.contributor  → Ana Marta González; Philip Gorski; Kyle Harper; Hans Joas;
                    Joel Robbins; Hartmut Rosa; Alan Strathern
Book.editor       → Richard Madsen; William M. Sullivan; Ann Swidler;
                    Steven M. Tipton
Book.publisher    → Columbia University Press
```

Do not flatten all names into `author`.

Do not encode the editors as authors.

Reviewed work DOI:

```text
https://doi.org/10.7312/bell21488
```

Reviewed work sameAs values include:

```yaml
sameAs:
  - "https://www.degruyterbrill.com/document/doi/10.7312/bell21488/html/"
  - "https://cup.columbia.edu/book/challenging-modernity/9780231214889/"
```

Reviewed work ISBNs:

```yaml
isbn:
  - "9780231560511"
  - "9780231214896"
  - "9780231214889"
```

Typo fixed:

```text
Harmut Rosa → Hartmut Rosa
```

The reviewed-work DOI identifier now emits a DOI URL properly in JSON-LD.

---

Challenging Modernity published-review metadata

Published review DOI:

```text
https://doi.org/10.1080/09637494.2024.2408091
```

Published review node ID:

```text
https://doi.org/10.1080/09637494.2024.2408091
```

Adopted title/headline for DOI review node:

```json
"name": "Challenging Modernity",
"headline": "Challenging Modernity"
```

A publisher-supplied subtitle exists and may be stored:

```yaml
publishedReview:
  subtitle: "by Robert Bellah, edited and with introduction and conclusion by
Richard Madsen, William M. Sullivan, Ann Swidler, and Steven M. Tipton, New
York, Columbia University Press, 2024, 371 pp., $32.00/£28.00 (paperback), ISBN
9780231214896"
```

Decision: do not use this long bibliographic subtitle as `name` or `headline`.
Prefer storing it only. If it is ever emitted, `alternativeHeadline` is more
plausible than `headline`, but for Stage 3.3 it can remain internal.

Published-review dates:

```yaml
datePublished: "2024-10-08"
firstPublishedOnline: "2024-10-08"
```

Pagination:

```yaml
pagination: "440–441"
pageStart: "440"
pageEnd: "441"
```

Use `pageStart`/`pageEnd`, not `startPage`/`endPage`, to align with Schema.org
and existing Cosmic pattern.

---

Religion, State and Society issue metadata

Periodical:

```yaml
periodical:
  name: "Religion, State and Society"
  url: "https://www.tandfonline.com/journals/crss20/"
  printIssn: "0963-7494"
  electronicIssn: "1465-3974"
```

ISSNs are now deduplicated in rendered JSON-LD:

```json
"issn": [
  "0963-7494",
  "1465-3974"
]
```

Volume:

```yaml
volume:
  number: "53"
```

Issue:

```yaml
issue:
  number: "4"
  url: "https://www.tandfonline.com/toc/crss20/53/4/"
  name: "The Expansion of Christian Zionism in the Global South"
  datePublished: "2025-08-08"
  issueDateLabel: "September 2025"
  editor:
    - "Manoela Carpenedo"
    - "Paul Freston"
```

The issue is a special issue whose cover/source wording identifies:

```text
Special Issue: The Expansion of Christian Zionism in the Global South
Guest Editors: Manoela Carpenedo and Paul Freston
Volume 53, Number 4, September 2025
```

Decision: issue guest editors should be emitted as standard Schema.org `editor`
on the `PublicationIssue` node.

Do not invent non-standard `guestEditor`.

Do not attach issue guest editors to the review/article node.

The issue publication date `2025-08-08` is acceptable because Ingenta gives:

```text
Volume 53, Number 4, 8 August 2025
```

Keep `issueDateLabel: "September 2025"` internal/display-only. Do not emit
`issueDateLabel` into JSON-LD.

---

Challenging Modernity rights, reuse, and version wording

Local page version:

```yaml
version: "Reproduction of the Version of Record"
openingVersionNote: "Version of Record"
```

This follows the adopted convention that the local page is a reproduction/hosted
representation, not itself the publisher’s canonical Version of Record.

Visible intro wording uses:

```text
The following text reproduces the Version of Record for …
```

First online note:

```yaml
showFirstPublishedOnlineNote: true
```

Permissions wording required by Taylor & Francis/Informa:

```text
Reprinted by permission of Informa UK Limited, trading as Taylor & Francis
Group, www.tandfonline.com.
```

This should be preserved in visible page text.

Preferred field:

```yaml
reuseNoteHtml: 'Reprinted by permission of Informa UK Limited, trading as Taylor
& Francis Group, <a
href="https://www.tandfonline.com/">www.tandfonline.com</a>.'
```

Do not treat this as a `modificationNote`.

If a modification note is needed, keep it separate, e.g.:

```yaml
modificationNote: "Unmodified except for HTML formatting."
```

If not needed, omit `modificationNote`.

Do not put permission/reuse statements under `periodical.publisher.rights`; that
is conceptually misplaced. The permission statement belongs to the local
reproduction/page context.

Rights/copyright holder now preferably use ORCID reference:

```yaml
rights:
  copyrightYear: 2024
  copyrightHolder:
    id: "https://orcid.org/0000-0002-2599-3227"
```

Rendered JSON-LD now emits:

```json
"copyrightHolder": {
  "@id": "https://orcid.org/0000-0002-2599-3227"
}
```

rather than repeating a full embedded Stevan `Person` object.

---

Taylor & Francis / Informa / Routledge modelling

For `challenging-modernity`, current Stage 3.3 approach is modest.

It is acceptable for JSON-LD to emit:

```json
"publisher": {
  "@type": "Organization",
  "name": "Taylor & Francis Group",
  "url": "https://www.tandfonline.com/"
}
```

The visible permission line handles the required Informa/T&F acknowledgement.

Do not over-model the full corporate chain:

```text
Routledge → Taylor & Francis Group → Informa UK Limited → Informa PLC
```

unless a later metadata pass explicitly requires it.

The visible permission/reuse wording is not the same thing as exact Schema.org
corporate modelling.

---

Byline and obsolete email decision

The source/published byline for `challenging-modernity` includes the old Oxford
email:

```text
stevan.veljkovic@theology.ox.ac.uk
```

Decision: do not strike it through.

Reasons:

- it would look odd or jokey;
- it may be interpreted as an alteration/correction to the Version of Record;
- it creates accessibility/semantic ambiguity;
- the current contact line already gives the current email.

The review intro contact line remains:

```text
By Stevan Veljkovic · contact@stevanveljkovic.com
```

Legacy/source bylines remain tolerated for Stage 3.3. Future cleanup may replace
raw `bylineHtml` with structured `sourceByline`.

---

Review schema generator changes to preserve

The following generator capabilities/decisions should be preserved:

1. Plural people support via a helper equivalent to `schemaPeople(input)`.

Fields now needing this include:

```text
reviewedWork.author
reviewedWork.editor
reviewedWork.contributor
publishedReview.issue.editor
```

2. Reviewed-work DOI identifiers include DOI URL:

```json
"identifier": {
  "@type": "PropertyValue",
  "propertyID": "DOI",
  "value": "10.7312/bell21488",
  "url": "https://doi.org/10.7312/bell21488"
}
```

3. Copyright holder should emit by `@id` when an ID/ORCID is supplied.

4. Local review node `inLanguage` now uses site language:

```json
"inLanguage": "en-GB"
```

rather than hardcoded `"en"`.

5. ISSNs are deduplicated when combining:

```text
printIssn
electronicIssn
issn[]
```

6. Public local image paths should be absolutised in JSON-LD.

Example frontmatter:

```yaml
image: "/images/publications/reviews/challenging-modernity/issue/cover.jpg"
```

should render as:

```json
"image":
"https://stevanveljkovic.com/images/publications/reviews/challenging-modernity/
issue/cover.jpg"
```

Do not emit filesystem-style paths like:

```text
../../public/images/...
```

---

Adopted image directory convention

A durable convention has been adopted for review-page images.

Use:

```text
public/images/publications/reviews/<slug>/
  reviewed-work/
    cover.jpg
  issue/
    cover.jpg
  article/
    image.jpg
  page/
    social-card.jpg
```

Public URLs become:

```text
https://stevanveljkovic.com/images/publications/reviews/<slug>/reviewed-work/
cover.jpg
https://stevanveljkovic.com/images/publications/reviews/<slug>/issue/cover.jpg
```

Frontmatter should use root-relative URLs:

```yaml
reviewedWork:
  image: "/images/publications/reviews/<slug>/reviewed-work/cover.jpg"

publishedReview:
  issue:
    image: "/images/publications/reviews/<slug>/issue/cover.jpg"
```

Do not include `public` in frontmatter URLs.

Do not use relative filesystem paths.

For `challenging-modernity`, this convention has already been applied:

```text
public/images/publications/reviews/challenging-modernity/issue/cover.jpg
```

Rendered JSON-LD should emit:

```text
https://stevanveljkovic.com/images/publications/reviews/challenging-modernity/
issue/cover.jpg
```

Use this convention for `godless-crusade` and future review pages.

---

PDF URL/location convention

A separate decision was made for PDFs.

Do **not** introduce a top-level `/pdfs/` hierarchy for review PDFs during Stage
3.

Do **not** mirror the image asset hierarchy for PDFs.

Preferred convention:

```text
publications/reviews/<slug>/veljkovic-review-<slug>.pdf
```

Filesystem:

```text
public/publications/reviews/<slug>/veljkovic-review-<slug>.pdf
```

Examples:

```text
publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
publications/reviews/christian-right-europe/veljkovic-review-christian-right-
europe.pdf
```

Reasoning:

- the PDF is a public scholarly document, not just a generic asset;
- it belongs naturally under the review’s public URL namespace;
- the file extension already signals PDF;
- existing PDF URLs should not be moved without real redirect support.

Avoid:

```text
pdfs/publications/reviews/<slug>/...
```

and avoid nested `/pdf/` folders unless a review genuinely needs multiple PDFs
or supplementary files.

Keep `review` in the filename:

```text
veljkovic-review-<slug>.pdf
```

rather than:

```text
veljkovic-<slug>.pdf
```

because the latter could be mistaken for the reviewed book or another work.

In frontmatter/publications-list data, use:

```yaml
publicationList:
  pdfPath: "/publications/reviews/<slug>/veljkovic-review-<slug>.pdf"
```

only where a public local PDF exists and should be exposed.

---

Slug policy and new Evolution of Religions review

A further review page has been identified for later addition:

```text
Review of The Evolution of Religions
```

Potential slug discussed:

```text
evolution-of-religions
```

Alternative compressed slug:

```text
evolution-religions
```

No final slug has been chosen yet.

Important decision: do **not** rename existing review slugs now unless there is
a real error or serious ambiguity.

Existing slugs should remain:

```text
cosmic-connections
christian-right-europe
hell-christian-ecology
challenging-modernity
godless-crusade
```

Do not change:

```text
christian-right-europe → christian-right-in-europe
hell-christian-ecology → hell-in-search-of-a-christian-ecology
```

at this stage.

Reasoning: these slugs are already becoming foundational across:

```text
content files
canonicalPath
dynamic route output
JSON-LD @id values
WebPage IDs
local #review IDs
PDF paths
image paths
publications/ links
sitemap
future legacy redirects
```

Adopted general slug principle:

```text
Use the shortest clear, stable, human-readable title slug.
Drop articles and minor words when the result remains natural.
Keep prepositions when dropping them makes the slug awkward or ambiguous.
```

Prepositions are not forbidden. They should be used when they materially improve
readability or avoid ambiguity.

For `The Evolution of Religions`, either `evolution-religions` or
`evolution-of-religions` is defensible. User has not decided.

---

`/publications/` page generated links

The `/publications/` page now has generated local-resource links for live review
entries.

Current intent:

```text
[ WEBPAGE ] [ PDF ]
```

rendered as small-caps pills.

The user prefers `WEBPAGE` over `Review page`, because “review page” sounds
crude.

Earlier labels like `HTML` were technically accurate but potentially
developer-facing. Current provisional direction is:

```text
WEBPAGE
PDF
```

The links are visually small/quiet, not large call-to-action buttons.

This is a Stage 3.3 usability hardening improvement, not the final Stage 4
publications-page design.

The individual review page remains the place for rights/version detail. Avoid
explanatory lines on `/publications/` such as:

```text
The version of record is reproduced here:
Reproduced version of record:
```

These lines were tried conceptually but did not sit well in the existing design.

The `/publications/` page currently remains fundamentally bibliographic/textual.
The pills are an interim affordance.

Future Stage 4 redesign may consider:

```text
cards
margin-aligned resource pills
a metadata/action rail
a redesigned publication-entry component
```

rather than trying to integrate interface elements into the current text-flow
citation layout.

---

`/publications/` page data model notes

Current publication-page logic derives review entries from the `reviews`
collection:

```ts
const reviews = await getCollection("reviews", ({ data }) => !data.draft);
```

For review entries:

- `canonicalPath` can generate a `WEBPAGE` link;
- `publicationList.pdfPath` can generate a `PDF` link;
- do not show local-resource links for planned/draft review pages.

The visible local links do not require changing the `/publications/` JSON-LD
identity model.

The `/publications/` schema can continue to identify DOI-bearing publication
nodes by DOI, while visible links point to local site resources.

For `/publications/` schema, the existing pattern remains:

```text
CollectionPage
  mainEntity → ItemList
    itemListElement → ListItem[]
```

and publication/article nodes may continue to use DOI IDs where available.

---

Publications list sort-date notes

For `challenging-modernity`, the placeholder-like sort date:

```yaml
sortDate: "2025-01-01"
```

was flagged.

Since issue date is verified as:

```text
2025-08-08
```

preferred metadata is:

```yaml
publicationList:
  year: 2025
  sortDate: "2025-08-08"
  order: 30
```

Alternative, if sorting by first-online date, would be:

```yaml
sortDate: "2024-10-08"
```

Current preference is bibliographic/issue-year sorting using the verified issue
date.

Continue cleaning placeholder sort dates where found.

---

New/current publications-page output state

The `/publications/` page now includes entries grouped by year and currently
displays live/prospective bibliography items such as:

```text
2025:
- Review of Challenging Modernity
- Review of The Christian Right in Europe
- Review of Hell: In Search of a Christian Ecology

2024:
- Review of Cosmic Connections
- Review of The Evolution of Religions

2023:
- Review of The Godless Crusade
- PhD thesis
```

At the time of discussion, only some items have live review pages and/or PDFs.
Ensure the generated pills only appear when actual resources exist.

Important: do not let planned-but-not-live review pages leak into generated
routes, sitemap, or local-resource links.

---

Contact email status

Review intro contact line now uses:

```text
contact@stevanveljkovic.com
```

Older project constants and earlier metadata may still use:

```text
hello@stevanveljkovic.com
```

Outstanding cross-site cleanup remains:

```text
Make contact@stevanveljkovic.com consistent across:
- site constants
- visible links
- JSON-LD
- metadata docs
- footer/contact copy
- generated author/contact components
```

This should be resolved before final launch validation if `contact@` is
confirmed canonical.

---

Immediate next work

Proceed with:

```text
Stage 3.3.2.5 — adding godless-crusade
```

Likely file:

```text
src/content/reviews/godless-crusade.md
```

Use existing conventions:

```text
slug: "godless-crusade"
canonicalPath: "/publications/reviews/godless-crusade/"
```

Apply the new image convention for any local images:

```text
public/images/publications/reviews/godless-crusade/
  reviewed-work/
    cover.jpg
  issue/
    cover.jpg
  article/
    image.jpg
  page/
    social-card.jpg
```

If a public PDF is added, use:

```text
publications/reviews/godless-crusade/veljkovic-review-godless-crusade.pdf
```

and expose it on `/publications/` through:

```yaml
publicationList:
  pdfPath:
"/publications/reviews/godless-crusade/veljkovic-review-godless-crusade.pdf"
```

only if reuse/version rights allow.

Continue to run after significant changes:

```bash
npx astro sync
npx astro check
npm run build
```

Validate rendered page-source JSON-LD, especially for:

```text
publications/
publications/reviews/godless-crusade/
publications/reviews/challenging-modernity/
publications/reviews/hell-christian-ecology/
publications/reviews/christian-right-europe/
publications/reviews/cosmic-connections/
```

Do not expand into a full `/publications/` redesign before launch unless a
minimal change is necessary for clarity.
