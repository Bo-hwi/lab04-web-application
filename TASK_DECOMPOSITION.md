# Homework 1: Photo & Evidence Gallery

## Goal

Build an accessible photo gallery using React.

## Contract

### Route

/gallery

### URL Search Parameters

- category: selected image category
- photoId: selected image identifier

### Photo Data

- id: string
- title: string
- category: string
- src: string
- alt: string

## Task Status

- [x] H1-T1: Render gallery from photo data
- [x] H1-T2: Filter photos using URL search parameters
- [x] H1-T3: Open and close photo dialog
- [x] H1-T4: Implement keyboard and accessibility behavior
- [ ] H1-T5: Verify responsive design and performance
- [ ] H1-T6: Complete documentation and push

## Acceptance Criteria

### H1-T1: Gallery Rendering

Status: DONE

- [x] Render photos from a data array.
- [x] Display image and title for each photo.
- [x] Provide alt text for each image.
- [x] Cover rendering with automated tests.

### H1-T2: URL Filtering

Status: DONE

- [x] Read category from URL.
- [x] Filter displayed photos.
- [x] Update URL using category buttons.
- [x] Remove category filter using All.
- [x] Preserve Nature filter after browser refresh.
- [x] Declare /gallery route explicitly.
- [x] Verify Architecture filter in browser.

### H1-T3: Photo Dialog

Status: DONE

- [x] Open native dialog when selecting a photo.
- [x] Close dialog and return to gallery.
- [x] Synchronize photoId with URL.
- [x] Open selected photo from a direct URL.
- [x] Preserve category when opening and closing.
- [x] Verify Escape, Back and Forward in Chrome.

### H1-T4: Accessibility

Status: DONE

- [x] Provide image alt text.
- [x] Open a photo using Enter and Space.
- [x] Provide an accessible name for the dialog and Close button.
- [x] Restore focus to the opening button after closing.
- [x] Handle an invalid photoId without crashing or opening a dialog.
- [x] Verify Tab, Shift+Tab and Escape in Chrome.

### H1-T5: Quality Verification

Status: IN PROGRESS

- [x] Tests pass for implemented features.
- [x] ESLint reports zero errors.
- [x] Production build succeeds.
- [x] Verify responsive layout in real Edge at 320px and 375px (see evidence/).
- [x] Record desktop Performance 100/100 from a saved production Lighthouse report.
- [x] Record mobile Performance 100/100 (latest saved production run: 100).
- [x] Record axe WCAG A/AA checks and real-browser keyboard/reflow evidence.
- [ ] Verify native screen-reader speech output before claiming exhaustive WCAG compliance.

### H1-T6: Delivery

Status: IN PROGRESS

- [x] Finalize TASK_DECOMPOSITION.md.
- [x] Finalize VERIFICATION.md.
- [x] Finalize AI_FAILURE_AUDIT.md.
- [ ] Commit and push changes.
## Naming and repair scope

The supplied review reports inconsistent Homework numbers in the deck. Existing branch names remain the contract: HW1 = photo gallery, HW2 = appeal tribunal, HW3 = URL-synchronized photo dialog. Card-swipe/Mongoose is implemented separately in the hw4-card-swipe working tree (.repairs/hw4); its files are not merged into this gallery branch. This is not a claim that the entire Lab 4 is complete.

## Review corrections (2026-11-26)

- Responsive images and bounded, scrollable native dialog.
- Architecture image now shows a building; Forest Waterfall title/alt match the waterfall.
- Photos are stored locally; source IDs are recorded in evidence/README.md.
- Root redirect and unknown-path recovery are covered by tests.
- Delivery remains in progress until any required push and manual accessibility audit are completed.

## Follow-up evidence status

All implemented feature tests, lint and build checks pass. The latest saved mobile and desktop Lighthouse runs score 100/100. Keyboard, root-text sizing, reflow and tagged axe checks are recorded in verification. Delivery stays in progress for local commit/push and native screen-reader speech review; no blanket full-lab certification is claimed.
