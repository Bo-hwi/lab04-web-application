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

## Reproduce from this branch

From the checkout root, install/build the client, then leave production preview running:

```powershell
npm.cmd --prefix client ci
npm.cmd --prefix client run build
npm.cmd --prefix client run preview -- --host 127.0.0.1 --port 4174 --strictPort
```

In another terminal at the same checkout root, run the standalone Lighthouse CLI. Set CHROME_PATH to your installed Chromium browser; this example uses Microsoft Edge on Windows:

```powershell
$env:CHROME_PATH = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
npx.cmd --yes lighthouse@13.6.0 http://127.0.0.1:4174/gallery --chrome-flags="--headless=new" --only-categories=performance,accessibility --output=html --output=json --output-path=./lighthouse-mobile
```

Example for Windows with Microsoft Edge (adjust CHROME_PATH for another browser installation):

```powershell
$env:CHROME_PATH = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
npx.cmd --yes lighthouse@13.6.0 http://127.0.0.1:4174/gallery --only-categories=performance,accessibility --output=html --output=json --output-path=./lighthouse-hw1-mobile --chrome-flags="--headless=new"
```

The default CLI device is mobile; add --preset=desktop and use a different output path for a desktop report. Scores vary between runs. Saved JSON reports include their exact device settings, browser version, audit time and measured metrics.

Other branch evidence: [HW1](https://github.com/Bo-hwi/lab04-web-application/tree/hw1-photo-gallery/evidence), [HW3](https://github.com/Bo-hwi/lab04-web-application/tree/hw3-photo-dialog/evidence). These standalone commands do not depend on the original local worktree layout.
## Follow-up

For [HW1](https://github.com/Bo-hwi/lab04-web-application/tree/hw1-photo-gallery/evidence), the current split-bundle production reports are lighthouse-hw1-mobile-rerun.report.json and lighthouse-hw1-desktop-rerun.report.json (both Performance/Accessibility 100/100); older attempts describe older bundles or earlier runs. Current accessibility/keyboard/reflow observations are recorded in browser-followup.json for HW1 and followup-browser.json for the main gallery. The tagged axe checks do not replace native screen-reader speech testing. Vite/Rolldown configuration reference: https://vite.dev/config/build-options and https://rolldown.rs/reference/OutputOptions.codeSplitting.
