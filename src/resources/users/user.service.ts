import * as usersRepo from './user.memory.repository';
import User from '../../entities/User';
import { IUser } from '../../common/types';
import { unassignTasks } from '../tasks/tasks.service';

const getAll = (): Promise<User[]> => usersRepo.getAll();

const getUserById = async (id: string): Promise<IUser | undefined> => {
  const user = id ? await usersRepo.getUserById(id) : undefined;
  return user;
};

const createUser = (dto: IUser): Promise<User> => {
  return usersRepo.createUser(dto);
};

const updateUser = (userId: string, body: IUser): Promise<IUser | null> => {
  const user = usersRepo.updateUser(userId, body);
  return user;
};

const deleteUser = async (id: string): Promise<boolean> => {
  const isDeleted = await usersRepo.deleteUser(id);
  await unassignTasks(id);
  return isDeleted;
};

export { getAll, getUserById, createUser, deleteUser, updateUser };
