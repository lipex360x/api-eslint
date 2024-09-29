import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const user = pgTable('user', {
  userId: varchar('user_id').notNull().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
})

export const userSchema = createInsertSchema(user, {
  userId: (schema) => schema.userId.min(1),
  name: (schema) => schema.name.min(1),
  email: (schema) => schema.email.min(1),
})

export type UserSchema = z.infer<typeof userSchema>
