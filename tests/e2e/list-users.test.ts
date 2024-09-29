import { faker } from '@faker-js/faker'
import { describe, expect, test } from 'bun:test'

import { app } from '@/app'

describe('E2E', () => {
  test('List Users - With Data (no paginated)', async () => {
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
    expect(output.page).toEqual(1)
    expect(output.perPage).toEqual(15)
    expect(output.registers).toEqual(expect.any(Number))
    expect(output.lastPage).toEqual(expect.any(Number))
    expect(output.data.length).toEqual(expect.any(Number))
    expect(output).toEqual(
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
  })

  test('List Users - With Data (with pagination)', async () => {
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
    const res = await app.request('/?page=1&perPage=1')
    const output = await res.json()
    expect(output.page).toEqual(1)
    expect(output.perPage).toEqual(1)
    expect(output.registers).toEqual(expect.any(Number))
    expect(output.lastPage).toEqual(expect.any(Number))
    expect(output.data).toHaveLength(1)
  })

  test.only('List Users - With Data (with pagination)', async () => {
    const res = await app.request('/?page=a&perPage=b')
    const output = await res.json()
    expect(output).toHaveLength(2)
    expect(output[0].message).toEqual('invalid page')
  })
})
