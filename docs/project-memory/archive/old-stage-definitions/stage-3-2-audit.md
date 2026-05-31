# Produced by gpt-5.5 in WebStorm – 26 May 2026 at 21:40:32 BST

From the following prompt:

```text
Please inspect the Astro project and produce a current metadata inventory for
all generated canonical pages.

For each page, list:
- route
- canonical URL
- <title>
- meta description
- og:title
- og:description
- og:type
- og:url
- og:image
- JSON-LD @graph top-level node @ids and @types
- any visible/schema naming mismatches
- any remaining “Dr Stevan Veljkovic” strings
- any apparent placeholder dates such as 2025-01-01 or 2023-01-01

Do not propose a redesign. Do not change files yet. Return an audit table and
a short list of recommended minimal Stage 3 fixes.
```

## Metadata inventory — generated canonical pages

I inspected the current Astro source/routes and schema generators. I did **not** change files.

Generated canonical HTML pages appear to be:

```plain text
/
/publications/
/cv/
/publications/reviews/christian-right-europe/
/publications/reviews/cosmic-connections/
```


Default Open Graph image, unless overridden, is:

```plain text
https://stevanveljkovic.com/images/headshot-1200x630.png
```


---

## Page audit table

| Route | Canonical URL | `<title>` | Meta description | OG metadata | JSON-LD top-level graph nodes | Issues / notes |
|---|---|---|---|---|---|---|
| `/` | `https://stevanveljkovic.com/` | `Stevan Veljkovic` | `Online home of Dr Stevan M. Veljkovic, Oxford-based scholar, builder, and editor. Publications, résumé, contact. Verve and sangfroid. Nor is this all.` | `og:title`: `Stevan Veljkovic`<br>`og:description`: same as meta description<br>`og:type`: `website`<br>`og:url`: `https://stevanveljkovic.com/`<br>`og:image`: `https://stevanveljkovic.com/images/headshot-1200x630.png` | `https://stevanveljkovic.com/images/headshot-1200x630.png` — `ImageObject`<br>`https://orcid.org/0000-0002-2599-3227` — `Person`<br>`https://stevanveljkovic.com/#website` — `WebSite`<br>`https://stevanveljkovic.com/#homepage` — `AboutPage` | Remaining `Dr` strings emitted in metadata/schema. Visible homepage says `Theory and editing`; site data contains older wording elsewhere: `Theory and design`, though not emitted here as the visible tagline. |
| `/publications/` | `https://stevanveljkovic.com/publications/` | `Publications \| Stevan Veljkovic` | `Publications, reviews, and academic writing by Stevan Veljkovic.` | `og:title`: `Publications`<br>`og:description`: same as meta description<br>`og:type`: `website`<br>`og:url`: `https://stevanveljkovic.com/publications/`<br>`og:image`: `https://stevanveljkovic.com/images/headshot-1200x630.png` | `https://stevanveljkovic.com/#website` — `WebSite`<br>`https://orcid.org/0000-0002-2599-3227` — `Person`<br>`https://stevanveljkovic.com/publications/` — `CollectionPage`<br>`https://stevanveljkovic.com/publications/#publication-list` — `ItemList`<br>Publication item nodes, including DOI/URL nodes for current bibliography items and review-derived items.<br>Review-derived container nodes for Cosmic Connections and Christian Right: `Periodical`, `PublicationVolume`, `PublicationIssue`. | Schema still emits `Dr Stevan Veljkovic` strings. Publication-list book reviews currently emit as `ScholarlyArticle`, not `["ScholarlyArticle", "Review"]`. Placeholder-like dates remain: `2025-01-01` for *Challenging Modernity* and `2023-01-01` for the thesis. Christian Right issue/list date `2025-07-01` still needs verification if exact. |
| `/cv/` | `https://stevanveljkovic.com/cv/` | `CV \| Stevan Veljkovic` | `Curriculum vitae of Stevan Veljkovic.` | `og:title`: `CV`<br>`og:description`: same as meta description<br>`og:type`: `website` by fallback/default<br>`og:url`: `https://stevanveljkovic.com/cv/`<br>`og:image`: `https://stevanveljkovic.com/images/headshot-1200x630.png` | `https://www.ox.ac.uk/` — `CollegeOrUniversity`<br>`https://www.theology.ox.ac.uk/` — `Organization`<br>`https://www.stx.ox.ac.uk/` — `CollegeOrUniversity`<br>`https://www.cam.ac.uk/` — `CollegeOrUniversity`<br>`https://www.peterhouse.cam.ac.uk/` — `CollegeOrUniversity`<br>`https://www.hist.cam.ac.uk/` — `Organization`<br>`https://www.divinity.cam.ac.uk/` — `Organization`<br>`https://www.rochester.edu/` — `CollegeOrUniversity`<br>`https://stevanveljkovic.com/thesis/religious-atavism-climate-crisis/` — `Thesis`<br>`https://stevanveljkovic.com/cv/#cambridge-mphil-program` — `EducationalOccupationalProgram`<br>`https://stevanveljkovic.com/cv/#cambridge-pgdip-program` — `EducationalOccupationalProgram`<br>`https://stevanveljkovic.com/cv/#rochester-ba-program` — `EducationalOccupationalProgram`<br>`https://orcid.org/0000-0002-2599-3227` — `Person`<br>`https://stevanveljkovic.com/cv/veljkovic-cv.pdf` — `MediaObject`<br>`https://stevanveljkovic.com/cv/` — `ProfilePage` | CV schema references a thesis page URL that does **not** currently exist as a generated page. This conflicts with the Stage 3 principle of not linking schema to non-existent pages unless the thesis page is implemented. Also note minor prop casing in the page source: `ogtype` is passed instead of `ogType`; current output likely falls back to `website`. |
| `/publications/reviews/cosmic-connections/` | `https://stevanveljkovic.com/publications/reviews/cosmic-connections/` | `Review of Cosmic Connections \| Stevan Veljkovic` | `In a book which bids fair to become his culminating output, Taylor joins up the facets of an extraordinary career.` | `og:title`: `Review of Cosmic Connections`<br>`og:description`: same as meta description<br>`og:type`: `article`<br>`og:url`: `https://stevanveljkovic.com/publications/reviews/cosmic-connections/`<br>`og:image`: `https://www.degruyterbrill.com/document/cover/isbn/9780674297074/product_pages` | `https://orcid.org/0000-0002-2599-3227` — `Person`<br>`https://stevanveljkovic.com/#website` — `WebSite`<br>`https://stevanveljkovic.com/publications/reviews/cosmic-connections/#webpage` — `WebPage`<br>`https://doi.org/10.4159/9780674297074` — `Book`<br>`https://doi.org/10.1177/13684310241249684` — `["ScholarlyArticle", "Review"]`<br>`https://stevanveljkovic.com/publications/reviews/cosmic-connections/#periodical` — `Periodical`<br>`https://stevanveljkovic.com/publications/reviews/cosmic-connections/#volume` — `PublicationVolume`<br>`https://stevanveljkovic.com/publications/reviews/cosmic-connections/#issue` — `PublicationIssue`<br>`https://stevanveljkovic.com/publications/reviews/cosmic-connections/#review` — `["ScholarlyArticle", "Review"]` | Overall node pattern looks consistent. The review page correctly distinguishes reviewed book, DOI article/review, and local review. No `Dr Stevan Veljkovic` strings apparent on this page’s metadata/schema. Publication-list year/sort tension remains elsewhere: review item is grouped as `2024` but issue citation is `2025`; this may be intentional because first online publication is `2024-05-24`. |
| `/publications/reviews/christian-right-europe/` | `https://stevanveljkovic.com/publications/reviews/christian-right-europe/` | `Review of The Christian Right in Europe \| Stevan Veljkovic` | `This repository of rich and useful scholarship is bound together by a tendentious thesis, writes Stevan Veljkovic.` | `og:title`: `Review of The Christian Right in Europe`<br>`og:description`: same as meta description<br>`og:type`: `article`<br>`og:url`: `https://stevanveljkovic.com/publications/reviews/christian-right-europe/`<br>`og:image`: `https://www.degruyterbrill.com/document/cover/isbn/9783839460382/product_pages/` | `https://orcid.org/0000-0002-2599-3227` — `Person`<br>`https://stevanveljkovic.com/#website` — `WebSite`<br>`https://stevanveljkovic.com/publications/reviews/christian-right-europe/#webpage` — `WebPage`<br>`https://doi.org/10.1515/9783839460382` — `Book`<br>`https://doi.org/10.1093/jcs/csaf039` — `["ScholarlyArticle", "Review"]`<br>`https://stevanveljkovic.com/publications/reviews/christian-right-europe/#periodical` — `Periodical`<br>`https://stevanveljkovic.com/publications/reviews/christian-right-europe/#volume` — `PublicationVolume`<br>`https://stevanveljkovic.com/publications/reviews/christian-right-europe/#issue` — `PublicationIssue`<br>`https://stevanveljkovic.com/publications/reviews/christian-right-europe/#review` — `["ScholarlyArticle", "Review"]` | Main remaining issue is date verification: issue `datePublished` and publication-list `sortDate` use `2025-07-01`. Also visible citation appears to omit the comma in `Movements Networks, and Denominations`, while schema/frontmatter reviewed-work title has `Movements, Networks, and Denominations`. Published-review title uses `Edited By`, with capital `By`; visible citation uses lower-case `edited by`. |

