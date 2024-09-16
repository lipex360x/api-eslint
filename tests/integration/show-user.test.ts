import { beforeEach, describe, expect, test } from 'bun:test'

import { ShowUserUseCase } from '@/application/usecases'
import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'
import { UserRepositoryMemory } from '@/infra/repositories/memory'

let repository: UserRepository
let usecase: ShowUserUseCase

describe('INT', () => {
  beforeEach(() => {
    repository = new UserRepositoryMemory()
    usecase = new ShowUserUseCase(repository)
  })

  test('show user - success', async () => {
    const user1 = User.create('john doe', 'johndoe@mail.com')
    const user2 = User.create('john three', 'johntrhee@mail.com')
    const user3 = User.create('john travolta', 'johntravolta@mail.com')
    await repository.save(user1)
    await repository.save(user2)
    await repository.save(user3)
    const userId = user3.userId
    const output = await usecase.execute(userId)
    expect(output.userId).toEqual(userId)
    expect(output).toEqual({
      userId: expect.any(String),
      name: 'john travolta',
      email: 'johntravolta@mail.com',
    })
  })

  test('show user - failed', async () => {
    expect(() => usecase.execute('fake-user-id')).toThrow(new Error('user not found'))
  })
})
