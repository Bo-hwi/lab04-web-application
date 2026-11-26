import express from 'express'
import cors from 'cors'
import { isUuid, validateSwipe } from '../../shared/swipeContract.js'

const actionDto = (action) => ({
  id: String(action._id), sessionId: action.sessionId, requestId: action.requestId,
  profileId: action.profileId, direction: action.direction, createdAt: action.createdAt,
})

export function createApp({ models, clientOrigin = 'http://localhost:5173' }) {
  const { Profile, Swipe } = models
  const app = express()
  const sessionLocks = new Map()
  // Serialize writes for each session within this classroom Node process.
  async function withSession(sessionId, work) {
    const previous = sessionLocks.get(sessionId) ?? Promise.resolve()
    const current = previous.catch(() => {}).then(work)
    sessionLocks.set(sessionId, current)
    try { return await current } finally {
      if (sessionLocks.get(sessionId) === current) sessionLocks.delete(sessionId)
    }
  }

  app.use(cors({ origin: clientOrigin }))
  app.use(express.json({ limit: '10kb' }))
  app.get('/api/profiles', async (_req, res) => {
    const profiles = await Profile.find().sort({ _id: 1 }).lean()
    res.json(profiles.map((profile) => ({ id: profile._id, name: profile.name, age: profile.age, bio: profile.bio })))
  })
  app.get('/api/swipes', async (req, res) => {
    if (!isUuid(req.query.sessionId)) return res.status(400).json({ error: 'Invalid session ID.' })
    const history = await Swipe.find({ sessionId: req.query.sessionId }).sort({ createdAt: 1, _id: 1 }).lean()
    res.json(history.map(actionDto))
  })
  app.post('/api/swipe', async (req, res) => {
    const errors = validateSwipe(req.body)
    if (Object.keys(errors).length) return res.status(400).json({ error: 'Invalid swipe.', details: errors })
    const { sessionId, requestId, profileId, direction } = req.body
    await withSession(sessionId, async () => {
      const existing = await Swipe.findOne({ sessionId, requestId }).lean()
      if (existing) {
        if (existing.profileId !== profileId || existing.direction !== direction) return res.status(409).json({ error: 'Request ID already used with different data.' })
        return res.json(actionDto(existing))
      }
      if (!await Profile.exists({ _id: profileId })) return res.status(404).json({ error: 'Profile not found.' })
      const action = await Swipe.create({ sessionId, requestId, profileId, direction })
      return res.status(201).json(actionDto(action))
    })
  })
  app.delete('/api/swipe/:id', async (req, res) => {
    const { sessionId } = req.query
    if (!isUuid(sessionId) || !/^[0-9a-f]{24}$/i.test(req.params.id)) return res.status(400).json({ error: 'Invalid action or session ID.' })
    await withSession(sessionId, async () => {
      const target = await Swipe.findById(req.params.id).lean()
      if (!target) return res.status(204).end()
      if (target.sessionId !== sessionId) return res.status(404).json({ error: 'Action not found.' })
      const latest = await Swipe.findOne({ sessionId }).sort({ createdAt: -1, _id: -1 }).lean()
      if (String(latest._id) !== req.params.id) return res.status(409).json({ error: 'Only the latest action can be undone. Reload saved history.' })
      await Swipe.deleteOne({ _id: target._id, sessionId })
      return res.status(204).end()
    })
  })
  app.use((_req, res) => res.status(404).json({ error: 'Not found.' }))
  // Express 5 forwards async route failures here.
  // eslint-disable-next-line no-unused-vars
  app.use((error, _req, res, _next) => {
    const status = error.code === 11000 ? 409 : error.status ?? (error.name === 'ValidationError' ? 400 : 500)
    res.status(status).json({ error: status === 409 ? 'This profile was already saved. Reload saved history.' : status >= 500 ? 'Database request failed.' : 'Invalid request.' })
  })
  return app
}
