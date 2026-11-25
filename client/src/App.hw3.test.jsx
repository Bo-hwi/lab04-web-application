import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { createMemoryRouter, RouterProvider, useLocation } from 'react-router'
import App from './App.jsx'

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

function renderGallery(initialUrl) {
  const router = createMemoryRouter(
    [
      {
        path: '*',
        element: (
          <>
            <App />
            <LocationDisplay />
          </>
        ),
      },
    ],
    { initialEntries: [initialUrl] },
  )

  return {
    router,
    ...render(<RouterProvider router={router} />),
  }
}

describe('Homework 3 photo dialog behavior', () => {
  it('closes and reopens the photo dialog with browser Back and Forward', async () => {
    const user = userEvent.setup()
    const { router } = renderGallery('/gallery?category=nature')

    await user.click(
      screen.getByRole('button', { name: 'View Mountain Landscape' }),
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByTestId('current-url')).toHaveTextContent(
      '/gallery?category=nature&photoId=photo-001',
    )

    await act(async () => {
      await router.navigate(-1)
    })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByTestId('current-url')).toHaveTextContent(
      '/gallery?category=nature',
    )

    await act(async () => {
      await router.navigate(1)
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByTestId('current-url')).toHaveTextContent(
      '/gallery?category=nature&photoId=photo-001',
    )
  })

  it('closes on Escape, preserves the category, and restores focus', async () => {
    const user = userEvent.setup()
    renderGallery('/gallery?category=nature')

    const opener = screen.getByRole('button', {
      name: 'View Mountain Landscape',
    })

    await user.click(opener)

    fireEvent(
      screen.getByRole('dialog'),
      new Event('cancel', { bubbles: true, cancelable: true }),
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByTestId('current-url')).toHaveTextContent(
      '/gallery?category=nature',
    )
    expect(opener).toHaveFocus()
  })
})