import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { IUser } from '../common/types';
import Task from './Task';

@Entity({ name: 'user' })
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  login: string;

  @Column('varchar', { length: 50 })
  password: string;

  @OneToMany<Task>(() => Task, (task: Task) => task.id, {
    cascade: true,
  })
  tasks?: Task[];

  static toResponse(user: User): Omit<IUser, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
