import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { expect, it } from 'vitest'
import App from '../App.jsx'

it.each(['unknown', 'toString', 'constructor', '__proto__'])('rejects undeclared dossier ID %s', (id) => {
  render(<MemoryRouter initialEntries={[`/dossier/${id}`]}><App /></MemoryRouter>)
  expect(screen.getByRole('heading', { name: 'Not Found' })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: 'Submit appeal' })).not.toBeInTheDocument()
})
