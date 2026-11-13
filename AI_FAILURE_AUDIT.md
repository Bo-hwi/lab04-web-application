# AI_FAILURE_AUDIT — ex2

> Part A: defects in the sample code in the slides (not claimed to be AI-generated).
> Part B: failures caused by the AI assistants (Claude, Codex) during this sprint — visible in the chat history.

## A. Sample code in the slides
| ID | Slide | Defect | Impact | Fix | Evidence |
|---|---|---|---|---|---|
| A-08 | 24 | `InputField` collects `...props` but never spreads them onto `<input>` | `value`, `onChange`, `autoComplete`… never reach the input | Spread `{...rest}` first, then the contract props | T8 + mutation (VERIFICATION §2) |
| A-09 | 23 | JSX inside `FormContext.js` | Vite cannot parse JSX in a `.js` file | `formContext.js` (no JSX) + `FormProvider.jsx` | Build passes |
| A-10 | 14 | One `useId()` in the Provider shared by all fields | Duplicate DOM ids, labels bound to the wrong input | `useId()` inside each `InputField` | T8 (unique ids) |
| A-11 | 23 | Context exposes `setValues` in one snippet and `handleChange` in another; `initial` is undefined | Contract mismatch, `ReferenceError` | Single contract `handleChange`/`handleBlur`; `INITIAL_VALUES` | T9–T11 |
| A-12 | 23 | `useFormContext` has no guard for a missing Provider | Destructuring `null` crashes with an unclear error | Throw a clear error when context is `null` | Code review |
| A-13 | 13 | 5 chained `useEffect` hooks for validation | Cascading re-renders, risk of "Maximum update depth exceeded" | Derive `errors` synchronously during render | T11 asserts without `waitFor` |

## B. Failures caused by the AI assistants
| ID | Assistant | What happened | Detected by | Fix |
|---|---|---|---|---|
| B-08 | Claude | Gave Đợt A as one block (test + implementation together), which made it easy to paste the implementation before running the red test | Student ran `npm test` after pasting the real code → 13 passed, red never observed | Red reproduced from commit `2e21bd6`; later batches state "see red before commit" explicitly |
| B-09 | Claude | Instructions to fix ex1 DevTools note did not say "delete the old line" clearly; result: two notes, then an extra non-conventional commit `6aad15b add verification` | AI review of the pushed `VERIFICATION.md` | Duplicate removed during translation |
| B-10 | Codex + editor | Codex and the student edited `TASK_DECOMPOSITION.md` while switching branches with an unsaved tab | VS Code "content of the file is newer" on save | Closed tab without saving, enabled Auto Save, one assistant at a time |
| B-11 | Claude | First mutation attempt with `sed '/{...rest}/d'` also deleted a comment line, producing an invalid run (13 tests instead of 17) | AI noticed the wrong test count | Re-ran deleting only the exact `{...rest}` line |
