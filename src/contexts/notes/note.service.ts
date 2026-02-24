import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { User } from '../users/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

type JwtUser = { sub: number; role: 'admin' | 'teacher' | 'student' };

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private notesRepo: Repository<Note>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  async myNotes(user: JwtUser) {
 
    return this.notesRepo.find({
      where: { student: { id: user.sub } },
      order: { createdAt: 'DESC' },
    });
  }

  async notesOfStudent(requester: JwtUser, studentId: number) {
   
    if (requester.role === 'student' && requester.sub !== studentId) {
      throw new ForbiddenException('Students can only read their own notes');
    }
    return this.notesRepo.find({
      where: { student: { id: studentId } },
      order: { createdAt: 'DESC' },
    });
  }

  async create(requester: JwtUser, dto: CreateNoteDto) {
    if (requester.role === 'student') {
      throw new ForbiddenException('Students cannot create notes');
    }

    const student = await this.usersRepo.findOne({ where: { id: dto.studentId } });
    if (!student) throw new NotFoundException('Student not found');

    const createdBy = await this.usersRepo.findOne({ where: { id: requester.sub } });
    if (!createdBy) throw new NotFoundException('Creator not found');

    const note = this.notesRepo.create({
      student,
      createdBy,
      subject: dto.subject,
      value: dto.value,
      max: dto.max ?? 20,
      comment: dto.comment ?? null,
    });

    return this.notesRepo.save(note);
  }

  async update(requester: JwtUser, id: number, dto: UpdateNoteDto) {
    if (requester.role === 'student') {
      throw new ForbiddenException('Students cannot update notes');
    }

    const note = await this.notesRepo.findOne({ where: { id } });
    if (!note) throw new NotFoundException('Note not found');

    Object.assign(note, {
      subject: dto.subject ?? note.subject,
      value: dto.value ?? note.value,
      max: dto.max ?? note.max,
      comment: dto.comment ?? note.comment,
    });

    return this.notesRepo.save(note);
  }

  async remove(requester: JwtUser, id: number) {
    if (requester.role === 'student') {
      throw new ForbiddenException('Students cannot delete notes');
    }
    const note = await this.notesRepo.findOne({ where: { id } });
    if (!note) throw new NotFoundException('Note not found');
    await this.notesRepo.remove(note);
    return { ok: true };
  }
}