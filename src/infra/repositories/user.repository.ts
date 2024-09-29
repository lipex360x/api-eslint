import type { User } from '@/domain/entities'

export type PaginatedResults<T> = {
  registers: number
  lastPage: number
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
