import type { Context } from 'hono'

export class GetController {
  async handle(c: Context) {
    return c.text('Hello World!')
  }
}
