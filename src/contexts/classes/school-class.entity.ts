import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('classes')
export class SchoolClass {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 30, default: 'unknown' })
  level: string;
}