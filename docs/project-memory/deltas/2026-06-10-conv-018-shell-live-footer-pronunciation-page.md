# 2026-06-09 — Stage 4.1a shell live and footer/pronunciation follow-up

## What changed

- Stage 4.1a shell v1 has been implemented, merged to `main`, deployed by Netlify, and is live.
- Live shell now includes:
  - global header;
  - footer;
  - stable primary/footer navigation;
  - `/pronunciation/` page;
  - homepage pronunciation link updated to local `/pronunciation/`;
  - old external IPA Reader link removed;
  - old inherited homepage nav/icon block removed/deferred;
  - link, focus, hover, active, and current-page behaviour tuned.
- The homepage currently keeps the sparse masthead identity:
  ```text
  Stevan Veljkovic
  Theory and design,
  Oxford, England.
  [pronunciation line]
  ```
- The old homepage icons/nav continuity idea was considered but deferred to avoid turning 4.1a into a larger homepage design task.
- The merge/release process succeeded; `stage-4-0` was merged to `main` for the coherent 4.1a release unit.
- A Netlify Observability 404 spike was discussed and interpreted as likely automated bot scanning. No incident was identified from the conversation; follow-up principle is to check for suspicious `200` responses and ensure `dist/`, `public/`, and the public repo contain no secrets or unintended rights-sensitive assets.
- Project-memory trimming workflow was clarified:
  - active repo memory should stay compact and operational;
  - expanded/trimmed material should remain in the external `website-admin` archive as background;
  - do not maintain compact memory and expanded archive as co-equal canonical sources.

## Decisions made

- Project-memory updates for Stage 4 work should be made on `stage-4-0` and reach `main` through normal coherent release merges, not by separately editing `main`, except for urgent production-only corrections.
- Footer should complete the site shell and remain modest/link-based, not become a second homepage.
- Footer links should include:
  ```text
  Contact → mailto:stevan@stevanveljkovic.com
  ORCID → https://orcid.org/0000-0002-2599-3227
  Google Scholar → https://scholar.google.com/citations?user=e42TN4UAAAAJ
  GitHub → https://github.com/smveljkovic
  Pronunciation → /pronunciation/
  Seminars → https://seminars.stevanveljkovic.com/
  ```
- `/pronunciation/` should exist as a small canonical page rather than linking to an external IPA Reader service.
- Homepage pronunciation line should remain as an identity/detail aid, but link to `/pronunciation/`.
- Pronunciation page v1 should use broad IPA:
  ```text
  /ˈstɛv(ə)n ˈvɛl.kə.vɪk/
  ```
  and should explicitly clarify that the first syllable is `STEV`, not `STEEV`, i.e. not pronounced like “Steven” or “Steve”.
- Use proper IPA `ɛ`, not Greek epsilon `ε`.
- The current link styling arrangement is acceptable unless contrast/usability problems are found; avoid further tuning without a real issue.
- Git `origin` does not need to change merely because deployment moved from GitHub Pages to Netlify. The historically GitHub-Pages-like repo name is optional admin cleanup only.

## Files affected

Exact final changed-file set was not supplied in the conversation, but the work likely involved:

- `src/components/SiteHeader.astro`
- `src/components/SiteFooter.astro`
- `src/layouts/BaseLayout.astro`
- `src/data/navigation.ts`
- `src/pages/index.astro`
- `src/pages/pronunciation/index.astro`
- `src/styles/global.css`
- project-memory files and AI rules during related memory maintenance

Also discussed but not necessarily changed in this session:

- `docs/project-memory/current.md`
- `docs/project-memory/NEXT-STEPS.md`
- `docs/project-memory/DECISIONS.md`
- `.aiassistant/rules/*`
- `docs/metadata/master-values.md`

## Bugs/fixes

- Fixed/removed duplicate or confusing navigation semantics from the inherited homepage block; only the real global nav should be `aria-label="Primary"`.
- Footer nav should use a separate label such as `Footer` or `Secondary`, not `Primary`.
- Old IPA Reader homepage link should be gone; local `/pronunciation/` is now authoritative.
- Link behaviour was tuned to the current live arrangement:
  - primary/footer nav links:
    - white text at rest;
    - no underline at rest;
    - blue underline on hover;
    - yellow underline on keyboard focus;
    - current-page item has yellow underline;
    - hovering current-page item keeps yellow underline.
  - body/content links:
    - unvisited links are blue;
    - visited links are purple;
    - resting underline color is white;
    - hover changes text to inherited page color and gives blue underline;
    - active links become yellow with yellow underline.
  - keyboard focus:
    - focused links/buttons get yellow outline;
    - focused links also get yellow underline.
  - publication resource pills:
    - no underline at rest;
    - blue underline on hover;
    - yellow text/underline while active.
