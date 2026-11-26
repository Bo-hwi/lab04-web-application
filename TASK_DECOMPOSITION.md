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
- [x] H1-T6: Publish the implementation and its verification documents

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
- [x] Record mobile Performance 100/100 (current: 100).
- [x] Record axe WCAG A/AA checks and real-browser keyboard/reflow evidence.
- [ ] Verify native screen-reader speech output before claiming exhaustive WCAG compliance.

### H1-T6: Delivery

Status: DONE - published implementation checkpoint fedb3e2

- [x] Finalize TASK_DECOMPOSITION.md.
- [x] Finalize VERIFICATION.md.
- [x] Finalize AI_FAILURE_AUDIT.md.
- [x] Commit and push the implementation checkpoint (fedb3e2).

# Homework 3: URL-Synced Accessible Photo Dialog

## Goal
Verify and complete the photo gallery contract for URL-driven native dialogs and accessible focus management.

## Contract
- Keep `category` and `photoId` synchronized through React Router `useSearchParams`.
- Derive the selected photo and dialog state from `photoId`.
- Use a native HTML `<dialog>` with a ref and `showModal()` / `close()`.
- Closing with the Close button, Escape, or browser navigation must synchronize the URL.
- Preserve the category parameter when opening and closing a photo.
- Keep keyboard focus usable and return it to the opening button after closing.

## Existing implementation to verify
The HW1 branch already contained most of this behavior. HW3 added regression coverage and fixed the duplicate URL update that could break browser Forward navigation.

## Task Status
- [x] HW3-T1: Verify URL and photo selection synchronization.
- [x] HW3-T2: Verify native dialog open, close, and Escape behavior.
- [x] HW3-T3: Verify keyboard access and focus management.
- [x] HW3-T4: Publish the verified dialog implementation and repair records.

## Acceptance Criteria

### HW3-T1: URL State
Status: DONE

- [x] Read the selected category and photo ID from search parameters.
- [x] Update `photoId` when opening a photo.
- [x] Remove only `photoId` when closing and preserve the category.
- [x] Open the selected photo from a direct URL.
- [x] Cover URL behavior with automated tests, including Back and Forward.

### HW3-T2: Native Dialog
Status: DONE

- [x] Use a native `<dialog>` opened with `showModal()`.
- [x] Close through the Close button and Escape.
- [x] Do not open a dialog for an unknown photo ID.
- [x] Cover dialog behavior with automated tests.

### HW3-T3: Keyboard and Focus
Status: DONE

- [x] Open photos with Enter and Space.
- [x] Use the native modal dialog for modal focus behavior.
- [x] Restore focus to the opening button after closing.
- [x] Verify Escape, Back, and Forward in Chrome.

### HW3-T4: Verification and Delivery
Status: DONE - published implementation checkpoint fedb3e2

- [x] Run tests, lint, and production build.
- [x] Verify category preservation and dialog behavior in Chrome.
- [x] Record results in `VERIFICATION.md`.
- [x] Record HW3-specific findings in `AI_FAILURE_AUDIT.md`.
- [x] Commit and push the dialog implementation and repair records (fedb3e2).
## Naming and repair scope

The supplied review reports inconsistent Homework numbers in the deck. Existing branch names remain the contract: HW1 = photo gallery, HW2 = appeal tribunal, HW3 = URL-synchronized photo dialog. Card-swipe/Mongoose is published separately on [hw4-card-swipe](https://github.com/Bo-hwi/lab04-web-application/tree/hw4-card-swipe); its files are not merged into this gallery branch. This is not a claim that the entire Lab 4 is complete.

## Review corrections (2026-11-26)

- Responsive images and bounded, scrollable native dialog.
- Architecture image now shows a building; Forest Waterfall title/alt match the waterfall.
- Photos are stored locally; source IDs are recorded in evidence/README.md.
- Root redirect and unknown-path recovery are covered by tests.
- Implementation publication is complete at the checkpoint above. Native screen-reader speech review remains open under H1-T5.

## Follow-up evidence status

All implemented feature tests, lint and build checks pass. The latest saved mobile and desktop Lighthouse runs score 100/100. Keyboard, root-text sizing, reflow and tagged axe checks are recorded in verification. The implementation checkpoint is published. Native screen-reader speech review remains open under H1-T5; no blanket full-lab certification is claimed.
