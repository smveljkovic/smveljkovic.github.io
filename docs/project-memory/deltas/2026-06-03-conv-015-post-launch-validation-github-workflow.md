# 2026-06-03 — GitHub Pages launch and legacy URL handling

## What changed

- The Astro site was connected to the GitHub Pages repository and pushed to remote `origin/main`.
  - `smvsite-astro` previously had no remote.
  - The GitHub Pages repo is `https://github.com/smveljkovic/smveljkovic.github.io.git`.
  - In `smvsite-astro`, the remote was added as conventional `origin`, while old `smvsite-base` used a remote named `page`.
- The Astro site is now live at:
  - `https://stevanveljkovic.com/`
- GitHub Pages deployment moved from the old branch-based site toward the new Astro/GitHub Actions model.
  - Old deployment source was understood to be branch `testing`.
  - `testing` should be treated as rollback/archive material, not cleaned up pre-launch.
- `.github/workflows/deploy.yml` is in place on `origin/main`.
  - First-launch workflow was recommended as manual-only:
    ```yaml
    on:
      workflow_dispatch:
    ```
  - Workflow builds Astro and publishes `dist/` as a GitHub Pages artifact; `dist/` should not be committed.
- Legacy URL stop-gaps were implemented/confirmed in the remote tree:
  - `public/writing.html`
  - `public/writing/ReviewCosmicConnectionsV2.html`
  - `public/writing/ReviewCosmicConnectionsV2.pdf`
  - `public/itinerary.pdf`
- Public assets for withheld/draft reviews were removed from the remote tree:
  - no `public/images/publications/reviews/challenging-modernity/...`
  - no `public/images/publications/reviews/christian-right-europe/...`
    - Those assets currently live in `~/Projects/website-admin/withheld-images-folders`    
- Live `www` behaviour was checked:
  - `https://www.stevanveljkovic.com/` returns `301` to `https://stevanveljkovic.com/`, which is the desired canonical behaviour.
- Pages were run through various validators (no substantial errors):
    - Google Rich Results
    - validator.schema.org
    - https://validator.w3.org
        - Returned one minor syntax error for `/`       

## Decisions made

- For Google Search Console, submit:
  ```text
  https://stevanveljkovic.com/sitemap-index.xml
  ```
  rather than `sitemap-0.xml`.
- GitHub Pages stop-gap legacy policy:
  - old `.html` URLs can use static redirect stubs with `noindex`, canonical links, meta refresh, JavaScript `location.replace`, and visible fallback links;
  - old `.pdf` URLs should remain PDFs on GitHub Pages because arbitrary true PDF redirects are not available there.
- The old URL:
  ```text
  /writing/ReviewCosmicConnectionsV2.pdf
  ```
  should be treated as a legacy alias for the current Cosmic Connections PDF, not as a promise to serve the literal historical V2 file.
- Historical PDFs should not be archived unless there is a real scholarly reason:
  - formal citation;
  - deposit/archive;
  - meaningful textual differences worth preserving;
  - deliberate transparent version-history policy.
- The canonical current PDF URL can point to the latest corrected/public version:
  ```text
  /publications/reviews/cosmic-connections/veljkovic-review-cosmic-connections.pdf
  ```
- `public/CNAME`, if used, should contain exactly:
  ```text
  stevanveljkovic.com
  ```
  with no protocol, slash, or path.
- `public/` does contain CNAME file
- Because tone of rights guidance was found to be annoying, unnecessary, and distracting –
    - Warning calibration rule adopted:
        - distinguish launch blockers from operational cautions and theoretical caveats;
        - rights-uncertain assets under `public/` are serious because they deploy live;
        - draft/source Markdown visibility in a public repo is a minor caveat unless Stevan judges it sensitive;
        - avoid repeatedly escalating low-probability risks once the user has made an informed judgment.

## Files affected

- Confirmed on `origin/main`:
  - `.github/workflows/deploy.yml`
  - `public/writing.html`
  - `public/writing/ReviewCosmicConnectionsV2.html`
  - `public/writing/ReviewCosmicConnectionsV2.pdf`
  - `public/itinerary.pdf`
- Removed from `origin/main` before deployment:
  - `public/images/publications/reviews/challenging-modernity/...`
  - `public/images/publications/reviews/christian-right-europe/...`
    - Currently in `~/Projects/website-admin/withheld-images-folders`    
- Discussed/recommended:
  - `public/CNAME` with contents `stevanveljkovic.com`
  - duly adopted [post delta-generation note]
- Files shown as locally modified during staging/commit work, but not substantively described in the conversation:
  - `src/content/reviews/hell-christian-ecology.md`
    - [post-generation clarification] URL for PDF was corrected    
  - `src/data/site.ts`
    - [clarification] Sitewide email address changed from contact@ to stevan@stevanveljkovic.com     
  - `src/styles/global.css`
    - [clarification] Line lengths on review pages of `/publications/` was adjusted and rationalised    

## Bugs/fixes

- Fixed deployment repo setup:
  - `smvsite-astro` had no remote; it was connected to the GitHub Pages repo as `origin`.
- Resolved non-fast-forward push issue by inspecting/backing up remote state and replacing remote `main` with Astro `main` when remote `main` was judged disposable.
- Resolved accidental staging confusion:
  - use `git restore --staged .` to unstage while keeping working-tree modifications.
