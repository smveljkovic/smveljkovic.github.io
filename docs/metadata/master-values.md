26 May 2026 at 21:35:56 BST

# Website metadata master values

This file records canonical metadata values and conventions for
`stevanveljkovic.com`.

It is a human-readable registry/checklist, not necessarily the code source of
truth. Stable reusable values should continue to live in site constants and be
imported by layouts/schema generators where possible.

## Global identity values

| Field | Canonical value |
|---|---|
| Site URL | `https://stevanveljkovic.com` |
| Site name | `Stevan Veljkovic` |
| Person name | `Stevan Veljkovic` |
| Author name | `Stevan Veljkovic` |
| Public identity line | `Theory and editing` |
| Location | `Oxford, England` |
| Email | `hello@stevanveljkovic.com` |
| Language | `en-GB` |
| Default image | `/images/headshot-1200x630.png` |
| ORCID | `https://orcid.org/0000-0002-2599-3227` |
| Google Scholar | `https://scholar.google.com/citations?user=e42TN4UAAAAJ` |
| GitHub | `https://github.com/smveljkovic` |
| Analytics ID | `G-7VMGXMNZZ0` |

## Canonical site configuration

Astro config should use:

```js
site: "https://stevanveljkovic.com",
trailingSlash: "always"
```

Canonical URLs should use trailing slashes.

Preferred route examples:

```text
https://stevanveljkovic.com/
https://stevanveljkovic.com/publications/
https://stevanveljkovic.com/cv/
https://stevanveljkovic.com/publications/reviews/cosmic-connections/
```

## URL helper conventions

Use URL helpers instead of manual string concatenation.

Preferred:

```ts
absoluteUrl("/")
absoluteUrl("/publications/")
nodeId("/publications/", "webpage")
```

Avoid:

```ts
`${site.url}/${path}`
```

because this can create double slashes.

## Title rules

### HTML `<title>`

| Page type | Rule |
|---|---|
| Homepage | `Stevan Veljkovic` |
| Ordinary internal page | `{Page name} \| Stevan Veljkovic` |
| Review page | `Review of {Reviewed work short title} \| Stevan Veljkovic` |

### Site and person names

These should remain:

```text
Stevan Veljkovic
```

Use this value for:

```text
WebSite.name
Person.name
og:site_name
```

Do not use expanded forms such as:

```text
Stevan Veljkovic — Theory and editing
Dr Stevan Veljkovic
```

as canonical site/person names.

Descriptive phrases such as `Theory and editing`, `theorist and editor`,
`Oxford`, and subject areas belong in descriptions, visible text, and JSON-LD
`description`/`about`, not in `WebSite.name`.

## Global Open Graph / social metadata

| Field | Canonical/default value |
|---|---|
| `og:site_name` | `Stevan Veljkovic` |
| Default `og:image` |
`https://stevanveljkovic.com/images/headshot-1200x630.png` |
| Default language/locale basis | `en-GB` |
| Homepage `og:type` | `website` |
| Ordinary page `og:type` | `website` or `article` only when appropriate |
| Review page `og:type` | `article` |

## JSON-LD stable node IDs

| Node | Canonical ID |
|---|---|
| Person | `https://orcid.org/0000-0002-2599-3227` |
| WebSite | `https://stevanveljkovic.com/#website` |
| Homepage WebPage | `https://stevanveljkovic.com/#webpage` |
| Publications WebPage | `https://stevanveljkovic.com/publications/#webpage` |
| CV WebPage | `https://stevanveljkovic.com/cv/#webpage` |
| Cosmic Connections review WebPage |
`https://stevanveljkovic.com/publications/reviews/cosmic-connections/#webpage` |
| Cosmic Connections local review |
`https://stevanveljkovic.com/publications/reviews/cosmic-connections/#review` |
| Christian Right review WebPage |
`https://stevanveljkovic.com/publications/reviews/christian-right-europe/#
webpage` |
| Christian Right local review |
`https://stevanveljkovic.com/publications/reviews/christian-right-europe/#review
` |

