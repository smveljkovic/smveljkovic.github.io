2026-05-30 — Stage 3.3.2.5 carryover delta: webfonts, workflow, and
`evolution-of-religions` review page

Context

This delta records decisions and developments after the Stage 3.3.2.5 carryover
delta supplied at the start of the worksheet. It covers:

```text
- webfont installation and related layout stabilisation
- working-practice clarification around WebStorm/Dreamweaver
- creation and modelling of the evolution-of-religions review page
- intro/reuse wording and transcription policy for the LSE Review of Books post
```

Where this delta conflicts with earlier memory, prioritise this delta.

---

## Webfonts now implemented in Astro

FF Meta Serif and Case VAR are now working in the Astro site.

FF Meta Serif is served through Adobe Fonts using the supplied Typekit
stylesheet:

```html
<link rel="stylesheet" href="https://use.typekit.net/icu4lvx.css">
```

This is acceptable because Adobe Fonts does not permit direct self-hosting of FF
Meta Serif in the ordinary way. The link belongs globally in the Astro document
head, normally via `BaseLayout.astro`, not on individual pages.

Case VAR is self-hosted in the Astro project under:

```text
public/fonts/Case
```

The Case VAR files available are:

```text
Case_Upright_VAR_1.001.woff2
Case_Italic_VAR_1.001.woff2
```

plus `.woff` versions, though `.woff2` is sufficient for modern browser support
unless old-browser fallback is explicitly desired.

Case VAR has two confirmed axes:

```text
wght
opsz
```

Recommended/implemented pattern remains:

```css
@font-face {
  font-family: "Case VAR SV";
  src: url("/fonts/Case/<upright-file>.woff2") format("woff2");
  font-weight: <actual-min> <actual-max>;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Case VAR SV";
  src: url("/fonts/Case/<italic-file>.woff2") format("woff2");
  font-weight: <actual-min> <actual-max>;
  font-style: italic;
  font-display: swap;
}
```

Use root-relative public URLs. Do not include `/public` in CSS paths.

`font-optical-sizing: auto` is the default sensible approach for Case VAR.
Manual `font-variation-settings: "opsz" ...` may be used later only for
deliberate typographic tuning.

---

## Layout stabilisation and rabbit-hole warning

After the fonts were enabled, several inherited layout details broke or shifted,
especially responsive/mobile layout. These snags have now been smoothed over in
Astro to an acceptable state.

Important working-process note:

```text
The user is prone to typography/layout rabbit holes.
During Stage 3 launch work this tendency should be discouraged unless the issue
is genuinely launch-blocking.
```

Current rule:

```text
If the layout is acceptable, stable, and not misleading or broken, ship it.
Perfectionist typography/layout refinement belongs in Stage 4.
```

The inherited margin-counter/year-marker layout is now understood as fragile and
probably not aligned with the long-term aim of a durable academic/research hub.
It was enjoyable and distinctive, but should not be over-preserved during Stage
3. It may be scrapped or substantially rethought in Stage 4.

---

## WebStorm / Dreamweaver workflow clarification

Clarification: Dreamweaver was not being used for the Astro site. It was being
used only for maintaining/testing the current vanilla HTML/CSS site, which had
already been configured there to push files to a local webserver.

Astro workflow remains:

```text
WebStorm + npm run dev / npm run preview + browser DevTools
```

The current vanilla site, while it still exists, can also be maintained in
WebStorm. Dreamweaver is not uniquely needed. Options:

```text
1. Open the current site’s served folder directly in WebStorm.
2. Configure WebStorm Deployment with a “Local or mounted folder” target.
3. Use a simple rsync/copy script from WebStorm’s terminal.
```

Recommendation:

```text
Do not over-engineer the workflow for the soon-to-be-retired vanilla site.
Move away from Dreamweaver where practical, but do not create a new rabbit hole.
```

For the Astro site, do not use Dreamweaver.

---

## New review page: `evolution-of-religions`

A new review page has been added / is being finalised for:

```text
Review of The Evolution of Religions
```

Adopted slug:

```text
evolution-of-religions
```

Canonical route:

```text
/publications/reviews/evolution-of-religions/
```

Expected content file:

```text
src/content/reviews/evolution-of-religions.md
```

