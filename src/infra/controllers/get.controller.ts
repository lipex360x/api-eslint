import type { Context } from 'hono'

import { ShowUserUseCase } from '@/application/usecases'

export class GetController {
  async handle(c: Context) {
    const usecase = new ShowUserUseCase()
    const output = await usecase.execute()
    return c.text(output)
  }
}
