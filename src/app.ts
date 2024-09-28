import 'core-js'
import '@/infra/containers'

import { Hono } from 'hono'

import { userRoutes } from './infra/routes'

const app = new Hono()

app.onError((error, c) => {
  return c.body(null, 404)
})

app.route('/', userRoutes)

app.onError((error, c) => {
  return c.json(error.message, error.cause || 404)
})

export { app }
