import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import { afterEach, expect, it, vi } from 'vitest'
import ForumPage from './ForumPage.jsx'

afterEach(() => vi.unstubAllGlobals())

it('rejects whitespace locally and submits trimmed values using the server rules', async () => {
  const fetchMock = vi.fn(async () => ({ ok: true, json: async () => [] }))
  vi.stubGlobal('fetch', fetchMock)
  const user = userEvent.setup()
  render(<MemoryRouter initialEntries={['/forum/nasa']}><Routes><Route path="/forum/:channelId" element={<ForumPage />} /></Routes></MemoryRouter>)
  await user.type(screen.getByLabelText('Author'), '   ')
  await user.type(screen.getByLabelText('Message'), '   ')
  await user.click(screen.getByRole('button', { name: 'Send' }))
  expect(screen.getAllByRole('alert')).toHaveLength(2)
  expect(fetchMock.mock.calls.filter(([, options]) => options?.method === 'POST')).toHaveLength(0)
  await user.type(screen.getByLabelText('Author'), 'An  ')
  await user.type(screen.getByLabelText('Message'), 'hello  ')
  await user.click(screen.getByRole('button', { name: 'Send' }))
  await waitFor(() => expect(fetchMock.mock.calls.some(([, options]) => options?.method === 'POST')).toBe(true))
  const [, options] = fetchMock.mock.calls.find(([, options]) => options?.method === 'POST')
  expect(JSON.parse(options.body)).toEqual({ author: 'An', text: 'hello' })
  expect(options.signal).toBeInstanceOf(AbortSignal)
})
