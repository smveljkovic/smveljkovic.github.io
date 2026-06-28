# Website Metadata Master Values

Last reviewed against `docs/project-memory/current.md`,
`docs/project-memory/DECISIONS.md`, and `docs/project-memory/NEXT-STEPS.md` on
2026-06-27.

This file is a human-readable metadata registry/checklist for
`stevanveljkovic.com`. It is not automatically the code source of truth. When
values conflict, prefer current source code/rendered output, then
`docs/project-memory/current.md`.

## 1. Global Identity Values

| Field                                         | Current value / rule                                     |
|-----------------------------------------------|----------------------------------------------------------|
| Site URL                                      | `https://stevanveljkovic.com`                            |
| Canonical domain                              | `https://stevanveljkovic.com/`                           |
| Site name                                     | `Stevan Veljkovic`                                       |
| Person name                                   | `Stevan Veljkovic`                                       |
| Author name                                   | `Stevan Veljkovic`                                       |
| Display name in `site.ts`                     | `Dr Stevan M. Veljkovic`                                 |
| Public identity line in current homepage code | `Theory and design`                                      |
| Location                                      | `Oxford, England`                                        |
| Language                                      | `en-GB`                                                  |
| Canonical `Person.@id`                        | `https://orcid.org/0000-0002-2599-3227`                  |
| ORCID                                         | `https://orcid.org/0000-0002-2599-3227`                  |
| Google Scholar                                | `https://scholar.google.com/citations?user=e42TN4UAAAAJ` |
| GitHub                                        | `https://github.com/smveljkovic`                         |
| OpenAlex                                      | `https://openalex.org/authors/A5115945824`               |
| Analytics ID                                  | `G-7VMGXMNZZ0`                                           |
| Separate seminars site                        | `https://seminars.stevanveljkovic.com/`                  |

Beware of using rejected / conflated OpenAlex profile or profiles in `sameAs`.

Do not expand canonical site / person names into descriptive phrases such as:

```text
Stevan Veljkovic - Theory and design
Dr Stevan Veljkovic
S. Veljkovic - theorist and editor
```

Descriptive phrases belong in visible copy, descriptions, and JSON-LD
`description` / `about`, not in `WebSite.name`, `Person.name`, or `og:site_name`.

## 2. Staging Area For Uncertain Or Contradictory Values

These values are intentionally retained here because project memory or code
currently conflicts. Do not treat them as settled canonical values until fixed.

| Topic                  | Current conflict / uncertainty                                                                                                                                                                              | Action                                                                                                                                                        |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Contact email          | There was previously inconsistency amongst different instances, but the canonical version is now `stevan@stevanveljkovic.com`; all instances should populate from site.ts and nothing should be hard-coded. | Verify that there’s now alignment of `site.ts`, homepage, review intro, JSON-LD, page metadata, and any footer/contact copy, and that no hard-coding remains. |
| Public identity phrase | Older notes used `Theory and editing`; current homepage code and `site.ts` use `Theory and design`.                                                                                                         | Confirm desired wording before launch; current operational value is `Theory and design`.                                                                      |
| Sort/date metadata     | `godless-crusade` uses `publicationList.sortDate: "2023-01-01"`; other review sort/year choices may be placeholder-like.                                                                                    | Verify and clean sort/date metadata.                                                                                                                          |
| Hell issue date/PDF    | `hell-christian-ecology` has issue date `2024-10-03` and a PDF path, but memory says both need verification.                                                                                                | Verify sometime before Stage 4.4.                                                                                                                             |

## 3. Site Configuration And URL Rules

Astro config should preserve:
<!--@formatter:off-->
```js
site: "https://stevanveljkovic.com",
trailingSlash: "always",
integrations: [sitemap(), mdx()],
```
<!--@formatter:on-->

Canonical URLs should use trailing slashes.

Main route examples:

```text
https://stevanveljkovic.com/
https://stevanveljkovic.com/cv/
https://stevanveljkovic.com/publications/
https://stevanveljkovic.com/publications/reviews/cosmic-connections/
https://stevanveljkovic.com/pronunciation/
https://stevanveljkovic.com/research/
https://stevanveljkovic.com/research/doctoral-thesis/religious-atavism-climate-crisis/
```

