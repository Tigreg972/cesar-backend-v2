import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'newuser@test.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Gregory' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'test1234' })
  @IsString()
  @MinLength(6)
  password: string;
}