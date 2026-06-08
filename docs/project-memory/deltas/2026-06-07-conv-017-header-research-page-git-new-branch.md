# 2026-06-07 — Stage 4.1 navigation, research route, and deployment workflow

## What changed

- Stage 4.0 planning moved from broad scope-setting into Stage 4.1 site-shell decisions.
- Stage 4.0 time budget was revised and operationalised in org-mode:
  ```text
  Target: 40–50 hours
  Effort property: 50:00
  Mandatory scope review: 30:00
  Re-scope / stop-and-decide threshold: 55:00
  Current logged time at session start: ~6h 30m
  ```
- Adopted a governance rule:
  ```text
  Project-memory maintenance should not consume more than 10–15% of Stage 4.0 work from here onward.
  ```
- User added Stage 4.0 org-mode project structure/properties in `~/org/smvsite.org`.
- Thesis slug was settled as:
  ```text
  religious-atavism-climate-crisis
  ```
- `/research/` was judged legitimate and will be created as a compact research hub.
- Thesis route was settled as:
  ```text
  /research/doctoral-thesis/religious-atavism-climate-crisis/
  ```
- Primary navigation was settled for Stage 4.1:
  ```text
  Stevan Veljkovic → /
  CV → /cv/
  Publications → /publications/
  Research → /research/
  ```
  but `Research` should not appear live until `/research/` exists.
- Footer / secondary navigation was settled:
  ```text
  Contact → mailto:stevan@stevanveljkovic.com
  ORCID → https://orcid.org/0000-0002-2599-3227
  Google Scholar → https://scholar.google.com/citations?user=e42TN4UAAAAJ
  GitHub → https://github.com/smveljkovic
  Pronunciation → /pronunciation/
  Seminars → https://seminars.stevanveljkovic.com/
  ```
- Seminars integration was scoped as “bridge, don’t migrate”:
  - keep `https://seminars.stevanveljkovic.com/` separate for now;
  - expose Seminars in footer / secondary nav;
  - optionally add a short Seminars section/card on `/research/`;
  - do not import seminar PDFs/assets into the main Astro site during Stage 4.1.
- User reports a basic header is now up, with `Research` commented out in `SiteHeader.astro` pending creation of `/research/`.

## Decisions made

- Do not deploy Stage 4.0 as one big-bang release.
- Do not deploy every micro-step.
- Deploy coherent public release units:
  ```text
  4.1a shell v1: header + footer + stable nav, no broken links
  4.1b research hub v1: /research/ exists and Research appears in nav
  4.2 thesis page v1
  4.3 CV expansion v1
  4.4+ bounded design / interaction improvements
  ```
- Treat `main` as production because Netlify deploys from `origin/main`.
- Recommended git model:
  ```text
  main = production
  stage-4-0 = work / integration branch
  merge to main = coherent public release units
  ```
- If current header work is uncommitted on `main`, create `stage-4-0`, commit it there, and continue work off production.
- Header/navigation should be implemented in Astro/CSS/browser iteration, not by beginning in Figma or Adobe tools.
- No hamburger menu for the first navigation pass; use a no-JavaScript responsive layout because primary nav has only three links.
- Header should be a stable global site shell:
  ```html
  <header>
    <a href="/">Stevan Veljkovic</a>
    <nav aria-label="Primary">…</nav>
  </header>
  ```
- Header, homepage masthead, and page heading should remain conceptually distinct.
- Research page principles:
  - do not apologise for lack of conventional research articles;
  - do not overclaim;
  - separate outputs from themes;
  - treat `/research/` as a map/signposting hub, not an essay or manifesto;
  - give the doctoral thesis pride of place;
  - keep first version modest.

## Files affected

- User reports notes are being kept outside the repo at:
  ```text
  ~/Projects/website-admin/stage-4-0/
  ├── plan-mission-note.md
  ├── research-page-prospectus.md
  ├── stage-4-1-decisions.md
  └── stage-4-1-nav-decisions.md
  ```
- User drafted provisional primary-navigation material in `docs/project-memory/current.md`; this should be cleaned/consolidated rather than left as a heavily provisional table.
- User reports a basic header exists in code, with `Research` commented out in `SiteHeader.astro` until `/research/` is implemented.
- Discussed likely future implementation files:
  ```text
  src/data/navigation.ts
  src/components/SiteHeader.astro
  src/components/SiteFooter.astro
  src/layouts/BaseLayout.astro
  src/styles/global.css
  ```
  but the conversation does not confirm all of these were changed. [Review note: All of these *were* changed]

## Bugs/fixes

- Correct typo from provisional nav table:
  ```text
  Steavn Veljkovic → Stevan Veljkovic
  ```
