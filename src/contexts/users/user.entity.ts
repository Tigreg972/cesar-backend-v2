import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from '../reservations/reservation.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 180 })
  email: string;

  @Column({ length: 120 })
  username: string;

  @Exclude()
  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ default: 'student' })
  role: 'admin' | 'teacher' | 'student';

  @OneToMany(() => Reservation, (r) => r.createdBy)
  reservationsCreated: Reservation[];

  @Column({ type: 'bigint', default: 0 })
  permissions: bigint;
}