---
apply: always
---

# Assets, URLs, And Deployment

- `main` is production.
- `stage-4-0` is the Stage 4.0 integration branch.

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
public/images/headshot-1200x630.jpg
public/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
public/publications/reviews/hell-christian-ecology/veljkovic-review-hell-christian-ecology.pdf
```

If a file is in `public/`, it is public. Astro copies `public/` directly into
`dist/`; `draft:true` only controls page generation and does not protect static
PDFs, images, or other assets. Do not put rights-uncertain publication assets in
`public/`.

Temporarily removed withheld-review materials currently live at:

```text
~/Projects/website-admin/withheld-images-folders/
```

Remaining cleanup: check home/CV JSON-LD for stale `/images/headshot-1200x630.png` references.

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
- `article/image.jpg` -> article / post / review only if rights are clear;
- `page/social-card.jpg` -> local page / Open Graph image.

Preferred future PDF convention is:

```text
public/publications/reviews/<slug>/veljkovic-review-<slug>.pdf
```

Verify generated-page asset references during Stage 4.0 verification/cleanup. Keep
drafted / withheld `christian-right-europe` and `challenging-modernity` assets out
of `public/` unless rights / publication decisions change.

- Netlify is production host;
- builds from origin/main;
- build command `npm run build`;
- publish `dist`;
- `public/CNAME` and GitHub Actions Pages deploy are retired for the Astro site;
- legacy URLs use forced Netlify 301! rules in `public/_redirects`;
   - keep 301! while physical compatibility files remain;
- seminars subdomain remains on GitHub Pages.

The site is live at `https://stevanveljkovic.com/`.

Submit this sitemap in Google Search Console:

```text
https://stevanveljkovic.com/sitemap-index.xml
```

`https://www.stevanveljkovic.com/` should redirect permanently to the apex
domain.

Local thesis PDF may be hosted only after confirming CC BY 4.0 permission, choosing a stable path/filename, and
verifying the generated/live link.
