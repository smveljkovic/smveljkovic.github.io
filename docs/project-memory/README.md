# Project Memory System

This directory stores durable project memory for the Astro site. It is meant to
help future work start from the current project state without relying on long
chat transcripts.

## Source Priority

When sources conflict, use this order:

1. Current source code and rendered build output.
2. `docs/project-memory/current.md`.
3. `docs/project-memory/NEXT-STEPS.md`.
4. `docs/project-memory/DECISIONS.md`.
5. Newest relevant file in `docs/project-memory/deltas/`.
6. `.aiassistant/rules/*.md`.
7. `docs/metadata/master-values.md` for metadata registry values.
8. `docs/project-memory/archive/`.
9. Older generated summaries, raw logs, and chat-derived material.

If a lower-priority file contains useful information that conflicts with a
higher-priority source, preserve it as uncertain/staged information rather than
treating it as automatically current.

## Current Operational Files

### `current.md`

The compact current state of the project. This is the primary memory file for
architecture, current routes, active cautions, current implementation status,
and immediate next work.

### `DECISIONS.md`

The categorized decisions register. It records current durable decisions,
active unresolved decisions, deferred decisions, and superseded decisions.

### `NEXT-STEPS.md`

The active operational checklist. Its main purpose is to contain current work. It may also include active checks,
preservation rules, deferred work, and a short superseded-assumption audit.

### `deltas/`

Chronological change notes after a current-memory baseline. Deltas are useful
for tracing why a decision was made, but they may be superseded by `current.md`
or `DECISIONS.md`.

## Project Rules

The `.aiassistant/rules/` files are concise operational extracts for AI-assisted
work. They should be fast to read and action-oriented.

They do not replace `current.md`; they distill it into working rules. If rules
conflict with current code or `current.md`, update the rules.

Current rule files cover:

```text
.aiassistant/rules/00-project-identity.md
.aiassistant/rules/10-astro-architecture.md
.aiassistant/rules/20-content-and-publications.md
.aiassistant/rules/30-schema-seo-and-metadata.md
.aiassistant/rules/40-design-css-accessibility.md
.aiassistant/rules/50-assets-urls-and-deployment.md
.aiassistant/rules/60-project-memory.md
.aiassistant/rules/90-working-protocol.md
```

`.aiassistant/rules/` should mark historical material explicitly rather than carrying it as active guidance

## Metadata Registry

`docs/metadata/master-values.md` is the human-readable registry for canonical
metadata values, page metadata, schema IDs, review metadata, date rules, asset
paths, sitemap rules, and staged contradictions.

It is especially useful when working on:

- `src/data/site.ts`
- `src/data/pageMeta.ts`
- JSON-LD/schema generators
- Open Graph metadata
- review frontmatter
- canonical URLs and node IDs

It is not automatically the code source of truth. If `master-values.md` conflicts
with code or `current.md`, use the higher-priority source and stage the conflict
inside `master-values.md` rather than silently deleting it.

## Archive

`docs/project-memory/archive/` contains older project-memory material. It is for
audit and recovery, not current operational guidance.

Archive structure:

```text
docs/project-memory/archive/
  old-carryovers/
  old-master-files/
  old-production-texts/
  old-stage-definitions/
  old-validation/
```

The most potentially useful archived items are in:

```text
docs/project-memory/archive/old-master-files/
```

In particular, `old-master-files/PROJECT-MEMORY-FULL.md` may contain detailed
historical context that was intentionally compressed out of `current.md`.

Use archive files when:

- reconstructing why an older decision was made;
- recovering details omitted from current memory;
- auditing stale metadata;
- checking old production text or validation notes.

Do not copy archive content into current files without checking it against
current code, `current.md`, `DECISIONS.md`, and `NEXT-STEPS.md`.

## Maintenance Rules

- Keep `current.md` compact and operational.
- Keep `DECISIONS.md` categorized and explicit about final, active, deferred, and
  superseded decisions.
- Keep NEXT-STEPS.md primarily focused on current tasks.
   - It may also include active checks, preservation rules, deferred work, and a short superseded-assumption audit
- Keep `.aiassistant/rules/` concise and actionable.
- Keep `master-values.md` current for metadata and retain contradictions in its
  staging/audit sections.
- Move stale generated summaries and large historical files into `archive/`
  rather than letting them compete with current memory.

## Operational control

- TODO items and project structure are managed in org-mode sub-trees as part of a GTD organisation system
- `~/org/smvsite.org`