## Homepage metadata

| Field | Canonical value / rule |
|---|---|
| Route | `/` |
| Canonical URL | `https://stevanveljkovic.com/` |
| `<title>` | `Stevan Veljkovic` |
| Site/person name | `Stevan Veljkovic` |
| Public identity | `Theory and editing` |
| Location | `Oxford, England` |
| Main person `@id` | `https://orcid.org/0000-0002-2599-3227` |
| WebSite `@id` | `https://stevanveljkovic.com/#website` |
| WebPage `@id` | `https://stevanveljkovic.com/#webpage` |
| `og:site_name` | `Stevan Veljkovic` |
| `og:type` | `website` |

Homepage title-like metadata should not expand the site name beyond
`Stevan Veljkovic` unless the field is explicitly a description.

## Publications page metadata

| Field | Canonical value / rule |
|---|---|
| Route | `/publications/` |
| Canonical URL | `https://stevanveljkovic.com/publications/` |
| `<title>` | `Publications \| Stevan Veljkovic` |
| WebPage `@id` | `https://stevanveljkovic.com/publications/#webpage` |
| Page/schema name | `Publications` |
| ItemList name | `Publications of Stevan Veljkovic` |
| Main schema type | `CollectionPage` |
| `CollectionPage.mainEntity` | `ItemList` |
| `ItemList.itemListElement` | `ListItem[]` |

Cleanup note: remove old strings such as:

```text
Publications | Dr Stevan Veljkovic
Publications of Dr Stevan Veljkovic
Publications of Dr Stevan Veljkovic.
```

Use instead:

```text
Publications | Stevan Veljkovic
Publications of Stevan Veljkovic
```

## CV page metadata

| Field | Canonical value / rule |
|---|---|
| Route | `/cv/` |
| Canonical URL | `https://stevanveljkovic.com/cv/` |
| `<title>` | `CV \| Stevan Veljkovic` |
| WebPage `@id` | `https://stevanveljkovic.com/cv/#webpage` |
| Person `@id` | `https://orcid.org/0000-0002-2599-3227` |
| PDF path | `/cv/veljkovic-cv.pdf` |

Do not link CV schema to a non-existent thesis page during Stage 3.

## Review page metadata

Review pages use the dynamic route:

```text
/publications/reviews/<slug>/
```

Generated by:

```text
src/pages/publications/reviews/[slug]/index.astro
```

Review page title rule:

```text
Review of {Reviewed work short title} | Stevan Veljkovic
```

Review page `og:type`:

```text
article
```

Review page JSON-LD should distinguish:

1. Stevan as `Person`;
2. the reviewed work;
3. the DOI-published review/article, where applicable;
4. the local hosted review/manuscript representation;
5. periodical/volume/issue containers, where applicable.

### Cosmic Connections review

| Field | Canonical value |
|---|---|
| Route | `/publications/reviews/cosmic-connections/` |
| Canonical URL |
`https://stevanveljkovic.com/publications/reviews/cosmic-connections/` |
| `<title>` | `Review of Cosmic Connections \| Stevan Veljkovic` |
| WebPage `@id` |
`https://stevanveljkovic.com/publications/reviews/cosmic-connections/#webpage` |
| Local review `@id` |
`https://stevanveljkovic.com/publications/reviews/cosmic-connections/#review` |
| DOI article `@id` | `https://doi.org/10.1177/13684310241249684` |
| Local version | `Author’s Original Manuscript` |
| DOI article `datePublished` | `2024-05-24` |
| Issue date | `2025-05` |
| Periodical | `European Journal of Social Theory` |
| Volume | `28` |
| Issue | `2` |

Do not use `sameAs` between the local review/manuscript and the DOI article.
Use `isBasedOn` and/or `citation`.

### Christian Right review

