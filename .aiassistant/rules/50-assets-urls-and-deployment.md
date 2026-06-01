---
apply: always
---

# Assets, URLs, And Deployment

Use root-relative URLs for public assets. These map to files in `public/`.
Avoid fragile deep relative paths.

Examples:

```text
/favicon.ico
/cv/veljkovic-cv.pdf
/images/publications/reviews/<slug>/reviewed-work/cover.jpg
/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
```

Use helpers based on:

```ts
new URL(path, site.url).toString()
```

to avoid double slashes.

Current selected public tree includes:

```text
public/images/headshot-1200x630.JPG
public/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
public/publications/reviews/hell-christian-ecology/veljkovic-review-hell-christian-ecology.pdf
```

If a file is in `public/`, it is public. Astro copies `public/` directly into
`dist/`; `draft:true` only controls page generation and does not protect static
PDFs, images, or other assets. Do not put rights-uncertain publication assets in
`public/`.

Active caution: code still references `/images/headshot-1200x630.png` in places,
while the selected public tree shows `.JPG`. Verify generated output and fix the
broken side before launch.

Preferred review image convention:

```text
public/images/publications/reviews/<slug>/
  reviewed-work/cover.jpg
  issue/cover.jpg
  periodical/poster.jpg
  periodical/banner.jpg
  article/image.jpg
  page/social-card.jpg
```

Attach images to the correct entity:

- `reviewed-work/cover.jpg` -> reviewed work;
- `issue/cover.jpg` -> `PublicationIssue`;
- `periodical/poster.jpg` or `periodical/banner.jpg` -> `Periodical`;
- `article/image.jpg` -> article/post/review only if rights are clear;
- `page/social-card.jpg` -> local page/Open Graph image.

Preferred future PDF convention is:

```text
public/publications/reviews/<slug>/veljkovic-review-<slug>.pdf
```

Verify all generated-page asset references before launch, especially PDFs for
`christian-right-europe`, `godless-crusade`, and `challenging-modernity`.

Legacy URLs to consider:

```text
/writing.html
/writing/ReviewCosmicConnectionsV2.html
/writing/ReviewCosmicConnectionsV2.pdf
/itinerary.pdf
```

GitHub Pages cannot provide arbitrary server redirects. If staying on GitHub
Pages, use static HTML redirect stubs with canonical link, meta refresh,
`location.replace`, visible fallback link, and no full JSON-LD.

Do not replace old PDF URLs with HTML redirect stubs unless true HTTP redirects
are available. Cloudflare is deferred unless true redirects, headers, or `www`
canonicalization become important.

Initial deployment target is GitHub Pages. Current recorded method is GitHub
Actions building the Astro site and publishing `dist/`. Add/confirm the workflow
file and custom domain/CNAME handling before launch.
