import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'teacher@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test123' })
  @IsString()
  password: string;
}