
# Homework 1: Verification Log

## Environment

- React 19
- React Router v7
- Vite 8
- Vitest 5
- JavaScript / JSX
- Working directory: client/

## H1-T1.1: Gallery Heading

### RED
- Expected "Photo Gallery" heading.
- Observed: 1 passed, 1 failed.
- Result: RED confirmed.

### GREEN
- Implemented heading in App.jsx.
- Observed: 2 passed, 0 failed.
- ESLint: PASS.

## H1-T1.2: Photo Titles

### RED
- Expected three photo titles.
- Observed: 2 passed, 1 failed.
- Result: RED confirmed.

### GREEN
- Rendered photo titles using Array.map().
- Observed: 3 passed, 0 failed.
- ESLint: PASS.

## H1-T1.3: Accessible Images

### RED
- Observed: 3 passed, 1 failed.
- Result: RED confirmed.

### GREEN
- Rendered images with src and alt attributes.
- Tests: 4/4 PASS.
- ESLint: PASS.
- Build: PASS, 358 ms.

## H1-T2.0: Router Setup

Implementation:
- BrowserRouter in main.jsx.
- MemoryRouter in App.test.jsx.

Verification:
- Tests: 4/4 PASS.
- ESLint: PASS.
- Build: PASS, 398 ms.

## H1-T2.1: URL Category Filtering

### RED
- Tests: 4 passed, 1 failed.
- Result: RED confirmed.

### GREEN
- Read category using useSearchParams().
- Filtered photos using Array.filter().
- Tests: 5/5 PASS.
- ESLint: PASS.
- Build: PASS, 282 ms.

## H1-T2.2: Category Selection Controls

### RED
- Tests: 5 passed, 2 failed.
- Result: RED confirmed.

### GREEN
- Added All, Nature and Architecture buttons.
- Updated category using setSearchParams().
- Tests: 7/7 PASS.
- ESLint: PASS.
- Build: PASS, 349 ms.

## H1-T2.3: Explicit Gallery Route

Implementation:
- BrowserRouter wraps Routes in main.jsx.
- Route path="/gallery" renders App.

Automated verification:
- npm test: 7/7 PASS.
- npm run lint: PASS.
- npm run build: PASS, 267 ms.

Browser verification:
- Nature filter persisted after F5: PASS.
- Architecture filter at /gallery?category=architecture: PASS.

Result: H1-T2 acceptance criteria satisfied.

## Current Verification Summary

| Check | Result |
| --- | --- |
| Automated tests | PASS (15/15) |
| ESLint | PASS |
| Production build | PASS |
| URL category filtering | PASS |
| Category selection | PASS |
| Refresh persistence | PASS |
| Explicit gallery route | PASS |
| Architecture browser check | PASS |
| Browser image loading | NOT VERIFIED |
| Responsive layout | PASS |
| Lighthouse | Accessibility 100; Performance NOT VERIFIED (timeout) |
| Native photo dialog | PASS |

## Final Verification

Status: IN PROGRESS

Repeat automated and manual verification after
H1-T3 through H1-T5.

## H1-T3: Native Photo Dialog

Status: DONE

### RED
- Tests: 7 passed, 1 failed.
- Missing button: View Mountain Landscape.
- RED confirmed.

### GREEN
- Implemented native HTML dialog.
- Synchronized photoId using React Router.
- Mocked showModal() and close() in jsdom tests.
- Tests: 11/11 PASS.
- ESLint: PASS.
- Production build: PASS, 248 ms.

### Browser Verification
- Open photo dialog: PASS.
- URL photoId synchronization: PASS.
- Escape closes dialog: PASS.
- Back closes dialog: PASS.
- Forward reopens dialog: PASS.
- Close preserves category: PASS.

### Remaining
- Focus restoration: NOT VERIFIED.
- Keyboard accessibility: NOT VERIFIED.
- Responsive layout: NOT VERIFIED.
- Lighthouse: NOT VERIFIED.

## H1-T4: Keyboard and Accessibility

Status: DONE

### Automated Verification
- Tests: 15/15 PASS.
- ESLint: PASS.
- Production build: PASS, 232 ms.
- Keyboard activation with Enter: PASS.
- Keyboard activation with Space: PASS.
- Focus restoration after closing: PASS in automated test with mocked dialog focus behavior.
- Invalid photoId: PASS.

### Browser Verification
- Tab navigation in dialog: PASS.
- Shift+Tab navigation in dialog: PASS.
- Escape closes dialog and restores focus: PASS.
- Close restores focus to the opening button: PASS.

Status: DONE

### Automated Verification
- Tests: 15/15 PASS.
- ESLint: PASS.
- Production build: PASS, 232 ms.
- Keyboard activation with Enter: PASS.
- Keyboard activation with Space: PASS.
- Focus restoration after closing: PASS in automated test with mocked dialog focus behavior.
- Invalid photoId: PASS.

### Browser Verification
- Tab navigation in dialog: PASS.
- Shift+Tab navigation in dialog: PASS.
- Escape closes dialog and restores focus: PASS.
- Close restores focus to the opening button: PASS.

Status: DONE

### Automated Verification
- Tests: 15/15 PASS.
- ESLint: PASS.
- Production build: PASS, 232 ms.
- Keyboard activation with Enter: PASS.
- Keyboard activation with Space: PASS.
- Focus restoration after closing: PASS in automated test with mocked dialog focus behavior.
- Invalid photoId: PASS.

### Browser Verification
- Tab navigation in dialog: PASS.
- Shift+Tab navigation in dialog: PASS.
- Escape closes dialog and restores focus: PASS.
- Close restores focus to the opening button: PASS.

Status: DONE

### Automated Verification
- Tests: 15/15 PASS.
- ESLint: PASS.
- Production build: PASS, 232 ms.
- Keyboard activation with Enter: PASS.
- Keyboard activation with Space: PASS.
- Focus restoration after closing: PASS.
- Invalid photoId: PASS.

### Chrome Verification
- Tab navigation in dialog: PASS.
- Shift+Tab navigation in dialog: PASS.
- Escape closes dialog and restores focus: PASS.

## H1-T5: Responsive Layout

Status: IN PROGRESS

### Narrow Window Browser Verification
- Gallery title remains visible: PASS.
- No horizontal scrolling: PASS.
- Dialog fits or can be scrolled to reach Close: PASS.
- Category buttons remain usable: PASS.
- Images stay within the viewport width: PASS.

### Lighthouse Verification
- Accessibility score: 100 (mobile run).
- Manual checks: keyboard focusability and logical tab order reviewed in Chrome.
- Performance: NOT VERIFIED — Lighthouse timed out.

### Remaining
- Performance: NOT VERIFIED because Lighthouse timed out.
- Complete a manual accessibility audit.