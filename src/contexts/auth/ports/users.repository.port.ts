import { User } from '../../users/user.entity';

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');

export interface UsersRepositoryPort {
  create(arg0: { email: string; username: string; passwordHash: string; role: string; }): unknown;
  findByEmail(email: string): Promise<User | null>;
  save(user: Partial<User>): Promise<User>;
}