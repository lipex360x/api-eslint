import type { Context } from 'hono'
import { container } from 'tsyringe'

import { ShowUserUseCase } from '@/application/usecases'

export class ShowUserController {
  async handle(c: Context) {
    const { id } = c.req.param()
    const usecase = container.resolve(ShowUserUseCase)
    const output = await usecase.execute(id)
    return c.json(output)
  }
}
