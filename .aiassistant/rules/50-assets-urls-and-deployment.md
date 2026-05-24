# Assets, URLs, and deployment rules

Use root-relative URLs for public assets. These map to files in `public/`.

Examples:

```html
/images/headshot-1200x630.png
/favicon.ico
/cv/veljkovic-cv.pdf
/publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
```

Avoid fragile deep relative paths.

Important public assets include:

```text
public/images/headshot-1200x630.png
public/favicon.ico
public/favicon.svg
public/site.webmanifest
public/cv/veljkovic-cv.pdf
public/publications/reviews/cosmic-connections/veljkovic-review-cosmic-
connections.pdf
public/publications/reviews/christian-right-europe/veljkovic-review-christian-
right-europe.pdf
```

Open Graph image:

```text
/images/headshot-1200x630.png
```

Use an `absoluteUrl(path)` helper based on:

```ts
new URL(path, site.url).toString()
```

to avoid double slashes.

Preserve old URLs where possible. Important legacy URLs:

```text
/writing.html
/writing/ReviewCosmicConnectionsV2.html
/writing/ReviewCosmicConnectionsV2.pdf
/itinerary.pdf
```

GitHub Pages cannot provide arbitrary server redirects. If staying on GitHub
Pages, use static HTML redirect stubs with:

- canonical link
- meta refresh
- `location.replace`
- visible fallback link

Do not put full JSON-LD on redirect stubs.

Do not replace old PDF URLs with HTML redirect stubs unless true HTTP redirects
are available later. Keep PDFs as PDFs where possible.