# Content and publications rules

Full local review pages belong in:

```text
src/content/reviews/
```

Bibliography/list-only publication records belong in:

```text
src/content/publication-items/
```

Do not force every bibliography entry into `reviews`.

The publications page should preserve the existing grouped-by-year bibliography
style and legacy classes, including:

```text
BibEntry
BibHeading
counter_bib
countercontrol
control
test#writings
```

The publications page may continue to use trusted local HTML fields during
migration, especially:

```yaml
citationHtml
noteHtml
publicationList.noteHtml
originalSubmissionNote
bylineHtml
```

`set:html` is acceptable only for trusted local migration fields.

Review pages should preserve the original scholarly/manuscript visual structure:

```astro
<ReviewIntro review={review} />

<div class="review_text">
  <Content />
  <ReviewByLine bylineHtml={review.bylineHtml} />
</div>
```

Do not casually change review byline email behavior. Historical mismatches may
be intentional, for example:

```html
<a
href="mailto:correspondence@stevanveljkovic.com">stevan.veljkovic@theology.ox.ac
.uk</a>
```

Cosmic Connections special rule:

- The local page is an unabridged Original Submission / Author Manuscript.
- It is materially different from the published version.
- Do not use `sameAs` to identify it with the DOI article.
- Use `isBasedOn` and/or `citation` where appropriate.

Christian Right special rule:

- The reviewed book is an edited volume.
- Use `editor: Gionathan Lo Mascolo`.
- Do not model the editor as an author string containing “(ed.)”.