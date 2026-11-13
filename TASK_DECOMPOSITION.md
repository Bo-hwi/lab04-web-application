# TASK_DECOMPOSITION — ex3 (Sprint 3: Full-stack useForumMessages + Express REST API)

## 1. Scope
| Slide | Content |
|---|---|
| 16 | `useForumMessages` with `AbortController`, keyed `<dl>` rendering, CORS, POST payload validation |
| 17 | Requirements check: channels `nasa`, `esports-tribunal`, `notNasa`; Slow 3G cancellation check; save error log |
| 25 | Hook contract: `{ data, loading, postMessage }`, `signal.aborted` guards |
| 26 | Server contract: CORS, GET/POST messages, `crypto.randomUUID()` |

## 2. Spec conflicts & decisions
| ID | Conflict | Decision |
|---|---|---|
| C1 | Three different URLs: slide 16 `/api/channels/:id/messages`, slide 25 `/api/forums/:id/messages`, slide 26 `/api/messages/:forum` | One contract for client and server: `/api/channels/:channelId/messages` (slide 17 also speaks of "channels") |
| C2 | Slide 26 uses an undefined `db` | In-memory store with async methods (`list`, `add`) so it can later be swapped for Mongoose 8 without changing routes |
| C3 | Slide 26 has no `express.json()` → `req.body` is `undefined` | Add `express.json({ limit: '10kb' })` |
| C4 | Slide 26 spreads `...req.body` after `id` → the client can overwrite `id` (mass assignment) | Whitelist `author`, `text`; server sets `id`, `createdAt` |
| C5 | Slide 26 GET has no error handling (unhandled rejection) | Express 5 forwards async errors; add one error-handling middleware (400 for bad JSON, 500 otherwise) |
| C6 | Client fetches a relative `/api/...` → it hits Vite (:5173), not Express (:3000) | Vite dev `server.proxy` for `/api` → `http://localhost:3000`; keep `cors()` as the slide requires, for direct calls |
| C7 | Slides 16/25 never check `res.ok` and never reset data on channel switch | Throw on `!res.ok`; never return the previous channel's messages while the new one loads |
| C8 | Slide 25's `postMessage` "triggers refetch" without a mechanism | A reload counter in the effect's dependency list |

## 3. Contract

### REST API (`server/`, Express 5, ESM, `node --test`)
| Method | Path | Success | Errors |
|---|---|---|---|
| GET | `/api/channels/:channelId/messages` | `200` `Message[]` | `404` unknown channel |
| POST | `/api/channels/:channelId/messages` body `{ author, text }` | `201` `Message` | `400` invalid payload / malformed JSON, `404` unknown channel |

`Message = { id: string (UUID), author: string (1–50), text: string (1–500), createdAt: ISO string }`
Channels: `nasa`, `esports-tribunal`, `notNasa`.

### Client
| Module | Export | Behavior |
|---|---|---|
| `forum/useForumMessages.js` | `useForumMessages(channelId) → { data, loading, error, postMessage }` | `AbortController` per request; aborts on channel switch / unmount |
| `forum/ForumPage.jsx` | default | Route `/forum/:channelId`; channel switcher; messages in `<dl>` with keyed `<Fragment>` |

## 4. Test plan
| ID | Expectation |
|---|---|
| S1 | GET known channel → 200 + array |
| S2 | GET unknown channel → 404 |
| S3 | POST without `text` → 400 (proves `express.json()`) |
| S4 | POST with `id: 'hacked'`, `isAdmin: true` → server ignores both |
| S5 | POST then GET → message appears in that channel only |
| S6 | Malformed JSON → 400, not 500 |
| H1–H5 | Hook: contract URL, abort on switch, no stale channel data, non-OK → error, POST then refetch |

## 5. Commit plan (tick after committing)
- [x] `docs: add ex3 task decomposition and contract`
- [x] `test: add failing tests for express messages api` — `23d5000` — red: pass 1 / fail 5
- [x] `feat: express messages api` — `1c3f4c6` — green: pass 6 / fail 0
- [x] `test: add failing tests for useForumMessages hook` — `657e827` — red: 5 failed / 19 passed
- [x] `feat: useForumMessages hook with abort controller` — `d94c310` — green: 24 passed
- [x] `feat: forum page with live channel switcher` — `9465a36` — 24 passed, lint 0 errors
- [x] `docs: add ex3 verification and ai failure audit`

## 6. Requirements check — Sprint 3 (slide 17)
- [x] Full-stack fetching works for `nasa`, `esports-tribunal`, `notNasa`
- [x] Slow 3G in Chrome DevTools: rapid channel switches show in-flight requests as `(canceled)`
- [x] Stopping the server and switching channels shows an error instead of crashing
- [x] Exact full-stack error log saved (VERIFICATION)

## 7. Deviations from plan
- `ex2` and `ex3` were rewritten with `git push --force-with-lease`: a wrong `.gitignore` line (`*.pptxClaude outputs/`) caused the server files and the course slide `.pptx` to be committed on `ex2` (AI_FAILURE_AUDIT B-12). The history on GitHub is now clean.
- `ForumPage` has no dedicated automated test; it is verified manually in the browser (VERIFICATION §3) and indirectly by H1–H5.
