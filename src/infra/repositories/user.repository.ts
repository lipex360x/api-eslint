import type { User } from '@/domain/entities'

export type PaginatedResults<T> = {
  page: number
  perPage: number
  registers: number
  totalPages: number
  data: T[]
}

export interface UserRepository {
  save(user: User): Promise<void>
  list(page: number, perPage: number): Promise<PaginatedResults<User>>
  findById(userId: string): Promise<User | null>
  findByEmail(userId: string): Promise<User | null>
  update(user: User): Promise<void>
  delete(userId: string): Promise<void>
}
