import { describe, expect, test } from 'bun:test'

import { CreateUserUseCase } from '@/application/usecases'

describe('INT', () => {
  test('create user', async () => {
    const input = {
      name: 'john doe',
      email: 'john@mail.com',
    }
    const usecase = new CreateUserUseCase()
    const output = await usecase.execute(input)
    expect(output).toEqual({
      userId: expect.any(String),
      name: 'john doe',
      email: 'john@mail.com',
    })
  })
})
