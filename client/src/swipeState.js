import { DIRECTION_POINTS } from '../../shared/swipeContract.js'

export function deriveDeck(profiles, history) {
  const removed = new Set(history.map((action) => action.profileId))
  return {
    remaining: profiles.filter((profile) => !removed.has(profile.id)),
    score: history.reduce((total, action) => {
      const points = typeof action.direction === 'string' && Object.hasOwn(DIRECTION_POINTS, action.direction)
        ? DIRECTION_POINTS[action.direction] : 0
      return total + points
    }, 0),
  }
}
