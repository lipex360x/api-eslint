import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, test } from 'bun:test'

import { ListUsersUseCase } from '@/application/usecases'
import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'
import { UserRepositoryMemory } from '@/infra/repositories/memory'

let repository: UserRepository

describe('INT', () => {
  beforeEach(() => {
    repository = new UserRepositoryMemory()
  })

  test('list users - success', async () => {
    const usecase = new ListUsersUseCase(repository)
    let output = await usecase.execute()
    expect(output.data).toHaveLength(0)
    for (const _ of Array.from({ length: 25 })) {
      const input = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      }
      const user = User.create(input.name, input.email)
      await repository.save(user)
    }
    output = await usecase.execute()
    expect(output.page).toEqual(1)
    expect(output.perPage).toEqual(15)
    expect(output.registers).toEqual(25)
    expect(output.data).toHaveLength(15)
  })

  test('list users - success: paginated', async () => {
    const usecase = new ListUsersUseCase(repository)
    let output = await usecase.execute()
    expect(output.data).toHaveLength(0)
    for (let i = 1; i <= 25; i++) {
      const input = {
        name: `user${i}`,
        email: faker.internet.email(),
      }
      const user = User.create(input.name, input.email)
      await repository.save(user)
    }
    output = await usecase.execute({ page: 1, perPage: 5 })
    expect(output.page).toEqual(1)
    expect(output.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'user1',
        }),
      ]),
    )
    output = await usecase.execute({ page: 2, perPage: 5 })
    expect(output.page).toEqual(2)
    expect(output.data).toEqual(
      expect.arrayContaining([
        expect.not.objectContaining({
          name: 'user1',
        }),
        expect.objectContaining({
          name: 'user6',
        }),
      ]),
    )
  })

  test('list users - failed: pageNumber', async () => {
    const usecase = new ListUsersUseCase(repository)
    for (const _ of Array.from({ length: 25 })) {
      const input = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      }
      const user = User.create(input.name, input.email)
      await repository.save(user)
    }
    expect(() => usecase.execute({ page: 50 })).toThrow(new Error('invalid page. last page: 2'))
  })
})
