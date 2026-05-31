2026-05-30 — Stage 3.3.2.5/3.3.2.6 project-memory delta:
`evolution-of-religions` completion, publications schema updates, T&F rights
caution, and authorial-voice working rule

Context

This delta records decisions and developments since the Stage 3.3.2.5 carryover
text supplied at the beginning of the worksheet. It should be read alongside the
primary project-memory carryover and the previous delta. Where this delta
conflicts with earlier notes, prioritise this delta.

Main areas covered:

- completion of the `evolution-of-religions` review page
- JSON-LD/schema decisions for the LSE Review of Books item
- `/publications/` JSON-LD cleanup after adding the LSE review
- deferred richer-data possibilities
- Taylor & Francis rights clarification affecting `challenging-modernity` and
  `godless-crusade`
- nuanced rule about not generating prose in Stevan’s authorial voice

---

## `evolution-of-religions` is now complete for Stage 3

The review page for:

```text
Review of The Evolution of Religions
```

is now considered done for Stage 3.

Adopted slug:

```text
evolution-of-religions
```

Canonical route:

```text
/publications/reviews/evolution-of-religions/
```

Content file:

```text
src/content/reviews/evolution-of-religions.md
```

Do not change the slug to:

```text
evolution-religions
```

The page is live/intended to generate with:

```yaml
draft: false
```

The duplicate `publication-items` version of `evolution-of-religions.md` has
been set to:

```yaml
draft: true
```

This was done to prevent duplicate publication-list/schema entries.

---

## `evolution-of-religions` JSON-LD model

The dedicated `evolution-of-religions` page now has an acceptable JSON-LD model
for Stage 3.

The graph includes the following conceptual nodes:

```text
Person: Stevan Veljkovic
WebSite: stevanveljkovic.com
WebPage: /publications/reviews/evolution-of-religions/
Book: The Evolution of Religions, DOI-identified
Published BlogPosting/Review: LSE Review of Books URL
Blog: LSE Review of Books
WebSite: LSE Blogs
Local Article/Review: Stevan-site reproduction
```

The reviewed work is identified by DOI:

```text
https://doi.org/10.7312/gran21230
```

and modelled as:

```json
"@type": "Book"
```

with author Lance Grande, publisher Columbia University Press, the relevant
ISBNs,
and the DOI identifier.

The reviewed-work image now renders in JSON-LD as an absolute URL:

```text
https://stevanveljkovic.com/images/publications/reviews/evolution-of-religions/
reviewed-work/cover.jpg
```

Filesystem convention:

```text
public/images/publications/reviews/evolution-of-religions/reviewed-work/cover.
jpg
```

Continue using this nested `reviewed-work/cover.jpg` convention rather than a
flat cover path.

---

## LSE Review of Books modelling

The LSE Review of Books item must not be forced into the journal-review model.

The published LSE post is now modelled as:

```json
"@type": ["BlogPosting", "Review"]
```

Canonical published-review node ID:

```text
https://blogs.lse.ac.uk/lsereviewofbooks/2024/07/18/book-review-the-evolution-of
-religions-lance-grande/
```

Do not revert this node to:

```json
"@type": ["ScholarlyArticle", "Review"]
```

The adopted container model is:

```text
BlogPosting / Review
  isPartOf → Blog: LSE Review of Books
    isPartOf → WebSite: LSE Blogs
```

Blog node:

```text
https://blogs.lse.ac.uk/lsereviewofbooks/#blog
```

with:

```json
"@type": "Blog",
"name": "LSE Review of Books",
"url": "https://blogs.lse.ac.uk/lsereviewofbooks/"
```

Parent site node:

```text
https://blogs.lse.ac.uk/#website
```

with:

```json
"@type": "WebSite",
"name": "LSE Blogs",
"url": "https://blogs.lse.ac.uk/"
```

Publisher for both blog and parent site:

```text
London School of Economics and Political Science
https://www.lse.ac.uk
```

No fake `Periodical → PublicationVolume → PublicationIssue` chain should be
invented for the LSE item.

---

## Local Stevan-site reproduction for `evolution-of-religions`