Use URL helpers instead of manual concatenation:

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

## 4. Titles, Descriptions, And Open Graph Rules

### HTML `<title>`

| Page type              | Rule                                                        |
|------------------------|-------------------------------------------------------------|
| Homepage               | `Stevan Veljkovic`                                          |
| Ordinary internal page | `{Page name} \| Stevan Veljkovic`                           |
| Review page            | `Review of {Reviewed work short title} \| Stevan Veljkovic` |

### Meta Descriptions

Canonical pages should use specific, hand-authored meta descriptions where practical, roughly 130-170 characters.

Search snippets are primarily influenced by `<meta name="description">`, page title, and visible page content. JSON-LD
should not be treated as a substitute for page descriptions.

Avoid generic strings such as:

```text
Research by Stevan Veljkovic.
Pronunciation of Stevan Veljkovic.
Curriculum vitae of Stevan Veljkovic.
```

### Site And Person Names

Use exactly:

```text
Stevan Veljkovic
```

for:

```text
WebSite.name
Person.name
og:site_name
```

### Open Graph Defaults

| Field                         | Current value / rule                      |
|-------------------------------|-------------------------------------------|
| `og:site_name`                | `Stevan Veljkovic`                        |
| Default language/locale basis | `en-GB`                                   |
| Homepage `og:type`            | `website`                                 |
| Ordinary page `og:type`       | `website` unless `article` is appropriate |
| Review page `og:type`         | `article`                                 |
| Default `og:image`            | `/images/headshot-1200x630.jpg`           |

## 5. Stable JSON-LD Node IDs

| Node                 | Canonical ID                                                                                     |
|----------------------|--------------------------------------------------------------------------------------------------|
| Person               | `https://orcid.org/0000-0002-2599-3227`                                                          |
| WebSite              | `https://stevanveljkovic.com/#website`                                                           |
| Homepage WebPage     | `https://stevanveljkovic.com/#webpage`                                                           |
| Publications WebPage | `https://stevanveljkovic.com/publications/#webpage`                                              |
| CV WebPage           | `https://stevanveljkovic.com/cv/#webpage`                                                        |
| Review WebPage       | `https://stevanveljkovic.com/publications/reviews/<slug>/#webpage`                               |
| Local review node    | `https://stevanveljkovic.com/publications/reviews/<slug>/#review`                                |
| Research WebPage     | `https://stevanveljkovic.com/research/#webpage`                                                  |
| Thesis entity        | `https://doi.org/10.5287/ora-4rjoobkvk`                                                          |
| Thesis WebPage       | `https://stevanveljkovic.com/research/doctoral-thesis/religious-atavism-climate-crisis/#webpage` |

DOI URLs should be primary IDs for DOI-bearing works and published
articles/reviews.

## 6. Page Metadata

### Homepage

| Field                           | Current value / rule                    |
|---------------------------------|-----------------------------------------|
| Route                           | `/`                                     |
| Canonical URL                   | `https://stevanveljkovic.com/`          |
| `<title>`                       | `Stevan Veljkovic`                      |
| Site/person name                | `Stevan Veljkovic`                      |
| Public identity in current code | `Theory and design`                     |
| Location                        | `Oxford, England`                       |
| Person `@id`                    | `https://orcid.org/0000-0002-2599-3227` |
| WebSite `@id`                   | `https://stevanveljkovic.com/#website`  |
| WebPage `@id`                   | `https://stevanveljkovic.com/#webpage`  |
| `og:type`                       | `website`                               |

Homepage title-like metadata should not expand the site name beyond
`Stevan Veljkovic` unless the field is explicitly a description.

### Publications

