import { faker } from '@faker-js/faker'
import { describe, expect, test } from 'bun:test'

import { app } from '@/app'

describe('E2E', () => {
  test('Delete User', async () => {
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
    const responseList1 = await app.request('/')
    const outputList1 = await responseList1.json()
    expect(outputList1).toEqual(
      expect.objectContaining({
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
      }),
    )
    const outputCreate = await responseCreate.json()
    const responseDelete = await app.request(`/${outputCreate.userId}`, { method: 'DELETE' })
    expect(responseDelete.status).toBe(204)
    const responseList2 = await app.request('/')
    const outputList2 = await responseList2.json()
    expect(outputList2).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([
          {
            userId: expect.any(String),
            ...user1,
          },
        ]),
      }),
    )
  })

  test('Delete User - Failed', async () => {
    const responseDelete = await app.request(`/fake-user-id`, { method: 'DELETE' })
    const output = await responseDelete.json()
    expect(responseDelete.status).toBe(404)
    expect(output).toEqual('user not found')
  })
})
