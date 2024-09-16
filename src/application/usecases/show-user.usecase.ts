/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'

export class ShowUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(userId: string): Promise<Output> {
    const getUser: any = this.repository.database.find((data: any) => data.userId === userId)
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
