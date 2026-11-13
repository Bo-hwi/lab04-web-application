# AI_FAILURE_AUDIT — ex1

> Part A: defects in sample code from the slides (not claimed to be AI-generated).
> Part B: failures caused by the AI (Claude) during the assignment — recorded in chat history.

## A. Sample code in the slides
| ID | Slide | Defect | Consequence | Correction | Evidence |
|---|---|---|---|---|---|
| A-01 | 11, 22 | `people.find(p => p.id === id)` | `useParams()` returns a string → a numeric id never matches → always 404 | `String(p.id) === id` | T5, T7 (VERIFICATION §2) |
| A-02 | 22 | `// Render layout...` placed inside JSX | The text appears on screen | `{/* */}` | Code review |
| A-03 | 10 | `Layout` returns 2 sibling elements, `NavLink` lacks `to`, no surrounding Router | Syntax error / broken link | Wrap in `<div>`, add `to`, put `BrowserRouter` in `main.jsx` | T1–T3 |
| A-04 | 9 | `PersonDetail.tsx` calls `lazy(import('./PersonDetail'))` on itself | Self-referential import; mixes `.tsx`/`.jsx` | Declare `lazy()` in `App.jsx` | Build splits out a separate chunk |
| A-05 | 9 | `aria-live` placed on the skeleton | Skeleton is removed after loading → screen reader does not read new content | Put `aria-live` on a persistent `<section>` | Code review |
| A-06 | 22 | `<main>` inside `PeopleLayout` | Nests `<main>` inside the layout's `<main>` | Change to `<section aria-label>` | T5 uses the `region` role |
| A-07 | 11 | "Responsive" grid has no breakpoint | Horizontal overflow on a phone | `@media (max-width: 640px)` → 1 column | DevTools (VERIFICATION §3) |

## B. Failures caused by the AI during the assignment
| ID | What the AI did | How it was detected | Correction |
|---|---|---|---|
| B-01 | Suggested `git add . && git commit` | PowerShell 5.1 reported that `&&` is invalid | Split into separate commands |
| B-02 | Assumed the repository already existed and advised committing before `git init` | `fatal: not a git repository` | Run `git init -b main` |
| B-03 | Suggested `Add-Content .gitignore "*.pptx"` | `git show --stat` showed that `.gitignore` still had 3 lines — the new text was appended to `dist/` | Corrected manually, checked with `git check-ignore -v` |
| B-04 | Suggested `npm install react-router` without specifying a version | `npm ls` showed **v8.5.1**, while the assignment requires v7 | `npm install react-router@7` (commit `738497b`) |
| B-05 | Proposed 6 branches by exercise number 1.1, 1.2... | Student objected: the slides grade by Sprint | Reorganized into 3 branches ex1/ex2/ex3 |
| B-06 | Claimed "slide 22 is wrong because `Outlet` cannot pass `people`" | AI rechecked: passing via `element={<PersonDetail people={people} />}` works | Retracted the claim; not counted as a slide defect |
| B-07 | Wrote tests T4–T7 before `people.js` existed | Tests were red due to `Failed to resolve import` — the wrong reason for red | Put `people.js` in the same test commit |