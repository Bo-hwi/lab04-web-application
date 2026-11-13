# VERIFICATION — ex1

## 1. Red → green loop (log from the student's machine)
| Step | Commit | Command | Result | Time |
|---|---|---|---|---|
| Fail test T1–T3 | `04e5945` | `npm test` | `Tests 3 failed (3)` — navigation "Main" was not found | 15:41 |
| Implement layout | `734a841` | `npm test`, `npm run lint` | `Tests 3 passed (3)`, lint 0 errors | 15:45 |
| Fail test T4–T7 | `10d8f59` | `npm test` | `Tests 4 failed \| 3 passed (7)` — `/people` fell through to route `*` (showing "Not Found") | 16:17 |
| Implement detail | `a31601c` | `npm test` | `Tests 7 passed (7)` | |
| Refactor lazy | `d03287c` | `npm test`, `npm run lint`, `npm run build` | 7 passed, lint 0 errors, build split out `PersonDetail-5CxAE6Ka.js` | |

Independent verification: cloned commit `d03287c` from GitHub and reran `npm test` (7 passed), `eslint .` (0 errors), `vite build` (with a `PersonDetail-*.js` chunk).

## 2. Verifying the slide defect with a test (mutation)
- Change `String(p.id) === id` → `p.id === id` (slide 22 code): **T5, T7 fail** (`2 failed | 5 passed`). Revert → 7 passed.
- Note: this experiment ran in the AI environment; the student should update this line if they rerun it on their own machine.
- Conclusion: T5/T7 catch the error of comparing a number with the string returned by `useParams()`.

## 3. Manual verification (DevTools — slide 12)
| Checkpoint | Result |
|---|---|
| Console has no warnings/errors at `/`, `/people/2`, `/people/999`, `/xyz` | ☑ |
| URL `/people/2` correctly shows Alan Turing; `/people/999` shows 404 | ☑ |
| Narrowing the window below 640px changes the grid to 1 column | ☑ |

(Student verified on their own machine with Chrome DevTools at 21:18 — console clean. AI additionally checked with a headless browser on the production build.)

## 4. Incidents during the work
- Accidentally pasted `App.jsx` code into `App.test.jsx` → `npm test` reported `No test suite found` → restored with `git restore src/App.test.jsx`.
- Commit `738497b` accidentally combined `TASK_DECOMPOSITION.md` with a router version change (violating an atomic commit). History was not changed because it had already been pushed; mitigation: run `git status` before each commit.
- Commit `10d8f59` was created before running `npm test` (the command was run in the repository root by mistake); it was rerun immediately afterward before implementation code existed → the red result in row 3 of the §1 table remains valid.