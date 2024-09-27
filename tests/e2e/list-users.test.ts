import { faker } from '@faker-js/faker'
import { describe, expect, test } from 'bun:test'

import { app } from '@/app'

describe('E2E', () => {
  test('List Users - With Data', async () => {
    const user1 = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }
    const user2 = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }
    await app.request('/', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(user1),
    })
    await app.request('/', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(user2),
    })
    const res = await app.request('/')
    const output = await res.json()
    expect(output).toEqual({
      data: expect.arrayContaining([
        {
          userId: expect.any(String),
          ...user1,
        },
        {
          userId: expect.any(String),
          ...user2,
        },
      ]),
    })
  })
})