For this page, the local hosted reproduction is now modelled as:

```json
"@type": ["Article", "Review"]
```

rather than `ScholarlyArticle`.

Local node:

```text
https://stevanveljkovic.com/publications/reviews/evolution-of-religions/#review
```

This node remains distinct from the published LSE post and points to the
published post through:

```json
"isBasedOn": { "@id": "<LSE post URL>" },
"citation": { "@id": "<LSE post URL>" }
```

Do not use `sameAs` between the local Stevan-site reproduction and the LSE page.

The version label for the local node is:

```text
Reproduction of the published blog post
```

This distinction is now accepted:

```text
published LSE post → BlogPosting / Review
local Stevan-site reproduction → Article / Review
journal reviews → ScholarlyArticle / Review
```

Retain this schema-type flexibility for future non-journal reviews.

---

## LSE text reproduction and rights-display policy

The local `evolution-of-religions` page reproduces the substantive LSE Review of
Books post, not the whole LSE page object.

Retained:

```text
- review wording
- paragraph order
- meaningful links
- meaningful italics/bold
- standfirst/dek
- bibliographic book line near the opening
- LSE disclaimer note at the end
```

Omitted:

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
- Shutterstock/thematic image and image-credit line
```

The LSE disclaimer note is retained after the final substantive paragraph.

The local page may use the reviewed-work book cover image. It should not use the
LSE thematic/Shutterstock image unless rights are clear.

The intro/reuse wording uses the non-journal wording:

```text
The following text reproduces the published post:
```

and the visible first-publication label is:

```text
First published
```

not:

```text
First published online
```

Relevant flexible fields include:

```yaml
introOpeningText: "The following text reproduces the published post:"
firstPublishedNoteLabel: "First published"
showFirstPublishedOnlineNote: true
```

The internal field `firstPublishedOnline` may remain in use even when the
visible
label is “First published”.

---

## `/publications/` JSON-LD after adding the LSE review

The `/publications/` page schema remains:

```text
CollectionPage
  mainEntity → ItemList
    itemListElement → ListItem[]
