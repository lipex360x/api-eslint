import { zValidator } from '@hono/zod-validator'
import type { ZodType } from 'zod'

export const validateSchema = (schema: ZodType) => {
  return zValidator('json', schema, (result, c) => {
    if (result.success) return
    const zodError = JSON.parse(String(result.error))
    const errors = []
    for (const error of zodError) {
      errors.push({ parameter: error.path[0], message: error.message })
    }
    return c.json(errors, 422)
  })
}
