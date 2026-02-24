import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 3 })
  @IsInt()
  studentId: number;

  @ApiProperty({ example: 'Maths' })
  @IsString()
  subject: string;

  @ApiProperty({ example: 14.5 })
  @IsNumber()
  @Min(0)
  value: number;

  @ApiProperty({ example: 20, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(1000)
  max?: number;

  @ApiProperty({ example: 'Bon travail', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}