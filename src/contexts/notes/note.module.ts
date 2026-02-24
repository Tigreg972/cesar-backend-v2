import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NotesController } from './note.controller';
import { NotesService } from './note.service';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, User])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}