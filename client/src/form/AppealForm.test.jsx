import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppealForm from './AppealForm.jsx'

describe('appeal form', () => {
  it('keeps the submitted reason stable while editing the draft', async () => {
    const user = userEvent.setup()
    render(<AppealForm playerName="Himass" />)
    const reason = screen.getByRole('textbox', { name: 'Appeal reason' })
    const original = 'The replay shows that the reported action was accidental.'
    await user.type(reason, original)
    await user.click(screen.getByRole('button', { name: 'Submit appeal' }))
    await user.clear(reason)
    expect(screen.getByRole('status')).toHaveTextContent(original)
    await user.click(screen.getByRole('button', { name: 'Submit appeal' }))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
  it('shows a validation error and clears it as the reason becomes valid', async () => {
    const user = userEvent.setup()
    render(<AppealForm playerName="Himass" />)

    const reason = screen.getByRole('textbox', { name: 'Appeal reason' })

    await user.type(reason, 'Too short')
    await user.tab()
    expect(reason).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Explain the appeal in at least 20 characters.',
    )

    await user.clear(reason)
    await user.type(
      reason,
      'The replay shows that the reported action was accidental.',
    )
    expect(reason).toHaveAttribute('aria-invalid', 'false')
  })

  it('requires an evidence description when submitting an evidence URL', async () => {
    const user = userEvent.setup()
    render(<AppealForm playerName="Himass" />)

    await user.type(
      screen.getByRole('textbox', { name: 'Appeal reason' }),
      'The replay shows that the reported action was accidental.',
    )
    await user.type(
      screen.getByRole('textbox', { name: 'Evidence URL (optional)' }),
      'https://example.com/replay',
    )
    await user.click(screen.getByRole('button', { name: 'Submit appeal' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Describe the evidence you linked.',
    )
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows a confirmation after submitting a valid appeal', async () => {
    const user = userEvent.setup()
    render(<AppealForm playerName="TanVuu" />)

    await user.type(
      screen.getByRole('textbox', { name: 'Appeal reason' }),
      'The replay shows that the reported action was accidental.',
    )
    await user.click(screen.getByRole('button', { name: 'Submit appeal' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Appeal for TanVuu is ready for review.',
    )
  })
})
