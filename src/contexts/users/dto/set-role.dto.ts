import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt } from 'class-validator';

export class SetRoleDto {
  @ApiProperty({ example: 3 })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 'teacher', enum: ['student', 'teacher', 'admin'] })
  @IsIn(['student', 'teacher', 'admin'])
  role: 'student' | 'teacher' | 'admin';
}