import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useAppealSlaTimer } from './useAppealSlaTimer.js'

const NOW = new Date('2026-01-01T00:00:00.000Z')

describe('useAppealSlaTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('calculates remaining milliseconds from the absolute deadline', () => {
    const deadline = new Date(NOW.getTime() + 5000)
    const { result } = renderHook(() => useAppealSlaTimer(deadline))

    expect(result.current).toBe(5000)
  })

  it('recalculates from the system clock instead of subtracting ticks', () => {
    const deadline = new Date(NOW.getTime() + 10_000)
    const { result } = renderHook(() => useAppealSlaTimer(deadline))

    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(result.current).toBe(7000)

    act(() => {
      vi.setSystemTime(new Date(NOW.getTime() + 8000))
      document.dispatchEvent(new Event('visibilitychange'))
    })
    expect(result.current).toBe(2000)
  })

  it('never returns a negative value after the deadline', () => {
    const deadline = new Date(NOW.getTime() + 1000)
    const { result } = renderHook(() => useAppealSlaTimer(deadline))

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current).toBe(0)
  })
})