| Field                       | Current value / rule                                |
|-----------------------------|-----------------------------------------------------|
| Route                       | `/publications/`                                    |
| Canonical URL               | `https://stevanveljkovic.com/publications/`         |
| `<title>`                   | `Publications \| Stevan Veljkovic`                  |
| Visible H1 in current code  | `Publications and PhD thesis`                       |
| WebPage `@id`               | `https://stevanveljkovic.com/publications/#webpage` |
| Page/schema name            | `Publications`                                      |
| ItemList name               | `Publications of Stevan Veljkovic`                  |
| Main schema type            | `CollectionPage`                                    |
| `CollectionPage.mainEntity` | `ItemList`                                          |
| `ItemList.itemListElement`  | `ListItem[]`                                        |
| Expected count              | Current live reviews plus thesis: `7`               |

- Note: Bibliography entries can include drafted reviews where publicationList.include !== false; local webpage/PDF
  links are only for non-draft reviews.

### CV

| Field         | Current value / rule                      |
|---------------|-------------------------------------------|
| Route         | `/cv/`                                    |
| Canonical URL | `https://stevanveljkovic.com/cv/`         |
| `<title>`     | `CV \| Stevan Veljkovic`                  |
| WebPage `@id` | `https://stevanveljkovic.com/cv/#webpage` |
| Person `@id`  | `https://orcid.org/0000-0002-2599-3227`   |
| PDF path      | `/cv/veljkovic-cv.pdf`                    |

The local thesis page exists in the working tree; do not link CV schema to it unless the generated route and release
intent are confirmed.

### Research

| Field         | Current value / rule                            |
|---------------|-------------------------------------------------|
| Route         | `/research/`                                    |
| Canonical URL | `https://stevanveljkovic.com/research/`         |
| `<title>`     | `Research \| Stevan Veljkovic`                  |
| WebPage `@id` | `https://stevanveljkovic.com/research/#webpage` |
| `og:type`     | `website`                                       |

Current description in `pageMeta.ts` is generic and tracked for cleanup.

## 7. Review Page Metadata

Review pages use:

```text
/publications/reviews/<slug>/
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

Current live/generated review routes:

```text
/publications/reviews/cosmic-connections/
/publications/reviews/evolution-of-religions/
/publications/reviews/godless-crusade/
/publications/reviews/hell-christian-ecology/
/publications/reviews/challenging-modernity/
/publications/reviews/christian-right-europe/
```

`challenging-modernity` exists but is rights-blocked; it is withheld until T&F / CCC permission is clarified.

`christian-right-europe` exists but is rights-blocked; it is withheld until OUP / CCC permission is clarified.

Review JSON-LD should distinguish:

1. Stevan as `Person`;
2. the reviewed work;
3. the DOI-published review / article or external published post;
4. the local hosted review / manuscript / page representation;
5. periodical / volume / issue or blog containers where applicable.

### Cosmic Connections

| Field                       | Current value                                                                  |
|-----------------------------|--------------------------------------------------------------------------------|
| Route                       | `/publications/reviews/cosmic-connections/`                                    |
| WebPage `@id`               | `https://stevanveljkovic.com/publications/reviews/cosmic-connections/#webpage` |
| Local review `@id`          | `https://stevanveljkovic.com/publications/reviews/cosmic-connections/#review`  |
| DOI article `@id`           | `https://doi.org/10.1177/13684310241249684`                                    |
| Local version               | Author’s Original Manuscript / Author Manuscript                               |
| DOI article `datePublished` | `2024-05-24`                                                                   |
| Issue date                  | `2025-05`                                                                      |
| Periodical                  | `European Journal of Social Theory`                                            |
| Volume                      | `28`                                                                           |
| Issue                       | `2`                                                                            |

Do not use `sameAs` between the local review/manuscript and the DOI article.
Use `isBasedOn` and/or `citation`.

### Christian Right

| Field                | Current value                                                                              |
|----------------------|--------------------------------------------------------------------------------------------|
| Route                | `/publications/reviews/christian-right-europe/`                                            |
| WebPage `@id`        | `https://stevanveljkovic.com/publications/reviews/christian-right-europe/#webpage`         |
| Local review `@id`   | `https://stevanveljkovic.com/publications/reviews/christian-right-europe/#review`          |
| DOI review `@id`     | `https://doi.org/10.1093/jcs/csaf039`                                                      |
| Reviewed book DOI    | `https://doi.org/10.1515/9783839460382`                                                    |
| Periodical           | `Journal of Church and State`                                                              |
| Volume               | `67`                                                                                       |
| Issue                | `3`                                                                                        |
| Article ID           | `csaf039`                                                                                  |
| Issue date precision | Month precision: `2025-07`                                                                 |
| Local PDF            | None currently confirmed in `public/`; source frontmatter has a commented provisional path |

