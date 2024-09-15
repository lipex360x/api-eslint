import { describe, expect, test } from 'bun:test'

import { ShowUserUseCase } from '@/application/usecases'

describe('INT', () => {
  test('show user', async () => {
    const usecase = new ShowUserUseCase()
    const output = await usecase.execute()
    expect(output).toBe('Hello World!')
  })
})
