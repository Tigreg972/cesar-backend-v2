import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../../core/permissions/permissions.guard';
import { RequirePermissions } from '../../core/permissions/require-permissions.decorator';
import { RESERVATION_CREATE, RESERVATION_READ } from '../../core/permissions/permissions';
import { Room } from '../rooms/room.entity';
import { SchoolClass } from '../classes/school-class.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(
    @InjectRepository(Reservation) private readonly repo: Repository<Reservation>,
    @InjectRepository(Room) private readonly rooms: Repository<Room>,
    @InjectRepository(SchoolClass) private readonly classes: Repository<SchoolClass>,
  ) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(RESERVATION_READ)
  @Get()
  list() {
    return this.repo.find();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(RESERVATION_CREATE)
  @Post()
  async create(@Body() dto: CreateReservationDto, @Req() req: any) {
    const r = new Reservation();
    r.startAt = new Date(dto.startAt);
    r.endAt = new Date(dto.endAt);
    r.createdBy = req.user;

    if (dto.roomId) {
      const room = await this.rooms.findOneBy({ id: dto.roomId });
      if (room) r.room = room;
    }
    if (dto.schoolClassId) {
      const schoolClass = await this.classes.findOneBy({ id: dto.schoolClassId });
      if (schoolClass) r.schoolClass = schoolClass;
    }

    return this.repo.save(r);
  }
}