/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'

export class ListUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<Output> {
    const getUsers: any = this.repository.database
    const users: UserData[] = []
    for (const data of getUsers) {
      const user = new User(data.userId, data.name, data.email)
      users.push({
        userId: user.userId,
        name: user.name,
        email: user.email,
      })
    }
    return { data: users }
  }
}

type UserData = {
  userId: string
  name: string
  email: string
}

type Output = {
  data: UserData[]
}
