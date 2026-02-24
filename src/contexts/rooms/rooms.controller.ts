import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequirePermissions } from '../../core/permissions/require-permissions.decorator';
import { ROOM_CREATE, ROOM_READ } from '../../core/permissions/permissions';

@ApiTags('rooms')
@ApiBearerAuth('access-token')
@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomsController {
  constructor(private readonly rooms: RoomsService) {}

  @Get()
  @RequirePermissions(ROOM_READ)
  findAll() {
    return this.rooms.findAll();
  }

  @Post()
  @RequirePermissions(ROOM_CREATE)
  @ApiBody({ type: CreateRoomDto })
  create(@Body() dto: CreateRoomDto) {
    return this.rooms.create(dto);
  }
}