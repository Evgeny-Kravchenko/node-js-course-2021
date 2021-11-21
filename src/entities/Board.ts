import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { IBoard } from '../common/types';
import Task from './Task';

@Entity({ name: 'board' })
export default class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  title: string;

  @Column({ type: 'simple-json', nullable: true })
  columns: { order: number; title: string }[];

  @OneToMany<Task>(() => Task, (task: Task) => task.id, {
    cascade: true,
  })
  tasks?: Task[];

  static toResponse(board: Board): IBoard {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