---

## More detailed notes by category

### Remaining `Dr Stevan Veljkovic` / `Dr Stevan M. Veljkovic` strings

Emitted or likely emitted in metadata/schema:

| Location | String |
|---|---|
| Homepage meta description | `Online home of Dr Stevan M. Veljkovic...` |
| Homepage `WebSite.alternateName` | `Dr Stevan M. Veljkovic` |
| Homepage `AboutPage.description` | `Personal website of Dr Stevan Veljkovic.` |
| Publications `CollectionPage.name` | `Publications \| Dr Stevan Veljkovic` |
| Publications `CollectionPage.description` | `Publications of Dr Stevan Veljkovic.` |
| Publications `ItemList.name` | `Publications of Dr Stevan Veljkovic` |

This does not necessarily mean every `Dr` string is wrong everywhere, but it conflicts with the stated Stage 3 metadata rule that `WebSite.name`, `Person.name`, and `og:site_name` should be `Stevan Veljkovic`, and with the known cleanup item for `/publications/`.

### Apparent placeholder or questionable dates

| Date | Location | Assessment |
|---|---|---|
| `2025-01-01` | `src/content/publication-items/challenging-modernity.md` `publicationList.sortDate`; emitted as `datePublished` on `/publications/` schema | Looks placeholder-like. Should be replaced with exact known date or reduced/omitted from `datePublished` if only year/issue is known. |
| `2023-01-01` | `src/content/publication-items/religious-atavism-climate-crisis.md` `publicationList.sortDate`; emitted as `datePublished` on `/publications/` schema | Looks placeholder-like. Since citation says PhD thesis, University of Oxford, 2023, avoid invented January 1 precision if no exact publication/deposit date is intended. |
| `2025-07-01` | Christian Right issue `datePublished`; also `publicationList.sortDate` | Not necessarily a placeholder, but already flagged as needing verification. Keep only if exact issue publication date is verified. |
| `2025-05-01` | Cosmic Connections publication-list `sortDate` | Appears to represent May 2025 issue placement, while DOI article date is `2024-05-24`. Less concerning because the issue date is month-level elsewhere as `2025-05`; the day-level sort date is internal but should not be emitted as `datePublished` for the DOI article. Current review-page schema uses first online date correctly. |

