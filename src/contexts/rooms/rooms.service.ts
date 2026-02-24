import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly repo: Repository<Room>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<Room>) {
    const room = this.repo.create(data);
    return this.repo.save(room);
  }
}