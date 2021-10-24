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

const updateUser = (userId: string, body: IUser): Promise<IUser | null> => {
  const newUser = { ...body, id: userId };
  const user = usersRepo.updateUser(userId, newUser);
  return user;
};

const deleteUser = async (id: string): Promise<boolean> => {
  taskService.unassignTasks(id);
  const isDeleted = await usersRepo.deleteUser(id);
  return isDeleted;
};

export { getAll, getUserById, createUser, deleteUser, updateUser };
