import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { NotesService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('notes')
@ApiBearerAuth()
@Controller('notes')
export class NotesController {
  constructor(private notes: NotesService) {}


  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return this.notes.myNotes(req.user);
  }

 
  @UseGuards(JwtAuthGuard)
  @Get('student/:studentId')
  byStudent(@Req() req: any, @Param('studentId') studentId: string) {
    return this.notes.notesOfStudent(req.user, Number(studentId));
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher', 'admin')
  @Post()
  create(@Req() req: any, @Body() dto: CreateNoteDto) {
    return this.notes.create(req.user, dto);
  }

 
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher', 'admin')
  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.notes.update(req.user, Number(id), dto);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('teacher', 'admin')
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.notes.remove(req.user, Number(id));
  }
}