import { beforeEach, describe, expect, test } from 'bun:test'

import { CreateUserUseCase } from '@/application/usecases'
import type { UserRepository } from '@/infra/repositories'
import { UserRepositoryMemory } from '@/infra/repositories/memory'

let repository: UserRepository

describe('INT', () => {
  beforeEach(() => {
    repository = new UserRepositoryMemory()
  })

  test('create user', async () => {
    const input = {
      name: 'john doe',
      email: 'john@mail.com',
    }
    const usecase = new CreateUserUseCase(repository)
    const output = await usecase.execute(input)
    expect(output).toEqual({
      userId: expect.any(String),
      name: 'john doe',
      email: 'john@mail.com',
    })
  })
})
