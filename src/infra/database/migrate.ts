import { migrate } from 'drizzle-orm/node-postgres/migrator'

import { db, pool } from '@/infra/database/config'
import drizzleConfig from '$/drizzle.config'

const main = async () => {
  await migrate(db, { migrationsFolder: drizzleConfig.out! })
  console.info('migration done!')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await pool.end()
  })
