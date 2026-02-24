import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  create(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async setRole(userId: number, role: 'student' | 'teacher' | 'admin') {
  const user = await this.repo.findOneBy({ id: userId });
  if (!user) throw new Error('User not found');

  user.role = role;
  await this.repo.save(user);

  return { ok: true, data: { id: user.id, email: user.email, role: user.role } };
}
}
