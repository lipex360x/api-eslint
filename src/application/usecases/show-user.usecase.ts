import { StatusCodes } from 'http-status-codes'
import { inject, injectable } from 'tsyringe'

import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'

@injectable()
export class ShowUserUseCase {
  constructor(
    @inject('userRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(userId: string): Promise<Output> {
    const getUser = await this.repository.findById(userId)
    if (!getUser) throw new Error('user not found', { cause: StatusCodes.NOT_FOUND })
    const user = new User(getUser.userId, getUser.name, getUser.email)
    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
    }
  }
}

type Output = {
  userId: string
  name: string
  email: string
}
