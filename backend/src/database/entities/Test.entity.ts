import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'test' })
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  input: string;

  @Column({ default: '' })
  user: string;
}
