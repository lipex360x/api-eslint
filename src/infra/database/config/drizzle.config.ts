import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from '@/infra/database/schemas'
import { env } from '@/infra/schemas'

export const pool = new Pool({ connectionString: env.DATABASE_URL })

export const db = drizzle(pool, { schema, logger: true })

export type DB = typeof db
