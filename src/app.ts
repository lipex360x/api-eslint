import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()
app.use(logger())

app.get('/', (c) => {
  return c.text('Hello World!')
})

app.post('/', async (c) => {
  const data = await c.req.json()
  return c.json({ method: 'POST', data }, 201)
})

app.put('/:id', async (c) => {
  const param = c.req.param()
  const query = c.req.query()
  const queries = c.req.queries()
  const body = await c.req.json()
  console.info({ param, query, queries, body })
  return c.json({ method: 'PUT' })
})

app.delete('/:id', (c) => {
  return c.body(null, 204)
})

export { app }
