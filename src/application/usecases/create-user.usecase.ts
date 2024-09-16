import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'

export class CreateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

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
