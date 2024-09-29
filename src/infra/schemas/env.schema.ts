import 'dotenv/config'

import { z, ZodError } from 'zod'

const envSchema = z.object({
  DATABASE_HOST: z.string().min(1),
  DATABASE_NAME: z.string().min(1),
  DATABASE_USERNAME: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_PORT: z.coerce.number().min(1),
  DATABASE_URL: z.string().min(1),
})

try {
  envSchema.parse(process.env)
} catch (e) {
  if (e instanceof ZodError) {
    console.error('Environment validation error:', e.errors)
  }
}

export const env = envSchema.parse(process.env)
