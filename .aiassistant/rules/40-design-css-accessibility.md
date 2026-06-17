---
apply: always
---

# Design, CSS, And Accessibility

Stage 4.1 primary nav is implemented/live:
Stevan Veljkovic -> /
CV -> /cv/
Publications -> /publications/
Research -> /research/

Preserve the custom visual identity. Do not replace the site with generic academic-theme styling.

Stage 4.0 changes should be constrained, not a full redesign.

Global CSS is preserved in:

```text
src/styles/global.css
```

It should be imported once in `BaseLayout.astro`.

Do not casually rename legacy classes, especially:

```text
Basic-Text-Frame
Name
Details
Headings
BibHeading
BibEntry
counter_bib
countercontrol
control
review_intro
review_text
review_par
counter
title
intro
byline
review_byline
trigger
test
CVEntry
nav-list
pronunciation
```

Homepage identity currently shown in code:

```text
Stevan Veljkovic
Theory and design,
Oxford, England.
[pronunciation: /ˈstɛv(ə)n ˈvɛl.kə.vɪk/]
```

- `pronunciation` text links to /pronunciation/ page
- in transcription guidance use IPA ɛ, not Greek ε

Current canonical `site.email` is `stevan@stevanveljkovic.com`.

Use:

```html
<span lang="und-fonipa">...</span>
```

Accessibility constraints:

- Internal CV links should not use `target="_blank"`.
- External `_blank` links need `rel="noopener"` or `rel="noopener noreferrer"`.
- Decorative nav icons should use `alt="" aria-hidden="true"`.
- Homepage nav `<ul>` must contain `<li>` children.

Known Safari / homepage issue: if `h1.Name` is invisible because of black text on
dark background, use a targeted color fix rather than a CSS rewrite.

Avoid typography / layout rabbit holes during Stage 4.0 verification/cleanup. The inherited
margin-counter / year-marker layout may be revisited in Stage 4.0.

## Note on text-block width

- Preserve the site’s typographic discipline.
   - Keep dense prose in a legible text block rather than stretching it across the viewport.
   - Use approximately `62ch` for serif prose columns and `58ch` for sans-serif prose columns.
   - The narrower sans-serif measure accounts for Case VAR’s larger apparent character width compared with FF Meta
     Serif.
