const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Pure function: the same input → the same output, with no side effects
// → call directly during render; no useEffect needed (fixes the slide 13 anti-pattern)
export function validateForm(values) {
  const errors = {}
  const name = values.fullName.trim()

  if (name === '') errors.fullName = 'Vui lòng nhập họ tên'
  else if (name.length < 2) errors.fullName = 'Họ tên tối thiểu 2 ký tự'

  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Email không hợp lệ'

  if (values.password.length < 8) errors.password = 'Mật khẩu tối thiểu 8 ký tự'

  // Cross-field validation (Live Defense slide 28): depends on 2 fields at once
  if (values.confirmPassword === '') errors.confirmPassword = 'Vui lòng xác nhận mật khẩu'
  else if (values.confirmPassword !== values.password) errors.confirmPassword = 'Mật khẩu xác nhận không khớp'

  return errors
}