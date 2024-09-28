import { faker } from '@faker-js/faker'
import { describe, expect, test } from 'bun:test'

import { app } from '@/app'

describe('E2E', () => {
  test('PUT', async () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }
    const responseCreate = await app.request('/', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(user),
    })

    const outputCreate = await responseCreate.json()
    const response1 = await app.request(`/${outputCreate.userId}`)
    const output1 = await response1.json()
    expect(output1).toEqual({
      userId: expect.any(String),
      ...user,
    })
    const responseUpdate = await app.request(`/${outputCreate.userId}`, {
      method: 'PUT',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({
        name: 'john travolta',
        email: 'johntravolta@mail.com',
      }),
    })
    expect(responseUpdate.status).toBe(200)
    const response2 = await app.request(`/${outputCreate.userId}`)
    const output2 = await response2.json()
    expect(output2).toEqual({
      userId: expect.any(String),
      name: 'john travolta',
      email: 'johntravolta@mail.com',
    })
  })

  test('Update User - Failed', async () => {
    const responseUpdate = await app.request(`/fake-user-id`, {
      method: 'PUT',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({
        name: 'john travolta',
        email: 'johntravolta@mail.com',
      }),
    })
    const output = await responseUpdate.json()
    expect(responseUpdate.status).toBe(404)
    expect(output).toEqual('user not found')
  })
})
