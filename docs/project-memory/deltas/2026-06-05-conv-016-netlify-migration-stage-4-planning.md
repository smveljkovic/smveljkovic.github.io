# 2026-06-05 — Stage 3 complete, Netlify migration, Stage 4.0 planning

## What changed

- Stage 3 is now reported complete.
- Hosting moved from GitHub Pages to Netlify.
- The canonical domain remains:
  ```text
  https://stevanveljkovic.com/
  ```
- Live checks reportedly passed after DNS cutover:
  - apex works;
  - `www` redirects to apex;
  - legacy URLs return real `301` redirects;
  - sitemap works;
  - `seminars.stevanveljkovic.com/` still works.
- DNS now resolves the apex to Netlify’s Hover fallback A record:
  ```text
  stevanveljkovic.com A 75.2.60.5
  ```
- Netlify was chosen over Cloudflare Pages after test deployments.
- Stage 4.0 planning began in a new org-mode project:
  ```org
  * PROJECT Do =smvsite-astro= stage 4.0
  ```
- A Stage 4.0 mission/planning note was created outside the site repo:
  ```text
  ~/Projects/website-admin/stage-4/plan-mission-note.md
  ```

## Decisions made

- Use **Netlify** as the production deployment host.
  - Rationale: frictionless deploy workflow, real redirects, private-repo-capable deployment, lower conceptual overhead than Cloudflare.
  - Cloudflare remains a possible future option, but not needed now.
- Keep the **apex domain** as canonical despite Netlify’s recommendation to prefer `www` for optimal CDN behaviour.
- Keep DNS hosted at **Hover** for now.
  - Do not move DNS to Netlify for the foreseeable future.
    - Revisit this only in case of perceived performance isues.
  - Accept Netlify’s fallback A-record setup, for now.
    - If performance issues arise:
      - Consider using Cloudflare to make use of Netlify’s preferred load-balancer route.
- Keep the seminars subdomain separate and untouched:
  ```text
  CNAME seminars smveljkovic.github.io
  ```
- Retire GitHub Pages as the deployment mechanism.
  - The old planned task “enable GitHub Actions build-on-push” is superseded by Netlify’s build-on-push.
- Use forced Netlify redirects (`301!`) for legacy URLs while old compatibility files still exist.
- Stage 4.0 should be a constrained “core architecture and design foundation” phase, not an unbounded redesign.
- Stage 4.0 in scope:
  - thesis page;
  - expanded/web-native CV page;
  - header/navigation/footer;
  - first-pass design foundation;
  - constrained light/dark mode as part of design foundation;
  - one review-page reading aid as the bounded “bells-and-whistles” feature;
  - conceptual/visual bridge to the seminars project.
- Stage 4.0 deferred:
  - full thesis HTML edition;
  - full seminars reconstruction;
  - blog launch;
  - broad React/Vue experimentation;
  - full redesign;
  - complete CSS refactor;
  - multiple “fun” UI features.
- CV direction: hybrid page, with the HTML page doing its own web-native work and the PDF remaining available as formal/downloadable resource.
- Review-page reading aid is the selected bounded experimental feature.
- Light/dark mode is in scope only as constrained design-foundation work, not as a second experimental feature.
- Thesis route is not settled. Current preferred candidates:
  - `/research/doctoral-thesis/` if a `/research/` landing/bridge page is also created;
  - `/doctoral-thesis/` if avoiding a new parent section.
  Less-preferred:
  - `/thesis/` — elegant but under-descriptive;
  - `/phd-thesis/` — clear but possibly less formally exact than “doctoral thesis”;
  - `/research-projects/thesis/` — descriptive but long/bureaucratic.

## Files affected

- Reported/likely project files affected by the Netlify migration:
  - `public/_redirects`
    - Added/updated with forced `301!` rules for legacy redirects.
  - `public/CNAME`
    - GitHub Pages artefact; recommended/treated as removed after Netlify cutover.
  - `.github/workflows/deploy.yml`
    - GitHub Pages deployment workflow; recommended/treated as retired after Netlify cutover.
- External planning/admin file created:
  ```text
  ~/Projects/website-admin/stage-4/plan-mission-note.md
  ```
- Org-mode file
  - ~/org/smvsite-astro/
  - Now has new PROJECT tree for Stage 4.0
  - Tree for Stage 3 PROJECT remains in file as archival
- Cloudflare created accidental artefacts during testing:
  - accidental Workers-style deployment;
  - possible KV namespace:
    ```text
    smvsite-astro-session
    ```
  - automatic GitHub PR: “Add Cloudflare Workers configuration”.
  These were not intended to be merged into `main`.
  - these artefacts have been deleted / cleaned up.

## Bugs/fixes

