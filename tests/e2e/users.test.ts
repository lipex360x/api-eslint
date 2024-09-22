import { faker } from '@faker-js/faker'
import { describe, expect, test } from 'bun:test'

import { app } from '@/app'

describe('E2E', () => {
  test('POST', async () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }
    const res = await app.request('/', {
      method: 'POST',
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

  test('GET LIST', async () => {
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
      body: JSON.stringify(user1),
    })
    await app.request('/', {
      method: 'POST',
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

  test('GET SHOW', async () => {
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
      body: JSON.stringify(user1),
    })
    const responseCreate = await app.request('/', {
      method: 'POST',
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

  test('PUT', async () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }
    const responseCreate = await app.request('/', {
      method: 'POST',
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

  test('DELETE', async () => {
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
      body: JSON.stringify(user1),
    })
    const responseCreate = await app.request('/', {
      method: 'POST',
      body: JSON.stringify(user2),
    })
    const responseList1 = await app.request('/')
    const outputList1 = await responseList1.json()
    expect(outputList1).toEqual({
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
    const outputCreate = await responseCreate.json()
    const responseDelete = await app.request(`/${outputCreate.userId}`, { method: 'DELETE' })
    expect(responseDelete.status).toBe(204)
    const responseList2 = await app.request('/')
    const outputList2 = await responseList2.json()
    expect(outputList2).toEqual({
      data: expect.arrayContaining([
        {
          userId: expect.any(String),
          ...user1,
        },
      ]),
    })
  })
})
