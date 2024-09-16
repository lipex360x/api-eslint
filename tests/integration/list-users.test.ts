import { beforeEach, describe, expect, test } from 'bun:test'

import { ListUserUseCase } from '@/application/usecases'
import { User } from '@/domain/entities'
import type { UserRepository } from '@/infra/repositories'
import { UserRepositoryMemory } from '@/infra/repositories/memory'

let repository: UserRepository

describe('INT', () => {
  beforeEach(() => {
    repository = new UserRepositoryMemory()
  })

  test('list users', async () => {
    const usecase = new ListUserUseCase(repository)
    let output = await usecase.execute()
    expect(output.data).toHaveLength(0)
    const user1 = User.create('john doe', 'johndoe@mail.com')
    const user2 = User.create('john three', 'johntrhee@mail.com')
    const user3 = User.create('john travolta', 'johntravolta@mail.com')
    await repository.save(user1)
    await repository.save(user2)
    await repository.save(user3)
    output = await usecase.execute()
    expect(output.data).toHaveLength(3)
  })
})
