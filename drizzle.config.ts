import { defineConfig } from 'drizzle-kit'

import { env } from '@/infra/schemas'

export default defineConfig({
  schema: './src/infra/database/schemas/index.ts',
  out: './src/infra/database/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: env.DATABASE_URL },
})
