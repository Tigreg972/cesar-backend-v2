import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './school-class.entity';
import { ClassesController } from './classes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolClass])],
  controllers: [ClassesController],
})
export class ClassesModule {}