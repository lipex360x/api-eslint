import type { ZodTypeAny } from 'zod'
import { z } from 'zod'

const stringToNumber = (zodPipe: ZodTypeAny, message: string) => {
  return z
    .string()
    .optional()
    .default('0')
    .refine((value) => !isNaN(Number(value)), { message })
    .transform((value) => Number(value))
    .pipe(zodPipe)
}

export const listUsersSchema = z.object({
  page: stringToNumber(z.number(), 'invalid parameter: page'),
  perPage: stringToNumber(z.number(), 'invalid parameter: perPage'),
})
