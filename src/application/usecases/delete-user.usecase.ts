import type { UserRepository } from '@/infra/repositories'

export class DeleteUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(userId: string) {
    const getUser = await this.repository.findById(userId)
    if (!getUser) throw new Error('user not found')
    await this.repository.delete(userId)
  }
}
