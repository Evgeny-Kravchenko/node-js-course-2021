import * as usersRepo from './user.memory.repository';
import * as taskService from '../tasks/tasks.service';
import User, { IUser } from './user.model';

const getAll = (): Promise<IUser[]> => usersRepo.getAll();

const getUserById = async (id: string): Promise<IUser | undefined> => {
  const user = id ? await usersRepo.getUserById(id) : undefined;
  return user;
};

const createUser = ({ name, login, password }: IUser): IUser => {
  const user = new User({ name, login, password });
  usersRepo.createUser(user);
  return user;
};

const updateUser = (userId: string, body: IUser): IUser => {
  const newUser = { ...body, id: userId };
  usersRepo.updateUser(userId, newUser);
  return newUser;
};

const deleteUser = (id: string): string => {
  taskService.unassignTasks(id);
  usersRepo.deleteUser(id);
  return id;
};

export { getAll, getUserById, createUser, deleteUser, updateUser };
