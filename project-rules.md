# Project Rules — Lab 4

## 1. Stack
- React 19 + Vite 8, JavaScript (`.jsx`). Không dùng TypeScript.
- React Router v7: chỉ import từ `'react-router'`, không import `'react-router-dom'`.
- Test: Vitest + Testing Library (jsdom). Lint: ESLint + `eslint-plugin-react-hooks`.

## 2. Branch
- `main`: scaffold + rules. `ex1` tách từ `main`, `ex2` từ `ex1`, `ex3` từ `ex2`.
- Mỗi branch có ở thư mục gốc: `TASK_DECOMPOSITION.md`, `VERIFICATION.md`, `AI_FAILURE_AUDIT.md`.

## 3. Vòng lặp 4 bước (slide 8)
1. Contract: ghi interface/route/API vào `TASK_DECOMPOSITION.md`.
2. Fail test: viết test, chạy, **thấy đỏ**, ghi lại vào `VERIFICATION.md`.
3. Implement: code tối thiểu để test xanh.
4. Refactor: dọn code, test vẫn xanh.

## 4. Commit (Conventional Commits)
- Type hợp lệ: `feat`, `fix`, `test`, `refactor`, `docs`, `chore`, `style`.
- `feat` = hành vi mới. `fix` = sửa hành vi đã có bị sai.
- Commit `test:` là commit duy nhất được phép đỏ; commit `feat:` ngay sau phải làm nó xanh.
- Ghi chú: git log mẫu ở slide 8 sai 3 chỗ — `init:` không phải type hợp lệ (dùng `chore:`),
  `feat` xuất hiện trước `test`, và `fix:` được dùng cho tính năng mới.

## 5. Quy tắc code
- State suy ra được (lỗi validation, isValid, điểm số) tính trực tiếp trong render. Không dùng `useEffect`.
- `useEffect` chỉ để đồng bộ với hệ thống bên ngoài (fetch, DOM API); luôn có cleanup và đủ dependency.
  Không tắt `react-hooks/exhaustive-deps`.
- `useParams()` luôn trả string → so sánh `String(p.id) === id`.
- Comment trong JSX dùng `{/* */}`, không dùng `//`.
- JSX chỉ đặt trong file `.jsx`.
- Mọi `fetch`: có `AbortController`, kiểm tra `res.ok` trước khi đọc JSON.
- Accessibility: mỗi field gọi `useId()` riêng; có `aria-invalid`, `aria-describedby`;
  nút chỉ có icon phải có `aria-label`.

## 6. Bảo mật
- Không hardcode secret. `.env` bị ignore; `.env.example` liệt kê tên biến.
- Server không spread `req.body`; chỉ lấy các field được phép.

## 7. Definition of Done (mỗi branch)
- `npm test` xanh, `npm run lint` 0 lỗi, `npm run build` thành công.
- Đủ 3 file tài liệu. Đã push.