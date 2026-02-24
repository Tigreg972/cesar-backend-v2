import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../../contexts/reservations/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
})
export class ReservationsModule {}

