import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { baseRoutes } from './infra/routes'

const app = new Hono()
app.use(logger())

app.route('', baseRoutes)

export { app }
