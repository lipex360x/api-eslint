import type { Context } from 'hono'

import { CreateUserUseCase } from '@/application/usecases'

export class PostController {
  async handle(c: Context) {
    const data = await c.req.json()
    const usecase = new CreateUserUseCase()
    const output = await usecase.execute(data)
    return c.json({ method: 'POST', data: output }, 201)
  }
}
