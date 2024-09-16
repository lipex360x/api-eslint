import type { User } from '@/domain/entities'

export interface UserRepository {
  save(user: User): Promise<void>
  list(): Promise<User[]>
  findById(userId: string): Promise<User | null>
  update(user: User): Promise<void>
  delete(userId: string): Promise<void>
}
