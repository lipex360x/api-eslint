import { describe, expect, test } from 'bun:test'

import { DeleteUserUseCase } from '@/application/usecases'

describe('INT', () => {
  test('show user', async () => {
    const usecase = new DeleteUserUseCase()
    const output = await usecase.execute()
    expect(output).toBe('delete')
  })
})
