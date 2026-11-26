import mongoose from 'mongoose'
import { pathToFileURL } from 'node:url'
import { createApp } from './app.js'
import { createModels, seedProfiles } from './models.js'

export async function startServer({ uri = process.env.MONGODB_URI, port = Number(process.env.PORT ?? 3000) } = {}) {
  if (!uri) throw new Error('MONGODB_URI is required. Copy server/.env.example to server/.env and configure MongoDB.')
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  try {
    const models = createModels(mongoose.connection)
    await seedProfiles(models.Profile)
    await models.Swipe.init()
    const server = createApp({ models, clientOrigin: process.env.CLIENT_ORIGIN }).listen(port)
    await new Promise((resolve, reject) => { server.once('listening', resolve); server.once('error', reject) })
    return server
  } catch (error) {
    await mongoose.disconnect()
    throw error
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const server = await startServer()
    console.log(`Swipe API listening on port ${server.address().port}`)
    const shutdown = () => server.close(async () => { await mongoose.disconnect() })
    process.once('SIGINT', shutdown)
    process.once('SIGTERM', shutdown)
  } catch {
    console.error('Could not start the swipe API. Set MONGODB_URI and check that MongoDB is available.')
    process.exitCode = 1
  }
}
