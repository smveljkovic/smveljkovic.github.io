# Astro architecture rules

This project uses Astro. Do not replace Astro with another framework and do not
introduce a theme unless explicitly asked.

The Astro config should preserve:

```js
site: "https://stevanveljkovic.com",
trailingSlash: "always",
```

Preferred config shape:

```js
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://stevanveljkovic.com",
  trailingSlash: "always",
  integrations: [sitemap()],
});
```

Current route model:

```text
src/pages/index.astro                              -> /
src/pages/publications/index.astro                -> /publications/
src/pages/cv/index.astro                          -> /cv/
src/pages/publications/reviews/[slug]/index.astro ->
/publications/reviews/<slug>/
```

Dynamic review routes should be generated from the `reviews` content collection.

Use this naming convention:

```ts
entry = full Astro collection entry
review = entry.data
```

Correct examples:

```ts
entry.id
entry.data
review.slug
review.title
review.citationHtml
```

Avoid confusing entry/data shapes. Do not write `review.data.title` unless
`review` is actually a full collection entry.

Dynamic review routes should query non-draft reviews:

```ts
getCollection("reviews", ({ data }) => !data.draft)
```

Use `entry.data.slug` for route params.

Static route warning: Astro static routes take priority over dynamic routes. Do
not add per-review static page files under:

```text
src/pages/publications/reviews/
```

if they would mask:

```text
src/pages/publications/reviews/[slug]/index.astro
```

Astro content collections should use the current Astro 6 loader pattern:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
```

Do not use duplicate `schema` keys.