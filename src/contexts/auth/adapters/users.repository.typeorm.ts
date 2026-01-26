import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/user.entity';
import type { UsersRepositoryPort } from '../ports/users.repository.port';

@Injectable()
export class UsersRepositoryTypeOrm implements UsersRepositoryPort {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async create(user: Partial<User>) {
    const entity = this.repo.create(user);
    return this.repo.save(entity);
  }
}
