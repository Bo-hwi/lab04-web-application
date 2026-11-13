# Project Rules — Lab 4

## 1. Stack
- React 19 + Vite 8, JavaScript (`.jsx`). Do not use TypeScript.
- React Router v7: import only from `'react-router'`, not `'react-router-dom'`.
- Tests: Vitest + Testing Library (jsdom). Lint: ESLint + `eslint-plugin-react-hooks`.

## 2. Branch
- `main`: scaffold + rules. `ex1` branches from `main`, `ex2` from `ex1`, and `ex3` from `ex2`.
- Each branch has these files at the repository root: `TASK_DECOMPOSITION.md`, `VERIFICATION.md`, `AI_FAILURE_AUDIT.md`.

## 3. Four-step loop (slide 8)
1. Contract: record interfaces/routes/APIs in `TASK_DECOMPOSITION.md`.
2. Fail test: write and run the test, **observe red**, and record it in `VERIFICATION.md`.
3. Implement: write the minimum code needed to make the test green.
4. Refactor: clean up the code while keeping tests green.

## 4. Commits (Conventional Commits)
- Valid types: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`, `style`.
- `feat` = new behavior. `fix` = correction of existing incorrect behavior.
- A `test:` commit is the only commit allowed to be red; the immediately following `feat:` commit must make it green.
- Note: the sample git log on slide 8 has 3 errors — `init:` is not a valid type (use `chore:`),
  `feat` appears before `test`, and `fix:` is used for a new feature.

## 5. Code rules
- Calculate derived state (validation errors, isValid, scores) directly during render. Do not use `useEffect`.
- Use `useEffect` only to synchronize with external systems (fetch, DOM APIs); always clean up and list all dependencies.
  Do not disable `react-hooks/exhaustive-deps`.
- `useParams()` always returns a string → compare with `String(p.id) === id`.
- Use `{/* */}` for JSX comments, not `//`.
- Place JSX only in `.jsx` files.
- Every `fetch` uses `AbortController` and checks `res.ok` before reading JSON.
- Accessibility: call `useId()` separately for each field; use `aria-invalid` and `aria-describedby`;
  icon-only buttons must have an `aria-label`.

## 6. Security
- Do not hardcode secrets. `.env` is ignored; `.env.example` lists variable names.
- The server must not spread `req.body`; select only allowed fields.

## 7. Definition of Done (each branch)
- `npm test` is green, `npm run lint` has 0 errors, and `npm run build` succeeds.
- All 3 documentation files are present. Changes have been pushed.