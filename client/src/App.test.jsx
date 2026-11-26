
import { beforeAll, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router'
import App from './App'

beforeAll(() => {
  const previousFocus = new WeakMap()

  HTMLDialogElement.prototype.showModal = vi.fn(function () {
    previousFocus.set(this, document.activeElement)
    this.setAttribute('open', '')

    const initialFocus = this.querySelector(
      '[autofocus], button, [href], input, select, textarea, [tabindex="0"]',
    )
    initialFocus?.focus()
  })

  HTMLDialogElement.prototype.close = vi.fn(function () {
    if (!this.open) return

    this.removeAttribute('open')

    const opener = previousFocus.get(this)
    previousFocus.delete(this)

    if (opener instanceof HTMLElement && opener.isConnected) {
      opener.focus()
    }

    this.dispatchEvent(new Event('close'))
  })
})

function LocationDisplay() {
  const location = useLocation()

  return (
    <output data-testid="current-url">
      {location.pathname + location.search}
    </output>
  )
}

function renderGallery(initialUrl = '/gallery') {
  return render(
    <MemoryRouter initialEntries={[initialUrl]}>
      <App />
      <LocationDisplay />
    </MemoryRouter>,
  )
}

describe('Photo Gallery', () => {
  it('renders App without crashing', () => {
    const { container } = renderGallery()
    expect(container).not.toBeEmptyDOMElement()
  })

  it('renders the Photo Gallery heading', () => {
    renderGallery()

    expect(
      screen.getByRole('heading', { name: 'Photo Gallery' }),
    ).toBeInTheDocument()
  })

  it('renders three photo titles', () => {
    renderGallery()

    expect(screen.getByText('Mountain Landscape')).toBeInTheDocument()
    expect(screen.getByText('City Architecture')).toBeInTheDocument()
    expect(screen.getByText('Forest Waterfall')).toBeInTheDocument()
  })

  it('renders three accessible images', () => {
    renderGallery()

    expect(screen.getAllByRole('img')).toHaveLength(3)

    expect(
      screen.getByRole('img', {
        name: 'Mountain landscape surrounded by nature',
      }),
    ).toBeInTheDocument()
  })

  it('filters photos by category from the URL', () => {
    renderGallery('/gallery?category=nature')

    expect(screen.getByText('Mountain Landscape')).toBeInTheDocument()
    expect(screen.getByText('Forest Waterfall')).toBeInTheDocument()
    expect(screen.queryByText('City Architecture')).not.toBeInTheDocument()
  })

  it('updates the URL and photos when selecting Nature', async () => {
    const user = userEvent.setup()
    renderGallery()

    await user.click(screen.getByRole('button', { name: 'Nature' }))

    expect(screen.getByTestId('current-url')).toHaveTextContent(
      '/gallery?category=nature',
    )

    expect(screen.getByText('Mountain Landscape')).toBeInTheDocument()
    expect(screen.getByText('Forest Waterfall')).toBeInTheDocument()
    expect(screen.queryByText('City Architecture')).not.toBeInTheDocument()
  })

  it('clears the category filter when selecting All', async () => {
    const user = userEvent.setup()
    renderGallery('/gallery?category=nature')

    await user.click(screen.getByRole('button', { name: 'All' }))

    expect(screen.getByTestId('current-url')).toHaveTextContent('/gallery')
    expect(screen.getByText('City Architecture')).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('opens a photo dialog and updates photoId in the URL', async () => {
    const user = userEvent.setup()
    renderGallery()

    await user.click(
      screen.getByRole('button', { name: 'View Mountain Landscape' }),
    )

    expect(screen.getByTestId('current-url')).toHaveTextContent(
      '/gallery?photoId=photo-001',
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(
      screen.getByRole('dialog', { name: 'Mountain Landscape' }),
    ).toBeInTheDocument()
  })

  it('closes the dialog and removes photoId from the URL', async () => {
    const user = userEvent.setup()
    renderGallery('/gallery?photoId=photo-001')

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.getByTestId('current-url')).toHaveTextContent('/gallery')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens a photo dialog from a direct URL', () => {
    renderGallery('/gallery?photoId=photo-002')

    expect(
      screen.getByRole('dialog', { name: 'City Architecture' }),
    ).toBeInTheDocument()
  })

  it('preserves category when opening and closing a photo', async () => {
    const user = userEvent.setup()
    renderGallery('/gallery?category=nature')

    await user.click(
      screen.getByRole('button', { name: 'View Mountain Landscape' }),
    )

    expect(screen.getByTestId('current-url')).toHaveTextContent(
      '/gallery?category=nature&photoId=photo-001',
    )

    await user.click(screen.getByRole('button', { name: 'Close' }))

        expect(screen.getByTestId('current-url')).toHaveTextContent(
      '/gallery?category=nature',
    )
  })

  it.each([
    ['Enter', '{Enter}'],
    ['Space', ' '],
  ])('opens a photo using %s', async (_name, key) => {
    const user = userEvent.setup()
    renderGallery()

    const opener = screen.getByRole('button', {
      name: 'View Mountain Landscape',
    })

    opener.focus()
    expect(opener).toHaveFocus()

    await user.keyboard(key)

    expect(
      screen.getByRole('dialog', { name: 'Mountain Landscape' }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'Close' }),
    ).toBeInTheDocument()

    expect(screen.getByTestId('current-url').textContent).toBe(
      '/gallery?photoId=photo-001',
    )
  })

  it('restores focus to the opening button after closing', async () => {
    const user = userEvent.setup()
    renderGallery()

    const opener = screen.getByRole('button', {
      name: 'View Mountain Landscape',
    })

    await user.click(opener)
    await user.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })

  it('handles an invalid photoId without opening a dialog', () => {
    renderGallery('/gallery?category=nature&photoId=unknown')

    expect(
      screen.getByRole('heading', { name: 'Photo Gallery' }),
    ).toBeInTheDocument()

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: 'View Mountain Landscape' }),
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: 'View City Architecture' }),
    ).not.toBeInTheDocument()
  })
})

