# Stage 3: Scholarly consolidation and metadata hardening

## Aim

Stage 3 consolidates the Astro migration into a durable academic website. The
priority is not redesign, but correctness, stability, scholarly metadata, URL
preservation, validation, and maintainability.

## Non-goals

- Do not replace Astro.
- Do not adopt a generic academic theme.
- Do not redesign the site.
- Do not rename legacy CSS classes casually.
- Do not conflate local manuscripts with published DOI versions.
- Do not add planned pages to schema/sitemap until they exist.

## Workstreams

1. Publication data integrity
2. Publications-page JSON-LD
3. Review schema refinement
4. Legacy URL preservation
5. Thesis page
6. Validation and deployment hardening
7. Small accessibility/design fixes

## Checks

Run after significant changes:

```bash
npx astro sync
npx astro check
npm run build
```

## Validation

Validate rendered pages, not source objects:

- https://validator.w3.org/
- https://validator.schema.org/
- https://pagespeed.web.dev/

## Stage 3 completion criteria

Stage 3 is complete when:

- `/`, `/publications/`, `/cv/`, and all live review pages build cleanly.
- `/publications/` includes all intended bibliography entries.
- Publications data is generated from content collections.
- Review JSON-LD validates and accurately distinguishes local and published
works.
- `/publications/` has truthful CollectionPage/ItemList JSON-LD.
- Legacy URLs are preserved or redirected appropriately.
- Sitemap contains only real canonical pages.
- Deployment process is documented.
- Known accessibility/design regressions are fixed.