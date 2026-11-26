import { act, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import AppealSlaCountdown from './AppealSlaCountdown.jsx'

afterEach(() => vi.useRealTimers())

it('shows the declared deadline and expires against the system clock', () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-11-30T23:59:58Z'))
  render(<AppealSlaCountdown />)
  expect(screen.getByText('1 December 2026, 00:00 UTC')).toHaveAttribute('datetime', '2026-12-01T00:00:00Z')
  expect(screen.getByRole('timer')).toHaveTextContent('0h 0m 2s remaining')
  act(() => vi.advanceTimersByTime(2000))
  expect(screen.getByRole('timer')).toHaveTextContent('Review deadline reached')
})
