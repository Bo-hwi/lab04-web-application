# TASK_DECOMPOSITION — ex2 (Sprint 2: Context Form Engine + ShowData)

## 1. Phạm vi
| Slide | Nội dung |
|---|---|
| 13 | Anti-pattern: 5 useEffect nối nhau để validate |
| 14 | Engine: validate đồng bộ trong render, `useId()`, `aria-invalid`, `aria-describedby` |
| 15 | Requirements check: không useEffect, `<ShowData />` khi submit hợp lệ, 3 commit feat |
| 23, 24 | Code contract: `SimpleForm`, `FormContext`, `InputField`, `ShowData` |
| 28 | Live defense: cross-field validation (xác nhận mật khẩu) |

## 2. Mâu thuẫn trong đề & quyết định
| ID | Mâu thuẫn | Quyết định |
|---|---|---|
| C1 | Slide 13 đặt tên "Exercise 1.3" nhưng phần trace ghi `--target Ex1.6` | Dùng tên "Exercise 1.3" |
| C2 | Slide 15: "live inspector" nhưng lại "on valid submit" | Hiện `<ShowData />` khi submit hợp lệ (ảnh chụp tại lúc submit) |
| C3 | Slide 23 đặt JSX trong `FormContext.js` | Tách `formContext.js` (không JSX) + `FormProvider.jsx` |
| C4 | Slide 23 truyền `setValues`, nơi khác truyền `handleChange`; `initial` chưa định nghĩa | Contract duy nhất: `handleChange`, `handleBlur`; `INITIAL_VALUES` khai báo rõ |
| C5 | Slide 14 gọi 1 `useId()` ở Provider cho mọi field | Gọi `useId()` trong từng `InputField` |
| C6 | Slide 13 gọi hiện tượng là "race condition" | Thực chất là cascade re-render; effect chạy tuần tự sau commit, không bất đồng bộ |

## 3. Contract
| Module | Export | Hành vi |
|---|---|---|
| `form/validate.js` | `validateForm(values) → errors` | Hàm thuần; rỗng `{}` khi hợp lệ |
| `form/formContext.js` | `FormContext`, `useFormContext()` | Ném lỗi rõ ràng nếu dùng ngoài Provider |
| `form/FormProvider.jsx` | default `FormProvider({ initialValues, children })` | Giữ `values`, `touched`, `submitted`; `errors` và `isValid` tính trong render |
| `form/InputField.jsx` | default `InputField({ name, label, type, ...rest })` | `useId()` riêng; spread `...rest` vào `<input>`; lỗi hiện sau blur hoặc submit |
| `form/ShowData.jsx` | default `ShowData({ data })` | `<dl>` key-value; **không** hiện `password`, `confirmPassword` |
| `form/SimpleForm.jsx` | default | Route `/form`; 4 field: Họ tên, Email, Mật khẩu, Xác nhận mật khẩu |

Luật validate: họ tên ≥ 2 ký tự; email đúng định dạng; mật khẩu ≥ 8 ký tự; xác nhận phải trùng mật khẩu.

## 4. Test plan
| ID | Kỳ vọng |
|---|---|
| V1–V6 | `validateForm` đúng từng luật, cross-field, không sửa input |
| T8 | Mỗi field có label và id riêng; chưa tương tác thì chưa có lỗi; `autoComplete` tới được `<input>` |
| T9 | Email sai + blur → `aria-invalid="true"`, mô tả lỗi qua `aria-describedby` |
| T10 | Xác nhận mật khẩu khác → lỗi cross-field |
| T11 | Sửa đúng → lỗi biến mất **ngay trong render đó** (không cần `waitFor`) |
| T12 | Submit form rỗng → 4 lỗi, không có inspector |
| T13 | Submit hợp lệ → inspector hiện tên, email; không lộ mật khẩu |

## 5. Kế hoạch commit (tick khi đã commit)
- [x] `docs: add ex2 task decomposition and contract`
- [ ] `test: add failing tests for form validation rules`
- [ ] `feat: form context`
- [ ] `test: add failing tests for input field validation`
- [ ] `feat: input field validation`
- [ ] `test: add failing tests for inspector output`
- [ ] `feat: inspector output`
- [ ] `docs: add ex2 verification and ai failure audit`

## 6. Requirements check — Sprint 2 (slide 15)
- [ ] Không có `useEffect` trong thư mục `form/`
- [ ] `<ShowData />` hiện khi submit hợp lệ
- [ ] 3 commit `feat:` đúng tên slide