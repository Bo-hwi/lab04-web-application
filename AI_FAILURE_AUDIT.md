
# Homework 1: AI Failure Audit

## Purpose

Record observed AI-assisted development failures,
their causes, corrections, and preventive measures.

## Finding 001: Test Code Pasted Into Data File

Severity: Low
Status: RESOLVED

### Observation

Test code containing `it`, `render`, `expect`,
and JSX was pasted into `client/src/photos.js`.

### Evidence

Vite reported:
"JSX syntax is disabled and should be enabled
via the parser options."

ESLint reported six errors involving undefined
test identifiers.

### Cause

AI guidance provided partial snippets for
different files without sufficiently clear
file replacement boundaries.

### Correction

- Restored photos.js to data-only JavaScript.
- Kept React tests in App.test.jsx.
- Re-ran tests and lint successfully.

### Prevention

- Always provide exact file paths.
- Provide complete replacement contents.
- Clearly distinguish source, test, and data files.
- Verify after each change.

## Finding 002: Documentation Not Updated Incrementally

Severity: Low
Status: PROCESS CORRECTION ADOPTED

### Observation

Initial TDD iterations were completed before
the three required documentation files were
updated together.

### Cause

The workflow prioritized implementation and
deferred documentation.

### Correction

Adopt a documentation checkpoint in every
TDD iteration.

### Prevention

1. Update TASK_DECOMPOSITION.md for the contract.
2. Record RED and GREEN in VERIFICATION.md.
3. Review AI_FAILURE_AUDIT.md for observed issues.
4. Do not mark unverified checks as PASS.

## Audit Rules

- Record observed failures, not hypothetical ones.
- Separate verified evidence from assumptions.
- Do not conceal failed tests.
- Do not claim browser or Lighthouse verification
  without actual results.
- Revisit unresolved findings before delivery.

## Current Audit Summary

- Historical findings: 4; review corrections are recorded below.
- Finding 001: Resolved
- Finding 002: Process correction adopted
- Finding 003: Resolved
- Finding 004: Resolved
- Current limitations: see VERIFICATION.md; no full manual accessibility audit is claimed.

## Finding 003: Missing Native Dialog API in jsdom

Status: RESOLVED

### Observed Failure
- Test failed with: dialog.showModal is not a function.
- Environment: Vitest with jsdom.

### Root Cause
- jsdom does not implement the native showModal() API.

### Resolution
- Mocked HTMLDialogElement.showModal() in App.test.jsx.
- Mocked HTMLDialogElement.close() and its close event.
- Preserved the native dialog implementation in App.jsx.

### Verification
- Automated tests: 11/11 PASS.
- Browser dialog behavior: PASS in Chrome.

### Prevention
- Distinguish test-environment limitations from application defects.
- Verify native browser behavior separately from jsdom mocks.

## Finding 004: Dialog Focus Mock in jsdom

Status: RESOLVED

### Observation
- The focus restoration test initially failed in jsdom.

### Cause
- The jsdom test mock for HTMLDialogElement did not reproduce the browser's native focus behavior when a dialog opens and closes.

### Correction
- Updated the test mock to save the previously focused element, move focus into the dialog, and restore focus when it closes.
- Confirmed focus restoration after Close and Escape in the browser.

### Prevention
- Keep jsdom mocks limited to browser APIs the environment does not implement.
- Verify native dialog focus behavior in a real browser.
## Review corrections ? 2026-11-26

The review found unbounded dialog images, mismatched photo descriptions, a blank root route, duplicated verification sections, and completion claims without Performance evidence. Fixed responsive CSS, added root/fallback routes, replaced the canoe with a verified building photo, and renamed the waterfall. Stored and optimized images locally; saved production Lighthouse reports and actual 320/375px measurements. Rewrote verification as one current result. Completion now distinguishes measured scores, historical browser checks and remaining manual audits.

TDD disclosure: the new gallery repair tests were added alongside implementation; RED was not observed for those tests. Desktop Performance 100 is verified; mobile results are reported separately rather than treating desktop evidence as mobile evidence.

## Follow-up evidence

The mobile HW1 score of 99 was not silently treated as 100. Split React/router bundles using the supported Vite 8 Rolldown configuration, rebuilt, and measured 100/100 on both mobile and desktop; saved both new reports while retaining earlier attempts. Accessibility evidence is now broader than Lighthouse: real keyboard, reflow, root-text sizing and tagged axe checks. Native screen-reader speech remains untested.
