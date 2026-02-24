import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  @Index()
  student: User;

  
  @ManyToOne(() => User, { eager: true, onDelete: 'SET NULL', nullable: true })
  createdBy: User | null;

  @Column({ length: 120 })
  subject: string; 

  @Column({ type: 'float' })
  value: number; 

  @Column({ type: 'float', default: 20 })
  max: number; 

  @Column({ type: 'text', nullable: true })
  comment: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}