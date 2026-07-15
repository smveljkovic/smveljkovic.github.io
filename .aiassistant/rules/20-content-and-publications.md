---
apply: always
---

# Content And Publications

Full local review pages belong in:

```text
src/content/reviews/
```

List-only bibliography records belong in:

```text
src/content/publication-items/
```

`/publications/` derives bibliography entries from review records where
`publicationList.include !== false`, including drafted reviews. It adds local
webpage links only for non-draft reviews with a configured canonical path, and
PDF links only when `publicationList.pdfPath` is configured. It also includes
non-draft `publicationItems` whose IDs are not already represented by reviews.
Do not invent a local page or PDF resource to fill an absent link.

`rights.license.url` is optional when permission rests on private
correspondence rather than a public licence. Record the rights basis without
inventing a URL.

Duplicate/list-only review records are currently drafted except the thesis item
to avoid duplicate publication-list/schema entries.

Current publication-item files:

```text
challenging-modernity.md
evolution-of-religions.md
godless-crusade.md
hell-christian-ecology.md
religious-atavism-climate-crisis.md
```

The thesis page is live at
`/research/doctoral-thesis/religious-atavism-climate-crisis/`.

For thesis page v1, use the Oxford University Research Archive / DOI metadata version of the abstract as the source. Do
not describe the abstract as transcribed from the PDF unless the PDF text is used and checked directly.

Local thesis PDF hosting is permitted under CC BY 4.0; verify the file path and generated/live link before release.

```text
public/research/doctoral-thesis/religious-atavism-climate-crisis/veljkovic-dphil-thesis.pdf
```

Preferred thesis identifier display: DOI visible in main metadata/resources; ARK and ORA IDs in an expandable
“Repository and archival identifiers” section or equivalent.

The publications page should preserve the grouped bibliography style and legacy
classes, including:

```text
BibEntry
BibHeading
counter_bib
countercontrol
control
test#writings
```

Trusted local HTML bridge fields remain acceptable for migration; long-term refactor is deferred.

```yaml
citationHtml
reuseNoteHtml
modificationNote
publicationList.noteHtml
```

Trusted legacy/deprecated blocks are:

```yaml
bylineHtml
```

Use `set:html` only for trusted local migration fields.

Review pages should keep the current content structure:

```astro
<ReviewIntro review={review} />

<div class="review_text">
  <Content />
  <ReviewByLine bylineHtml={review.bylineHtml} />
</div>
```

Review-specific rules:

- `cosmic-connections`: local page is an unabridged Author's Original
  Manuscript, distinct from the DOI article; do not use `sameAs`.
- `christian-right-europe`: reviewed work is an edited volume; use `editor`, not
  an author string with "(ed.)"; `csaf039` is article ID, not pagination.
- `evolution-of-religions`: model the published LSE post as `BlogPosting /
  Review`; use `Published web article` as the publication-version label; do not
  invent journal/volume/issue metadata.
- `godless-crusade`: local version should be an Accepted Manuscript, not Version
  of Record; verify AM wording, Goodhart correction note, assets, and schema.
- `challenging-modernity`: rights issue resolved; local page is live/generated; local version is Accepted Manuscript,
  not Version of Record.
- `progress-and-regression`: keep the formal published title `Progress and
  Regression by Rahel Jaeggi (review)` in metadata and the literary heading
  `“A path back” to the future` in the manuscript/body. The reviewed edition is
  ISBN `9780674298019`, by Rahel Jaeggi and translated by Robert Savage. Do not
  attach e-book/JSTOR DOIs that identify other manifestations. The local page
  remains drafted; any eventual page or PDF may use only the permitted Accepted
  Author Manuscript/final manuscript, not the Version of Record or publisher
  PDF. Use this required credit: “Copyright © 2026 Johns Hopkins University
  Press. This article first appeared in Theory & Event, Volume 29, Number 3,
  July 2026. Published with permission by Johns Hopkins University Press.” Do
  not invent a public licence URL.
