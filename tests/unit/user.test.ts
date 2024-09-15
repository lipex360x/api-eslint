import { describe, expect, test } from 'bun:test'

import { User } from '@/domain/entities'

describe('UNIT', () => {
  test('create user', () => {
    const user = new User('john doe', 'john@mail.com')
    expect(user.userId).toBeDefined()
    expect(user.name).toBe('john doe')
    expect(user.email).toBe('john@mail.com')
  })
})
