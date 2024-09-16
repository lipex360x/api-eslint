import type { UserRepository } from '@/infra/repositories'

export class DeleteUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(userId: string) {
    const getUser = this.repository.findById(userId)
    if (!getUser) return null
    await this.repository.delete(userId)
  }
}
