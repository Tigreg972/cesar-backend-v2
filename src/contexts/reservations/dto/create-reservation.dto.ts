import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateReservationDto {
  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;

  @IsOptional()
  @IsInt()
  roomId?: number;

  @IsOptional()
  @IsInt()
  schoolClassId?: number;
}