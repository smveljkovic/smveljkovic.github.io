# 2026-05-28 — Stage 3.3 review intro, contact-line, and Christian Right
metadata delta

## Context

This delta records developments after the Stage 3.2/3.3 metadata-hardening and
Hell review delta. It covers:

- refinement of review-page intro display;
- public contact-email decision in review intros;
- status of old/reproduced bylines;
- further standardisation of review version/reuse/modification wording;
- substantial revision of `christian-right-europe` frontmatter;
- schema-generator fixes for reviewed-work DOI identifiers and local-page
  publisher modelling;
- remaining cleanup items before final launch validation.

This remains Stage 3.3 work: hardening and review-page expansion, not a
redesign.

## Review intro display decisions

The review intro block has been simplified. The earlier “review dek” pattern:

```text
Stevan Veljkovic reviews [work] by/edited by [creator].
```

was judged too repetitive, because the reviewed work title was appearing in the
`h1`, dek, and citation block in close succession.

Current adopted pattern:

```text
Review of [Reviewed Work]
By Stevan Veljkovic · contact@stevanveljkovic.com

The following text [reproduces/is/etc.] [version/source] for
[citation]
[rights/reuse/modification/copyright note]
```

Specific display decisions:

1. The intro block remains left-aligned.
2. The horizontal rule under the h1/contact line has been removed.
3. The h1 is kept slightly stronger/heavier; current implementation uses
   `font-weight: 700`.
4. The contact/dek line remains subordinate and has bottom padding around
   `1.7rem`.
5. Keep “By” in the contact line for clarity.
6. Do not display the full ORCID URL in the review intro contact line.
7. ORCID remains structurally important in JSON-LD and may remain visible
   elsewhere, but not in the top review intro line.
8. Do not add visible local page publication/modification dates for now.

Current contact line:

```text
By Stevan Veljkovic · contact@stevanveljkovic.com
```

The public canonical email is moving from the previous project constant:

```text
hello@stevanveljkovic.com
```

towards:

```text
contact@stevanveljkovic.com
```

This must be made consistent later across site constants, visible links,
JSON-LD,
metadata registry, footer/contact copy, and any generated author/contact
components.

## Review title and version-display decisions

Review h1 values remain editorial rather than mechanically generated from full
book titles.

Current examples:

```text
Review of Cosmic Connections
Review of Hell: In Search of a Christian Ecology
Review of The Christian Right in Europe
```

For Hell, the full title remains necessary because “Review of Hell” is too short
and misleading. For Christian Right, the shorter page heading is preferred:

```yaml
title: "Review of The Christian Right in Europe"
pageHeading: "Review of The Christian Right in Europe"
seoTitle: "Review of The Christian Right in Europe"
```

while the full book title remains under:

```yaml
reviewedWork.title
```

A key semantic refinement has been adopted for locally hosted Version of Record
texts. The local review page should not simply claim:

```yaml
version: "Version of Record"
```

because the local page is a reproduction or hosted representation, not the
publisher’s canonical Version of Record. Preferred local value:

```yaml
version: "Reproduction of the Version of Record"
openingVersionNote: "the Version of Record"
```

Visible wording can then say:

```text
The following text reproduces the Version of Record for …
```

The DOI/publisher-hosted node may still represent the true Version of Record.

## Rights/reuse/modification note decisions

For Hell, the modification/reuse note was revised into a denser but acceptable
site-style form:

```text
Published by Equinox Publishing Ltd and reproduced here under CC BY-NC-ND 4.0,
unmodified except for HTML formatting.
```

This is intentionally a little compressed/urbanely formal and is acceptable as a
stylistic choice, provided it remains truthful.

For Christian Right, the current reuse note is:

```yaml
reuseNoteHtml: "By permission of Oxford University Press on behalf of the J. M.
Dawson Institute of Church-State Studies."
```

If no modification note is needed, prefer omitting `modificationNote` rather
than
setting it to an empty string.

Root-level `rights` still describes the local page/text representation unless
and until a nested `publishedReview.rights` object is introduced.

## Legacy bylines

The old `bylineHtml` frontmatter remains a legacy kludge but is tolerated for
Stage 3.3. It may reproduce historical/source bylines, including obsolete
institutional affiliation details, but it should not be treated as the current
contact mechanism.

Current public contact is supplied by the review intro line instead.

Future cleanup target:

```yaml
sourceByline:
  name: "Stevan Veljkovic"
  affiliation: "University of Oxford"
  location: "Oxford, United Kingdom"
```

or similar, rendered by a component rather than raw HTML.

Do not add new `bylineHtml` unless needed for trusted legacy migration.

## Christian Right frontmatter status

The `christian-right-europe` frontmatter has been revised toward the refined
Stage 3.3 model.

Important current decisions:

- Reviewed work remains an edited volume and uses `editor`, not author plus
  “(ed.)”.
- Reviewed work DOI:

```text
https://doi.org/10.1515/9783839460382
```

- Published review DOI:

```text
https://doi.org/10.1093/jcs/csaf039
```

- Article ID:

```text
csaf039
```

