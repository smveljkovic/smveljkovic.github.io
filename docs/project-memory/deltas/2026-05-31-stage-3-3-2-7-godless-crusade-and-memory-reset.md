# 2026-05-31 — Stage 3.3.2.7 / Stage 3.3 closeout: `godless-crusade`, image
conventions, pagination rules, and project-memory reset

This delta records decisions and developments after the 2026-05-30 Stage
3.3.2.5/3.3.2.6 delta. It should be read alongside the main project-memory
carryover and the previous deltas.

Where this delta conflicts with earlier notes, prefer this delta.

Main areas covered:

- completion / near-completion of the `godless-crusade` review page using the
  Accepted Manuscript;
- AAM/VoR version distinction and future replacement policy;
- correction note for the Goodhart title error in the AM;
- Taylor & Francis recommended AM wording;
- pagination and issue-date rules;
- `/publications/` schema state after adding `godless-crusade`;
- image-directory conventions and exceptions;
- `challenging-modernity` rights caution;
- authorial-voice rule carried forward;
- project-memory reset strategy and `.aiassistant/rules` role.

---

## `godless-crusade` page added / completed using Accepted Manuscript

The review page for:

```text
Review of The Godless Crusade
```

has now been added and is considered basically ready for Stage 3.3.2.7 using the
Accepted Manuscript, not the Version of Record.

Adopted slug:

```text
godless-crusade
```

Canonical route:

```text
/publications/reviews/godless-crusade/
```

Expected content file:

```text
src/content/reviews/godless-crusade.md
```

Current rights/version decision:

```text
The `godless-crusade` page may go live using the Accepted Manuscript, because
Taylor & Francis policy permits author reuse of the AM.
```

Do **not** expose a Taylor & Francis Version of Record PDF or VoR text for
`godless-crusade` unless separate permission is granted.

The local page/schema must not imply that the hosted text is the Version of
Record while the page uses the Accepted Manuscript.

Acceptable local version label:

```text
Accepted Manuscript
```

Also acceptable if preferred:

```text
Accepted Manuscript (AM)
Author Accepted Manuscript
```

The local node should remain distinct from the DOI/published Version of Record
node.

---

## `godless-crusade` core metadata

Reviewed work:

```text
The Godless Crusade: Religion, Populism and Right-Wing Identity Politics in the
West
Tobias Cremer
Cambridge University Press
```

Reviewed work DOI:

```text
https://doi.org/10.1017/9781009262125
```

Published review DOI / Version of Record node:

```text
https://doi.org/10.1080/09637494.2023.2260684
```

Periodical metadata:

```text
Religion, State and Society
Taylor & Francis
Volume 51
Issue 4–5
Issue title: Religion in the European Parliament: between nation and Europe
```

The issue number should be treated as a string and may use an en dash:

```yaml
issueNumber: "4–5"
```

or, where the frontmatter field is simply `issue`:

```yaml
issue: "4–5"
```

This is valid YAML/JSON-LD when quoted and should render in JSON-LD as:

```json
"issueNumber": "4–5"
```

The issue URL may still use an ASCII hyphen if that is the publisher URL:

```text
https://www.tandfonline.com/toc/crss20/51/4-5
```

That is not a contradiction.

---

## Goodhart title correction in the AM

The located Accepted Manuscript contains a factual error:

```text
The Road to Populism
```

The correct title of David Goodhart’s book is:

```text
The Road to Somewhere
```

Decision:

```text
Correct the title in the local text and disclose the correction in the visible
version/modification/correction note.
```

Do not leave the known error in the body text merely with `[sic]`, unless there
is a specific editorial reason to preserve the erroneous text.

Preferred visible correction-note logic:

```text
Correction note: The original AM misstated the title of David Goodhart’s book as
The Road to Populism; the title has been corrected here to The Road to
Somewhere.
```

It is not necessary to model this elaborately in Schema.org. The visible note is
the important element. Avoid emitting non-standard Schema.org properties such as
`modificationNote` unless they are kept as internal/frontmatter-only fields.

If a schema note is later wanted, use a valid property carefully, but this is
not
required for Stage 3.

---

## Taylor & Francis AM wording

Taylor & Francis public guidance recommends wording along these lines:

