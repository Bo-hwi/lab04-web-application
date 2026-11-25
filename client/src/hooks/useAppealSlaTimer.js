import { useCallback, useEffect, useState } from 'react'

export function useAppealSlaTimer(deadline) {
  const deadlineMs = new Date(deadline).getTime()

  const getRemaining = useCallback(() => {
    if (!Number.isFinite(deadlineMs)) return 0
    return Math.max(0, deadlineMs - Date.now())
  }, [deadlineMs])

  const [remainingMs, setRemainingMs] = useState(getRemaining)

  useEffect(() => {
    const syncWithSystemClock = () => {
      setRemainingMs(getRemaining())
    }

    syncWithSystemClock()
    const intervalId = window.setInterval(syncWithSystemClock, 1000)
    document.addEventListener('visibilitychange', syncWithSystemClock)

    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', syncWithSystemClock)
    }
  }, [getRemaining])

  return remainingMs
}