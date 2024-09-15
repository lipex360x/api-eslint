import type { Context } from 'hono'

export class PostController {
  async handle(c: Context) {
    const data = await c.req.json()
    return c.json({ method: 'POST', data }, 201)
  }
}
