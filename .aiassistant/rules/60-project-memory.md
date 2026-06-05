---
apply: always
---

# Project Memory

Durable operating rules are in `.aiassistant/rules/`. Keep them concise and
operational, but treat them as extracts from current memory, not as a competing
memory system.

Current project memory is in:

```text
docs/project-memory/current.md
```

Supporting files:

```text
docs/project-memory/DECISIONS.md
docs/project-memory/NEXT-STEPS.md
docs/project-memory/deltas/
```

Older carryovers, generated summaries, and raw logs are archival. They are useful
for audit but are not automatically authoritative.

Priority when sources conflict:

1. Current source code and rendered build output.
2. `docs/project-memory/current.md`.
3. `docs/project-memory/NEXT-STEPS.md`.
4. `docs/project-memory/DECISIONS.md`.
5. Newest relevant file in `docs/project-memory/deltas/`.
6. `.aiassistant/rules/*.md`.
7. `docs/metadata/master-values.md` for metadata registry values.
8. `docs/project-memory/archive/`.
9. Older generated summaries, raw logs, and chat-derived material.

If `.aiassistant/rules/*.md` conflicts with the sources above, update the rule
rather than preserving stale operational guidance.
