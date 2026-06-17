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
webpage/PDF links only for non-draft reviews. It also includes non-draft
`publicationItems` whose IDs are not already represented by reviews.

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

The thesis remains bibliography-only until the local thesis page is implemented.
Settled route: `/research/doctoral-thesis/religious-atavism-climate-crisis/`.
Do not create, link, advertise, sitemap, or schema-link the local route until the page exists.

For thesis page v1, use ORA / DOI metadata as the abstract source. Do not describe the abstract as transcribed from the
PDF unless the PDF text is used and checked directly.

Local thesis PDF may be added only if hosting is verified under CC BY 4.0 and the generated/live link is checked.

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
   - Must be withheld unless rights are clarified (with OUP).
- `evolution-of-religions`: model the published LSE post as `BlogPosting /
  Review`; use `Published web article` as the publication-version label; do not
  invent journal/volume/issue metadata.
- `godless-crusade`: local version should be an Accepted Manuscript, not Version
  of Record; verify AM wording, Goodhart correction note, assets, and schema.
- `challenging-modernity`: T&F Version-of-Record reproduction; must be withheld
  unless rights are clarified.
