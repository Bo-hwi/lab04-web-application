import { useEffect, useRef, useState } from 'react'
import { isUuid, validateSwipe } from '../../shared/swipeContract.js'

function getSessionId() {
  try {
    const saved = localStorage.getItem('lab4-swipe-session')
    if (isUuid(saved)) return saved
    const id = crypto.randomUUID()
    localStorage.setItem('lab4-swipe-session', id)
    return id
  } catch { return crypto.randomUUID() }
}

async function readJson(url, options) {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`HTTP ${response.status}. Reload saved history if another tab changed the deck.`)
  if (response.status === 204) return null
  return response.json()
}

export function useSwipeDeck() {
  const [sessionId] = useState(getSessionId)
  const [reload, setReload] = useState(0)
  const [resource, setResource] = useState({ key: null, profiles: [], history: [], error: null })
  const [mutationError, setMutationError] = useState(null)
  const [pending, setPending] = useState(false)
  const busy = useRef(false)
  const controllers = useRef(new Set())
  const attempts = useRef(new Map())

  useEffect(() => {
    const controller = new AbortController()
    const active = controllers.current
    active.add(controller)
    Promise.all([
      readJson('/api/profiles', { signal: controller.signal }),
      readJson(`/api/swipes?sessionId=${encodeURIComponent(sessionId)}`, { signal: controller.signal }),
    ]).then(([profiles, history]) => {
      if (!controller.signal.aborted) setResource({ key: reload, profiles, history, error: null })
    }).catch((error) => {
      if (!controller.signal.aborted) setResource({ key: reload, profiles: [], history: [], error: error.message })
    })
    return () => { controller.abort(); active.delete(controller) }
  }, [reload, sessionId])

  useEffect(() => {
    const active = controllers.current
    return () => { for (const controller of active) controller.abort(); active.clear() }
  }, [])

  async function mutate(method, url, body) {
    if (busy.current || resource.key !== reload || resource.error) return
    busy.current = true
    setPending(true)
    setMutationError(null)
    const controller = new AbortController()
    controllers.current.add(controller)
    try {
      const action = await readJson(url, {
        method, signal: controller.signal,
        ...(body ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}),
      })
      controller.signal.throwIfAborted()
      setResource((previous) => ({
        ...previous,
        history: method === 'DELETE' ? previous.history.slice(0, -1)
          : previous.history.some((entry) => entry.id === action.id) ? previous.history : [...previous.history, action],
      }))
      if (body) attempts.current.delete(`${body.profileId}:${body.direction}`)
    } catch (error) {
      if (!controller.signal.aborted) setMutationError(error.message)
    } finally {
      controllers.current.delete(controller)
      busy.current = false
      if (!controller.signal.aborted) setPending(false)
    }
  }

  function swipe(profileId, direction) {
    if (!profileId || busy.current) return
    const key = `${profileId}:${direction}`
    if (!attempts.current.has(key)) attempts.current.set(key, crypto.randomUUID())
    const body = { sessionId, requestId: attempts.current.get(key), profileId, direction }
    const errors = validateSwipe(body)
    if (Object.keys(errors).length) { setMutationError(Object.values(errors).join(' ')); return }
    return mutate('POST', '/api/swipe', body)
  }

  function undo() {
    const latest = resource.history.at(-1)
    if (latest) return mutate('DELETE', `/api/swipe/${encodeURIComponent(latest.id)}?sessionId=${encodeURIComponent(sessionId)}`)
  }

  function reloadDeck() {
    if (busy.current) return
    setMutationError(null)
    setReload((previous) => previous + 1)
  }

  return { ...resource, loading: resource.key !== reload, pending, error: resource.error ?? mutationError, swipe, undo, reloadDeck }
}
