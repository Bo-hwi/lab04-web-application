# HW4: Interactive card-swipe deck

The deck labels this exercise HW1 in its specification and HW4 in its code contracts. This branch uses HW4 so the existing gallery branch keeps its name.

## Contract

- Route `/swipe`; `/` redirects there, unknown routes show a recovery link.
- Pointer movement of at least 50 CSS pixels: left = PASS, right = LIKE, up = SUPERLIKE. Keyboard: ArrowLeft/ArrowRight/ArrowUp; Backspace undoes the last action. Visible buttons provide equivalent controls.
- History is an ordered stack. Undo restores only the most recent card. The remaining queue and score are derived during render, never copied into effect state.
- Score policy (the slide does not specify the up score): PASS -5, LIKE +10, SUPERLIKE +20.
- Fictional demo profiles only; no actual personal or case data is implied.
- The browser stores a random session UUID locally. This is a classroom session identifier, not authentication.
- Express 5 + Mongoose 8; URI from `MONGODB_URI`, no deprecated connection flags, async/await queries with `.lean()` for reads.
- `GET /api/profiles` returns `{ id, name, age, bio }[]`.
- `GET /api/swipes?sessionId=UUID` returns the active history in insertion order.
- `POST /api/swipe` accepts only `{ sessionId, requestId, profileId, direction }`, returns saved action (201, or 200 for an idempotent retry). UUIDs, direction and profile are validated. A profile may be active only once per session.
- `DELETE /api/swipe/:id?sessionId=UUID` undoes the latest action (204); out-of-order undo returns 409. IDs from another session cannot be removed.
- Initial loads and mutations use AbortController; errors leave the visible queue/history unchanged. Reload rehydrates saved history.
- Test server uses an isolated real MongoDB process, not a fake persistence substitute.

## Tasks

- [x] Observe failing client and server regression tests.
- [x] Implement and test keyboard, pointer, stack, score and failure behavior.
- [x] Implement and test MongoDB persistence, validation, retries and LIFO undo.
- [x] Verify responsive layout and keyboard interaction in a real browser.
- [x] Record tests, lint, build, limitations and setup instructions.
- [x] Commit and push the implementation checkpoint (a2d5b05), verified against origin on 2026-11-27.
