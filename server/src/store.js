import { randomUUID } from 'node:crypto'
import { CHANNELS } from './channels.js'

// In-memory store (slide 26 uses an undefined `db`).
// Methods are async so this can be swapped for Mongoose 8 later without touching the routes.
export function createStore() {
  const data = new Map(CHANNELS.map((channel) => [channel, []]))
  data.get('nasa').push({
    id: randomUUID(),
    author: 'Mission Control',
    text: 'Welcome to #nasa',
    createdAt: new Date().toISOString(),
  })

  return {
    hasChannel: (channelId) => data.has(channelId),
    list: async (channelId) => [...data.get(channelId)],
    add: async (channelId, message) => {
      data.get(channelId).push(message)
      return message
    },
  }
}
