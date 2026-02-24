import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationsController } from './reservation.controller';
import { Room } from '../rooms/room.entity';
import { SchoolClass } from '../classes/school-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Room, SchoolClass])],
  controllers: [ReservationsController],
})
export class ReservationsModule {}