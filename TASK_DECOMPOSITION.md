# TASK_DECOMPOSITION — ex1 (Sprint 1: Router v7 + Master-Detail + Lazy)

## 1. Phạm vi
| Slide | Bài | Nội dung |
|---|---|---|
| 10 | Ex 1.2 & 1.2.1 | Layout dùng `<Routes>`, `<Route element>`, `<Outlet>`, `NavLink` active |
| 11, 22 | Ex 1.2.2 | `PeopleLayout` + `PersonDetail`: `useParams`, `people.find()`, 404, `<dl>`, CSS Grid |
| 9 | Ex 1.1 | `React.lazy` + `<Suspense>` cho `PersonDetail`, skeleton fallback |
| 12 | Sprint 1 | Requirements check: 2 commit feat, DevTools không warning |

## 2. Mâu thuẫn trong đề & quyết định
| ID | Mâu thuẫn | Quyết định |
|---|---|---|
| C1 | Slide 11: header ghi "1.3.2", tiêu đề ghi "1.2.2" | Dùng 1.2.2 (nối tiếp 1.2 & 1.2.1 ở slide 10) |
| C2 | Slide 12 đòi 2 commit; slide 8 đòi test fail trước mỗi feat | 2 là tối thiểu: giữ đúng 2 commit `feat:` theo tên slide, thêm commit `test:` trước mỗi cái |
| C3 | Slide 2 dùng `createBrowserRouter`; slide 10, 22 dùng `<Routes>` | Dùng `<Routes>` (declarative), khớp code contract slide 10, 22 |
| C4 | Ex 1.1 lazy-load `PersonDetail`, nhưng component này tạo ở Ex 1.2.2 | Làm 1.1 cuối cùng, ở bước Refactor |
| C5 | Slide 9 đặt tên `PersonDetail.tsx` và gọi `lazy(() => import('./PersonDetail'))` ngay trong file đó | Dùng `.jsx`; khai báo `lazy()` trong `App.jsx` |
| C6 | Slide 9 đặt `aria-live` lên skeleton — skeleton bị gỡ khi tải xong nên screen reader không đọc nội dung mới | `aria-live="polite"` đặt trên `<main>` luôn tồn tại; skeleton giữ `aria-busy="true"` |
| C7 | Slide 11 gọi grid là "responsive" nhưng `minmax(280px, 1fr) 2fr` không có breakpoint | Thêm `@media (max-width: 640px)` chuyển thành 1 cột |

## 3. Contract

### Route
| Path | Element | Ghi chú |
|---|---|---|
| `/` | `Layout` | nav + `<Outlet />` |
| `/` (index) | `Home` | |
| `/about` | `About` | |
| `/people` | `PeopleLayout people={people}` | sidebar + `<Outlet />` |
| `/people` (index) | `PeopleIndex` | "Chọn một người ở danh sách bên trái" |
| `/people/:id` | `PersonDetail people={people}` | lazy (Ex 1.1) |
| `*` | `NotFound` | |

`<BrowserRouter>` đặt trong `main.jsx`, không đặt trong `App.jsx`, để test bọc `App` bằng `<MemoryRouter>`.

### Dữ liệu — `src/data/people.js`
`{ id: number, name: string, role: string }[]`. Cố ý để `id` là **number** để kiểm tra bẫy `useParams()` luôn trả string.

### Component
| Component | Props | Hành vi |
|---|---|---|
| `Layout` | — | `NavLink` Home / People / About; class `active-link` khi active; NavLink tự thêm `aria-current="page"` |
| `PeopleLayout` | `people` | `<nav>` gồm `NavLink` tới `/people/:id` + `<main aria-live="polite">` chứa `<Outlet />` |
| `PersonDetail` | `people` | `useParams()`; `people.find(p => String(p.id) === id)`; không thấy → `<div role="alert">404: Person Not Found</div>`; thấy → `<dl>` Name, Role |
| `Skeleton` | — | Khối cùng kích thước `PersonDetail`, có `aria-busy="true"` |

## 4. Test plan (viết trước, phải thấy đỏ)
| ID | Kịch bản | Kỳ vọng |
|---|---|---|
| T1 | Mở `/` | Có link Home, People, About; thấy heading Home |
| T2 | Mở `/about` | Link About có `aria-current="page"`, link Home thì không |
| T3 | Mở `/khong-ton-tai` | Thấy heading Not Found |
| T4 | Mở `/people` | Sidebar có đủ tên mọi người; thấy câu hướng dẫn chọn người |
| T5 | Mở `/people/1` (id gốc là number) | `<dl>` hiện đúng tên và role của người id 1 |
| T6 | Mở `/people/999` | `role="alert"` chứa "404: Person Not Found" |
| T7 | Ở `/people`, click tên một người | Chi tiết người đó hiện ra |

T1–T3 thuộc "router layout"; T4–T7 thuộc "detail route handling".
Ex 1.1 là refactor: T1–T7 phải giữ xanh và `npm run build` phải tách chunk riêng cho `PersonDetail`.

## 5. Kế hoạch commit (tick khi đã commit)
- [x] `docs: add ex1 task decomposition and contract` — thực tế gộp vào `738497b` (xem §8)
- [x] `fix: pin react-router to v7 as required by lab spec` — `738497b` (ngoài kế hoạch)
- [x] `test: add failing tests for router layout` — `04e5945` — đỏ 3/3
- [x] `feat: router layout` — `734a841` — xanh 3/3
- [x] `test: add failing tests for detail route handling` — `10d8f59` — đỏ 4/7
- [x] `feat: detail route handling` — `a31601c` — xanh 7/7
- [x] `refactor: lazy load person detail route with suspense skeleton` — `d03287c` — xanh 7/7
- [x] `docs: add ex1 verification and ai failure audit`

## 6. WBS & timebox (Sprint 1 = 35 phút)
| Việc | Phút |
|---|---|
| Contract (file này) | 5 |
| T1–T3 + Layout | 8 |
| T4–T7 + PeopleLayout / PersonDetail + CSS Grid | 12 |
| Lazy + Skeleton | 5 |
| Verification + audit | 5 |

## 7. Requirements check — Sprint 1 (slide 12)
- [x] `PeopleLayout.jsx` dùng `<Outlet />`, `PersonDetail.jsx` dùng `useParams()` (T4–T7 xanh)
- [x] Có 2 commit `feat:` đúng tên slide: `feat: router layout`, `feat: detail route handling`
- [x] DevTools: Console không warning, URL param parse đúng (VERIFICATION §3) — sinh viên tự tick sau khi kiểm
- [x] Ex 1.1: `npm run build` tách chunk `PersonDetail-*.js`

## 8. Sai lệch so với kế hoạch
- `main` vẫn khai báo `react-router@^8` (AI_FAILURE_AUDIT B-04); sửa về v7 ở `ex1`. `ex2`, `ex3` tách từ `ex1` nên kế thừa v7.
- Commit `738497b` gộp nhầm file docs với thay đổi phiên bản router (VERIFICATION §4). Không sửa lịch sử vì đã push.
