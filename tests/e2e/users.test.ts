import { describe, expect, test } from 'bun:test'

import { app } from '@/app'

describe('E2E', () => {
  test('POST', async () => {
    const res = await app.request('/', {
      method: 'POST',
      body: JSON.stringify({
        name: 'john doe',
        email: 'john@mail.com',
      }),
    })
    const output = await res.json()
    expect(res.status).toBe(201)
    expect(output).toEqual(
      expect.objectContaining({
        userId: expect.any(String),
        name: 'john doe',
        email: 'john@mail.com',
      }),
    )
  })

  test('GET LIST', async () => {
    await app.request('/', {
      method: 'POST',
      body: JSON.stringify({
        name: 'john doe',
        email: 'john@mail.com',
      }),
    })
    await app.request('/', {
      method: 'POST',
      body: JSON.stringify({
        name: 'john travolta',
        email: 'johntravolta@mail.com',
      }),
    })
    const res = await app.request('/')
    const output = await res.json()
    expect(output).toEqual({
      data: [
        {
          userId: expect.any(String),
          name: 'john doe',
          email: 'john@mail.com',
        },
        {
          userId: expect.any(String),
          name: 'john travolta',
          email: 'johntravolta@mail.com',
        },
      ],
    })
  })

  test('GET SHOW', async () => {
    await app.request('/', {
      method: 'POST',
      body: JSON.stringify({
        name: 'john doe',
        email: 'john@mail.com',
      }),
    })
    const responseCreate = await app.request('/', {
      method: 'POST',
      body: JSON.stringify({
        name: 'john travolta',
        email: 'johntravolta@mail.com',
      }),
    })
    const outputCreate = await responseCreate.json()
    const res = await app.request(`/${outputCreate.userId}`)
    const output = await res.json()
    expect(output).toEqual({
      userId: expect.any(String),
      name: 'john travolta',
      email: 'johntravolta@mail.com',
    })
  })

  test('PUT', async () => {
    const responseCreate = await app.request('/', {
      method: 'POST',
      body: JSON.stringify({
        name: 'john doe',
        email: 'john@mail.com',
      }),
    })
    const outputCreate = await responseCreate.json()
    const response1 = await app.request(`/${outputCreate.userId}`)
    const output1 = await response1.json()
    expect(output1).toEqual({
      userId: expect.any(String),
      name: 'john doe',
      email: 'john@mail.com',
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
    await app.request('/', {
      method: 'POST',
      body: JSON.stringify({
        name: 'john doe',
        email: 'john@mail.com',
      }),
    })
    const responseCreate = await app.request('/', {
      method: 'POST',
      body: JSON.stringify({
        name: 'john travolta',
        email: 'johntravolta@mail.com',
      }),
    })
    const responseList1 = await app.request('/')
    const outputList1 = await responseList1.json()
    expect(outputList1).toEqual({
      data: [
        {
          userId: expect.any(String),
          name: 'john doe',
          email: 'john@mail.com',
        },
        {
          userId: expect.any(String),
          name: 'john travolta',
          email: 'johntravolta@mail.com',
        },
      ],
    })
    const outputCreate = await responseCreate.json()
    const responseDelete = await app.request(`/${outputCreate.userId}`, { method: 'DELETE' })
    expect(responseDelete.status).toBe(204)
    const responseList2 = await app.request('/')
    const outputList2 = await responseList2.json()
    expect(outputList2).toEqual({
      data: [
        {
          userId: expect.any(String),
          name: 'john doe',
          email: 'john@mail.com',
        },
      ],
    })
  })
})
