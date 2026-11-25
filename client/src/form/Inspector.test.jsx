import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SimpleForm from './SimpleForm'

describe('inspector output', () => {
  it('T12: submitting an invalid form shows every error and no inspector', async () => {
    const user = userEvent.setup()
    render(<SimpleForm />)
    await user.click(screen.getByRole('button', { name: 'G\u1eedi' }))
    expect(screen.getAllByRole('alert')).toHaveLength(4)
    expect(screen.queryByRole('region', { name: 'Submitted data' })).not.toBeInTheDocument()
  })

  it('T13: a valid submit renders <ShowData /> without leaking passwords', async () => {
    const user = userEvent.setup()
    render(<SimpleForm />)
    await user.type(screen.getByLabelText('H\u1ecd t\u00ean'), 'Nguyen Van A')
    await user.type(screen.getByLabelText('Email'), 'a@uit.edu.vn')
    await user.type(screen.getByLabelText('M\u1eadt kh\u1ea9u'), 'secret123')
    await user.type(screen.getByLabelText('X\u00e1c nh\u1eadn m\u1eadt kh\u1ea9u'), 'secret123')
    await user.click(screen.getByRole('button', { name: 'G\u1eedi' }))

    const inspector = screen.getByRole('region', { name: 'Submitted data' })
    expect(within(inspector).getByText('Nguyen Van A')).toBeInTheDocument()
    expect(within(inspector).getByText('a@uit.edu.vn')).toBeInTheDocument()
    expect(within(inspector).queryByText('secret123')).not.toBeInTheDocument()
  })
})
