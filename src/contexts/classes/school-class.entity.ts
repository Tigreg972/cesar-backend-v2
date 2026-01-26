import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from '../reservations/reservation.entity';

@Entity('classes')
export class SchoolClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 30, default: 'unknown' })
  level: string;

  @OneToMany(() => Reservation, (r) => r.schoolClass)
  reservations: Reservation[];
}