```text
“This is an Accepted Manuscript of an article published by Taylor & Francis in
[JOURNAL TITLE] on [date of publication], available at:
https://doi.org/[Article DOI].”
```

The guidance is worded as a recommendation/example rather than an obviously
mandatory exact incantation.

Current judgement:

```text
A carefully written intro block that includes the AM status, journal title,
Taylor & Francis publication, publication date, DOI link, and author-reuse basis
is defensible even if it is not verbatim.
```

However, the lower-risk approach is to incorporate the recognisable Taylor &
Francis sentence, or a very close variant, somewhere in the intro/version block.

The intro should include at least:

```text
- Accepted Manuscript status;
- full citation or clear bibliographic reference;
- journal title;
- Taylor & Francis;
- first-online/publication date;
- DOI link;
- statement that the AM is made available according to the publisher’s author
  reuse policy;
- correction note for the Goodhart title.
```

Use the exact publisher-required wording if Taylor & Francis provides a clearly
binding requirement in future correspondence.

---

## AAM now, possible VoR later: no route carve-out required

If the site launches with the `godless-crusade` page using the AM and Taylor &
Francis later grants permission to reproduce the Version of Record, the page can
be updated in place.

Stable canonical route may remain:

```text
/publications/reviews/godless-crusade/
```

No special directory carve-out is required merely to preserve the previously
hosted AM state.

Rationale:

```text
The route identifies the local review page, not necessarily an immutable archive
of one manuscript version.
```

If the hosted version changes from AM to VoR, update:

```text
- visible version/reuse note;
- schema `version`;
- correction note, if no longer relevant or if differently relevant;
- local PDF links/assets, if any;
- copyright/permission wording;
- dateModified, if used;
- any page description that depends on version status.
```

The local `#review` node should remain distinct from the DOI node:

```text
Local page/reproduction:
https://stevanveljkovic.com/publications/reviews/godless-crusade/#review

Published DOI/VoR:
https://doi.org/10.1080/09637494.2023.2260684
```

Even if the local page later reproduces the VoR, it remains acceptable to keep:

```json
"isBasedOn": { "@id": "https://doi.org/10.1080/09637494.2023.2260684" },
"citation": { "@id": "https://doi.org/10.1080/09637494.2023.2260684" }
```

Do not add `sameAs` casually. `sameAs` is more defensible for an exact
authorised
VoR reproduction than for an AM, but the conservative local-representation vs
DOI-work distinction remains clean.

Only create separate version routes such as:

```text
/publications/reviews/godless-crusade/aam/
/publications/reviews/godless-crusade/version-of-record/
```

if there is a deliberate decision to keep both versions publicly available as
separate artefacts.

Be especially careful with PDFs and filenames. Do not replace a file named like:

```text
veljkovic-review-godless-crusade-aam.pdf
```

with a Version of Record PDF. Use version-specific filenames if both versions
are exposed.

---

## Pagination rules clarified

Article/review pagination belongs to the published article/review node, not to
the issue node.

Correct pattern:

```text
Published DOI review/article
  pagination / pageStart / pageEnd
  isPartOf → PublicationIssue
    isPartOf → PublicationVolume
      isPartOf → Periodical
```

For `godless-crusade`, the published review node may include:

```json
"pagination": "491–492",
"pageStart": "491",
"pageEnd": "492"
```

This describes the page range occupied by the review within the issue.

Do not model the review’s page range as a property of the `PublicationIssue`.

---

## Issue-level pagination deferred as richer data

A separate issue-level pagination field is conceptually valid, but it means the
page range of the whole issue, not the page range of the article/review.

Possible future richer-data pattern:

```yaml
publishedReview:
  pagination: "491–492"      # review/article page range
  pageStart: "491"
  pageEnd: "492"
  issue:
    issueNumber: "4–5"
    pagination: "361–520"    # whole issue page range, only if known/verified
```

This is deferred. Do not add `publishedReview.issue.pagination` unless the full
issue page range is known and verified.

Carry-forward rule:

```text
Article/review-level pagination remains on `publishedReview`. Issue-level
pagination may later be added to `PublicationIssue` only as verified richer data
for the whole issue.
```

---