```

This structure should be preserved.

The duplicate LSE entry has been fixed. The rendered `/publications/` JSON-LD
now
has:

```json
"numberOfItems": 7
```

and only one list item for the LSE review.

The LSE review node on `/publications/` is now also:

```json
"@type": ["BlogPosting", "Review"]
```

and includes:

```json
"isPartOf": {
  "@id": "https://blogs.lse.ac.uk/lsereviewofbooks/#blog"
}
```

The `/publications/` graph now also includes the LSE Review of Books blog node
and LSE Blogs website node. This is acceptable and intentionally mirrors the
dedicated page’s high-level container model.

No LSE periodical/volume/issue nodes should be emitted.

The old `/publications/` “Dr Stevan Veljkovic” strings have been corrected to:

```text
Publications | Stevan Veljkovic
Publications of Stevan Veljkovic.
Publications of Stevan Veljkovic
```

The Christian Right issue date has been reduced to:

```json
"datePublished": "2025-07"
```

rather than the over-specific `2025-07-01`.

Local image paths in publication schema are being absolutised where relevant.

The only remaining non-blocking note is:

```json
"itemListOrder": "https://schema.org/ItemListOrderDescending"
```

The current ordering may not be strictly date-descending, but this is not being
treated as a blocker because the order may naturally resolve as the list is
finalised. Later options: make the order truly descending, remove
`itemListOrder`, or document a different ordering principle.

---

## Deferred richer-data possibilities

Do not forget the following possible future enrichments. They are not required
for Stage 3.3.2.5/3.3.2.6.

The `/publications/` LSE node could later include fuller metadata already
present
on the dedicated page, such as:

```json
"itemReviewed": { "@id": "https://doi.org/10.7312/gran21230" },
"license": "https://creativecommons.org/licenses/by/4.0/",
"copyrightYear": 2024,
"copyrightHolder": { "@id": "https://orcid.org/0000-0002-2599-3227" }
```

The `/publications/` page could later include reviewed-work nodes for review
items, especially book reviews. For `evolution-of-religions`, that would mean
including the reviewed book node:

```text
https://doi.org/10.7312/gran21230
```

as a `Book` node on `/publications/`.

The published LSE review node could later include:

```text
itemReviewed
license
copyrightYear
copyrightHolder
dateModified, if known
mainEntityOfPage, if an external LSE WebPage node is introduced
```

Do not invent data or over-model external pages unnecessarily.

---

## Taylor & Francis rights situation

Stevan has received CCC/Taylor & Francis licences for both:

```text
Challenging Modernity
Godless Crusade
```

The licence material creates ambiguity about Version of Record reuse on a public
website. The request details appear to include whole-version electronic reuse,
but the standard T&F terms also include language restricting full articles on
third-party websites.

Stevan has sent an email seeking clarification.

Current policy decision:

```text
No page using a Taylor & Francis Version of Record should go live until T&F/CCC
has replied and confirmed that the intended use is permitted.
```

The `challenging-modernity` review page currently uses the Version of Record.
Therefore:

```text
Challenging Modernity must not go live while it uses the VoR unless/until the
rights clarification confirms permission.
```

Keep it draft/non-public or otherwise exclude it from generated live canonical
pages and sitemap while this remains unresolved.

---

## Godless Crusade rights and next stage

Next stage:

```text
Stage 3.3.2.7: adding godless-crusade review page
```

Expected route:

```text
/publications/reviews/godless-crusade/
```

Expected content file:

```text
src/content/reviews/godless-crusade.md
```

The `godless-crusade` page will use the Author Accepted Manuscript, not the
Version of Record.

Current rights decision:

```text
It is acceptable to post the Godless Crusade page using the AAM at any time,
because permission for that use is already granted by Taylor & Francis policy.
```

However, the normal checks still apply before publication:

```text
- text/version accuracy
- metadata
- required credit line / acknowledgement requirements
- local PDF status
- schema
- sitemap behaviour
```

The local page/schema must not imply that the locally hosted text is the Version
of Record. Use a clear version label such as:

```text
Author Accepted Manuscript
```

or another exact label Stevan chooses.

The DOI/published version should remain the identifier for the published VoR
node. The local AAM node should be distinct and point to the DOI/published
version with `citation` and/or `isBasedOn` as appropriate. Do not expose a VoR
PDF for `godless-crusade` unless separately permitted.

---

## Working rule: suggested language and authorial voice

A new nuanced working rule has been adopted.

Stevan is comfortable receiving suggested wording in collaborative editing
contexts, such as tweaking short labels, intro text, schema-facing descriptions,
or small pieces of site copy where he is actively shaping the language.

However, do not generate extended prose that would be presented as Stevan’s own
authorial or interpersonal communication, especially text to which he would
append his name, such as email messages.

The rule is not “never suggest wording”. It is:

```text
Suggested language is acceptable for limited, collaborative wording refinement.
Do not produce extended prose in Stevan’s authorial voice or direct personal
communications on his behalf unless explicitly asked.
```

Safe assistance includes:

```text
- code
- schema modelling
- technical implementation
- structural notes
- checklists
- abstract content requirements
- neutral analytical commentary
- short wording alternatives in clearly collaborative editing contexts
```

Avoid unless explicitly requested:

```text
- email drafts in Stevan’s name
- public-facing prose presented as Stevan’s authored statement
- extended acknowledgements or biographical prose in Stevan’s voice
- any direct interpersonal communication to be signed by Stevan
```

This rule should be carried forward.

---

## Validation reminders

After relevant changes, continue to run:

```bash
npx astro sync
npx astro check
npm run build
```

For the completed `evolution-of-religions` work, expected conditions are:

```text
- dedicated page generated with draft: false
- duplicate publication-items entry suppressed with draft: true
- sitemap includes only real live canonical pages
- published LSE post is BlogPosting/Review
- local Stevan reproduction is Article/Review
- no fake LSE periodical/volume/issue chain
- reviewed-work image URL is absolute
- /publications/ numberOfItems is 7
```

Current conclusion:

```text
evolution-of-religions is complete for Stage 3.
Proceed next to Stage 3.3.2.7: godless-crusade review page.
```