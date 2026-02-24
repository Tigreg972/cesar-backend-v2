import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ default: 'confirmed' })
  status: 'confirmed' | 'cancelled';

  @ManyToOne(() => SchoolClass, { eager: true, nullable: true })
  schoolClass?: SchoolClass;

  @ManyToOne(() => Room, { eager: true, nullable: true })
  room?: Room;

  @ManyToOne(() => User, (u) => u.reservationsCreated, { eager: true, nullable: true })
  createdBy?: User;
}