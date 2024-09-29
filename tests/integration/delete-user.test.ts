import { beforeEach, describe, expect, test } from 'bun:test'

import { DeleteUserUseCase, ShowUserUseCase } from '@/application/usecases'
import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'
import { UserRepositoryPostgres } from '@/infra/repositories/postgres'

let repository: UserRepository
let usecase: DeleteUserUseCase
let showUserUseCase: ShowUserUseCase

describe('INT', () => {
  beforeEach(() => {
    repository = new UserRepositoryPostgres()
    usecase = new DeleteUserUseCase(repository)
    showUserUseCase = new ShowUserUseCase(repository)
  })

  test('delete user - success', async () => {
    const user1 = User.create('john doe', 'johndoe@mail.com')
    const user2 = User.create('john three', 'johntrhee@mail.com')
    const user3 = User.create('john travolta', 'johntravolta@mail.com')
    await repository.save(user1)
    await repository.save(user2)
    await repository.save(user3)
    const outputShowUser = await showUserUseCase.execute(user3.userId)
    expect(outputShowUser.userId).toBeDefined()
    await usecase.execute(user3.userId)
    expect(() => showUserUseCase.execute(user3.userId)).toThrow(new Error('user not found'))
  })

  test.only('delete user - failed', async () => {
    expect(() => usecase.execute('fake-user-id')).toThrow(new Error('user not found'))
  })
})
