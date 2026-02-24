import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: 'Salle A101' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'Bâtiment A' })
  @IsString()
  @MinLength(2)
  location: string;
}