The slug decision is now settled for this page. Do not change to
`evolution-religions`.

Basic page metadata:

```yaml
draft: false
slug: "evolution-of-religions"
title: "Review of The Evolution of Religions"
shortTitle: "Evolution of Religions"
pageHeading: "Review of The Evolution of Religions"
seoTitle: "Review of The Evolution of Religions"
datePublished: "2024-07-18"
canonicalPath: "/publications/reviews/evolution-of-religions/"
```

The description had a typo/infelicity and should use something like:

```yaml
description: "Lance Grande’s ambitious attempt at encyclopaedic synthesis
produces dividends but remains incomplete, writes Stevan Veljkovic."
```

Reviewed work:

```yaml
reviewedWork:
  type: "Book"
  title: "The Evolution of Religions: A History of Related Traditions"
  shortTitle: "The Evolution of Religions"
  author: "Lance Grande"
  doi: "10.7312/gran21230"
  url: "https://doi.org/10.7312/gran21230"
  sameAs:
    - "https://www.degruyterbrill.com/document/doi/10.7312/gran21230/html/"
    - "https://cup.columbia.edu/book/the-evolution-of-religions/9780231216517/"
  publisher:
    name: "Columbia University Press"
    url: "https://cup.columbia.edu"
  place: "New York"
  year: "2024"
  isbn:
    - "9780231216517"
    - "9780231212304"
    - "9780231559317"
```

Use the adopted image convention, not a flat cover path:

```yaml
reviewedWork:
  image:
"/images/publications/reviews/evolution-of-religions/reviewed-work/cover.jpg"
```

Filesystem:

```text
public/images/publications/reviews/evolution-of-religions/reviewed-work/cover.
jpg
```

---

## LSE Review of Books modelling

This review differs from the journal reviews because it was published in an
online blog/publication:

```text
LSE Review of Books
```

Do not force the journal model:

```text
Periodical → PublicationVolume → PublicationIssue
```

unless formal serial metadata requires it. For this page, model the published
review as a blog/publication post rather than a journal article.

Recommended conceptual pattern:

```text
Published BlogPosting/Review
  isPartOf → Blog: LSE Review of Books
    isPartOf → WebSite: LSE Blogs
  publisher → London School of Economics and Political Science
```

The published review has no DOI. Use its canonical URL as its node ID / main
identifier:

```text
https://blogs.lse.ac.uk/lsereviewofbooks/2024/07/18/book-review-the-evolution-of
-religions-lance-grande/
```

Suggested YAML structure:

```yaml
publishedReview:
  type: "BlogPosting"
  schemaTypes:
    - "BlogPosting"
    - "Review"
  title: "The Evolution of Religions – review"
  url:
"https://blogs.lse.ac.uk/lsereviewofbooks/2024/07/18/book-review-the-evolution-
of-religions-lance-grande/"
  datePublished: "2024-07-18"
  firstPublishedOnline: "2024-07-18"

  blog:
    name: "LSE Review of Books"
    url: "https://blogs.lse.ac.uk/lsereviewofbooks/"
    parentSite:
      name: "LSE Blogs"
      url: "https://blogs.lse.ac.uk/"

  publisher:
    name: "London School of Economics and Political Science"
    url: "https://www.lse.ac.uk"
```

Avoid `ScholarlyArticle` for the published blog post unless later reasons
emerge. `["BlogPosting", "Review"]` or `["Article", "Review"]` is more accurate.

No volume, issue, pagination, or ISSN should be invented.

---

## Transcription/reproduction policy for LSE blog post

For the local page, reproduce the substantive review text, not the whole LSE
page object.

Preserve:

```text
- review wording
- paragraph order
- meaningful links
- meaningful italics/bold
- standfirst/dek
- bibliographic book line near the opening
- the LSE disclaimer note at the end
```

Omit:

```text
- comments count
- share count
- estimated reading time
- share widgets
- print/PDF/email widgets
- LSE navigation/sidebar/platform furniture
- LSE taxonomy/footer categories
- author bio/profile block
- author image/alt text
```

The author bio at the end of the LSE page is intentionally omitted. It is
platform author-profile material and is redundant on Stevan’s own site.

Retain the LSE disclaimer note after the final substantive paragraph:

