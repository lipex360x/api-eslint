import { faker } from '@faker-js/faker'
import { describe, expect, test } from 'bun:test'

import { app } from '@/app'

describe('E2E', () => {
  test('List Users - With Data', async () => {
    for (const _ of Array.from({ length: 25 })) {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      }
      await app.request('/', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(user),
      })
    }
    const res = await app.request('/')
    const output = await res.json()
    expect(output.page).toEqual(1)
    expect(output.perPage).toEqual(15)
    expect(output.data).toHaveLength(15)
  })

  test('List Users - paginated', async () => {
    for (const _ of Array.from({ length: 25 })) {
      const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      }
      await app.request('/', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(user),
      })
    }
    const res = await app.request('/?page=2&perPage=7')
    const output = await res.json()
    expect(output.page).toEqual(2)
    expect(output.perPage).toEqual(7)
    expect(output.data).toHaveLength(7)
  })
})
