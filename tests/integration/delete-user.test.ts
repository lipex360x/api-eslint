import { beforeEach, describe, expect, test } from 'bun:test'

import { DeleteUserUseCase } from '@/application/usecases'
import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'
import { UserRepositoryMemory } from '@/infra/repositories/memory'

let repository: UserRepository

describe('INT', () => {
  beforeEach(() => {
    repository = new UserRepositoryMemory()
  })

  test('delete user', async () => {
    let outputListUsers = await repository.list()
    expect(outputListUsers).toHaveLength(0)
    const user1 = User.create('john doe', 'johndoe@mail.com')
    const user2 = User.create('john three', 'johntrhee@mail.com')
    const user3 = User.create('john travolta', 'johntravolta@mail.com')
    await repository.save(user1)
    await repository.save(user2)
    await repository.save(user3)
    outputListUsers = await repository.list()
    expect(outputListUsers).toHaveLength(3)
    const usecase = new DeleteUserUseCase(repository)
    await usecase.execute(user3.userId)
    outputListUsers = await repository.list()
    expect(outputListUsers).toHaveLength(2)
  })
})
