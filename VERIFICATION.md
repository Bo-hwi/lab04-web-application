# VERIFICATION — ex1

## 1. Vòng lặp đỏ → xanh (log trên máy sinh viên)
| Bước | Commit | Lệnh | Kết quả | Giờ |
|---|---|---|---|---|
| Fail test T1–T3 | `04e5945` | `npm test` | `Tests 3 failed (3)` — không tìm thấy navigation "Main" | 15:41 |
| Implement layout | `734a841` | `npm test`, `npm run lint` | `Tests 3 passed (3)`, lint 0 lỗi | 15:45 |
| Fail test T4–T7 | `10d8f59` | `npm test` | `Tests 4 failed \| 3 passed (7)` — `/people` rơi vào route `*` (hiện "Not Found") | 16:17 |
| Implement detail | `a31601c` | `npm test` | `Tests 7 passed (7)` | |
| Refactor lazy | `d03287c` | `npm test`, `npm run lint`, `npm run build` | 7 passed, lint 0 lỗi, build tách chunk `PersonDetail-5CxAE6Ka.js` | |

Kiểm chứng độc lập: clone commit `d03287c` từ GitHub, chạy lại `npm test` (7 passed), `eslint .` (0 lỗi), `vite build` (có chunk `PersonDetail-*.js`).

## 2. Kiểm chứng lỗi slide bằng test (mutation)
- Đổi `String(p.id) === id` → `p.id === id` (code slide 22): **T5, T7 fail** (`2 failed | 5 passed`). Hoàn tác → 7 passed.
- Ghi chú: thí nghiệm này chạy trong môi trường AI; sinh viên cập nhật dòng này nếu tự chạy lại trên máy.
- Kết luận: T5/T7 bắt được lỗi so sánh number với string từ `useParams()`.

## 3. Kiểm chứng thủ công (DevTools — slide 12)
| Checkpoint | Kết quả |
|---|---|
| Console không có warning/error tại `/`, `/people/2`, `/people/999`, `/xyz` | ☑ |
| URL `/people/2` hiển thị đúng Alan Turing; `/people/999` hiển thị 404 | ☑ |
| Thu hẹp cửa sổ < 640px → grid chuyển 1 cột | ☑ |

(AI đã kiểm bằng trình duyệt headless trên bản build: console rỗng, 375px → 1 cột. Sinh viên tự kiểm trên máy rồi tick.)

(Sinh viên tự kiểm trên máy bằng Chrome DevTools lúc 21:18 — console sạch. AI kiểm thêm bằng trình duyệt headless trên bản build.)

## 4. Sự cố trong quá trình làm
- Dán nhầm code `App.jsx` vào `App.test.jsx` → `npm test` báo `No test suite found` → khôi phục bằng `git restore src/App.test.jsx`.
- Commit `738497b` gộp nhầm `TASK_DECOMPOSITION.md` với thay đổi phiên bản router (vi phạm atomic commit). Không sửa lịch sử vì đã push; biện pháp: chạy `git status` trước mỗi commit.
- Commit `10d8f59` được tạo trước khi chạy `npm test` (chạy nhầm ở thư mục gốc); đã chạy lại ngay sau đó khi chưa có code triển khai → kết quả đỏ ở dòng 3 bảng §1 vẫn hợp lệ.
