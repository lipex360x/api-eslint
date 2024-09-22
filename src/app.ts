import 'core-js'
import '@/infra/containers'

import { Hono } from 'hono'

import { userRoutes } from './infra/routes'

const app = new Hono()

app.route('/', userRoutes)

export { app }
