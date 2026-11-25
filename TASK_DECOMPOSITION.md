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

Status: DONE

- [x] Tests pass for implemented features.
- [x] ESLint reports zero errors.
- [x] Production build succeeds.
- [x] Verify responsive layout in a narrow browser window.
- [x] Record Lighthouse results (Accessibility 100; Performance timed out and remains unverified).
- [ ] Record accessibility results.

### H1-T6: Delivery

Status: IN PROGRESS

- [ ] Finalize TASK_DECOMPOSITION.md.
- [ ] Finalize VERIFICATION.md.
- [ ] Finalize AI_FAILURE_AUDIT.md.
- [ ] Commit and push changes.

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
The HW1 branch already contains most of this behavior in `client/src/App.jsx` and `client/src/App.test.jsx`. HW3 will verify it and add coverage for any missing behavior.

## Task Status
- [ ] HW3-T1: Verify URL and photo selection synchronization.
- [ ] HW3-T2: Verify native dialog open, close, and Escape behavior.
- [ ] HW3-T3: Verify keyboard access and focus management.
- [ ] HW3-T4: Complete browser verification and delivery documentation.

## Acceptance Criteria

### HW3-T1: URL State
Status: TODO

- [ ] Read the selected category and photo ID from search parameters.
- [ ] Update `photoId` when opening a photo.
- [ ] Remove only `photoId` when closing and preserve the category.
- [ ] Open the selected photo from a direct URL.
- [ ] Cover URL behavior with automated tests.

### HW3-T2: Native Dialog
Status: TODO

- [ ] Use a native `<dialog>` opened with `showModal()`.
- [ ] Close through the Close button and Escape.
- [ ] Do not open a dialog for an unknown photo ID.
- [ ] Cover dialog behavior with automated tests.

### HW3-T3: Keyboard and Focus
Status: TODO

- [ ] Open photos with keyboard activation.
- [ ] Keep focus usable while the native modal is open.
- [ ] Restore focus to the opening button after closing.
- [ ] Verify keyboard behavior in Chrome.

### HW3-T4: Verification and Delivery
Status: TODO

- [ ] Run tests, lint, and production build.
- [ ] Verify direct photo URLs, browser Back/Forward, and Escape in Chrome.
- [ ] Record results in `VERIFICATION.md`.
- [ ] Record any HW3-specific AI failures in `AI_FAILURE_AUDIT.md`.
- [ ] Commit the tasks separately and push the branch.