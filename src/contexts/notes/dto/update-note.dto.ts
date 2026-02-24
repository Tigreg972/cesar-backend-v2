import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateNoteDto {
  @ApiPropertyOptional({ example: 'Maths' })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiPropertyOptional({ example: 16 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  value?: number;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(1000)
  max?: number;

  @ApiPropertyOptional({ example: 'Progression nette' })
  @IsOptional()
  @IsString()
  comment?: string;
}