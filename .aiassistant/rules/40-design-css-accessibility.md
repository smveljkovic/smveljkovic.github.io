---
apply: always
---

# Design, CSS, And Accessibility

Preserve the custom visual identity. Do not replace the site with generic
academic-theme styling during Stage 3.

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
```

Homepage navigation labels and targets:

```text
Contact  -> currently mailto:hello@stevanveljkovic.com
Résumé   -> /cv/
Writing  -> /publications/
Seminars -> https://seminars.stevanveljkovic.com/
```

The Contact email is an active inconsistency: `site.email` is
`contact@stevanveljkovic.com`, while the homepage hardcodes `hello@...`. Align
before launch.

Pronunciation link and display:

```text
https://ipa-reader.com/?text=stεv(%C9%99)n&voice=Brian
/ˈstεv(ə)n ˈvεlˌkəːvɪk/
```

Use:

```html
<span lang="und-fonipa">...</span>
```

Accessibility constraints:

- Internal CV links should not use `target="_blank"`.
- External `_blank` links need `rel="noopener"` or `rel="noopener noreferrer"`.
- Decorative nav icons should use `alt="" aria-hidden="true"`.
- Homepage nav `<ul>` must contain `<li>` children.

Known Safari/homepage issue: if `h1.Name` is invisible because of black text on
dark background, use a targeted color fix rather than a CSS rewrite.

Avoid typography/layout rabbit holes before launch. The inherited
margin-counter/year-marker layout may be revisited in Stage 4.