The reviewed edited volume should use `editor`, not an author value containing
`(ed.)`. `csaf039` is article ID, not pagination.

### Evolution Of Religions

| Field                   | Current value                                    |
|-------------------------|--------------------------------------------------|
| Route                   | `/publications/reviews/evolution-of-religions/`  |
| Published post type     | `BlogPosting` / `Review`                         |
| Local reproduction type | `Article` / `Review`                             |
| Container               | LSE Review of Books blog under LSE Blogs website |
| First published         | `2024-07-18`                                     |

Do not invent journal, volume, issue, pagination, ISSN, or fake issue images.

### Godless Crusade

| Field                              | Current value / rule                               |
|------------------------------------|----------------------------------------------------|
| Route                              | `/publications/reviews/godless-crusade/`           |
| Local version                      | `Accepted Manuscript`                              |
| Opening note                       | `Accepted Manuscript (AM)`                         |
| Published review DOI               | `https://doi.org/10.1080/09637494.2023.2260684`    |
| Reviewed book DOI                  | `https://doi.org/10.1017/9781009262125`            |
| Periodical                         | `Religion, State and Society`                      |
| Volume                             | `51`                                               |
| Issue                              | `4–5`                                              |
| Issue URL                          | `https://www.tandfonline.com/toc/crss20/51/4-5`    |
| Published review first-online date | `2023-12-14`                                       |
| Article/review pagination          | `491–492`, `491`, `492`                            |
| Issue date                         | `2023` or omit unless exact issue date is verified |

Do not expose T&F Version-of-Record PDF / text unless permission is granted. Keep
the Goodhart correction note visible if the local AM text corrects the AM error.

### Hell: In Search Of A Christian Ecology

| Field                              | Current value / rule                                                                                                |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| Route                              | `/publications/reviews/hell-christian-ecology/`                                                                     |
| DOI review                         | `https://doi.org/10.1558/jsrnc.30282`                                                                               |
| Reviewed book DOI                  | `https://doi.org/10.7312/mort21470`                                                                                 |
| License                            | `CC BY-NC-ND 4.0`                                                                                                   |
| Published review first-online date | `2025-01-20`                                                                                                        |
| Periodical                         | `Journal for the Study of Religion, Nature and Culture`                                                             |
| Volume                             | `19`                                                                                                                |
| Issue date                         | Staged for verification: `2024-10-03`                                                                               |
| PDF path                           | Staged for verification: `/publications/reviews/hell-christian-ecology/veljkovic-review-hell-christian-ecology.pdf` |

If using generic JSRNC visual assets, attach them to `Periodical`, not `PublicationIssue`.

### Challenging Modernity

| Field                | Current value / rule                            |
|----------------------|-------------------------------------------------|
| Route                | `/publications/reviews/challenging-modernity/`  |
| Rights status        | Resolved; local page generated                  |
| Local version        | Taylor & Francis Version-of-Record reproduction |
| Published review DOI | `https://doi.org/10.1080/09637494.2024.2408091` |
| Reviewed book DOI    | `https://doi.org/10.7312/bell21488`             |

Do not describe the local version as a Taylor & Francis Version-of-Record reproduction.

## 8. Thesis Metadata for Stage 4.2

The thesis page exists in the working tree at
`/research/doctoral-thesis/religious-atavism-climate-crisis/`. Existing `dist/`
output contains the thesis page and 12 generated HTML pages. Fresh build output
and live production deployment still need verification before release.

