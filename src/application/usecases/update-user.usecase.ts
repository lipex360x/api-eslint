import { inject, injectable } from 'tsyringe'

import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('userRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(userId: string, input: Input) {
    const getUser = await this.repository.findById(userId)
    if (!getUser) throw new Error('user not found')
    const payload = {
      name: input.name || getUser.name,
      email: input.email || getUser.email,
    }
    const updatedUser = new User(userId, payload.name, payload.email)
    await this.repository.update(updatedUser)
    return {
      name: updatedUser.name,
      email: updatedUser.email,
    }
  }
}

type Input = {
  name?: string
  email?: string
}
