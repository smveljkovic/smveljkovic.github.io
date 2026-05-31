---
apply: always
---

# Project Memory

Durable operating rules are in `.aiassistant/rules/`. Keep them concise and
operational.

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

1. Current source code / rendered build
2. `docs/project-memory/current.md`
3. `.aiassistant/rules/*.md`
4. `docs/project-memory/DECISIONS.md`
5. `docs/project-memory/NEXT-STEPS.md`
6. Newest relevant delta
7. Older carryovers and generated summaries
8. Raw logs

If `.aiassistant/rules/*.md` conflicts with current code or `current.md`, update
the rule rather than preserving stale operational guidance.