| Field                                        | Current value / rule                                                                              |
|----------------------------------------------|---------------------------------------------------------------------------------------------------|
| Working-tree route                           | `/research/doctoral-thesis/religious-atavism-climate-crisis/`                                     |
| Local page source                            | `src/pages/research/doctoral-thesis/religious-atavism-climate-crisis/index.astro`                 |
| Thesis data                                  | `src/data/thesis.ts`                                                                              |
| Thesis schema factory                        | `createThesisSchema(thesis, meta)`                                                                |
| Rendered JSON-LD                             | Existing implementation generated and was validated; revalidate rendered output after fresh build |
| Primary thesis ID / schema `@id`             | `https://doi.org/10.5287/ora-4rjoobkvk`                                                           |
| DOI                                          | `10.5287/ora-4rjoobkvk`                                                                           |
| ARK                                          | `ark:/29072/ora_7aff13dc075e4c17bee95adfc1b2fcf4`                                                 |
| Oxford University Research Archive pubs id   | `1624720`                                                                                         |
| Oxford University Research Archive local pid | `pubs:1624720`                                                                                    |
| Title                                        | `Religious atavism and the climate crisis, with reference to Taylor and Rorty on liberalism`      |
| Short title                                  | `Religious atavism and the climate crisis`                                                        |
| Type                                         | `Thesis`                                                                                          |
| Author                                       | `Stevan Veljkovic`                                                                                |
| Institution                                  | `University of Oxford`                                                                            |
| Degree                                       | `DPhil / PhD`                                                                                     |
| Year / citation year                         | `2023`                                                                                            |
| `datePublished`                              | `2024-02-11` using ORA deposit/public availability date                                           |
| `dateCreated`                                | Current implementation uses `2023`; precise `2023-04-21` remains an open editorial decision       |
| Copyright year                               | `2023`                                                                                            |
| Licence                                      | `CC BY 4.0`                                                                                       |
| Local PDF path                               | `public/research/doctoral-thesis/religious-atavism-climate-crisis/veljkovic-dphil-thesis.pdf`     |
| Supervisors                                  | `Friederike Otto`; `Johannes Zachhuber`                                                           |
| Examiners                                    | `Douglas Hedley`; `Gavin Flood`                                                                   |

Identifier display rule:

- DOI visible in main thesis metadata/resources;
- ARK and ORA IDs in expandable “Repository and archival identifiers” section or equivalent.

Repository naming rule:

- full name: `Oxford University Research Archive`;
- first mention may be “the Oxford University Research Archive (ORA)”;
- later references should use `ORA`;
- avoid “the ORA” when ORA stands alone, though “the ORA record” is fine.

Abstract source rule:

- use the Oxford University Research Archive / DOI metadata version of the abstract as the source for v1;
- do not describe the abstract as transcribed from the PDF unless the PDF text is used and checked directly.

Local PDF rule:

- local thesis PDF hosting is permitted under CC BY 4.0;
- use the stable path above;
- verify generated/live link before release.

## 9. Date, Pagination, And Issue Rules

Use date-only values unless an actual meaningful time is known.

Preferred:

```json
"datePublished": "2025-07-25"
```

Avoid invented datetimes:

```json
"datePublished": "2025-07-25T12:00:00+01:00"
```

Article/review date rule:

```text
publishedReview.datePublished = publisher-recognised first publication date,
usually first online.
```

Internal `firstPublishedOnline` may make the article-level date explicit, but it should map to Schema.org
`datePublished`; do not emit a non-standard `firstPublishedOnline`.

Issue date rule:

```text
PublicationIssue.datePublished = issue date/month/year, where known.
```

Do not let article first-online dates leak onto issue nodes.

Pagination rule:

- article / review pagination belongs on the published article / review node:
   - `pagination`, `pageStart`, `pageEnd`;
- issue-level pagination should only describe whole-issue pagination and only if verified.

Known cleanup examples:

```text
2025-01-01
2023-01-01
```

These may be placeholders and should be verified before being treated as exact
publication dates.

## 10. Asset Path Rules

Use root-relative URLs in frontmatter and metadata. Do not include `public` in frontmatter URLs.

Preferred review image convention:

