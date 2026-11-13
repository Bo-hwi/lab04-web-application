import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from './App'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('router layout', () => {
  it('T1: shows main navigation and Home page at /', () => {
    renderAt('/')
    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(within(nav).getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'People' })).toBeInTheDocument()
    expect(within(nav).getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeInTheDocument()
  })

  it('T2: marks only the active link with aria-current="page"', () => {
    renderAt('/about')
    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
    expect(within(nav).getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument()
  })

  it('T3: shows Not Found page for an unknown URL', () => {
    renderAt('/khong-ton-tai')
    expect(screen.getByRole('heading', { level: 1, name: 'Not Found' })).toBeInTheDocument()
  })
})