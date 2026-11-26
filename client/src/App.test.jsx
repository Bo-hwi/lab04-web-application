import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App.jsx'
import { deriveDeck } from './swipeState.js'

const profiles = [
  { id: 'an', name: 'An', age: 24, bio: 'Fictional profile one' },
  { id: 'binh', name: 'Binh', age: 26, bio: 'Fictional profile two' },
  { id: 'chi', name: 'Chi', age: 25, bio: 'Fictional profile three' },
]

function installApi() {
  const history = []
  const fetchMock = vi.fn(async (url, options = {}) => {
    if (options.method === 'POST') {
      const action = { ...JSON.parse(options.body), id: `action-${history.length + 1}` }
      history.push(action)
      return { ok: true, json: async () => action }
    }
    if (options.method === 'DELETE') { history.pop(); return { ok: true, status: 204 } }
    return { ok: true, json: async () => url.startsWith('/api/profiles') ? profiles : [...history] }
  })
  vi.stubGlobal('fetch', fetchMock)
  return { history, fetchMock }
}

function mount() { return render(<MemoryRouter initialEntries={['/swipe']}><App /></MemoryRouter>) }
beforeEach(() => localStorage.clear())
afterEach(() => vi.unstubAllGlobals())

describe('swipe queue', () => {
  it('keeps keyboard button focus after saving and returns to the deck when undo becomes unavailable', async () => {
    installApi()
    const user = userEvent.setup()
    mount()
    await screen.findByRole('heading', { name: 'An, 24' })
    const like = screen.getByRole('button', { name: 'Like (+10)' })
    like.focus()
    await user.keyboard('{Enter}')
    await screen.findByRole('heading', { name: 'Binh, 26' })
    expect(like).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Undo last swipe' }))
    await screen.findByRole('heading', { name: 'An, 24' })
    expect(screen.getByRole('group', { name: 'Swipe deck' })).toHaveFocus()
  })
  it('derives remaining order and asymmetric score without mutating the input', () => {
    const history = [{ profileId: 'an', direction: 'right' }, { profileId: 'binh', direction: 'left' }]
    expect(deriveDeck(profiles, history)).toEqual({ remaining: [profiles[2]], score: 5 })
    expect(deriveDeck(profiles, [{ profileId: 'an', direction: 'up' }]).score).toBe(20)
    expect(history).toHaveLength(2)
  })

  it('saves keyboard swipes and undoes them in LIFO order', async () => {
    installApi()
    const user = userEvent.setup()
    mount()
    await screen.findByRole('heading', { name: 'An, 24' })
    screen.getByRole('group', { name: 'Swipe deck' }).focus()
    await user.keyboard('{ArrowRight}')
    await screen.findByRole('heading', { name: 'Binh, 26' })
    await user.keyboard('{ArrowLeft}')
    await screen.findByRole('heading', { name: 'Chi, 25' })
    expect(screen.getByLabelText('Score')).toHaveTextContent('5')
    await user.keyboard('{Backspace}')
    await screen.findByRole('heading', { name: 'Binh, 26' })
    expect(screen.getByLabelText('Score')).toHaveTextContent('10')
  })

  it('provides button alternatives and rehydrates saved history on remount', async () => {
    const { fetchMock } = installApi()
    const user = userEvent.setup()
    const view = mount()
    await screen.findByRole('heading', { name: 'An, 24' })
    await user.click(screen.getByRole('button', { name: 'Super like (+20)' }))
    await screen.findByRole('heading', { name: 'Binh, 26' })
    view.unmount()
    mount()
    await screen.findByRole('heading', { name: 'Binh, 26' })
    expect(screen.getByLabelText('Score')).toHaveTextContent('20')
    expect(fetchMock.mock.calls.every(([, options]) => options.signal instanceof AbortSignal)).toBe(true)
  })

  it('handles pointer gestures, ignores small movements, and clears cancelled gestures', async () => {
    const { history } = installApi()
    mount()
    await screen.findByRole('heading', { name: 'An, 24' })
    const card = screen.getByRole('article', { name: 'Current profile' })
    fireEvent.pointerDown(card, { clientX: 100, clientY: 100, button: 0, isPrimary: true, pointerId: 1 })
    fireEvent.pointerUp(card, { clientX: 110, clientY: 100, pointerId: 1 })
    expect(history).toHaveLength(0)
    fireEvent.pointerDown(card, { clientX: 100, clientY: 100, button: 0, isPrimary: true, pointerId: 1 })
    fireEvent.pointerCancel(card, { pointerId: 1 })
    fireEvent.pointerUp(card, { clientX: 200, clientY: 100, pointerId: 1 })
    expect(history).toHaveLength(0)
    fireEvent.pointerDown(card, { clientX: 100, clientY: 100, button: 0, isPrimary: true, pointerId: 2 })
    fireEvent.pointerUp(card, { clientX: 200, clientY: 100, pointerId: 2 })
    await screen.findByRole('heading', { name: 'Binh, 26' })
    expect(history).toHaveLength(1)
  })

  it('retains the card and score on a failed save and allows a retry', async () => {
    const { fetchMock } = installApi()
    const user = userEvent.setup()
    mount()
    await screen.findByRole('heading', { name: 'An, 24' })
    fetchMock.mockResolvedValueOnce({ ok: false, status: 503 })
    await user.click(screen.getByRole('button', { name: 'Like (+10)' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('503')
    expect(screen.getByRole('heading', { name: 'An, 24' })).toBeInTheDocument()
    expect(screen.getByLabelText('Score')).toHaveTextContent('0')
    await user.click(screen.getByRole('button', { name: 'Like (+10)' }))
    await screen.findByRole('heading', { name: 'Binh, 26' })
    const posts = fetchMock.mock.calls.filter(([, options]) => options.method === 'POST')
    expect(JSON.parse(posts[0][1].body).requestId).toBe(JSON.parse(posts[1][1].body).requestId)
  })

  it('aborts initial requests on unmount and offers retry after a load error', async () => {
    const { fetchMock } = installApi()
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500 })
    const user = userEvent.setup()
    const view = mount()
    expect(await screen.findByRole('alert')).toHaveTextContent('500')
    await user.click(screen.getByRole('button', { name: 'Reload saved deck' }))
    await screen.findByRole('heading', { name: 'An, 24' })
    view.unmount()
    await waitFor(() => expect(fetchMock.mock.calls.every(([, options]) => options.signal.aborted)).toBe(true))
  })
})
