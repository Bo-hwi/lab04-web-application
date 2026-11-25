import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SimpleForm from './SimpleForm'

describe('input field validation', () => {
  it('T8: every field has its own label and a unique id; no error before interaction', () => {
    render(<SimpleForm />)
    const labels = ['Họ tên', 'Email', 'Mật khẩu', 'Xác nhận mật khẩu']
    const inputs = labels.map((label) => screen.getByLabelText(label))
    expect(new Set(inputs.map((input) => input.id)).size).toBe(labels.length)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    // Slide 24 collects ...props but never spreads them onto <input> → autoComplete would be lost
    expect(screen.getByLabelText('Email')).toHaveAttribute('autocomplete', 'email')
  })

  it('T9: invalid email shows an error linked by aria-describedby after blur', async () => {
    const user = userEvent.setup()
    render(<SimpleForm />)
    const email = screen.getByLabelText('Email')
    await user.type(email, 'abc')
    await user.tab()
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAccessibleDescription('Email không hợp lệ')
  })

  it('T10: confirm password must match password (cross-field)', async () => {
    const user = userEvent.setup()
    render(<SimpleForm />)
    await user.type(screen.getByLabelText('Mật khẩu'), 'secret123')
    const confirm = screen.getByLabelText('Xác nhận mật khẩu')
    await user.type(confirm, 'secret999')
    await user.tab()
    expect(confirm).toHaveAccessibleDescription('Mật khẩu xác nhận không khớp')
  })

  it('T11: the error disappears in the same render once the value becomes valid', async () => {
    const user = userEvent.setup()
    render(<SimpleForm />)
    const email = screen.getByLabelText('Email')
    await user.type(email, 'abc')
    await user.tab()
    await user.type(email, '@uit.edu.vn')
    // No waitFor: if validation ran inside useEffect it would lag one render behind
    expect(email).toHaveAttribute('aria-invalid', 'false')
    expect(screen.queryByText('Email không hợp lệ')).not.toBeInTheDocument()
  })
})