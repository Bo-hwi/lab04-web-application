import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import App from './App'
import { people } from './data/people'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('detail route handling', () => {
  it('T4: lists every person in the sidebar and asks to pick one', () => {
    renderAt('/people')
    const sidebar = screen.getByRole('navigation', { name: 'People' })
    for (const p of people) {
      expect(within(sidebar).getByRole('link', { name: p.name })).toBeInTheDocument()
    }
    expect(screen.getByText(/chọn một người/i)).toBeInTheDocument()
  })

  it('T5: finds a person whose id is a number from the string URL param', async () => {
    const first = people[0]
    expect(typeof first.id).toBe('number')
    renderAt(`/people/${first.id}`)
    const details = screen.getByRole('region', { name: 'Person details' })
    expect(await within(details).findByText(first.name)).toBeInTheDocument()
    expect(within(details).getByText(first.role)).toBeInTheDocument()
  })

  it('T6: shows a 404 alert for an unknown id', async () => {
    renderAt('/people/999')
    expect(await screen.findByRole('alert')).toHaveTextContent('404: Person Not Found')
  })

  it('T7: clicking a person in the sidebar shows their details', async () => {
    const user = userEvent.setup()
    const target = people[1]
    renderAt('/people')
    const sidebar = screen.getByRole('navigation', { name: 'People' })
    await user.click(within(sidebar).getByRole('link', { name: target.name }))
    const details = screen.getByRole('region', { name: 'Person details' })
    expect(await within(details).findByText(target.role)).toBeInTheDocument()
    expect(within(sidebar).getByRole('link', { name: target.name })).toHaveAttribute('aria-current', 'page')
  })
})