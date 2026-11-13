# TASK_DECOMPOSITION — ex1 (Sprint 1: Router v7 + Master-Detail + Lazy)

## 1. Scope
| Slide | Exercise | Content |
|---|---|---|
| 10 | Ex 1.2 & 1.2.1 | Layout uses `<Routes>`, `<Route element>`, `<Outlet>`, active `NavLink` |
| 11, 22 | Ex 1.2.2 | `PeopleLayout` + `PersonDetail`: `useParams`, `people.find()`, 404, `<dl>`, CSS Grid |
| 9 | Ex 1.1 | `React.lazy` + `<Suspense>` for `PersonDetail`, skeleton fallback |
| 12 | Sprint 1 | Requirements check: 2 feat commits, no DevTools warnings |

## 2. Spec conflicts & decisions
| ID | Conflict | Decision |
|---|---|---|
| C1 | Slide 11: the header says "1.3.2", the title says "1.2.2" | Use 1.2.2 (following 1.2 & 1.2.1 on slide 10) |
| C2 | Slide 12 requires 2 commits; slide 8 requires a failing test before each feat | 2 is the minimum: keep exactly 2 `feat:` commits with the slide's names, add a `test:` commit before each |
| C3 | Slide 2 uses `createBrowserRouter`; slides 10, 22 use `<Routes>` | Use `<Routes>` (declarative), matching the code contract on slides 10, 22 |
| C4 | Ex 1.1 lazy-loads `PersonDetail`, but this component is created in Ex 1.2.2 | Do 1.1 last, during Refactor |
| C5 | Slide 9 names `PersonDetail.tsx` and calls `lazy(() => import('./PersonDetail'))` inside that file | Use `.jsx`; declare `lazy()` in `App.jsx` |
| C6 | Slide 9 puts `aria-live` on the skeleton — the skeleton is removed after loading, so the screen reader does not read new content | Put `aria-live="polite"` on the persistent `<main>`; keep `aria-busy="true"` on the skeleton |
| C7 | Slide 11 calls the grid "responsive" but `minmax(280px, 1fr) 2fr` has no breakpoint | Add `@media (max-width: 640px)` to switch to 1 column |

## 3. Contract

### Routes
| Path | Element | Notes |
|---|---|---|
| `/` | `Layout` | nav + `<Outlet />` |
| `/` (index) | `Home` | |
| `/about` | `About` | |
| `/people` | `PeopleLayout people={people}` | sidebar + `<Outlet />` |
| `/people` (index) | `PeopleIndex` | "Chọn một người ở danh sách bên trái" |
| `/people/:id` | `PersonDetail people={people}` | lazy (Ex 1.1) |
| `*` | `NotFound` | |

`<BrowserRouter>` is placed in `main.jsx`, not `App.jsx`, so tests can wrap `App` in `<MemoryRouter>`.

### Data — `src/data/people.js`
`{ id: number, name: string, role: string }[]`. The `id` is intentionally a **number** to test the trap that `useParams()` always returns a string.

### Components
| Component | Props | Behavior |
|---|---|---|
| `Layout` | — | `NavLink` Home / People / About; `active-link` class when active; NavLink adds `aria-current="page"` automatically |
| `PeopleLayout` | `people` | `<nav>` contains `NavLink` to `/people/:id` + `<main aria-live="polite">` contains `<Outlet />` |
| `PersonDetail` | `people` | `useParams()`; `people.find(p => String(p.id) === id)`; not found → `<div role="alert">404: Person Not Found</div>`; found → `<dl>` Name, Role |
| `Skeleton` | — | Block the same size as `PersonDetail`, with `aria-busy="true"` |

## 4. Test plan (write first, must observe red)
| ID | Scenario | Expected |
|---|---|---|
| T1 | Open `/` | Home, People, About links; Home heading visible |
| T2 | Open `/about` | About link has `aria-current="page"`, Home link does not |
| T3 | Open `/khong-ton-tai` | Not Found heading visible |
| T4 | Open `/people` | Sidebar lists every person's name; prompt to select a person is visible |
| T5 | Open `/people/1` (original id is a number) | `<dl>` shows the correct name and role for person id 1 |
| T6 | Open `/people/999` | `role="alert"` contains "404: Person Not Found" |
| T7 | On `/people`, click a person's name | That person's details appear |

T1–T3 belong to "router layout"; T4–T7 belong to "detail route handling".
Ex 1.1 is a refactor: T1–T7 must remain green and `npm run build` must split `PersonDetail` into a separate chunk.

## 5. Commit plan (tick after committing)
- [x] `docs: add ex1 task decomposition and contract` — actually combined into `738497b` (see §8)
- [x] `fix: pin react-router to v7 as required by lab spec` — `738497b` (outside the plan)
- [x] `test: add failing tests for router layout` — `04e5945` — red 3/3
- [x] `feat: router layout` — `734a841` — green 3/3
- [x] `test: add failing tests for detail route handling` — `10d8f59` — red 4/7
- [x] `feat: detail route handling` — `a31601c` — green 7/7
- [x] `refactor: lazy load person detail route with suspense skeleton` — `d03287c` — green 7/7
- [x] `docs: add ex1 verification and ai failure audit`

## 6. WBS & timebox (Sprint 1 = 35 minutes)
| Task | Minutes |
|---|---|
| Contract (this file) | 5 |
| T1–T3 + Layout | 8 |
| T4–T7 + PeopleLayout / PersonDetail + CSS Grid | 12 |
| Lazy + Skeleton | 5 |
| Verification + audit | 5 |

## 7. Requirements check — Sprint 1 (slide 12)
- [x] `PeopleLayout.jsx` uses `<Outlet />`, `PersonDetail.jsx` uses `useParams()` (T4–T7 green)
- [x] There are 2 `feat:` commits with the slide's exact names: `feat: router layout`, `feat: detail route handling`
- [x] DevTools: Console has no warnings, URL param is parsed correctly (VERIFICATION §3) — student ticked after checking
- [x] Ex 1.1: `npm run build` splits out `PersonDetail-*.js`

## 8. Deviations from plan
- `main` still declared `react-router@^8` (AI_FAILURE_AUDIT B-04); corrected to v7 on `ex1`. `ex2`, `ex3` branched from `ex1` and therefore inherit v7.
- Commit `738497b` accidentally combined the docs file with the router version change (VERIFICATION §4). History was not changed because it had already been pushed.