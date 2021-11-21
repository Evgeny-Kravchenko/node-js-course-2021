import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';
import { ITask } from '../common/types';
import Board from './Board';

@Entity({ name: 'task' })
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('int')
  order: number;

  @Column('varchar', { length: 500, nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
  })
  @Column('uuid', { name: 'userId', nullable: true })
  userId: string;

  @ManyToOne(() => Board, (board) => board.id, {
    nullable: true,
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
  })
  @Column('uuid', { name: 'boardId', nullable: true })
  boardId: string;

  @Column('varchar', { length: 100, nullable: true })
  columnId: string;

  static toResponse(task: Task): ITask {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };
  }
}
