import { useCallback, useEffect, useState } from 'react'

// Contract (TASK_DECOMPOSITION §3): /api/channels/:channelId/messages
const messagesUrl = (channelId) => `/api/channels/${encodeURIComponent(channelId)}/messages`

export function useForumMessages(channelId) {
  // Bumped after a successful POST → the effect below refetches
  const [reloadToken, setReloadToken] = useState(0)
  const [result, setResult] = useState({ key: null, channelId: null, data: [], error: null })
  const requestKey = `${channelId}:${reloadToken}`

  useEffect(() => {
    // One AbortController per request; cleanup aborts it on channel switch or unmount
    const controller = new AbortController()
    const key = `${channelId}:${reloadToken}`

    fetch(messagesUrl(channelId), { signal: controller.signal })
      .then((res) => {
        // Slides 16/25 never check res.ok → an error body would be rendered as messages
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setResult({ key, channelId, data, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setResult({ key, channelId, data: [], error: err.message })
      })

    return () => controller.abort()
  }, [channelId, reloadToken])

  // Derived during render (no extra setState in the effect):
  const loading = result.key !== requestKey
  // Never expose messages of a previous channel while the new one loads
  const data = result.channelId === channelId ? result.data : []
  const error = result.key === requestKey ? result.error : null

  const postMessage = useCallback(
    async (payload) => {
      const res = await fetch(messagesUrl(channelId), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const created = await res.json()
      setReloadToken((t) => t + 1)
      return created
    },
    [channelId],
  )

  return { data, loading, error, postMessage }
}
