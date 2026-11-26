# HW4 verification

Date: 2026-11-26, Asia/Saigon.

## RED

- Client: 6 failed tests against the scaffold and the empty derived-state stub.
- Server: test suite failed to import missing app.js before implementation. This is a missing-module RED, not a claim that six assertions ran and failed.

## GREEN

- Client: 7/7 tests passed. Keyboard left/right/up alternatives, LIFO undo, pointer threshold/cancellation, derived score, persistence rehydration, failed-save retry/idempotency and AbortController cleanup are covered.
- Server: 7/7 tests passed against real MongoDB 8.0.17 using Mongoose 8. Tests cover validation including prototype-property/non-string directions, persistence through a second connection/app instance, idempotency, mass-assignment resistance, concurrent duplicate saves, session-scoped LIFO undo, invalid JSON, unknown routes and the missing-URI guard.
- Client ESLint and production build: passed.
- Server ESLint: passed.
- The isolated test database is removed after the suite. Cached MongoDB binary is under server/.cache/mongodb and is ignored by Git.

## Real browser

Microsoft Edge headless, production Vite preview and a separate temporary MongoDB-backed API.

- Root redirects to /swipe.
- Right arrow advances An to Binh; reload retains the saved choice; Backspace restores An.
- A real mouse pointer drag advances the card and saves the action.
- Keyboard activation of a save button preserves focus; undoing the final saved action returns focus to the deck.
- 320px/375px layouts remain within the viewport; screenshots saved in evidence/.
- Light/dark color schemes and reduced-motion preference tested.
- Axe WCAG 2 A/AA, 2.1 A/AA and 2.2 AA tags: no violations and no incomplete results in the checked initial, post-pointer and dark states.
- Raw browser measurements are in evidence/browser.json; screenshots were visually inspected.

## Scope and limitations

The demonstration uses fictional profiles and an explicit score policy. A local session UUID is not authentication. The backend is designed for one classroom API process; multi-worker strict ordering requires database-level coordination. Native screen-reader speech output has not been tested, so no blanket WCAG certification is claimed. Implementation commit a2d5b05 was published on origin/hw4-card-swipe and verified on 2026-11-27.

## Local setup follow-up

On 2026-11-27 the user reported that the configured MongoDB-backed application retained its choices after F5. This is a user-observed local result, separate from the isolated automated persistence suite above.
