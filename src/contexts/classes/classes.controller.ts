import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolClass } from './school-class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../../core/permissions/permissions.guard';
import { RequirePermissions } from '../../core/permissions/require-permissions.decorator';
import { CLASS_READ } from '../../core/permissions/permissions';

@Controller('classes')
export class ClassesController {
  constructor(
    @InjectRepository(SchoolClass) private readonly repo: Repository<SchoolClass>,
  ) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(CLASS_READ)
  @Get()
  list() {
    return this.repo.find();
  }

  @Post()
  create(@Body() dto: CreateClassDto) {
    return this.repo.save(this.repo.create(dto));
  }
}