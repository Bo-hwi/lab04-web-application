import { createApp } from './app.js'
import { createStore } from './store.js'

const port = Number(process.env.PORT ?? 3000)
const app = createApp({ store: createStore(), clientOrigin: process.env.CLIENT_ORIGIN })

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
