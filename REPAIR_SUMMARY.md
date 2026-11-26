# Review repairs — 2026-11-26

Changes remain local and uncommitted; nothing was pushed. Each branch has its own working tree so exercises stay separate.

| Branch | Working directory | Client tests | Lint / build |
| --- | --- | --- | --- |
| hw3-photo-dialog | repository root | 19 passed | passed |
| hw1-photo-gallery | .repairs/hw1 | 17 passed | passed |
| hw2-appeal-tribunal | .repairs/hw2 | 40 passed | passed |
| ex3 | .repairs/ex3 | 28 passed | passed |
| ex1 | .repairs/ex1 | 7 passed | passed |
| hw4-card-swipe | .repairs/hw4 | 7 passed | passed |

Server suites: ex3 6/6 (in-memory forum store); HW4 7/7 against isolated real MongoDB. Combined client suites: 118 passed; combined server suites: 13 passed. Inspect another branch with e.g. `git -C .repairs/hw2 diff`; run its client tests with `npm.cmd --prefix .repairs/hw2/client test`.

## Corrections

- HW2: snapshot submitted appeals, reject inherited-property player IDs, add dedicated dossier 404 regressions, reset forms between players, display a tested SLA countdown with an explicit demonstration deadline.
- HW1/HW3: responsive images/dialog, verified architecture replacement, waterfall title/alt, local WebP images, preload and responsive sources, root redirect preserving queries, unknown-route recovery.
- ex3: client imports the server's pure validation function; whitespace/length rules match, payloads are trimmed, each fetch has a cancellation signal, aborted or late responses do not update hook state or trigger a refetch.
- ex1: polite loading announcement; remove the unmeasured zero-CLS assertion. Applied the same inherited Skeleton correction in HW2/ex3.
- All five working trees: update verification, task decomposition and AI audit documents. Gallery duplicate verification sections are replaced by one current report; previous observations are identified as history.

## Measured results and scope

- Real Edge at 320px/375px: no horizontal overflow, images load, Escape restores focus, both gallery builds.
- Desktop Lighthouse: Performance 100 / Accessibility 100 on both galleries.
- Latest saved mobile runs: both HW1 and HW3 Performance 100 / Accessibility 100. HW1 now separates React/router chunks; its earlier 99-score reports remain historical. Desktop also scored 100/100.
- See [browser evidence](evidence/README.md) and [.repairs/hw1/evidence/README.md](.repairs/hw1/evidence/README.md).
- Axe WCAG A/AA checks, keyboard/focus, 320px reflow, root-text sizing and dark themes passed for checked states; native screen-reader speech is still untested. See ACCESSIBILITY_REVIEW.md. RED was observed for the earlier four HW2 regressions, the two matrix regressions, and the initial HW4 client/server suites; gallery/ex3 RED was not observed.
- HW4 card-swipe/Mongoose is now implemented separately at .repairs/hw4. See .repairs/hw4/README.md for setup. These local changes do not represent a submitted or live-defended lab.

## Follow-up corrections

- Replaced nested dossier main elements with labelled sections. Added an editable derived disproportionality matrix with explicit hypothetical inputs and documented formula.
- Fixed dark-mode error contrast and shrink-to-fit layout movement in the inherited master-detail shell.
- Corrected the stale ex3 statement that ForumPage had no dedicated test.
- Added keyboard/pointer swipe, cancellation, asymmetric derived score, LIFO undo, retry-safe MongoDB persistence, session validation and focus management in HW4.
- Saved browser evidence and current production Lighthouse HTML/JSON reports. Prior reports are history, not claims about every run.
