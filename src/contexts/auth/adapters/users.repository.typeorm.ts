import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../users/user.entity';
import { UsersRepositoryPort } from '../ports/users.repository.port';

@Injectable()
export class UsersRepositoryTypeorm implements UsersRepositoryPort {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}
  create(arg0: { email: string; username: string; passwordHash: string; role: string; }): unknown {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  save(user: Partial<User>) {
    return this.repo.save(user);
  }
}