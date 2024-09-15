import { User } from '@/domain/entities'

export class CreateUserUseCase {
  async execute(input: Input) {
    const user = new User(input.name, input.email)
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
