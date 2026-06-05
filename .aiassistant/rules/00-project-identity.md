---
apply: always
---

# Project Identity

This repository is the Astro source for Stevan Veljkovic's personal
academic/professional website:

```text
https://stevanveljkovic.com/
```

The site is a durable academic / research hub, not a generic portfolio or theme.
- Preserve migrated / custom identity;
- Stage 4.0 changes should be constrained, not a full redesign.

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

Canonical contact email in current code:

```text
stevan@stevanveljkovic.com
```

Homepage and review intro should use `site.email`.
- Individual review `bylineHtml` once contained manuscript-specific byline addresses;
  - This is now deprecated.

Do not include the rejected / conflated OpenAlex profile in `sameAs`.
- There is true OpenAlex profile: https://openalex.org/authors/A5115945824
