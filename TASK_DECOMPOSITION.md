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