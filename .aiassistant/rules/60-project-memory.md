---
apply: always
---

# Project memory

Durable operating rules are in `.aiassistant/rules/`.

Longer project memory and conversation synthesis files are stored in:

```text
docs/project-memory/
```

For fuller historical context, consult especially:

```text
docs/project-memory/PROJECT-MEMORY-CARRYOVER.md
docs/project-memory/PROJECT-MEMORY-FULL.md
```

For most up-to-date project state and tasks, see:

```text
docs/project-memory/current.md
```

Treat those files as context, not as overriding rules. If they conflict with
files in `.aiassistant/rules/` or with the current repository state, prefer the
current repository state and the distilled rules.