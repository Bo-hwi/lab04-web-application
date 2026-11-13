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
- [x] `docs: add ex2 task decomposition and contract`
- [ ] `test: add failing tests for form validation rules`
- [ ] `feat: form context`
- [ ] `test: add failing tests for input field validation`
- [ ] `feat: input field validation`
- [ ] `test: add failing tests for inspector output`
- [ ] `feat: inspector output`
- [ ] `docs: add ex2 verification and ai failure audit`

## 6. Requirements check — Sprint 2 (slide 15)
- [ ] No `useEffect` in the `form/` directory
- [ ] `<ShowData />` appears on valid submit
- [ ] 3 `feat:` commits with the slide's exact names