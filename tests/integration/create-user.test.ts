import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, test } from 'bun:test'

import { CreateUserUseCase } from '@/application/usecases'
import type { UserRepository } from '@/infra/repositories'
import { UserRepositoryPostgres } from '@/infra/repositories/postgres'

let repository: UserRepository

describe('INT', () => {
  beforeEach(() => {
    repository = new UserRepositoryPostgres()
  })

  test('create user - success', async () => {
    const input = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }
    const usecase = new CreateUserUseCase(repository)
    const output = await usecase.execute(input)
    expect(output).toEqual({
      userId: expect.any(String),
      name: input.name,
      email: input.email,
    })
  })

  test('create user', async () => {
    const input = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }
    const usecase = new CreateUserUseCase(repository)
    await usecase.execute(input)
    expect(() => usecase.execute(input)).toThrow(new Error('invalid credentials'))
  })
})
