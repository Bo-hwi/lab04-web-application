# VERIFICATION — ex2

## 1. Red → green loop
| Step | Commit | Command | Result | Source |
|---|---|---|---|---|
| Fail test V1–V6 | `2e21bd6` | `npm test` | `Tests 4 failed \| 9 passed (13)` — stub `validateForm` returns `{}` | Student machine, 22:24 (reproduced after the fact via `git checkout 2e21bd6 -- src/form/validate.js`) |
| Implement form context | `a627cca` | `npm test`, `npm run lint` | `Tests 13 passed (13)`, lint 0 errors | Student machine, 20:59 |
| Fail test T8–T11 | `474e646` | `npm test` | `Tests 4 failed \| 13 passed (17)` — `Unable to find a label with the text of: ...` | Student machine, 22:41 |
| Implement input field | `cce6818` | `npm test` | `Tests 17 passed (17)` | Student machine, 22:41 |
| Fail test T12–T13 | `0dbd8cc` | `npm test` | `Tests 1 failed \| 18 passed (19)` — only T13 fails (T12 is a regression guard, green by design) | AI: replayed from the pushed commit `0dbd8cc` |
| Implement inspector | `0c94379` | `npm test`, `npm run lint`, `npm run build` | `Tests 19 passed (19)`, lint 0 errors, build OK | Student machine, 22:51 |

Independent check: AI cloned `0c94379` from GitHub and re-ran `npm test` (19 passed) and `eslint .` (0 errors).

## 2. Mutation checks (proving tests catch the slide bugs)
| Mutation | Expected | Result | Source |
|---|---|---|---|
| Remove `{...rest}` from `<input>` in `InputField.jsx` (slide 24 code) | T8 fails | `1 failed \| 16 passed (17)` — `toHaveAttribute("autocomplete", "email")` | AI environment; student did not re-run |
| `validate.js` stub returning `{}` (no validation) | V2–V5 fail | `4 failed \| 9 passed (13)` | Student machine, 22:24 |

## 3. Manual verification (browser — slide 15)
| Checkpoint | Result |
|---|---|
| `/form`: submit empty form → 4 error messages | ☑ |
| Valid submit → "Submitted data" appears, no password shown | ☑ |
| DevTools Console has no warnings/errors | ☑ |

(Student: tick only after checking yourself, and write the time here: 11:32)

## 4. Static check
- `grep -rn "useEffect" client/src/form` → only a comment in `validate.js`, no hook call.
