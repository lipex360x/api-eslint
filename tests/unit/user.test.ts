import { describe, expect, test } from 'bun:test'

import { User } from '@/domain/entities'

describe('UNIT', () => {
  test('create user', () => {
    const user = User.create('john doe', 'john@mail.com')
    expect(user.userId).toBeDefined()
    expect(user.name).toBe('john doe')
    expect(user.email).toBe('john@mail.com')
  })

  test('create user', () => {
    const userId = 'fake-user-id'
    const user = new User(userId, 'john doe', 'john@mail.com')
    expect(user.userId).toEqual(userId)
    expect(user.name).toBe('john doe')
    expect(user.email).toBe('john@mail.com')
  })
})