must remain an article identifier, not pagination.

Reviewed work authoritative pages are kept under `reviewedWork.sameAs`, e.g.:

```yaml
sameAs:
  - "https://www.transcript-open.de/isbn/6038/"
  - "https://www.degruyterbrill.com/document/doi/10.1515/9783839460382/html/"
  -
"https://www.transcript-publishing.com/978-3-8376-6038-8/the-christian-right-in-
europe/"
```

Publisher organisation for the reviewed book:

```yaml
publisher:
  name: "transcript Verlag"
  url: "https://www.transcript-publishing.com/"
```

Do not use an array for `publisher.url`. The open-access platform belongs as a
book-specific `sameAs` when referring to the book page, not necessarily as
publisher `sameAs`.

Christian Right citation typo fixed/flagged: the full title must include the
comma:

```text
Movements, Networks, and Denominations
```

## Journal of Church and State publisher modelling

For the Christian Right published review, the formal wording is:

```text
Published by Oxford University Press on behalf of the J. M. Dawson Institute of
Church-State Studies
```

Adopted modelling:

```yaml
publishedReview:
  publisher:
    name: "Oxford University Press"
    url: "https://academic.oup.com/"
  publishedOnBehalfOf:
    name: "J.M. Dawson Institute of Church-State Studies"
    url: "https://churchstate.artsandsciences.baylor.edu/"
    parentOrganization:
      name: "Baylor University"
      url: "https://www.baylor.edu/"
```

For the periodical, prefer OUP as the `publisher`, with the Dawson Institute
kept as internal/descriptive `publishedOnBehalfOf` metadata if useful. Do not
emit `publishedOnBehalfOf` raw into Schema.org JSON-LD, since it is not a
standard Schema.org property.

Important correction: `periodical.publisher.url` should be OUP/platform-level:

```yaml
url: "https://academic.oup.com/"
```

not the journal URL. The journal URL belongs at:

```yaml
periodical.url: "https://academic.oup.com/jcs/"
```

## Schema generator fixes and current JSON-LD status

`createReviewSchema.ts` was inspected directly.

The reviewed-work DOI identifier was previously emitted without a DOI URL. The
relevant code used:

```ts
identifier: doiIdentifier(review.reviewedWork.doi)
```

A new reviewed-work identifier helper was recommended/implemented in principle:

```ts
function reviewedWorkIdentifier(review: ReviewData) {
  const normalizedDoi = normalizeDoi(review.reviewedWork.doi);
  if (!normalizedDoi) return undefined;

  return {
    "@type": "PropertyValue",
    propertyID: "DOI",
    value: normalizedDoi,
    url: doiUrl(review.reviewedWork.doi),
  };
}
```

and the reviewed-work node should use:

```ts
identifier: reviewedWorkIdentifier(review)
```

The rendered Christian Right JSON-LD now includes the DOI URL in the reviewed
book identifier.

A `publisher` was added to the review `WebPage` node:

```json
"publisher": {
  "@id": "https://orcid.org/0000-0002-2599-3227"
}
```

This identifies Stevan as publisher of the local web page.

Preferred distinction:

- DOI review node publisher: Oxford University Press.
- WebPage publisher: Stevan Veljkovic via ORCID.
- Local `#review` node: preferably no publisher, since it is a local
  reproduction of the Version of Record.

The local `#review` node was still observed emitting OUP as publisher in the
latest JSON-LD. If not intentional, remove this line from the local-review node
in `createReviewSchema.ts`:

```ts
publisher: schemaOrganization(review.publishedReview?.publisher),
```

The Christian Right periodical/volume/issue chain was briefly lost because
`volume` and `issue` were indented under `periodical`. They must be siblings of
`periodical` under `publishedReview`:

```yaml
publishedReview:
  periodical: …
  volume:
    number: "67"
  issue:
    number: "3"
```

The JSON-LD should show:

```text
DOI Review isPartOf → #issue → #volume → #periodical
```

This has now been restored in rendered output.

## Remaining cleanup items

1. Make `contact@stevanveljkovic.com` consistent across constants, JSON-LD,
   metadata docs, visible links, and review intro components if it is confirmed
   as canonical.

2. Remove OUP as `publisher` from the local `#review` node unless deliberately
   retained.

3. Correct `periodical.publisher.url` for Christian Right to
   `https://academic.oup.com/`.

4. Consider changing repeated embedded Stevan copyright-holder objects to:

```json
{ "@id": "https://orcid.org/0000-0002-2599-3227" }
```

where appropriate.

5. Verify Christian Right copyright holder from the Version of Record PDF before
   finalising `rights.copyrightHolder`.

6. Continue keeping `publishedOnBehalfOf` internal unless deliberately mapped to
   valid Schema.org.

7. Run after changes:

```bash
npx astro sync
npx astro check
npm run build
```

8. Validate rendered page-source JSON-LD for:
  - `/publications/reviews/christian-right-europe/`
  - `/publications/reviews/hell-christian-ecology/`
  - `/publications/reviews/cosmic-connections/`
  - `/publications/`
