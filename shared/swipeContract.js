export const DIRECTION_POINTS = Object.freeze({ left: -5, right: 10, up: 20 })
export const isUuid = (value) => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)

export function validateSwipe(body) {
  const errors = {}
  if (!isUuid(body?.sessionId)) errors.sessionId = 'A valid session UUID is required.'
  if (!isUuid(body?.requestId)) errors.requestId = 'A valid request UUID is required.'
  if (typeof body?.profileId !== 'string' || !/^[a-z][a-z0-9-]{0,63}$/.test(body.profileId)) errors.profileId = 'Invalid profile ID.'
  if (typeof body?.direction !== 'string' || !Object.hasOwn(DIRECTION_POINTS, body.direction)) errors.direction = 'Choose left, right or up.'
  return errors
}
