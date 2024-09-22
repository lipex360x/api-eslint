import { beforeAll, describe } from 'bun:test'

import { app } from '@/app'
describe('E2E', () => {
  beforeAll(() => app.mount('/', () => new Response(null)))
})
