# Gallery verification

Date: 2026-11-26 (Asia/Saigon). This is the current result; supersedes the duplicated historical H1-T4 and HW3 sections.

## Automated checks

- Client tests: 19/19 PASS.
- ESLint: PASS, zero errors.
- Production build: PASS (Vite 8).
- Root redirect preserves query parameters; unknown paths show Not Found with a gallery link.
- Existing tests cover category filtering, native dialog URL state, keyboard activation, invalid photo IDs and focus restoration. Back/Forward and Escape regression tests also pass.

## Real browser checks

Headless Microsoft Edge, production preview.

- Widths 320 and 375 CSS pixels: document scroll width equals viewport width.
- Dialog and image remain inside the viewport; dialog has no horizontal overflow.
- All three local photos decode successfully.
- Escape closes the dialog and returns focus to its opening button.
- Measurements and screenshots: see evidence/.

## Performance and accessibility

- Lighthouse 13.6.0, default simulated mobile throttling, production /gallery.
- Reports are saved under evidence/ as HTML and JSON. Initial production results were 98-99 Performance / 100 Accessibility.
- Images are local WebP assets with responsive sources; first image is preloaded and prioritized, later thumbnails load lazily.
- Desktop: Performance 100 / Accessibility 100.
- Mobile with final assets: Performance 100 / Accessibility 100.
- Exact metrics and every recorded attempt: see evidence/README.md.
- A Lighthouse accessibility score does not replace a complete manual screen reader audit; that audit remains unverified.

## Reproduction

Run npm.cmd test, npm.cmd run lint and npm.cmd run build from client/. Start npm.cmd run preview -- --host 127.0.0.1 --port 4173. Use Lighthouse CLI with --only-categories=performance,accessibility and Edge headless. Lighthouse reports include their exact config, browser version and audit timestamps.

## History

Previous verification recorded a Lighthouse timeout and duplicated H1-T4/HW3 summaries. Those statements are superseded by the reports above. Native Tab/Shift+Tab and browser history checks recorded previously are historical observations unless explicitly covered by the current automated tests.

## Follow-up accessibility checks

Real Edge: Tab/Shift+Tab/Escape and opener focus restoration passed. At 320px, doubled the root font size and verified dialog/document containment. Axe WCAG 2/2.1 A/AA and 2.2 AA tags returned zero violations and zero incomplete results for checked light/dark gallery/modal states. These observations supplement the earlier verification; actual screen-reader speech output remains untested. See evidence/browser-followup.json (HW1) or evidence/followup-browser.json (HW3).
