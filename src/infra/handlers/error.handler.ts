import type { Context } from 'hono'

export const errorHandler = (c: Context, error: Error) => {
  let parsedError = null
  try {
    parsedError = JSON.parse(error.message)
  } catch {
    parsedError = error.message
  }
  console.error(parsedError)
  const statusCode = error.cause || 400
  return c.json(parsedError, statusCode)
}
