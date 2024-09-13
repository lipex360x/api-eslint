import { serve } from '@hono/node-server'

import { app } from './app'

const port = 3000
console.info('Server started - Port', port)

serve({
  fetch: app.fetch,
  port,
})
