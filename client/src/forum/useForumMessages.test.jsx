import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useForumMessages } from './useForumMessages'

// Fake fetch: each call returns a Promise that the test resolves manually
function installFetchMock() {
  const calls = []
  const fetchMock = vi.fn(
    (url, options = {}) =>
      new Promise((resolve, reject) => {
        calls.push({ url, options, resolve })
        options.signal?.addEventListener('abort', () =>
          reject(new DOMException('The operation was aborted.', 'AbortError')),
        )
      }),
  )
  vi.stubGlobal('fetch', fetchMock)
  return calls
}

const jsonResponse = (body, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useForumMessages', () => {
  it('H1: loads messages of the given channel from the contract URL', async () => {
    const calls = installFetchMock()
    const { result } = renderHook(() => useForumMessages('nasa'))
    expect(result.current.loading).toBe(true)
    expect(calls[0].url).toBe('/api/channels/nasa/messages')

    await act(async () => calls[0].resolve(jsonResponse([{ id: 'm1', author: 'A', text: 'hi' }])))
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toHaveLength(1)
  })

  it('H2: switching channel aborts the in-flight request', async () => {
    const calls = installFetchMock()
    const { rerender } = renderHook(({ channel }) => useForumMessages(channel), {
      initialProps: { channel: 'nasa' },
    })
    rerender({ channel: 'esports-tribunal' })
    await waitFor(() => expect(calls).toHaveLength(2))
    expect(calls[0].options.signal.aborted).toBe(true)
    expect(calls[1].options.signal.aborted).toBe(false)
  })

  it('H3: never shows messages of the previous channel after switching', async () => {
    const calls = installFetchMock()
    const { result, rerender } = renderHook(({ channel }) => useForumMessages(channel), {
      initialProps: { channel: 'nasa' },
    })
    await act(async () => calls[0].resolve(jsonResponse([{ id: 'n1', author: 'A', text: 'nasa msg' }])))
    expect(result.current.data).toHaveLength(1)

    rerender({ channel: 'notNasa' })
    // In the very first render after switching: no messages from the old channel
    expect(result.current.data).toEqual([])
    expect(result.current.loading).toBe(true)
  })

  it('H4: a non-OK response becomes an error instead of being rendered as data', async () => {
    const calls = installFetchMock()
    const { result } = renderHook(() => useForumMessages('nasa'))
    await act(async () => calls[0].resolve(jsonResponse({ error: 'boom' }, 500)))
    expect(result.current.error).toBe('HTTP 500')
    expect(result.current.data).toEqual([])
  })

  it('H5: postMessage sends JSON then refetches the channel', async () => {
    const calls = installFetchMock()
    const { result } = renderHook(() => useForumMessages('nasa'))
    await act(async () => calls[0].resolve(jsonResponse([])))

    let posting
    act(() => {
      posting = result.current.postMessage({ author: 'An', text: 'hello' })
    })
    expect(calls[1].options.method).toBe('POST')
    expect(JSON.parse(calls[1].options.body)).toEqual({ author: 'An', text: 'hello' })
    await act(async () => {
      calls[1].resolve(jsonResponse({ id: 'm2', author: 'An', text: 'hello' }, 201))
      await posting
    })
    await waitFor(() => expect(calls).toHaveLength(3))
    expect(calls[2].url).toBe('/api/channels/nasa/messages')
  })
})
