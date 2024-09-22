import type { Context } from 'hono'
import { container } from 'tsyringe'

import { ListUsersUseCase } from '@/application/usecases'

export class ListUsersController {
  async handle(c: Context) {
    const usecase = container.resolve(ListUsersUseCase)
    const output = await usecase.execute()
    return c.json(output)
  }
}
