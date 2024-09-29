import type { Context } from 'hono'
import { container } from 'tsyringe'

import { ListUsersUseCase } from '@/application/usecases'

import { listUsersSchema } from '../schemas'

export class ListUsersController {
  async handle(c: Context) {
    const query = c.req.query()
    const input = listUsersSchema.parse(query)
    const usecase = container.resolve(ListUsersUseCase)
    const output = await usecase.execute(input)
    return c.json(output)
  }
}
