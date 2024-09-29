import { beforeEach, describe, expect, test } from 'bun:test'

import { DeleteUserUseCase, ListUsersUseCase } from '@/application/usecases'
import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'
import { UserRepositoryMemory } from '@/infra/repositories/memory'

let repository: UserRepository
let usecase: DeleteUserUseCase
let listUsersUseCase: ListUsersUseCase

describe('INT', () => {
  beforeEach(() => {
    repository = new UserRepositoryMemory()
    usecase = new DeleteUserUseCase(repository)
    listUsersUseCase = new ListUsersUseCase(repository)
  })

  test('delete user - success', async () => {
    let outputListUsers = await listUsersUseCase.execute()
    expect(outputListUsers.data).toHaveLength(0)
    const user1 = User.create('john doe', 'johndoe@mail.com')
    const user2 = User.create('john three', 'johntrhee@mail.com')
    const user3 = User.create('john travolta', 'johntravolta@mail.com')
    await repository.save(user1)
    await repository.save(user2)
    await repository.save(user3)
    outputListUsers = await listUsersUseCase.execute()
    expect(outputListUsers.data).toHaveLength(3)
    await usecase.execute(user3.userId)
    outputListUsers = await listUsersUseCase.execute()
    expect(outputListUsers.data).toHaveLength(2)
  })

  test('delete user - failed', async () => {
    expect(() => usecase.execute('fake-user-id')).toThrow(new Error('user not found'))
  })
})
