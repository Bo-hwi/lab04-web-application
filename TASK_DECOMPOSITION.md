# TASK_DECOMPOSITION — ex2 (Sprint 2: Context Form Engine + ShowData)

## 1. Scope
| Slide | Content |
|---|---|
| 13 | Anti-pattern: 5 chained useEffect calls for validation |
| 14 | Engine: synchronous validation during render, `useId()`, `aria-invalid`, `aria-describedby` |
| 15 | Requirements check: no useEffect, `<ShowData />` on valid submit, 3 feat commits |
| 23, 24 | Code contract: `SimpleForm`, `FormContext`, `InputField`, `ShowData` |
| 28 | Live defense: cross-field validation (password confirmation) |

## 2. Spec conflicts & decisions
| ID | Conflict | Decision |
|---|---|---|
| C1 | Slide 13 calls it "Exercise 1.3" but the trace says `--target Ex1.6` | Use the name "Exercise 1.3" |
| C2 | Slide 15 says "live inspector" but also "on valid submit" | Show `<ShowData />` on valid submit (a snapshot at submission time) |
| C3 | Slide 23 places JSX in `FormContext.js` | Separate `formContext.js` (no JSX) and `FormProvider.jsx` |
| C4 | Slide 23 passes `setValues`, while elsewhere it passes `handleChange`; `initial` is undefined | One contract: `handleChange`, `handleBlur`; define `INITIAL_VALUES` explicitly |
| C5 | Slide 14 calls one `useId()` in the Provider for every field | Call `useId()` in each `InputField` |
| C6 | Slide 13 calls the behavior a "race condition" | It is actually a cascading re-render; effects run sequentially after commit, not asynchronously |

## 3. Contract
| Module | Export | Behavior |
|---|---|---|
| `form/validate.js` | `validateForm(values) → errors` | Pure function; empty `{}` when valid |
| `form/formContext.js` | `FormContext`, `useFormContext()` | Throws a clear error if used outside the Provider |
| `form/FormProvider.jsx` | default `FormProvider({ initialValues, children })` | Holds `values`, `touched`, `submitted`; calculates `errors` and `isValid` during render |
| `form/InputField.jsx` | default `InputField({ name, label, type, ...rest })` | Separate `useId()`; spreads `...rest` onto `<input>`; shows errors after blur or submit |
| `form/ShowData.jsx` | default `ShowData({ data })` | `<dl>` key-value; **does not** display `password`, `confirmPassword` |
| `form/SimpleForm.jsx` | default | Route `/form`; 4 fields: Họ tên, Email, Mật khẩu, Xác nhận mật khẩu |

Validation rules: full name ≥ 2 characters; email has a valid format; password ≥ 8 characters; confirmation must match the password.

## 4. Test plan
| ID | Expected |
|---|---|
| V1–V6 | `validateForm` follows each rule and cross-field validation without mutating its input |
| T8 | Each field has its own label and id; no error before interaction; `autoComplete` reaches `<input>` |
| T9 | Invalid email + blur → `aria-invalid="true"`, error description via `aria-describedby` |
| T10 | Different confirmation password → cross-field error |
| T11 | Correcting the value → error disappears **in that render** (no `waitFor` needed) |
| T12 | Submit an empty form → 4 errors, no inspector |
| T13 | Valid submit → inspector shows name and email; does not expose password |

## 5. Commit plan (tick after committing)
- [x] `docs: add ex2 task decomposition and contract` — `e804c84` (committed after test/feat, see §7)
- [x] `test: add failing tests for form validation rules` — `2e21bd6` — red 4/13 (reproduced later, see VERIFICATION §1)
- [x] `feat: form context` — `a627cca` — green 13/13
- [x] `test: add failing tests for input field validation` — `474e646` — red 4/17
- [x] `feat: input field validation` — `cce6818` — green 17/17
- [x] `test: add failing tests for inspector output` — `0dbd8cc` — red 1/19
- [x] `feat: inspector output` — `0c94379` — green 19/19
- [x] `docs: add ex2 verification and ai failure audit`

## 6. Requirements check — Sprint 2 (slide 15)
- [x] No `useEffect` in the `form/` directory (only mentioned in a comment; `grep` finds no call)
- [x] `<ShowData />` appears on valid submit (T13)
- [x] 3 `feat:` commits with the slide's exact names: `feat: form context`, `feat: input field validation`, `feat: inspector output`
- [ ] Browser check of `/form` with DevTools (VERIFICATION §3) — student ticks after checking

## 7. Deviations from plan
- The contract commit `e804c84` was created after `2e21bd6` (test) and `a627cca` (feat) because `git add ..` was forgotten. The contract content was written before the code.
- The "see red" step of `2e21bd6` was skipped at commit time; it was reproduced afterwards by checking out the stub from that commit (VERIFICATION §1).
- `test:` and `feat:` for input field validation were first committed together (`ffc3aad`, never pushed); split locally with `git reset --soft HEAD~1` into `474e646` + `cce6818` before pushing.
- `ex1` contains commit `6aad15b add verification`, which does not follow Conventional Commits (project-rules §4). Not rewritten because it was already pushed.
