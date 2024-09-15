import { describe, expect, test } from 'bun:test'

import { app } from '@/app'

describe('E2E', () => {
  test('GET', async () => {
    const res = await app.request('/')
    const output = await res.text()
    expect(output).toBe('Hello World!')
  })

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
    expect(output.method).toEqual('POST')
    expect(output.data.name).toEqual('john doe')
    expect(output).toEqual(
      expect.objectContaining({
        data: {
          name: 'john doe',
          email: 'john@mail.com',
        },
      }),
    )
  })

  test('PUT', async () => {
    const res = await app.request('/fake-id?name=john&tags=admin&tags=superuser', {
      method: 'PUT',
      body: JSON.stringify({
        name: 'john doe',
        email: 'john@mail.com',
      }),
    })
    const output = await res.json()
    expect(res.status).toBe(200)
    expect(output).toEqual({ method: 'PUT' })
  })

  test('DELETE', async () => {
    const res = await app.request('/user-id', {
      method: 'DELETE',
    })
    expect(res.status).toBe(204)
  })
})