```html
<p class="review_source_note"><strong>Note:</strong> This review gives the views
of the author and not the position of the <i>LSE Review of Books</i> blog, nor
of the London School of Economics and Political Science.</p>
```

If no `review_source_note` class exists, use existing review paragraph styling
for now. Do not create a styling rabbit hole.

The Shutterstock/image-credit line should be omitted if the LSE image is
omitted. Do not reproduce the LSE thematic/Shutterstock image unless rights are
clear. The reviewed-work book cover, if used, is a separate reviewed-work image
handled through local image conventions and schema.

---

## Intro block wording for `evolution-of-religions`

The adopted visible intro block is:

```text
Review of The Evolution of Religions
By Stevan Veljkovic  ·  contact@stevanveljkovic.com

The following text reproduces the published post:
Veljkovic, Stevan. Review of The Evolution of Religions: A History of Related
Traditions, by Lance Grande. LSE Review of Books (blog). LSE Blogs, 18 July
2024.
https://blogs.lse.ac.uk/lsereviewofbooks/2024/07/18/book-review-the-evolution-of
-religions-lance-grande/.
First published 18 July 2024.
Made available here under CC BY 4.0. The wording and basic textual formatting
have been retained; page furniture and elements native to the LSE Blogs page
have been omitted. © 2024 Stevan Veljkovic.
```

Rationale:

- “published post” avoids the awkward “for” construction.
- It avoids needing to italicise `LSE Review of Books` in a non-HTML opening
  field.
- “First published” is preferable to “First published online” for a blog post.
- “Made available here” avoids repeating “reproduce/reproduced”.
- “basic textual formatting” means paragraphing, italics, bold, and links, not
  LSE’s page design.

If possible, link `CC BY 4.0` to:

```text
https://creativecommons.org/licenses/by/4.0/
```

Rights/reuse field may be:

```yaml
reuseNoteHtml: 'Made available here under <a
href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. The wording
and basic textual formatting have been retained; page furniture and elements
native to the LSE Blogs page have been omitted. © 2024 Stevan Veljkovic.'
```

Only assert copyright ownership where verified.

---

## Review intro component/schema changes

The review intro layout has been made more flexible for non-journal cases.

New optional frontmatter/content fields:

```yaml
introOpeningText: "The following text reproduces the published post:"
firstPublishedNoteLabel: "First published"
```

These allow `evolution-of-religions` to avoid the default journal wording:

```text
The following text reproduces the {version/openingVersionNote} for
First published online ...
```

Component logic should follow:

```ts
const introOpeningText =
  review.introOpeningText ??
  (review.version
    ? `The following text reproduces the ${review.openingVersionNote ??
review.version} for`
    : null);

const firstPublishedNoteLabel =
  review.firstPublishedNoteLabel ?? "First published online";
```

Rendering:

```astro
{introOpeningText && (
  <p class="intro">{introOpeningText}</p>
)}

{showFirstPublishedOnlineNote && (
  <p class="intro intro_citation-note">
    {firstPublishedNoteLabel} {formattedFirstPublishedOnline}.
  </p>
)}
```

For this page:

```yaml
showFirstPublishedOnlineNote: true
firstPublishedNoteLabel: "First published"
```

The field name `firstPublishedOnline` may remain internally for now even though
the visible label says “First published”.

Run after changes:

```bash
npx astro sync
npx astro check
npm run build
```

---

## Publications-page implications

`evolution-of-religions` is a live review page and should be allowed to
generate:

```text
/publications/reviews/evolution-of-religions/
```

It may appear in `/publications/` under 2024 with its WEBPAGE pill generated
from `canonicalPath`.

Do not expose a PDF pill unless a local public PDF exists and reuse rights are
clear. No PDF path has been adopted in this delta.

The `/publications/` schema may continue to identify DOI-bearing works by DOI
where available, but this LSE review’s published-review node should be
URL-identified.

---

## Outstanding checks

Validate rendered JSON-LD for:

```text
/publications/
/publications/reviews/evolution-of-religions/
```

Pay special attention that:

```text
- no journal volume/issue chain is invented for LSE Review of Books
- published review type is BlogPosting/Review or equivalent
- reviewed book DOI identifier is normalised
- local image paths render as absolute URLs
- sitemap includes the live page only if draft: false
- intro text matches the adopted wording
```