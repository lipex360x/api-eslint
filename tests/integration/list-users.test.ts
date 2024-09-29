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

  test('list users - not paginated', async () => {
    const usecase = new ListUsersUseCase(repository)
    for (const index of Array.from({ length: 37 }, (v, i) => i)) {
      const user = User.create(`john ${index}`, `john${index}@mail.com`)
      await repository.save(user)
    }
    const output = await usecase.execute()
    expect(output.page).toEqual(1)
    expect(output.perPage).toEqual(15)
    expect(output.registers).toEqual(37)
    expect(output.lastPage).toEqual(3)
    expect(output.data).toHaveLength(15)
    expect(output.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'john 0',
          email: 'john0@mail.com',
        }),
        expect.objectContaining({
          name: 'john 10',
          email: 'john10@mail.com',
        }),
        expect.not.objectContaining({
          name: 'john 15',
          email: 'john15@mail.com',
        }),
      ]),
    )
  })

  test('list users - per page paginated', async () => {
    const usecase = new ListUsersUseCase(repository)
    for (const index of Array.from({ length: 37 }, (v, i) => i)) {
      const user = User.create(`john ${index}`, `john${index}@mail.com`)
      await repository.save(user)
    }
    const output = await usecase.execute({ perPage: 10 })
    expect(output.page).toEqual(1)
    expect(output.perPage).toEqual(10)
    expect(output.registers).toEqual(37)
    expect(output.lastPage).toEqual(4)
    expect(output.data).toHaveLength(10)
    expect(output.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'john 0',
          email: 'john0@mail.com',
        }),
        expect.not.objectContaining({
          name: 'john 10',
          email: 'john10@mail.com',
        }),
      ]),
    )
  })

  test('list users - page paginated', async () => {
    const usecase = new ListUsersUseCase(repository)
    for (const index of Array.from({ length: 37 }, (v, i) => i)) {
      const user = User.create(`john ${index}`, `john${index}@mail.com`)
      await repository.save(user)
    }
    const output = await usecase.execute({ page: 2 })
    expect(output.page).toEqual(2)
    expect(output.perPage).toEqual(15)
    expect(output.registers).toEqual(37)
    expect(output.lastPage).toEqual(3)
    expect(output.data).toHaveLength(15)
    expect(output.data).toEqual(
      expect.arrayContaining([
        expect.not.objectContaining({
          name: 'john 0',
          email: 'john0@mail.com',
        }),
        expect.objectContaining({
          name: 'john 15',
          email: 'john15@mail.com',
        }),
      ]),
    )
  })

  test('list users - page and per page paginated', async () => {
    const usecase = new ListUsersUseCase(repository)
    for (const index of Array.from({ length: 37 }, (v, i) => i)) {
      const user = User.create(`john ${index}`, `john${index}@mail.com`)
      await repository.save(user)
    }
    const output = await usecase.execute({ page: 2, perPage: 3 })
    expect(output.page).toEqual(2)
    expect(output.perPage).toEqual(3)
    expect(output.registers).toEqual(expect.any(Number))
    expect(output.lastPage).toEqual(expect.any(Number))
    expect(output.data).toHaveLength(3)
    expect(output.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'john 3',
          email: 'john3@mail.com',
        }),
        expect.not.objectContaining({
          name: 'john 6',
          email: 'john6@mail.com',
        }),
      ]),
    )
  })

  test('list users - failed: invalid page', async () => {
    const usecase = new ListUsersUseCase(repository)
    for (const index of Array.from({ length: 37 }, (v, i) => i)) {
      const user = User.create(`john ${index}`, `john${index}@mail.com`)
      await repository.save(user)
    }
    expect(() => usecase.execute({ page: 4 })).toThrow(new Error('invalid page. last page = 3'))
  })

  test('list users - without registers', async () => {
    const usecase = new ListUsersUseCase(repository)
    const output = await usecase.execute()
    expect(output.page).toEqual(1)
    expect(output.perPage).toEqual(15)
    expect(output.registers).toEqual(0)
    expect(output.lastPage).toEqual(0)
  })
})
