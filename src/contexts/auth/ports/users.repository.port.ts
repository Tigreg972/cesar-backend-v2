import type { User } from '../../users/user.entity';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface UsersRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
}