### Visible/schema naming mismatches

| Page | Mismatch |
|---|---|
| Homepage | Visible tagline: `Theory and editing`; site data still has `tagline: "Theory and design"`. If used later, this could reintroduce inconsistency. |
| Publications | Visible heading: `Publications and PhD thesis`; JSON-LD page name: `Publications \| Dr Stevan Veljkovic`; ItemList name: `Publications of Dr Stevan Veljkovic`. |
| CV | Visible heading: `Stevan Veljkovic – curriculum vitae`; page title/OG title: `CV`; schema page name: `Curriculum Vitae — Stevan Veljkovic`. This is acceptable, but the schema’s thesis `@id` points to a non-existent local route. |
| Cosmic review | Page title, visible heading, and schema local review name align around `Review of Cosmic Connections`. No major naming mismatch found. |
| Christian Right review | Visible citation has `The Christian Right in Europe: Movements Networks, and Denominations`; schema/frontmatter title has `Movements, Networks, and Denominations`. Also schema published-review title has `Edited By`, while visible citation uses `edited by`. |

---

## Recommended minimal Stage 3 fixes

1. **Align `/publications/` schema strings**
    - Change:
        - `Publications | Dr Stevan Veljkovic`
        - `Publications of Dr Stevan Veljkovic.`
        - `Publications of Dr Stevan Veljkovic`
    - To:
        - `Publications | Stevan Veljkovic`
        - `Publications of Stevan Veljkovic.`
        - `Publications of Stevan Veljkovic`

2. **Resolve placeholder-like publication dates**
    - Replace or avoid emitting `2025-01-01` for *Challenging Modernity*.
    - Replace or avoid emitting `2023-01-01` for the thesis.
    - Consider changing the publications schema generator so `publicationList.sortDate` is not automatically treated as `datePublished` when it is only an internal sorting value.

3. **Verify Christian Right issue date**
    - Keep `PublicationIssue.datePublished: "2025-07-01"` only if the exact date is verified.
    - Otherwise reduce to a less precise value if known, or omit the issue `datePublished`.

4. **Fix the CV thesis schema identity**
    - Either implement the thesis page at `/thesis/religious-atavism-climate-crisis/`, or stop using that non-existent local URL as the thesis `@id`.
    - If no thesis page is planned for immediate Stage 3, the DOI URL is the safer thesis `@id`.

5. **Correct Christian Right citation/title punctuation**
    - Visible citation should likely read `Movements, Networks, and Denominations`.
    - Consider normalizing `Edited By` to `Edited by` in the published-review title if that matches the publisher’s display/title.

6. **Optionally update publication-list book review schema type**
    - Review pages already use `["@type": ["ScholarlyArticle", "Review"]]`.
    - `/publications/` bibliography nodes still use only `ScholarlyArticle` for `bookReview`.
    - Minimal change: return `["ScholarlyArticle", "Review"]` for `bookReview` items in the publications schema generator.

7. **Minor CV metadata prop cleanup**
    - Change `ogtype={meta.ogType}` to `ogType={meta.ogType}`.
    - Current output likely falls back to `website`, so this is low-risk but worth tidying.