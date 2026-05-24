# Schema, SEO, and metadata rules

Preserve scholarly metadata carefully.

The ORCID URL is the canonical JSON-LD `Person.@id`:

```text
https://orcid.org/0000-0002-2599-3227
```

DOI URLs are stable identifiers for scholarly works when available.

Do not include the rejected/conflated OpenAlex profile.

JSON-LD belongs on canonical pages, not redirect stubs.

Visible content and JSON-LD should agree.

Validate rendered page-source JSON-LD, not TypeScript object literals.

Review schema should distinguish:

1. Stevan as `Person`
2. the reviewed work
3. the published review/article
4. the local hosted manuscript/page

Local hosted manuscripts and DOI articles are distinct if materially different.

Do not use false `sameAs`.

Use `itemReviewed` for reviewed works.

Use `editor` for edited volumes.

Current local review type may be:

```ts
["@type": ["ScholarlyArticle", "Review"]]
```

unless explicitly refactored.

Home and CV schemas remain manual:

```text
src/data/schema/home.ts
src/data/schema/cv.ts
```

Do not use `createReviewSchema()` on the homepage or CV.

Review JSON-LD should be generated through:

```text
src/data/schema/reviews/createReviewSchema.ts
```

with:

```ts
const jsonLd = createReviewSchema(review);
```

A future publications schema factory may live at:

```text
src/data/schema/publications/createPublicationsSchema.ts
```

and should probably model `/publications/` as a `CollectionPage` with
`mainEntity` as an `ItemList`.