- W3 validator issue from old icon asset path may already be resolved by homepage nav/icon removal, but should be checked:
  ```text
  /images/Asset 1.png
  ```
  contained a space and was previously invalid in an `img src`.
- Active memory needs correction: it still says latest observed `dist/` snapshot has 7 pages, but with `/pronunciation/` live the expected generated route set before `/research/` should now be 8 pages.
- Active memory also still contains stale “finish 4.1a shell” immediate-next-step language even though 4.1a is now live.

## Current state

- Production is live on Netlify from `origin/main`.
- Stage 4.1a shell v1 is live.
- Expected live/generated routes before `/research/`:
  ```text
  /
  /cv/
  /publications/
  /pronunciation/
  /publications/reviews/cosmic-connections/
  /publications/reviews/evolution-of-religions/
  /publications/reviews/godless-crusade/
  /publications/reviews/hell-christian-ecology/
  ```
- `Research` should still remain absent from live primary navigation until `/research/` exists.
- Next coherent release unit is Stage 4.1b:
  - create compact `/research/` hub;
  - then expose `Research → /research/` in primary nav;
  - then proceed toward thesis page.
- Random accumulated tasks should be stored in a single website backlog/org subtree rather than as unrelated top-level items.

Suggested org grouping from the conversation:

```org
* Website — smvsite-astro
** Active / next release
** Validation and small fixes
** Content and metadata cleanup
** Rights-sensitive publication work
** Repo/admin
** Someday / parked
```

Promote only a few items into active work now:

- create `/research/`;
- add Research to nav once `/research/` exists;
- verify/fix W3 image path issue if still present;
- update `/publications/` citation of `hell-christian-ecology` to use the `doi.org` address.

## Next steps

1. Update active memory to remove stale 4.1a TODO language and record 4.1a as live.
2. Update expected route/sitemap checks from 7 pages to 8 pages because `/pronunciation/` is live.
3. Verify current live/build state:
   ```bash
   npx astro sync
   npx astro check
   npm run build
   npm run preview
   find dist -name "sitemap*.xml" -print -exec cat {} \;
   ```
4. Confirm sitemap includes `/pronunciation/` and still excludes `/research/`.
5. Check link contrast, especially blue/purple on dark background, but do not keep tuning unless there is a real issue.
6. Verify W3 validator image-path issue is gone or fix the offending asset/reference.
7. Update `hell-christian-ecology` publication citation to use the `doi.org` address.
8. Continue with Stage 4.1b:
   - implement compact `/research/` hub;
   - add `Research` to primary nav only after the route exists;
   - include Seminars bridge only if it fits naturally;
   - then implement thesis page route:
     ```text
     /research/doctoral-thesis/religious-atavism-climate-crisis/
     ```

## Details not to lose

- Pronunciation page v1 text settled around:
  ```text
  /ˈstɛv(ə)n ˈvɛl.kə.vɪk/

  This is the pronunciation of my name in English. The transcription is broad rather than narrowly phonetic.

  My first name is stressed on the first syllable: /ˈstɛv(ə)n/. The first vowel is /ɛ/, the DRESS vowel of English, as in bed in many accents. The middle vowel may be reduced.

  The first syllable is therefore STEV, not STEEV; it is not pronounced like the names Steven and Steve.

  My surname is also stressed on the first syllable: /ˈvɛl.kə.vɪk/.

  All together, roughly: STEV-(ən) VEL-kuh-vik.

  Audio may be added later.
  ```
- The pronunciation is broad, practical English guidance rather than a narrow phonetic/acoustic claim.
- Case VAR optical sizing guidance from the session:
  - prefer `font-optical-sizing: auto`;
  - do not manually set `opsz` unless a visible problem appears;
  - manual optical-size tokens can be deferred.
- Netlify 404 spike:
  - likely bot scanning if suspicious guessed paths return `404`;
  - concerning only if sensitive-looking paths return `200`;
  - public repo risk is more about secrets and rights-sensitive/draft material than the 404 spike itself.
- zsh/grep clarification:
  - `grep` exit code `1` means “no matches”, not necessarily an error;
  - zsh `$pipestatus` can show pipeline component statuses.
- Trimmed reference memory already covers much of the background on rights, trusted HTML migration, dev-only draft preview, OpenAlex, deployment guardrails, and project-memory procedure. Do not re-add trimmed material wholesale to active memory.
- The external trimmed/archive material should be treated as contextual background, while active repo memory remains the operational source of truth.
- Active memory currently has minor inconsistencies to fix:
  - dangling blank bullet under “Stage 4.1a shell v1 is live”;
  - stale 7-page route snapshot;
  - stale immediate-next-step wording about finishing 4.1a.
