# AI_FAILURE_AUDIT — ex1

> Phần A: lỗi trong code mẫu của slide (không khẳng định do AI sinh).
> Phần B: lỗi do AI (Claude) gây ra trong buổi làm bài — có trong lịch sử chat.

## A. Code mẫu trong slide
| ID | Slide | Lỗi | Hậu quả | Cách sửa | Bằng chứng |
|---|---|---|---|---|---|
| A-01 | 11, 22 | `people.find(p => p.id === id)` | `useParams()` trả string → id number không bao giờ khớp → luôn 404 | `String(p.id) === id` | T5, T7 (VERIFICATION §2) |
| A-02 | 22 | `// Render layout...` đặt giữa JSX | Chữ hiện ra màn hình | `{/* */}` | Code review |
| A-03 | 10 | `Layout` trả 2 phần tử cùng cấp, `NavLink` thiếu `to`, không có Router bọc ngoài | Lỗi cú pháp / link hỏng | Bọc trong `<div>`, thêm `to`, `BrowserRouter` ở `main.jsx` | T1–T3 |
| A-04 | 9 | `PersonDetail.tsx` tự `lazy(import('./PersonDetail'))` | Import vòng chính nó; lẫn `.tsx`/`.jsx` | Khai báo `lazy()` trong `App.jsx` | Build tách chunk riêng |
| A-05 | 9 | `aria-live` đặt trên skeleton | Skeleton bị gỡ khi tải xong → screen reader không đọc nội dung mới | `aria-live` trên `<section>` luôn tồn tại | Code review |
| A-06 | 22 | `<main>` trong `PeopleLayout` | Lồng `<main>` trong `<main>` của layout | Đổi thành `<section aria-label>` | T5 dùng role `region` |
| A-07 | 11 | Grid "responsive" không có breakpoint | Tràn ngang trên điện thoại | `@media (max-width: 640px)` → 1 cột | DevTools (VERIFICATION §3) |

## B. Lỗi của AI trong buổi làm bài
| ID | AI đã làm gì | Phát hiện bằng cách nào | Sửa |
|---|---|---|---|
| B-01 | Đưa lệnh `git add . && git commit` | PowerShell 5.1 báo `&&` không hợp lệ | Tách thành từng dòng |
| B-02 | Giả định repo đã có, bảo commit khi chưa `git init` | `fatal: not a git repository` | Chạy `git init -b main` |
| B-03 | Đưa lệnh `Add-Content .gitignore "*.pptx"` | `git show --stat` cho thấy `.gitignore` vẫn 3 dòng — dòng mới dính vào `dist/` | Sửa tay, kiểm bằng `git check-ignore -v` |
| B-04 | `npm install react-router` không ghi phiên bản | Đọc `npm ls`: cài **v8.5.1**, đề yêu cầu v7 | `npm install react-router@7` (commit `738497b`) |
| B-05 | Đề xuất 6 branch theo số bài 1.1, 1.2... | Sinh viên phản biện: slide chấm theo Sprint | Chia lại 3 branch ex1/ex2/ex3 |
| B-06 | Khẳng định "slide 22 sai vì `Outlet` không truyền được `people`" | AI tự kiểm lại: truyền qua `element={<PersonDetail people={people} />}` được | Rút lại nhận định, không tính là lỗi slide |
| B-07 | Viết test T4–T7 trước khi có `people.js` | Test đỏ vì `Failed to resolve import` — đỏ sai lý do | Đưa `people.js` vào cùng commit test |