- GitHub Actions first-run “errors” were diagnosed as Node.js 20 runtime deprecation warnings for GitHub Actions, not Astro build failures.
  - Since Netlify was chosen, revising the GitHub Pages workflow became unnecessary.
- Cloudflare first test accidentally followed a Workers/full-stack path rather than static Pages.
  - Symptom: build failure while a `workers.dev` URL appeared live.
  - Cause: Cloudflare tried to provision a `SESSION` KV namespace and collided with an existing namespace.
  - Resolution: identify as wrong deployment type; later Cloudflare Pages static deployment worked.
- Netlify initially served an existing legacy PDF with `200` instead of redirecting.
  - Cause: old compatibility file existed at the legacy path.
  - Fix: use forced Netlify redirects:
    ```text
    301!
    ```
- GitHub Pages IPv6 `AAAA` records were confirmed as GitHub Pages records and removed/replaced during Netlify cutover.
- Netlify’s “apex fallback” warning was interpreted as an optimisation/flexibility issue, not evidence that GitHub Pages is more reliable.

## Current state

- Stage 3 is complete.
- Production host is Netlify.
- DNS:
  - apex points to Netlify fallback A record:
    ```text
    75.2.60.5
    ```
  - `www` points to Netlify and redirects to apex.
  - `seminars.stevanveljkovic.com` remains on GitHub Pages.
- Legacy redirects now work as real `301`s on the canonical domain.
- Netlify build-on-push to `main` has replaced the intended GitHub Actions build-on-push workflow.
- GitHub Pages workflow and `public/CNAME` are no longer part of the active deployment model.
- GitHub Pages TXT verification record is harmless cleanup, not urgent.
- Optional later cleanup:
  - make repo private;
  - remove old compatibility files once confident redirects suffice;
  - remove GitHub Pages TXT challenge;
  - add Netlify `_headers`;
    - this note initially said ‘only if justified’
    - but Stevan would like to know how headers work.
- Stage 4.0 planning is underway, with active remaining planning tasks:
  - update project memory for Stage 3 completion and Netlify hosting;
  - decide Stage 4.0 approximate time budget.

## Next steps

- Update core project memory to reflect:
  - Stage 3 complete;
  - Netlify production hosting;
  - GitHub Pages deployment retired;
  - Hover fallback A-record setup;
  - real Netlify redirects;
  - Stage 4.0 scope.
- Decide Stage 4.0 time budget.
  - Proposed:
    ```text
    Target: 35–45 hours
    Review scope at: 25 hours
    Re-scope if exceeding: 50 hours
    ```
- Confirm no Cloudflare Workers configuration entered `main`.
  - Do not merge the accidental Cloudflare Workers PR.
  - Delete/close Cloudflare test artefacts if not already done.
- Decide thesis route:
  - likely `/research/doctoral-thesis/` if creating `/research/`;
  - otherwise `/doctoral-thesis/`.
- Decide Stage 4.1 navigation labels in the next session or two.
- Begin implementation with Stage 4.1 information architecture/site shell before thesis/CV content work.
- Keep duplicate carried-over org TODOs neutralised so the Stage 4 hierarchy is the active task structure.

## Details not to lose

- Netlify redirects should be forced while physical legacy files still exist:
  ```text
  /writing.html /publications/ 301!
  /writing/ReviewCosmicConnectionsV2.html /publications/reviews/cosmic-connections/ 301!
  /writing/ReviewCosmicConnectionsV2.pdf /publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf 301!
  /itinerary.pdf /cv/veljkovic-cv.pdf 301!
  ```
- Netlify build settings:
  ```text
  Build command: npm run build
  Publish directory: dist
  Production branch: main
  NODE_VERSION = 22.12.0
  ```
  If exact patch version causes trouble, use `22`.
- No Netlify Functions, SSR, adapter change, or framework migration is intended.
- Do not add `@astrojs/cloudflare`, `wrangler.toml`, Workers, KV, D1, R2, or Cloudflare adapter config.
- Stage 4.0 mission note lives outside repo:
  ```text
  ~/Projects/website-admin/stage-4/plan-mission-note.md
  ```
- Stage 4.0 “done” means:
  - thesis page live and not obviously incomplete;
  - CV page live and not obviously incomplete;
  - site-wide header/navigation/footer usable on desktop and mobile;
  - first-pass design foundation present;
  - constrained light/dark mode implemented if retained in scope;
  - one review-page reading aid implemented and working;
  - seminars bridge established.
- Light/dark mode scope:
  - CSS colour tokens for dark/light;
  - preserve current dark identity;
  - readable light mode without full redesign;
  - accessible toggle;
  - persisted user choice;
  - no animations or per-page special cases in Stage 4.0.
- The broader Stage 4 control principle:
  - touch the broader vision, but do not try to realise all of it.
