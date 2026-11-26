import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from '../App.jsx'
import { computeDisproportionalityMatrix } from './computeDisproportionalityMatrix.js'

describe('dossier comparison', () => {
  it('derives normalized penalty ratios without changing the inputs', () => {
    const cases = [{ id: 'a', severity: 2, penaltyDays: 10 }, { id: 'b', severity: 4, penaltyDays: 10 }]
    const result = computeDisproportionalityMatrix(cases)
    expect(result).toEqual([[1, 2], [0.5, 1]])
    expect(cases[0].penaltyDays).toBe(10)
    expect(computeDisproportionalityMatrix([{ severity: 0, penaltyDays: 0 }])).toEqual([[null]])
  })

  it('uses a single main landmark and updates the clearly labelled demo matrix during input', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/dossier/himass']}><App /></MemoryRouter>)
    expect(screen.getAllByRole('main')).toHaveLength(1)
    expect(screen.getByText(/hypothetical comparison data/i)).toBeInTheDocument()
    const table = screen.getByRole('table', { name: 'Normalized penalty ratio matrix' })
    expect(within(table).getByRole('cell', { name: '2.00' })).toBeInTheDocument()
    const penalty = screen.getByRole('spinbutton', { name: 'Himass penalty days' })
    await user.clear(penalty)
    await user.type(penalty, '5')
    expect(within(table).queryByRole('cell', { name: '2.00' })).not.toBeInTheDocument()
  })
})