- Do not expose a live `Research` nav link until `/research/` exists.
- Do not place seminar PDFs directly on `/research/` during Stage 4.1; that would turn the page into a storage shelf and risk scope creep.
- Avoid a primary-nav `Contact` mailto link unless a real `/contact/` page exists.
- Avoid putting `Seminars` in primary nav for now; it remains a separate subdomain and belongs in footer / secondary nav initially.

## Current state

- Stage 4.0 is now planned with:
  ```text
  target: 40–50h
  review: 30h
  rescope: 55h
  ```
- Stage 4.1 current focus is site shell:
  ```org
  - [ ] Implement proper header/navigation
    - [ ] Desktop layout
    - [ ] Narrow/mobile layout
    - [ ] Active/current-page state
    - [ ] Accessible markup
  ```
- `/research/` is now intended, but not yet confirmed as implemented.
- Thesis route is now decided but should not be linked until implemented:
  ```text
  /research/doctoral-thesis/religious-atavism-climate-crisis/
  ```
- Basic header exists locally according to user report; `Research` is commented out pending `/research/`.
- Seminars remains separate at:
  ```text
  https://seminars.stevanveljkovic.com/
  ```

## Next steps

1. Create/switch to a `stage-4-0` branch if current header work is still on `main` and not ready for production:
   ```bash
   git status
   git switch -c stage-4-0
   git add .
   git commit -m "Add initial site header navigation"
   git push -u origin stage-4-0   
   ```
[Review note: This has now been done – stage-4-0 branch exists and is the current working branch

```zsh
      ~/Projects/smvsite-astro      stage-4-0 !2 ▓▒░ git status                                                                                                                                          ░▒▓ ✔   00:02:04   
On branch stage-4-0
Your branch is up to date with 'origin/stage-4-0'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   docs/project-memory/current.md
        modified:   src/styles/global.css

no changes added to commit (use "git add" and/or "git commit -a")
```
]   
   
2. Finish “shell v1” before deploying:
   - header;
   - footer;
   - stable nav;
   - no broken links;
   - no `Research` link until `/research/` exists;
   - mobile/narrow layout;
   - active/current-page state;
   - accessible markup.
3. Implement footer with:
   ```text
   Contact / ORCID / Google Scholar / GitHub / Pronunciation / Seminars
   ```
4. Create `/research/` as a compact hub.
5. Once `/research/` exists, add `Research → /research/` to primary nav.
6. Add only a short Seminars bridge on `/research/` if it fits naturally.
7. Then implement the thesis page at:
   ```text
   /research/doctoral-thesis/religious-atavism-climate-crisis/
   ```
8. Before merging any Stage 4.0 increment to `main`, run:
   ```bash
   npx astro check
   npm run build
   npm run preview
   ```
   and inspect:
   ```text
   /
   /cv/
   /publications/
   /publications/reviews/cosmic-connections/
   /publications/reviews/evolution-of-religions/
   /publications/reviews/godless-crusade/
   /publications/reviews/hell-christian-ecology/
   /research/   once created
   ```

## Details not to lose

- Minimal `/research/` structure:
  ```text
  Research
  - Doctoral thesis
  - Research themes
  - Earlier academic work
  - Publications and review essays
  - Seminars
  ```
- Internal purpose of `/research/`:
  ```text
  1. provide a clear path to the doctoral thesis;
  2. identify recurring themes of academic work;
  3. connect formal publications, review essays, seminars, and earlier research;
  4. indicate future directions without overpromising.
  ```
- Research-page copy should not say or imply:
  ```text
  I have not produced enough.
  This page exists despite a lack.
  These are only stubs.
  This is not really research.
  ```
- The doctoral thesis is a legitimate major research output and should anchor `/research/`.
- Reviews can be described as research-adjacent without overclaiming:
  ```text
  Several review essays intersect with these research themes, especially around religion, politics, ecology, and modernity.
  ```
- Do not let Seminars become a migration task now. Existing seminars repo tree was noted as small but conceptually non-trivial to migrate; full seminars reconstruction remains deferred.
- Header implementation acceptance criteria:
  ```text
  - appears across the site;
  - brand link goes to /;
  - primary nav has CV, Publications, and later Research;
  - desktop and mobile layouts work;
  - current section visibly marked;
  - aria-current present;
  - keyboard focus visible;
  - existing routes still build;
  - pages not visually broken beyond acceptable first-pass roughness.
  ```
- Avoid in first header pass:
  ```text
  hamburger menu
  animation
  scroll effects
  sticky header
  complex logo work
  theme switcher in header
  dropdowns / mega menu
  icon system
  Figma design system
  complete typography redesign
  ```
