import type { Context } from 'hono'

export class DeleteController {
  async handle(c: Context) {
    return c.body(null, 204)
  }
}
