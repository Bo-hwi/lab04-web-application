# AI_FAILURE_AUDIT — ex3

> Part A: defects in the sample code in the slides (not claimed to be AI-generated).
> Part B: failures caused by the AI assistants during this sprint — visible in the chat history.

## A. Sample code in the slides
| ID | Slide | Defect | Impact | Fix | Evidence |
|---|---|---|---|---|---|
| A-14 | 16, 25, 26 | Three different URLs: `/api/channels/:id/messages`, `/api/forums/:id/messages`, `/api/messages/:forum` | Client and server never match → 404 | One contract `/api/channels/:channelId/messages` | H1, S1 |
| A-15 | 26 | No `express.json()` | `req.body` is undefined → POST throws | `express.json({ limit: '10kb' })` | S3 |
| A-16 | 26 | `{ id: crypto.randomUUID(), ...req.body }` | Client-supplied `id` overwrites the server id (mass assignment) | Whitelist `author`, `text` | S4 |
| A-17 | 26 | `db` is undefined; GET has no error handling | `ReferenceError` / unhandled promise rejection | In-memory async store + Express 5 error middleware | S1, S6 |
| A-18 | 16, 25 | No `res.ok` check | An error body is rendered as if it were messages | Throw `HTTP <status>` | H4 |
| A-19 | 16, 25 | Data and loading are not reset on channel switch | Old channel's messages shown under the new channel | Data keyed by channel, loading derived in render | H3 |
| A-20 | 16 | Relative `/api` URL with no proxy | Request hits Vite (:5173), not Express (:3000) | Vite `server.proxy` | Browser check |
| A-21 | 25 | `postMessage` "triggers refetch" with no mechanism | New message never appears | Reload counter in the effect dependencies | H5 |

## B. Failures caused by the AI assistants
| ID | Assistant | What happened | Detected by | Fix |
|---|---|---|---|---|
| B-12 | Claude | Told the student to run `Add-Content ../.gitignore "Claude outputs/"` (same mistake as B-03): the line was glued to `*.pptx` → `*.pptxClaude outputs/`, so `.pptx` was no longer ignored and the course slides plus `server/` were committed on `ex2` | AI review of the GitHub tree | Rewrote `ex2`/`ex3` with `--force-with-lease`, `.gitignore` written as a full file |
| B-13 | Claude (app) | The desktop app saved an AI draft into the repo as `Claude outputs/TASK_DECOMPOSITION.md`; it was committed on `ex2` | AI review of the commit stat | `git rm --cached`, added `Claude outputs/` to `.gitignore` |
| B-14 | Claude | Wrote the real implementation as `server/src/app.real.js` inside the repo; the student's `git add` committed it in the "test" commit, making that commit meaningless | AI review of the GitHub history | Rebuilt `ex3`; later files were kept in the ignored `_fix/` folder |
| B-15 | Claude | Gave `# pass / # fail` (Node 22 output) as the expected result; Node 26 prints `ℹ pass / ℹ fail` | Student reported "different result" | Clarified that the counts are what matter |
