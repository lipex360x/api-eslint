import { beforeEach, describe, expect, test } from 'bun:test'

import { UpdateUserUseCase } from '@/application/usecases'
import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'
import { UserRepositoryMemory } from '@/infra/repositories/memory'

let repository: UserRepository

describe('INT', () => {
  beforeEach(() => {
    repository = new UserRepositoryMemory()
  })

  test('update user', async () => {
    const user = User.create('john doe', 'john@mail.com')
    await repository.save(user)
    const input = {
      name: 'john travolta',
    }
    const usecase = new UpdateUserUseCase(repository)
    const output = await usecase.execute(user.userId, input)
    expect(output).toEqual({
      name: 'john travolta',
      email: 'john@mail.com',
    })
  })
})
