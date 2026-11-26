# Saved browser evidence

Date: 2026-11-26 (Asia/Saigon). Production Vite preview, Microsoft Edge headless; Lighthouse default simulated mobile and desktop configurations (see each row). All attempts are kept to show measurement variation and the effect of image preload/compression. The compressed report uses the final WebP quality 0.65 assets; earlier reports used JPEG or WebP quality 0.8.

| Report | Device | Performance | Accessibility | LCP |
| --- | --- | --- | --- | --- |
| lighthouse-hw1-compressed.report.json | mobile | 99 | 100 | 2.0 s |
| lighthouse-hw1-desktop-rerun.report.json | desktop | 100 | 100 | 0.4 s |
| lighthouse-hw1-desktop.report.json | desktop | 100 | 100 | 0.4 s |
| lighthouse-hw1-final.report.json | mobile | 98 | 100 | 2.4 s |
| lighthouse-hw1-mobile-rerun.report.json | mobile | 100 | 100 | 1.9 s |
| lighthouse-hw1-optimized.report.json | mobile | 99 | 100 | 2.0 s |
| lighthouse-hw1-repeat.report.json | mobile | 99 | 100 | 2.0 s |
| lighthouse-hw1-verified.report.json | mobile | 99 | 100 | 2.0 s |
| lighthouse-hw1.report.json | mobile | 98 | 100 | 2.4 s |

These are measured results for this local setup, not a promise that every machine or run scores 100. Responsive screenshots and responsive.json record 320px/375px checks.

## Photo sources

Local JPEG originals were downloaded from Lorem Picsum: https://picsum.photos/id/1018/600/400 (mountain), https://picsum.photos/id/1076/600/400 (building), https://picsum.photos/id/15/600/400 (waterfall). WebP derivatives are 300x200 and 600x400. Photos retain their original IDs in this source record. The building replacement was visually inspected; source 1011 showed a canoe and was removed.

## Reproduce

Run npm.cmd run build and npm.cmd run preview from client/. Install Lighthouse separately and audit /gallery with default mobile settings and performance/accessibility categories. The saved JSON includes the exact Lighthouse config, browser version, audit time and trace-derived metrics.

## Reproduction scripts

From the main repository root, install npm.cmd install --prefix .repairs/tooling --no-audit --no-fund lighthouse@13.6.0 playwright-core. With both preview servers running, node evidence/check-gallery.mjs records viewport checks. Run node evidence/run-lighthouse.mjs hw3 http://127.0.0.1:4173/gallery mobile (or desktop); use hw1 and port 4174 for the other build. The scripts use the installed Microsoft Edge executable.

## Follow-up

For HW1, the current split-bundle production reports are lighthouse-hw1-mobile-rerun.report.json and lighthouse-hw1-desktop-rerun.report.json (both Performance/Accessibility 100/100); older attempts describe older bundles or earlier runs. Current accessibility/keyboard/reflow observations are recorded in browser-followup.json for HW1 and followup-browser.json for the main gallery. The tagged axe checks do not replace native screen-reader speech testing. Vite/Rolldown configuration reference: https://vite.dev/config/build-options and https://rolldown.rs/reference/OutputOptions.codeSplitting.
