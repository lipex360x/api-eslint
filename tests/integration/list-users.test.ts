import { describe, expect, test } from 'bun:test'

import { ListUserUseCase } from '@/application/usecases'
import { User } from '@/domain/entities'
import { UserRepository } from '@/infra/repositories'

describe('INT', () => {
  test('list users', async () => {
    const repository = new UserRepository()
    const usecase = new ListUserUseCase(repository)
    let output = await usecase.execute()
    expect(output.data).toHaveLength(0)
    const user1 = User.create('john doe', 'johndoe@mail.com')
    const user2 = User.create('john three', 'johntrhee@mail.com')
    const user3 = User.create('john travolta', 'johntravolta@mail.com')
    repository.database.push(user1)
    repository.database.push(user2)
    repository.database.push(user3)
    output = await usecase.execute()
    expect(output.data).toHaveLength(3)
  })
})
