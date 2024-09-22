import type { Context } from 'hono'
import { container } from 'tsyringe'

import { DeleteUserUseCase } from '@/application/usecases'

export class DeleteUserController {
  async handle(c: Context) {
    const { id } = c.req.param()
    const usecase = container.resolve(DeleteUserUseCase)
    await usecase.execute(id)
    return c.body(null, 204)
  }
}
