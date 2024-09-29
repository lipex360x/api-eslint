import type { Context } from 'hono'

export const errorHandler = (error: Error, c: Context) => {
  let parsedError = null
  try {
    parsedError = JSON.parse(error.message)
  } catch {
    parsedError = error.message
  }
  console.error(parsedError)
  return c.json(parsedError, error.cause || 400)
}