- Resolved authentication distinction:
  - WebStorm GitHub login and command-line Git authentication are separate.
  - For HTTPS Git pushes, stale macOS Keychain credentials may need clearing; token must be used as password.
- Resolved public asset launch issue:
  - withheld-review public images for `challenging-modernity` and `christian-right-europe` were absent from the later `origin/main` tree.
- Confirmed `www` canonical redirect:
  - `https://www.stevanveljkovic.com/` → `301` → `https://stevanveljkovic.com/`.

## Current state

- Astro site is live at:
  ```text
  https://stevanveljkovic.com/
  ```
- Canonical apex domain is functioning.
- `www` redirects permanently to apex.
- GitHub Pages deployment uses the Astro project pushed to `origin/main`; deployment is via GitHub Actions artifact publishing, not committed `dist/`.
- Live sitemap submission target:
  ```text
  https://stevanveljkovic.com/sitemap-index.xml
  ```
- Legacy compatibility files are present for:
  ```text
  /writing.html
  /writing/ReviewCosmicConnectionsV2.html
  /writing/ReviewCosmicConnectionsV2.pdf
  /itinerary.pdf
  ```
- Withheld-review public assets for `challenging-modernity` and `christian-right-europe` appear removed from the deployed source tree.
- Source Markdown for withheld reviews remains in the repo; per the new warning-calibration rule this is a note, not a launch blocker unless Stevan decides the source itself must be private.
    - [clarification] It’s vanishingly unlikely that this would ever cause a rights issue.  

## Next steps

- Submit `sitemap-index.xml` in Google Search Console.
    - [clarification] Done  
- Run live checks:
  ```bash
  curl -I https://stevanveljkovic.com/
  curl -I https://stevanveljkovic.com/cv/
  curl -I https://stevanveljkovic.com/publications/
  curl -I https://stevanveljkovic.com/sitemap-index.xml
  curl -I https://stevanveljkovic.com/sitemap-0.xml
  curl -I https://www.stevanveljkovic.com/
  curl -I https://seminars.stevanveljkovic.com/
  ```
 - [clarification] Done  
- Confirm sitemap includes only intended canonical URLs:
  ```text
  /
  /cv/
  /publications/
  /publications/reviews/cosmic-connections/
  /publications/reviews/evolution-of-religions/
  /publications/reviews/godless-crusade/
  /publications/reviews/hell-christian-ecology/
  ```
  and excludes:
  ```text
  /publications/reviews/challenging-modernity/
  /publications/reviews/christian-right-europe/
  /writing.html
  /writing/ReviewCosmicConnectionsV2.html
  /itinerary.pdf
  ```
- Verify withheld routes return `404`:
  ```text
  /publications/reviews/challenging-modernity/
  /publications/reviews/christian-right-europe/
  ```
    - [clarification] Done  
- Check legacy URLs:
  - `.html` stubs forward correctly;
  - PDF compatibility URLs load PDFs;
  - stubs are not in sitemap and include `noindex`.
- Validate live JSON-LD for:
  ```text
  /
  /cv/
  /publications/
  /publications/reviews/cosmic-connections/
  /publications/reviews/evolution-of-religions/
  /publications/reviews/godless-crusade/
  /publications/reviews/hell-christian-ecology/
  ```
    - [clarification] Done 
- Treat Google Rich Results warnings proportionately; parsing validity, canonical IDs, correct `Person.@id`, sensible `itemReviewed`, and absence of withheld pages matter more than non-critical rich-result eligibility warnings.
    - [clarification] Done 
- Optional post-launch checks:
  - W3C validation for representative pages;
    - [clarification] Done    
  - PageSpeed for homepage and one review page;
    - [clarification] Done, but should repeat and record metrics
  - page-source canonical/OG checks, especially `og:image`.

## Details not to lose

- `dist/` is published as a GitHub Actions artifact; do not commit `dist/`.
- Workflow first-launch safety pattern:
  ```yaml
  on:
    workflow_dispatch:
  ```
  Automatic deployment on push to `main` can be enabled later if desired.
  - [clarification] This is desired, and a subtask has been added for it in org-mode task subtree at end of stage 3.7 
- Old `smvsite-base` and its `testing` branch are rollback/archive material. Do not delete branches or rewrite history as part of launch.
- If replacing an existing remote branch, prefer:
  ```bash
  git push --force-with-lease -u origin main:main
  ```
  not plain `--force`, and only after fetching/inspecting/backing up the remote state.
- Useful inspection commands:
  ```bash
  git log --oneline --decorate origin/main
  git ls-tree -r --name-only origin/main
  git show --stat --summary origin/main
  ```
- Legacy PDF policy:
  - old versioned filename may serve the latest current PDF as a legacy alias;
  - the PDF itself should carry version/date/canonical-page information if versioning matters.
- Later Netlify/Cloudflare move can replace GitHub Pages stop-gaps with real `301` redirects, including PDF redirects.
- Warning calibration rule should be incorporated into project memory and assistant rules:
  ```md
  Calibrate warnings. Do not over-escalate theoretical risks. Treat rights-uncertain assets under public/ as serious because they deploy live; treat draft/source Markdown visibility in a public repo as a minor caveat unless Stevan says otherwise.
  ```
