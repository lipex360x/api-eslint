import type { Context } from 'hono'
import { container } from 'tsyringe'

import { CreateUserUseCase } from '@/application/usecases'

export class CreateUserController {
  async handle(c: Context) {
    const data = await c.req.json()
    const usecase = container.resolve(CreateUserUseCase)
    const output = await usecase.execute(data)
    return c.json(output, 201)
  }
}