## Issue `datePublished` rule reaffirmed

The existing first-online convention remains:

```text
publishedReview.datePublished = publisher-recognised first publication date,
normally first online publication date.

PublicationIssue.datePublished = issue date/month/year, where known.
```

Do not let article first-online dates leak onto issue nodes.

For `godless-crusade`:

```json
"datePublished": "2023-12-14"
```

is appropriate on the published DOI review node if this is the first-online
publication date.

For the `PublicationIssue` node, use only the issue’s own date precision. If the
issue is known only as a 2023 issue, prefer:

```json
"datePublished": "2023"
```

or omit the field.

Do not use:

```json
"datePublished": "2023-12-14"
```

on the issue node unless that exact date is independently verified as the issue
publication date.

---

## `/publications/` schema after adding `godless-crusade`

The `/publications/` page schema remains:

```text
CollectionPage
  mainEntity → ItemList
    itemListElement → ListItem[]
```

This structure must be preserved.

The current rendered `/publications/` schema includes:

```json
"numberOfItems": 7
```

This is currently correct for the list shown, because adding the full
`godless-crusade` review page does not necessarily increase the publication-list
count if the publication item was already present as a bibliographic item.

Current `/publications/` items include:

```text
- Challenging Modernity
- Christian Right in Europe
- Hell: In Search of a Christian Ecology
- Cosmic Connections
- Evolution of Religions
- Godless Crusade
- thesis
```

The `godless-crusade` DOI node on `/publications/` is modelled as:

```json
"@type": ["ScholarlyArticle", "Review"]
```

with DOI, date, pagination, and `isPartOf` pointing to the page-local
periodical/volume/issue chain.

The `/publications/` issue node for `godless-crusade` should use:

```json
"issueNumber": "4–5",
"datePublished": "2023"
```

unless the exact issue publication date is verified.

The `/publications/` page may continue to use page-local container IDs such as:

```text
https://stevanveljkovic.com/publications/#review-godless-crusade-periodical
https://stevanveljkovic.com/publications/#review-godless-crusade-volume
https://stevanveljkovic.com/publications/#review-godless-crusade-issue
```

This remains consistent with earlier Stage 3 decisions.

The non-blocking `itemListOrder` issue remains:

```json
"itemListOrder": "https://schema.org/ItemListOrderDescending"
```

If the list is not strictly date-descending, later options are:

```text
- make the order truly descending;
- remove `itemListOrder`;
- document a different ordering principle.
```

This is not a Stage 3.3.2.7 blocker.

---

## `challenging-modernity` rights caution remains active

`challenging-modernity` may appear on `/publications/` as a bibliographic DOI
publication item.

However, if the local `challenging-modernity` review page uses the Taylor &
Francis Version of Record, it must remain draft/non-public until T&F/CCC
permission is clarified.

Current rule remains:

```text
No page using a Taylor & Francis Version of Record should go live until
T&F/CCC has confirmed that the intended public website reuse is permitted.
```

This does not require removing the bibliographic DOI item from `/publications/`.

---

## Image directory convention

The image-directory convention is now explicitly semantic and optional.

Use folders only where the corresponding entity genuinely exists. Do not create
placeholder directories merely to make every review conform mechanically.

Current convention:

```text
reviewed-work/cover.jpg  = image of the reviewed book/work
issue/cover.jpg          = journal issue cover
periodical/poster.jpg    = generic periodical/journal poster or cover image
periodical/banner.jpg    = generic periodical/journal banner image
article/image.jpg        = image belonging to the article/review/post itself
page/social-card.jpg     = local page/social/Open Graph style image
```

Filesystem example:

```text
public/images/publications/reviews/<slug>/reviewed-work/cover.jpg
public/images/publications/reviews/<slug>/issue/cover.jpg
public/images/publications/reviews/<slug>/periodical/poster.jpg
public/images/publications/reviews/<slug>/periodical/banner.jpg
public/images/publications/reviews/<slug>/article/image.jpg
public/images/publications/reviews/<slug>/page/social-card.jpg
```

Corresponding root-relative public URLs:

```text
/images/publications/reviews/<slug>/reviewed-work/cover.jpg
/images/publications/reviews/<slug>/issue/cover.jpg
/images/publications/reviews/<slug>/periodical/poster.jpg
/images/publications/reviews/<slug>/periodical/banner.jpg
/images/publications/reviews/<slug>/article/image.jpg
/images/publications/reviews/<slug>/page/social-card.jpg
```

Images should be attached in JSON-LD to the correct entity:

```text
reviewed-work/cover.jpg → Book or reviewed work node
issue/cover.jpg         → PublicationIssue node
periodical/poster.jpg   → Periodical node
periodical/banner.jpg   → Periodical node only if useful/appropriate
article/image.jpg       → Article/BlogPosting/Review node, only if it belongs
                          to the article/post and rights are clear
page/social-card.jpg    → WebPage/Open Graph/SEO image, if generated locally
```

Do not attach a generic periodical image to a `PublicationIssue` node if it is
not an issue image.

---

## Blog-type review exception: `evolution-of-religions`

`evolution-of-religions` remains a blog/post-type review, not a journal-review
item.

Do not invent a fake issue image or fake issue container for it.

Current model remains:

```text
Published LSE item:
BlogPosting / Review
  isPartOf → Blog: LSE Review of Books
    isPartOf → WebSite: LSE Blogs

Local Stevan-site reproduction:
Article / Review
```

No fake `Periodical → PublicationVolume → PublicationIssue` chain should be
created for LSE Review of Books.

For images, the natural current structure is:

```text
public/images/publications/reviews/evolution-of-religions/reviewed-work/cover.
jpg
```

Only add:

```text
article/image.jpg
```

if there is a rights-cleared image belonging to the LSE post itself.

Only add:

```text
page/social-card.jpg
```

if a local social/Open Graph image is deliberately created.

Do not use the LSE thematic/Shutterstock image unless rights are clear.

---

## Periodical-image exception: `hell-christian-ecology`

The Journal for the Study of Religion, Nature and Culture appears not to have
individual issue images for the relevant issue, but does have generic
periodical-level visual assets.

The following paths are accepted as semantically appropriate:

```text
/images/publications/reviews/hell-christian-ecology/periodical/poster.jpg
/images/publications/reviews/hell-christian-ecology/periodical/banner.jpg
```

Filesystem:

```text
public/images/publications/reviews/hell-christian-ecology/periodical/poster.jpg
public/images/publications/reviews/hell-christian-ecology/periodical/banner.jpg
```

If emitted in JSON-LD, these should attach to the `Periodical` node, not to the
`PublicationIssue` node.

Example:

```json
{
  "@type": "Periodical",
  "name": "Journal for the Study of Religion, Nature and Culture",
  "image":
"https://stevanveljkovic.com/images/publications/reviews/hell-christian-ecology/
periodical/poster.jpg"
}
```

If both images are emitted, `image` may be an array, but this is not required.

Do not create or use:

```text
issue/cover.jpg
```

for `hell-christian-ecology` unless a genuine issue-specific cover is found.

---

## Authorial-voice working rule carried forward

The nuanced authorial-voice rule remains active.

Stevan is comfortable receiving suggested wording in collaborative editing
contexts, including:

```text
- short labels;
- intro/version-note refinements;
- schema-facing descriptions;
- small pieces of site copy;
- technical or structural wording alternatives.
```

But assistants should not generate extended prose in Stevan’s authorial or
interpersonal voice unless explicitly asked.

Avoid unless explicitly requested:

```text
- email drafts in Stevan’s name;
- public-facing prose presented as Stevan’s authored statement;
- extended acknowledgements or biographical prose in Stevan’s voice;
- direct interpersonal communications to be signed by Stevan.
```

Safe assistance remains:

```text
- code;
- schema modelling;
- technical implementation;
- structural notes;
- checklists;
- abstract content requirements;
- neutral analytical commentary;
- short collaborative wording alternatives.
```

This rule should be included in future project memory and assistant rules.

---

## Project-memory reset strategy

The project-memory system has become unwieldy due to accumulated raw logs,
carryovers, generated summaries, deltas, boot prompts, in-project docs, and
assistant-rule files.

Current decision:

```text
Do not solve this by blindly regenerating one enormous new master memory from
all raw logs.
```

Recommended strategy:

```text
1. Establish a clear source-of-truth hierarchy.
2. Create this 2026-05-31 delta as the bridge from the messy state into the
   cleaner system.
3. Rewrite `docs/project-memory/current.md` as compact operational current
   memory.
4. Keep chronological deltas as change history.
5. Use raw logs and generated summaries as archival/audit material, not as
   automatic current authority.
6. Update `.aiassistant/rules/*.md` as concise assistant-facing extracts from
   current memory.
7. Mark or archive stale carryovers and generated master docs.
```

Suggested hierarchy of authority:

```text
1. Actual source code / rendered build output
2. docs/project-memory/current.md
3. Newest relevant project-memory delta not yet incorporated
4. docs/project-memory/DECISIONS.md
5. .aiassistant/rules/*.md as operational assistant rules
6. Older carryovers and boot prompts
7. Generated summaries
8. Raw logs
```

Important distinction:

```text
Raw logs are authoritative for what was said, but not for what is currently
true.
```

The chunking/summarisation system remains useful, but should be repurposed for
audit and backfill, not for producing an automatically authoritative master
memory.

Preferred use of summarisation system:

```text
- extract active decisions;
- extract superseded decisions;
- extract rejected options / do-not-do rules;
- extract unresolved questions;
- flag conflicts with `current.md`;
- verify whether anything important is missing.
```

Do not treat generated summaries as authoritative without review.

---

## `.aiassistant/rules` role

The project also contains assistant-facing rule files:

```text
.aiassistant/rules/
  00-project-identity.md
  10-astro-architecture.md
  20-content-and-publications.md
  30-schema-seo-and-metadata.md
  40-design-css-accessibility.md
  50-assets-urls-and-deployment.md
  60-project-memory.md
  90-working-protocol.md
```

These should not become a competing memory system.

Current rule:

```text
docs/project-memory/current.md = canonical current project memory
.aiassistant/rules/*.md        = concise operational rules for IDE/code
assistance
```

The direction of derivation should be:

```text
raw logs / old summaries
  → audit only

deltas
  → incorporated into current.md

current.md
  → distilled into .aiassistant/rules/*.md
```

`.aiassistant/rules/60-project-memory.md` should explain that the rules are
operational extracts and that, when conflicts arise, assistants should prefer:

```text
actual code/build + docs/project-memory/current.md + latest delta
```

over older carryovers, generated summaries, or raw logs.

---

## Recommended immediate memory-cleanup sequence

After this delta is created, recommended next steps are:

```text
1. Rewrite `docs/project-memory/current.md` from:
   - the latest stable carryover;
   - the 2026-05-30 delta;
   - this 2026-05-31 delta;
   - actual current code/build output where necessary.

2. Create or update `docs/project-memory/README.md` explaining memory authority.

3. Update `docs/project-memory/NEXT-STEPS.md` so it contains only current
   operational tasks.

4. Update `.aiassistant/rules/*.md` to match the new current memory.

5. Mark stale carryovers/full generated docs as superseded or move them to an
   archive.

6. Use the conversation-synthesis/chunking system later only as an audit for
   missed decisions or conflicts.
```

The goal is:

```text
small enough to trust,
explicit enough to guide future assistants,
archival enough that nothing is lost.
```

---

## Validation reminders after Stage 3.3.2.7 changes

Continue to run after relevant changes:

```bash
npx astro sync
npx astro check
npm run build
```

Also inspect:

```bash
find dist -maxdepth 5 -type f | sort
find dist -name "sitemap*.xml" -print -exec cat {} \;
```

Check rendered page-source JSON-LD for:

```text
/publications/
/publications/reviews/godless-crusade/
/publications/reviews/evolution-of-religions/
/publications/reviews/christian-right-europe/
/publications/reviews/cosmic-connections/
```

For `godless-crusade`, confirm:

```text
- local page uses Accepted Manuscript wording;
- local schema does not imply VoR;
- Goodhart correction note is visible;
- DOI node has article/review pagination;
- issue node uses issue-level date precision, preferably `2023` unless exact
  issue date is verified;
- issue number renders as `4–5`;
- no VoR PDF/text is exposed without permission;
- sitemap includes only intended live, non-draft canonical pages.
```