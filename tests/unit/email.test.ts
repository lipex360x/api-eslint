import { describe, expect, test } from 'bun:test'

import { Email } from '@/domain/vo'

describe('UNIT', () => {
  test('should validate a valid email', () => {
    const email = new Email('john@mail.com')
    expect(email.value).toBe('john@mail.com')
  })

  test('should not validate an invalid email', () => {
    expect(() => new Email('invalid-email')).toThrow(new Error('invalid email'))
  })
})
