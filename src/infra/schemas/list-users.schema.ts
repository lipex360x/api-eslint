import type { ZodTypeAny } from 'zod'
import { z } from 'zod'

const stringToNumber = (zodType: ZodTypeAny, message: string) => {
  return z
    .string()
    .optional()
    .default('0')
    .refine((value) => !isNaN(Number(value)), { message })
    .transform((value) => Number(value))
    .pipe(zodType)
}

export const listUsersSchema = z.object({
  page: stringToNumber(z.number(), 'invalid page'),
  perPage: stringToNumber(z.number(), 'invalid perPage'),
})
