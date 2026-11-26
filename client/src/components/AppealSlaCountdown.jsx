import { useAppealSlaTimer } from '../hooks/useAppealSlaTimer.js'

// Explicit demonstration deadline; no backend SLA policy is implied.
const DEMO_DEADLINE = '2026-12-01T00:00:00Z'

export default function AppealSlaCountdown() {
  const remainingMs = useAppealSlaTimer(DEMO_DEADLINE)
  const seconds = Math.ceil(remainingMs / 1000)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return (
    <section aria-label="Appeal review SLA">
      <h2>Demo review deadline</h2>
      <p><time dateTime={DEMO_DEADLINE}>1 December 2026, 00:00 UTC</time></p>
      <p role="timer" aria-live="off">
        {seconds === 0 ? 'Review deadline reached' : `${hours}h ${minutes}m ${seconds % 60}s remaining`}
      </p>
    </section>
  )
}
