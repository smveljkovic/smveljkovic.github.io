---
apply: always
---

# Project Identity

This repository is the Astro source for Stevan Veljkovic's personal
academic/professional website:

```text
https://stevanveljkovic.com/
```

The site is a durable academic/research hub, not a generic portfolio or theme.
Preserve its distinctive scholarly presentation during Stage 3.

Current homepage identity in code:

```text
Stevan Veljkovic
Theory and design,
Oxford, England.
```

Canonical domain:

```text
https://stevanveljkovic.com/
```

Separate seminars site:

```text
https://seminars.stevanveljkovic.com/
```

Core identifiers:

```text
ORCID: https://orcid.org/0000-0002-2599-3227
Google Scholar: https://scholar.google.com/citations?user=e42TN4UAAAAJ
GitHub: https://github.com/smveljkovic
```

The canonical JSON-LD `Person.@id` is:

```text
https://orcid.org/0000-0002-2599-3227
```

Email is currently inconsistent and must not be treated as settled:

- `src/data/site.ts` uses `contact@stevanveljkovic.com`.
- the homepage currently hardcodes `hello@stevanveljkovic.com`.
- recent memory points toward aligning on `contact@stevanveljkovic.com`.

Do not include the rejected/conflated OpenAlex profile in `sameAs`.
