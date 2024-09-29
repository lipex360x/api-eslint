import 'core-js'
import '@/infra/containers'

import { Hono } from 'hono'

import { errorHandler } from './infra/handlers'
import { userRoutes } from './infra/routes'

const app = new Hono()

app.route('/', userRoutes)

app.onError(errorHandler)

export { app }
