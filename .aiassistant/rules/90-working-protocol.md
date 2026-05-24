# Working protocol for AI assistant

Before making changes, inspect the relevant files. Do not assume the repository
exactly matches old memory notes.

Prefer small, reversible edits.

After meaningful Astro/content/schema changes, suggest running:

```bash
npx astro sync
npx astro check
npm run build
```

For routing issues, inspect:

```bash
find src/pages/publications/reviews -type f
find src/content -maxdepth 4 -type f -print
```

For generated review routes, inspect:

```bash
ls dist/publications/reviews/
ls dist/publications/reviews/cosmic-connections/
ls dist/publications/reviews/christian-right-europe/
```

Use Schema Markup Validator for general JSON-LD:

```text
https://validator.schema.org/
```

Google Rich Results may report “no items detected” for general scholarly schema
types; this is not necessarily an error.

Do not delete old rich schema/reference files unless explicitly asked. They may
be benchmarks for future generated schema.

When uncertain whether something is historical, intentional, or obsolete, ask
before changing it.

For fuller historical context, consult `docs/project-memory/`, especially
`PROJECT-MEMORY-CARRYOVER.md`.