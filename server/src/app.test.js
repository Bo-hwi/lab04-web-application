import { after, before, beforeEach, test } from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server-core'
import { createApp } from './app.js'
import { createModels, seedProfiles } from './models.js'
import { startServer } from './index.js'

let database, connection, models, server, base
const sessionId = randomUUID()
const payload = (profileId = 'an', direction = 'right') => ({ sessionId, requestId: randomUUID(), profileId, direction })
const send = (path, body) => fetch(base + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

before(async () => {
  database = await MongoMemoryServer.create({ binary: { version: '8.0.17', downloadDir: fileURLToPath(new URL('../.cache/mongodb', import.meta.url)) } })
  connection = await mongoose.createConnection(database.getUri()).asPromise()
  models = createModels(connection)
  await seedProfiles(models.Profile)
  await models.Swipe.init()
  server = createApp({ models }).listen(0, '127.0.0.1')
  await once(server, 'listening')
  base = `http://127.0.0.1:${server.address().port}`
})
beforeEach(async () => { await models.Swipe.deleteMany({}) })
after(async () => {
  if (server) { server.closeAllConnections(); await new Promise((resolve) => server.close(resolve)) }
  await connection?.close()
  await database?.stop()
})

test('GET profiles and malformed payload validation', async () => {
  const response = await fetch(base + '/api/profiles')
  assert.equal(response.status, 200)
  assert.equal((await response.json())[0].name, 'An')
  assert.equal((await send('/api/swipe', { ...payload(), direction: 'invalid' })).status, 400)
  assert.equal((await send('/api/swipe', { ...payload(), direction: 'constructor' })).status, 400)
  assert.equal((await send('/api/swipe', { ...payload(), direction: { toString: 'invalid', valueOf: 'invalid' } })).status, 400)
  assert.equal((await send('/api/swipe', { ...payload(), direction: 'constructor' })).status, 400)
  assert.equal((await send('/api/swipe', { ...payload(), direction: { toString: 'invalid' } })).status, 400)
  assert.equal((await send('/api/swipe', { ...payload(), sessionId: '__proto__' })).status, 400)
  assert.equal((await send('/api/swipe', payload('missing'))).status, 404)
})

test('MongoDB swipes rehydrate in order through a new app instance', async () => {
  await send('/api/swipe', payload('an', 'left'))
  await send('/api/swipe', payload('binh', 'up'))
  const secondConnection = await mongoose.createConnection(database.getUri()).asPromise()
  const secondServer = createApp({ models: createModels(secondConnection) }).listen(0, '127.0.0.1')
  await once(secondServer, 'listening')
  try {
    const response = await fetch(`http://127.0.0.1:${secondServer.address().port}/api/swipes?sessionId=${sessionId}`)
    assert.equal(response.status, 200)
    const history = await response.json()
    assert.deepEqual(history.map((action) => action.direction), ['left', 'up'])
    assert.equal(await models.Swipe.countDocuments({ sessionId }), 2)
  } finally {
    secondServer.closeAllConnections()
    await new Promise((resolve) => secondServer.close(resolve))
    await secondConnection.close()
  }
})

test('idempotent retry returns the same action and ignores injected fields', async () => {
  const body = { ...payload(), id: 'hacked', score: 9000, isAdmin: true }
  const first = await send('/api/swipe', body)
  assert.equal(first.status, 201)
  const action = await first.json()
  const retry = await send('/api/swipe', body)
  assert.equal(retry.status, 200)
  assert.equal((await retry.json()).id, action.id)
  const record = await models.Swipe.findById(action.id).lean()
  assert.equal(record.score, undefined)
  assert.equal(record.isAdmin, undefined)
  assert.notEqual(action.id, 'hacked')
  assert.equal(await models.Swipe.countDocuments(), 1)
  assert.equal((await send('/api/swipe', { ...body, direction: 'left' })).status, 409)
})

test('concurrent duplicate swipes do not duplicate a card', async () => {
  const responses = await Promise.all([send('/api/swipe', payload()), send('/api/swipe', payload())])
  assert.deepEqual(responses.map((response) => response.status).sort(), [201, 409])
  assert.equal(await models.Swipe.countDocuments(), 1)
})

test('undo is LIFO, session-scoped, and repeatable after a lost response', async () => {
  const first = await (await send('/api/swipe', payload('an'))).json()
  const second = await (await send('/api/swipe', payload('binh'))).json()
  const remove = (id, session = sessionId) => fetch(`${base}/api/swipe/${id}?sessionId=${session}`, { method: 'DELETE' })
  assert.equal((await remove(first.id)).status, 409)
  assert.equal((await remove(second.id, randomUUID())).status, 404)
  assert.equal((await remove(second.id)).status, 204)
  assert.equal((await remove(second.id)).status, 204)
  assert.equal((await remove(first.id)).status, 204)
  assert.equal(await models.Swipe.countDocuments(), 0)
})

test('malformed JSON, missing sessions and unknown paths return bounded errors', async () => {
  const malformed = await fetch(base + '/api/swipe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' })
  assert.equal(malformed.status, 400)
  assert.equal((await fetch(base + '/api/swipes')).status, 400)
  assert.equal((await fetch(base + '/missing')).status, 404)
})

test('startup requires an environment-provided MongoDB URI', async () => {
  await assert.rejects(startServer({ uri: '' }), /MONGODB_URI is required/)
})
