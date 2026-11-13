import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { createApp } from './app.js'
import { createStore } from './store.js'

let server
let base

before(async () => {
  server = createApp({ store: createStore() }).listen(0)
  await once(server, 'listening')
  base = `http://127.0.0.1:${server.address().port}/api/channels`
})

after(() => server.close())

const postJson = (channel, body) =>
  fetch(`${base}/${channel}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })

test('S1: GET a known channel returns 200 and an array', async () => {
  const res = await fetch(`${base}/nasa/messages`)
  assert.equal(res.status, 200)
  assert.ok(Array.isArray(await res.json()))
})

test('S2: GET an unknown channel returns 404', async () => {
  const res = await fetch(`${base}/khong-co/messages`)
  assert.equal(res.status, 404)
})

test('S3: POST without text returns 400 (requires express.json())', async () => {
  const res = await postJson('nasa', { author: 'An' })
  assert.equal(res.status, 400)
})

test('S4: POST ignores client-supplied id and unknown fields (no mass assignment)', async () => {
  const res = await postJson('nasa', { author: 'An', text: 'hi', id: 'hacked', isAdmin: true })
  assert.equal(res.status, 201)
  const msg = await res.json()
  assert.notEqual(msg.id, 'hacked')
  assert.equal(msg.isAdmin, undefined)
})

test('S5: POST then GET returns the new message in that channel only', async () => {
  const res = await postJson('esports-tribunal', { author: 'Judge', text: 'Appeal received' })
  assert.equal(res.status, 201)
  const created = await res.json()
  const list = await (await fetch(`${base}/esports-tribunal/messages`)).json()
  assert.ok(list.some((m) => m.id === created.id))
  const other = await (await fetch(`${base}/notNasa/messages`)).json()
  assert.ok(!other.some((m) => m.id === created.id))
})

test('S6: malformed JSON returns 400, not 500', async () => {
  const res = await postJson('nasa', '{"author": "An",')
  assert.equal(res.status, 400)
})
