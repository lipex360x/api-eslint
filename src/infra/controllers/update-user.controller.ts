import type { Context } from 'hono'
import { container } from 'tsyringe'

import { UpdateUserUseCase } from '@/application/usecases'

export class UpdateUserController {
  async handle(c: Context) {
    const { id } = c.req.param()
    const body = await c.req.json()
    const usecase = container.resolve(UpdateUserUseCase)
    const output = await usecase.execute(id, body)
    return c.json(output)
  }
}
