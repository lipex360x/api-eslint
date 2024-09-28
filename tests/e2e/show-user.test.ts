import { faker } from '@faker-js/faker'
import { describe, expect, test } from 'bun:test'

import { app } from '@/app'

describe('E2E', () => {
  test('Show User - Success', async () => {
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
    const responseCreate = await app.request('/', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(user2),
    })
    const outputCreate = await responseCreate.json()
    const res = await app.request(`/${outputCreate.userId}`)
    const output = await res.json()
    expect(output).toEqual({
      userId: expect.any(String),
      ...user2,
    })
  })

  test('Show User - Failed', async () => {
    const res = await app.request(`/fake-user-id`)
    const output = await res.json()
    expect(res.status).toBe(404)
    expect(output).toEqual('user not found')
  })
})
