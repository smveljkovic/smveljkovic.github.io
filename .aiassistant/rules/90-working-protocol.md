---
apply: always
---

# Working Protocol

Before making changes, inspect relevant files. Do not assume the repository
matches old memory notes.

Prefer small, reversible edits. Do not rewrite broad CSS, routing, or schema
systems unless explicitly asked.

Use `rg` for searches.

After meaningful Astro/content/schema changes, run or suggest:

```bash
npx astro sync
npx astro check
npm run build
```

For routing and content checks:

```bash
find src/pages/publications/reviews -type f
find src/content -maxdepth 4 -type f | sort
```

For generated route checks after build:

```bash
find dist -maxdepth 5 -type f | sort
find dist -name "sitemap*.xml" -print -exec cat {} \;
```

Current expected generated pages are `/`, `/cv/`, `/publications/`, and six
review routes, unless `challenging-modernity` is drafted/withheld for rights.

Validate rendered JSON-LD with:

```text
https://validator.schema.org/
```

Google Rich Results may report "no items detected" for general scholarly schema;
that is not necessarily an error.

Do not delete old rich schema/reference files unless explicitly asked. They may
remain useful comparison material.

When uncertain whether something is historical, intentional, or obsolete, check
`docs/project-memory/current.md`, `DECISIONS.md`, and `NEXT-STEPS.md`; if still
unclear, ask before changing it.
