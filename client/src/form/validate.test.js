import { describe, it, expect } from 'vitest'
import { validateForm } from './validate'

const valid = {
  fullName: 'Nguyen Van A',
  email: 'a@uit.edu.vn',
  password: 'secret123',
  confirmPassword: 'secret123',
}

describe('validateForm (pure, synchronous)', () => {
  it('V1: valid values return no errors', () => {
    expect(validateForm(valid)).toEqual({})
  })

  it('V2: full name is required', () => {
    expect(validateForm({ ...valid, fullName: '   ' }).fullName).toBe('Vui lòng nhập họ tên')
  })

  it('V3: email must have a valid format', () => {
    expect(validateForm({ ...valid, email: 'abc' }).email).toBe('Email không hợp lệ')
  })

  it('V4: password needs at least 8 characters', () => {
    expect(validateForm({ ...valid, password: 'short', confirmPassword: 'short' }).password).toBe(
      'Mật khẩu tối thiểu 8 ký tự',
    )
  })

  it('V5: confirm password must match password (cross-field)', () => {
    expect(validateForm({ ...valid, confirmPassword: 'secret999' }).confirmPassword).toBe(
      'Mật khẩu xác nhận không khớp',
    )
  })

  it('V6: does not mutate its input', () => {
    const frozen = Object.freeze({ ...valid, email: 'abc' })
    expect(() => validateForm(frozen)).not.toThrow()
  })
})