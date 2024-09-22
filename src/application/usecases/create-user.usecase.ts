import { inject, injectable } from 'tsyringe'

import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('userRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(input: Input) {
    const user = User.create(input.name, input.email)
    await this.repository.save(user)
    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
    }
  }
}

type Input = {
  name: string
  email: string
}
