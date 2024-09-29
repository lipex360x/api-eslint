import { count, eq } from 'drizzle-orm'

import { User } from '@/domain/entities'
import { db } from '@/infra/database/config'
import { user, type UserSchema, userSchema } from '@/infra/database/schemas'

import type { PaginatedResults, UserRepository } from '../user.repository'

export class UserRepositoryPostgres implements UserRepository {
  async save(input: User): Promise<void> {
    const payload: UserSchema = {
      userId: input.userId,
      name: input.name,
      email: input.email,
    }
    const validatedData = userSchema.parse(payload)
    await db.insert(user).values(validatedData)
  }

  async list(page: number, perPage: number): Promise<PaginatedResults<User>> {
    const [rows] = await db.select({ count: count() }).from(user)
    const registers = rows.count
    const lastPage = Math.ceil(registers / perPage)
    if (lastPage !== 0 && page > lastPage) throw new Error(`invalid page. last page = ${lastPage}`)
    const listUsers = await db
      .select()
      .from(user)
      .limit(perPage)
      .offset(page - 1)
    const users: User[] = []
    for (const data of listUsers) {
      const user = new User(data.userId, data.name, data.email)
      users.push(user)
    }
    return { data: users, lastPage, registers }
  }

  async findById(userId: string): Promise<User | null> {
    const findUserById = await db.query.user.findFirst({ where: eq(user.userId, userId) })
    if (!findUserById) return null
    return new User(findUserById.userId, findUserById.name, findUserById.email)
  }

  async findByEmail(email: string): Promise<User | null> {
    const findUserByEmail = await db.query.user.findFirst({ where: eq(user.email, email) })
    if (!findUserByEmail) return null
    return new User(findUserByEmail.userId, findUserByEmail.name, findUserByEmail.email)
  }

  async update(input: User): Promise<void> {
    const payload: UserSchema = {
      userId: input.userId,
      name: input.name,
      email: input.email,
    }
    const validatedData = userSchema.parse(payload)
    await db.update(user).set(validatedData).where(eq(user.userId, input.userId))
  }

  async delete(userId: string): Promise<void> {
    await db.delete(user).where(eq(user.userId, userId))
  }
}
