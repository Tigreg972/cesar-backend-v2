import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Room } from '../rooms/room.entity';
import { SchoolClass } from '../classes/school-class.entity';
import { User } from '../users/user.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'datetime' })
  startAt: Date;

  @Index()
  @Column({ type: 'datetime' })
  endAt: Date;

  @ManyToOne(() => SchoolClass, (c) => c.reservations, { eager: true })
  schoolClass: SchoolClass;

  @ManyToOne(() => Room, (r) => r.reservations, { eager: true })
  room: Room;

  @ManyToOne(() => User, { eager: true })
  createdBy: User;

  @Column({ default: 'confirmed' })
  status: 'confirmed' | 'cancelled';
}
