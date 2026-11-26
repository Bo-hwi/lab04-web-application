import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { expect, it } from 'vitest'
import GalleryRoutes from './GalleryRoutes.jsx'

it('redirects the home page and preserves its category filter', () => {
  render(<MemoryRouter initialEntries={['/?category=architecture']}><GalleryRoutes /></MemoryRouter>)
  expect(screen.getByRole('heading', { name: 'Photo Gallery' })).toBeInTheDocument()
  expect(screen.getByText('City Architecture')).toBeInTheDocument()
  expect(screen.queryByText('Mountain Landscape')).not.toBeInTheDocument()
})

it('provides a recovery link for an unknown route', () => {
  render(<MemoryRouter initialEntries={['/missing']}><GalleryRoutes /></MemoryRouter>)
  expect(screen.getByRole('heading', { name: 'Not Found' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Return to gallery' })).toHaveAttribute('href', '/gallery')
})
