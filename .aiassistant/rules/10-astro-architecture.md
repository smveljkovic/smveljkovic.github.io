---
apply: always
---

# Astro Architecture

This project uses Astro. Do not replace Astro, introduce a theme, or redesign
the site unless explicitly asked.

Astro config should preserve:

```js
site: "https://stevanveljkovic.com",
trailingSlash: "always",
integrations: [sitemap(), mdx()],
```

Main route model:

```text
src/pages/index.astro                              -> /
src/pages/cv/index.astro                          -> /cv/
src/pages/publications/index.astro                -> /publications/
src/pages/publications/reviews/[slug]/index.astro -> /publications/reviews/<slug>/
```

Review pages are generated from `src/content/reviews/*.md` through the dynamic
review route. Do not add static per-review route files under
`src/pages/publications/reviews/`, because Astro static routes mask dynamic
routes.

Current review files:

```text
challenging-modernity.md
christian-right-europe.md
cosmic-connections.md
evolution-of-religions.md
godless-crusade.md
hell-christian-ecology.md
```

Current observed `dist/` output has 7 pages:

```text
/
/cv/
/publications/
/publications/reviews/cosmic-connections/
/publications/reviews/evolution-of-religions/
/publications/reviews/godless-crusade/
/publications/reviews/hell-christian-ecology/
```

`challenging-modernity` and `christian-right-europe` are currently
drafted/withheld from page generation. Verify the generated route set and
sitemap from the current build during post-launch hardening.

Dynamic review routes should query only non-draft reviews:

```ts
getCollection("reviews", ({ data }) => !data.draft)
```

Use this naming convention:

```ts
const entry = /* full Astro collection entry */;
const review = entry.data;
```

Use `entry.id` for entry identity and `review.slug`, `review.title`, etc. for
frontmatter. Do not write `review.data.title` when `review = entry.data`.

Astro content collections use the Astro 6 loader pattern:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
```

Use `z.url()` for URL validation. Avoid deprecated `z.string().url()`. Do not
use duplicate `schema` keys.
