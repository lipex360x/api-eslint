import { faker } from '@faker-js/faker'
import { describe, expect, test } from 'bun:test'

import { app } from '@/app'

describe('E2E', () => {
  test('Create User - Success', async () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }
    const res = await app.request('/', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(user),
    })
    const output = await res.json()
    expect(res.status).toBe(201)
    expect(output).toEqual(
      expect.objectContaining({
        userId: expect.any(String),
        ...user,
      }),
    )
  })

  test('Create User - failed', async () => {
    const user = {
      email: faker.internet.email(),
    }
    const res = await app.request('/', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(user),
    })
    expect(res.status).toBe(422)
    const output = await res.json()
    expect(output).toEqual([{ parameter: 'name', message: 'Required' }])
  })

  test('Create User - failed', async () => {
    const user = {
      name: faker.person.fullName(),
    }
    const res = await app.request('/', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(user),
    })
    expect(res.status).toBe(422)
    const output = await res.json()
    expect(output).toEqual([{ parameter: 'email', message: 'Required' }])
  })
})
