import type { ZodTypeAny } from 'zod'
import { z } from 'zod'

const zodTransformStringToNumber = (zodPipe: ZodTypeAny, message: string) => {
  return z
    .string()
    .optional()
    .default('0')
    .refine((value) => !isNaN(Number(value)), { message })
    .transform((value) => Number(value))
    .pipe(zodPipe)
}

export const listUsersSchema = z.object({
  page: zodTransformStringToNumber(z.number(), 'invalid parameter: page'),
  perPage: zodTransformStringToNumber(z.number(), 'invalid parameter: perPage'),
})
