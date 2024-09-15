import { describe, expect, test } from 'bun:test'

import { UpdateUserUseCase } from '@/application/usecases'

describe('INT', () => {
  test('create user', async () => {
    const input = {
      name: 'john doe',
      email: 'john@mail.com',
    }
    const usecase = new UpdateUserUseCase()
    const output = await usecase.execute(input)
    expect(output).toEqual({
      name: 'john doe',
      email: 'john@mail.com',
    })
  })
})
