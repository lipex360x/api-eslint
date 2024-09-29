import { beforeEach, describe, expect, test } from 'bun:test'

import { UpdateUserUseCase } from '@/application/usecases'
import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'
// import { UserRepositoryMemory } from '@/infra/repositories/memory'
import { UserRepositoryPostgres } from '@/infra/repositories/postgres'

let repository: UserRepository
let usecase: UpdateUserUseCase

describe('INT', () => {
  beforeEach(() => {
    repository = new UserRepositoryPostgres()
    usecase = new UpdateUserUseCase(repository)
  })

  test('update user - success', async () => {
    const user = User.create('john doe', 'john@mail.com')
    await repository.save(user)
    let getUser = await repository.findById(user.userId)
    expect(getUser?.name).toBe('john doe')
    expect(getUser?.email).toBe('john@mail.com')
    const input = {
      name: 'john travolta',
    }
    const output = await usecase.execute(user.userId, input)
    expect(output).toEqual({
      name: 'john travolta',
      email: 'john@mail.com',
    })
    getUser = await repository.findById(user.userId)
    expect(getUser?.name).toBe('john travolta')
  })

  test('update user - success', async () => {
    expect(() => usecase.execute('fake-user-id', {})).toThrow(new Error('user not found'))
  })
})