```text
public/images/publications/reviews/<slug>/
  reviewed-work/cover.jpg
  issue/cover.jpg
  periodical/poster.jpg
  periodical/banner.jpg
  article/image.jpg
  page/social-card.jpg
```

Attachment rule:

- `reviewed-work/cover.jpg` -> reviewed `Book` / work;
- `issue/cover.jpg` -> `PublicationIssue`;
- `periodical/poster.jpg` or `periodical/banner.jpg` -> `Periodical`;
- `article/image.jpg` -> article / post / review only if rights are clear;
- `page/social-card.jpg` -> local page / Open Graph image.

Preferred future review PDF convention:

```text
public/publications/reviews/<slug>/veljkovic-review-<slug>.pdf
```

## 11. Sitemap And Redirect Rules

The sitemap should include actual generated, non-draft canonical pages intended to be live. Generated output currently
includes six review pages plus the thesis page in local `dist`; production/live state still needs deployment validation.

Generated does not automatically mean launch-ready. Rights-blocked routes should be drafted or otherwise excluded before
launch.

Legacy URLs currently being served by 301! redirects on Netlify

```text
/writing.html
/writing/ReviewCosmicConnectionsV2.html
/writing/ReviewCosmicConnectionsV2.pdf
/itinerary.pdf
```

Content remains in place, but Netlify 301! redirects bypass content serving.

## 12. Superseded Values Retained For Audit

These values appeared in older metadata/memory but are no longer current
operational values:

| Superseded value                                                      | Current handling                                                                                                                             |
|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `Theory and editing`                                                  | Superseded by current code value `Theory and design`; pending final wording confirmation.                                                    |
| `hello@stevanveljkovic.com` as canonical email                        | Settled, with stevan@stevanveljkovic.com as new value and all instances populated from site.ts (no hard-coding), pending final verification. |
| `/images/headshot-1200x630.png` as default headshot/social image      | Superseded by `/images/headshot-1200x630.jpg`; remaining `.png` schema references are tracked as cleanup work.                               |
| Only Cosmic Connections and Christian Right as generated review pages | Superseded; six review content files exist and six review routes now generate locally.                                                       |
| Godless, Hell, Challenging Modernity as merely planned draft pages    | Superseded; six review routes now generate locally, with production / live state subject to deployment validation.                           |
| `src/content/publication-items/phd-thesis.md`                         | Current thesis publication item is `religious-atavism-climate-crisis.md`.                                                                    |
| Thesis page as immediate Stage 3 task                                 | Superseded; thesis page is Stage 4.2 working-tree implemented, existing `dist/` includes it, and live production state remains pending verification.   |

## 13. Other naming decisions

### Canonical labeling for publication text

There should be consistency in the application of these terms across all references to article versions

| Description                                                                                                                | Label                                  | Alternate labels                                                          | Other notes                                                                                                                                                                                                                   |
|:---------------------------------------------------------------------------------------------------------------------------|:---------------------------------------|:--------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Version of the text submitted for peer review                                                                              | **Author’s original manuscript (AOM)** | Preprint; Original submission; Authors Original Version (AOV) [OUP usage] | Should be verifiable via email or platform confirmation; capable of bearing a credible dateCreated value                                                                                                                      |
| Version of the text formally accepted by an editor but preceding editorial preparation for publication (e.g., typesetting) | **Accepted Manuscript (AM)**           | Post-print; Author’s Accepted Manuscript (AAM)                            |                                                                                                                                                                                                                               |
| Version of the text typeset by the publisher and appearing officially in the periodical                                    | **Version of Record (VoR)**            | Publisher’s PDF; Final published PDF; VOR [OUP usage]                     | For purposes of JSON, the version on which other versions are based (even though other versions precede it chronologically)                                                                                                   |
| Version of the text which has appeared on a webpage with identifiable outlet and publisher (e.g., a branded blog series)   | **Published web article**              | Blog article; online article; published post                              | For edited web publications such as LSE Review of Books. The source may still be modelled as `BlogPosting`/`Review` in JSON-LD where appropriate. Do not call this a VoR unless the outlet / publisher uses that terminology. |
