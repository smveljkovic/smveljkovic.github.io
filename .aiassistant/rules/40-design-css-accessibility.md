# Design, CSS, and accessibility rules

Preserve the custom visual identity. Do not replace the site with generic
academic theme styling.

Global CSS is currently preserved in:

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

Preserve `p.Headings` unless the CSS is deliberately rewritten.

Homepage navigation labels and links:

```html
Contact  -> mailto:hello@stevanveljkovic.com
Résumé   -> /cv/
Writing  -> /publications/
Seminars -> https://seminars.stevanveljkovic.com/
```

Pronunciation link:

```text
https://ipa-reader.com/?text=stεv(%C9%99)n&voice=Brian
```

Displayed IPA:

```text
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
dark background, a likely fix is:

```css
h1.Name {
  color: #fff;
}
```