import type { Context } from 'hono'

export class PutController {
  async handle(c: Context) {
    // const param = c.req.param()
    // const query = c.req.query()
    // const queries = c.req.queries()
    // const body = await c.req.json()
    // console.info({ param, query, queries, body })
    return c.json({ method: 'PUT' })
  }
}
