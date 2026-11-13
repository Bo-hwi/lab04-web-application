import express from 'express'
import cors from 'cors'
import { randomUUID } from 'node:crypto'
import { validateMessage } from './validateMessage.js'

export function createApp({ store, clientOrigin = 'http://localhost:5173' }) {
  const app = express()

  app.use(cors({ origin: clientOrigin }))
  // Slide 26 is missing this line → req.body is undefined → POST crashes
  app.use(express.json({ limit: '10kb' }))

  // One contract for client and server: /api/channels/:channelId/messages
  app.get('/api/channels/:channelId/messages', async (req, res) => {
    const { channelId } = req.params
    if (!store.hasChannel(channelId)) {
      return res.status(404).json({ error: 'Channel not found' })
    }
    res.json(await store.list(channelId))
  })

  app.post('/api/channels/:channelId/messages', async (req, res) => {
    const { channelId } = req.params
    if (!store.hasChannel(channelId)) {
      return res.status(404).json({ error: 'Channel not found' })
    }

    const errors = validateMessage(req.body)
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ error: 'Invalid payload', details: errors })
    }

    // Whitelist allowed fields. Slide 26 spreads ...req.body AFTER id → the client can overwrite id
    const message = {
      id: randomUUID(),
      author: req.body.author.trim(),
      text: req.body.text.trim(),
      createdAt: new Date().toISOString(),
    }
    await store.add(channelId, message)
    res.status(201).json(message)
  })

  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' })
  })

  // Express 5 forwards errors from async handlers here → no unhandled promise rejections
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const status = err.status ?? 500
    if (status >= 500) console.error(err)
    res.status(status).json({ error: status >= 500 ? 'Internal server error' : err.message })
  })

  return app
}
