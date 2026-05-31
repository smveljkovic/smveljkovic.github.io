---
apply: always
---

# Schema, SEO, And Metadata

Preserve scholarly metadata carefully. Validate rendered page-source JSON-LD,
not TypeScript object literals.

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
