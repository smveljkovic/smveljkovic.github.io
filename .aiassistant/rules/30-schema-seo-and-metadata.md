---
apply: always
---

# Schema, SEO, And Metadata

Preserve scholarly metadata carefully. Validate rendered page-source JSON-LD,
not TypeScript object literals.

Distinguish ordinary SEO metadata from JSON-LD. Search snippets depend mainly on
`<meta name="description">`, page title, and visible page content. Prefer
specific, hand-authored descriptions for canonical pages; avoid generic strings
such as `Research by Stevan Veljkovic.`

The thesis entity should use `https://doi.org/10.5287/ora-4rjoobkvk` as its primary scholarly `@id`; ARK and ORA IDs may
be secondary identifiers.

The working-tree thesis page uses `src/data/thesis.ts` and `createThesisSchema(thesis, meta)`. The page should use
`WebPage` with `mainEntity` pointing to the DOI thesis node. Use date-only values and validate rendered page-source
JSON-LD before release.

Current thesis date handling: `datePublished: "2024-02-11"`; current implementation uses `dateCreated: "2023"`; precise
`dateCreated: "2023-04-21"` remains an open editorial decision.

Canonical `Person.@id`:

```text
https://orcid.org/0000-0002-2599-3227
```

DOI URLs are primary stable identifiers for DOI-bearing scholarly works. Do not
include the rejected/conflated OpenAlex profile.

JSON-LD belongs on canonical pages, not redirect stubs. Visible content and
JSON-LD should agree.

Homepage and CV schemas remain manual:

```text
src/data/schema/home.ts
src/data/schema/cv.ts
```

Do not use `createReviewSchema()` on the homepage or CV. Active review pages use:

```ts
const jsonLd = createReviewSchema(review);
```

from:

```text
src/data/schema/reviews/createReviewSchema.ts
```

`/publications/` uses:

```text
src/data/schema/publications/createPublicationsSchema.ts
```

and should remain:

```text
CollectionPage
  mainEntity -> ItemList
    itemListElement -> ListItem[]
```

For drafted/withheld reviews on `/publications/`, do not emit nonexistent local
page IDs such as `/publications/reviews/<slug>/#review`. Prefer DOI/publisher
IDs where available, otherwise stable `/publications/` fragment IDs.

Review schema should distinguish:

1. Stevan as `Person`
2. the reviewed work
3. the published review/article
4. the local hosted manuscript/page

Current journal review graph:

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

Do not use false `sameAs` between local manuscripts/reproductions and DOI pages
unless they are truly identical.

Pagination rule:

- article/review pagination belongs on the published article/review node:
  `pagination`, `pageStart`, `pageEnd`;
- issue-level pagination only describes the whole issue and only if verified.

Date rule:

- `publishedReview.datePublished` means publisher-recognised first publication
  date, usually first online;
- internal `firstPublishedOnline` may map to Schema.org `datePublished`;
- do not emit a non-standard Schema.org `firstPublishedOnline`;
- `PublicationIssue.datePublished` means issue date/month/year where known.

Do not emit `PublicationIssue.name` merely as the issue number. Use issue number
fields for numbers; use `name` only for real publisher-supplied issue labels.

Use date-only values unless a real meaningful time is known. Do not invent
noon/midnight datetimes.
