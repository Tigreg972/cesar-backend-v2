import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './school-class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolClass])],
})
export class ClassesModule {}
