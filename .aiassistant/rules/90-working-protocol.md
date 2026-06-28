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

Current local/generated pages at the start of Stage 4.3 are `/`, `/cv/`, `/publications/`, `/pronunciation/`,
`/research/`, six review routes, and `/research/doctoral-thesis/religious-atavism-climate-crisis/`: 12 generated HTML
pages in existing `dist/`. After fresh builds, verify route count, sitemap, and live production state rather than
relying on memory.

Drafted reviews may still appear bibliographically on `/publications/`; verify route and sitemap state from the current
build.

Validate rendered JSON-LD with:

```text
https://validator.schema.org/
```

Google Rich Results may report "no items detected" for general scholarly schema;
that is not necessarily an error.

Calibrate warnings. Treat rights-uncertain assets under `public/` as serious
because they deploy live; treat draft/source Markdown visibility in a public repo
as a minor caveat unless Stevan says otherwise. Do not repeatedly escalate
low-probability risks once an informed judgment has been made.

Do not delete old rich schema/reference files unless explicitly asked. They may
remain useful comparison material.

When uncertain whether something is historical, intentional, or obsolete, check
`docs/project-memory/current.md`, `NEXT-STEPS.md`, and `DECISIONS.md`; if still
unclear, check the newest relevant delta or ask before changing it.

For the user's GTD/org-mode task trees, do not rewrite whole subtrees unless
asked. Prefer targeted comments, small edits, and risk flags.
