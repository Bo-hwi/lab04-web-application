# HW4 AI audit

The original repository omitted the swipe deck and Mongoose code contract. This branch implements the missing exercise separately. Data and scoring assumptions are explicitly defined in TASK_DECOMPOSITION.md.

Only executed checks will be recorded as passed. A local session UUID is not an authentication system. Do not use real personal data in this classroom demo.

## Observed failures and corrections

- The first pointer test did not declare isPrimary=true; PointerEvent defaults caused it to simulate a non-primary pointer, which the implementation intentionally ignores. Corrected the event fixture, then verified a real mouse drag in Edge.
- Axe identified an incompletely specified aria-label on a generic actions container. Added role=group; the repeated audit has no incomplete results.
- The first MongoDB integration attempt was blocked by sandbox network access (EACCES). Re-ran with authorized download access and a real local MongoDB process; seven tests pass. This was an environment failure, not a persistence pass.
- Moved the test binary cache to server/.cache/mongodb so a standalone checkout never writes its cache outside the repository. Verified the suite using that location.
- Payload direction validation now checks the value type before Object.hasOwn, preventing malformed objects or inherited names from bypassing validation or raising a coercion error.

## Prevention

Keep contract, tests and implementation in separate files. Verify real pointer behavior in a browser rather than relying on synthetic events alone. Keep test caches relative to the checkout and distinguish real MongoDB tests from mocked client API tests. Save raw audit evidence and disclose untested screen-reader behavior.

A real browser keyboard-button check found that disabling the active button during save moved focus to BODY. Pending controls now use guarded aria-disabled states, and a DOM synchronization effect restores the deck when a control becomes unavailable. A new regression test and real-browser check pass.
