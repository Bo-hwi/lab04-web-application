# VERIFICATION — ex3

## 1. Red → green loop
| Step | Commit | Command | Result | Source |
|---|---|---|---|---|
| Fail test S1–S6 | `23d5000` | `npm test` (server) | `pass 1 / fail 5` — every failure is `404 !== 200/400/201` (stub app has no routes) | Student machine |
| Implement API | `1c3f4c6` | `npm test` (server) | `pass 6 / fail 0` | Student machine |
| Fail test H1–H5 | `657e827` | `npm test` (client) | `Tests 5 failed \| 19 passed (24)` | AI: replayed from the pushed commit `657e827` |
| Implement hook | `d94c310` | `npm test` (client) | `Tests 24 passed (24)` | AI: replayed from the pushed commit |
| Forum page | `9465a36` | `npm test`, `npm run lint` | `Tests 24 passed (24)`, lint 0 errors | Student machine, 23:29 |

## 2. What the tests prove
| Test | Slide defect it guards against |
|---|---|
| S3 | Missing `express.json()` (slide 26) → `req.body` undefined |
| S4 | `...req.body` spread after `id` (slide 26) → client overwrites `id` |
| S6 | Malformed JSON must be 400, not an unhandled 500 |
| H1 | One URL contract (`/api/channels/:id/messages`) instead of the 3 different URLs in slides 16/25/26 |
| H2 | `AbortController` cancels the in-flight request on channel switch |
| H3 | No stale messages from the previous channel (slides 16/25 never reset data) |
| H4 | Non-OK response becomes an error (slides 16/25 never check `res.ok`) |

AI end-to-end check (headless browser, server + Vite dev proxy): `/forum` redirects to `/forum/nasa`, shows "Welcome to #nasa", posting a message shows it, switching to `#notNasa` shows no `#nasa` messages, console has no warnings/errors.

## 3. Manual verification (browser — slide 17)
| Checkpoint | Result |
|---|---|
| `/forum` redirects to `/forum/nasa` and shows "Welcome to #nasa" | ☑ |
| Posting `An / hello` makes the message appear in the list | ☑ (student report) |
| Slow 3G: rapid channel switches show in-flight requests as `(canceled)` | ☑ — two canceled requests at 925 ms and 844 ms; final request returned 304 (student report) |
| Server stopped → switching channels shows an error message instead of crashing | ☑ (student report; exact text pending) |

Error log (paste the exact message shown when the server is stopped):
```
Exact error text not provided yet.
```
(Checked by the student in Chrome DevTools at 12:25.)