| Field | Canonical value |
|---|---|
| Route | `/publications/reviews/christian-right-europe/` |
| Canonical URL |
`https://stevanveljkovic.com/publications/reviews/christian-right-europe/` |
| `<title>` | `Review of The Christian Right in Europe \| Stevan Veljkovic` |
| WebPage `@id` |
`https://stevanveljkovic.com/publications/reviews/christian-right-europe/#
webpage` |
| Local review `@id` |
`https://stevanveljkovic.com/publications/reviews/christian-right-europe/#review
` |
| DOI review `@id` | `https://doi.org/10.1093/jcs/csaf039` |
| Reviewed book DOI | `https://doi.org/10.1515/9783839460382` |
| Periodical | `Journal of Church and State` |
| Volume | `67` |
| Issue | `3` |
| Article ID | `csaf039` |

The reviewed edited volume should use `editor`, not an author value containing
`(ed.)`.

Cleanup note: verify whether the issue date is exactly:

```text
2025-07-01
```

If only month-level certainty is available, use:

```text
2025-07
```

or omit.

## Thesis metadata during Stage 3

Decision: the thesis remains **bibliography-only until Stage 4**.

No substantive thesis page should be created during Stage 3 unless intentionally
creating a minimal bibliographic route. Do not add a thesis page to sitemap or
schema until it exists.

Current thesis DOI:

```text
10.5287/ora-4rjoobkvk
https://doi.org/10.5287/ora-4rjoobkvk
```

Current thesis title:

```text
Religious atavism and the climate crisis, with reference to Taylor and Rorty on
liberalism
```

Preferred thesis JSON-LD work identifier:

```text
https://doi.org/10.5287/ora-4rjoobkvk
```

Current thesis type:

```json
"@type": "Thesis"
```

Identifier values:

| Identifier | Value |
|---|---|
| DOI | `10.5287/ora-4rjoobkvk` |
| ARK | `ark:/29072/ora_7aff13dc075e4c17bee95adfc1b2fcf4` |
| Oxford Research Archive pubs id | `1624720` |
| Oxford Research Archive local pid | `pubs:1624720` |

ARK decision:

- include the ARK as a secondary `PropertyValue` identifier;
- do not use the ARK as the primary `@id`;
- do not use the ARK as `sameAs` while the DOI exists.

Title decision:

The thesis `name` and `headline` may remain the full thesis title for now,
because this matches the visible citation and DOI/ORA record more closely. If a
shorter schema/display label is desired later, add a separate field such as
`schemaName` or `shortTitle`.

Date cleanup note:

The thesis currently has:

```json
"datePublished": "2023-01-01"
```

Treat this as a cleanup item unless verified as exact. Known ORA deposit date:

```text
2024-02-11
```

Do not automatically replace `datePublished` with the deposit date without first
deciding whether `datePublished` means award date, completion/submission date,
repository deposit date, DOI publication date, or repository availability date.

## Date precision rules

Use date-only values unless an actual meaningful time is known.

Preferred:

```json
"datePublished": "2025-07-25"
```

Avoid invented datetimes:

```json
"datePublished": "2025-07-25T12:00:00+01:00"
```

If only month or year is known, avoid invented day precision where possible.

Known cleanup examples:

```text
2025-01-01
2023-01-01
```

These may be placeholders and should be verified.

## Sitemap rules

The sitemap should include only actual generated, non-draft canonical pages.

Do not include planned pages such as:

```text
/publications/reviews/godless-crusade/
/publications/reviews/hell-christian-ecology/
/publications/reviews/challenging-modernity/
/thesis/religious-atavism-climate-crisis/
```

until they are intentionally generated and non-draft.

## Planned review pages

Planned full review pages remain draft until text, metadata, rights status,
version wording, and schema have been checked:

```text
/publications/reviews/godless-crusade/
/publications/reviews/hell-christian-ecology/
/publications/reviews/challenging-modernity/
```

Expected content files:

```text
src/content/reviews/godless-crusade.md
src/content/reviews/hell-christian-ecology.md
src/content/reviews/challenging-modernity.md
```

Initial frontmatter rule:

```yaml
draft: true
```