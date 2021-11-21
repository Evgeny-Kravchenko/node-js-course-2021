import { getRepository } from 'typeorm';
import { IUser } from '../../common/types';
import User from '../../entities/User';

/**
 * @namespace UserRepository
 */

/**
 *
 * @typedef {Object} User
 * @property {string} id The id of a user
 * @property {string} name The name of a user
 * @property {string} login The login of a user
 */

/**
 * @typedef {Object} CreateUserBody
 * @property {string} id The id of a user
 * @property {string} name The name of a user
 * @property {string} login The login of a user
 * @property {string} password The password of a user
 */

/**
 * This function returns all users from the repository
 * @memberof UserRepository
 * @returns {User[]} Array of users
 */
const getAll = async (): Promise<User[]> => {
  const userRepo = getRepository(User);
  return userRepo.find({ where: {} });
};

/**
 * This function returns a user by id
 * @memberof UserRepository
 * @param {string} id The id of a user
 * @returns {User}
 */

const getUserById = async (id: string): Promise<User | undefined> => {
  const userRepo = getRepository(User);
  return userRepo.findOne(id);
};

/**
 * This function creates user in a repository
 * @memberof UserRepository
 * @param {CreateUserBody} user
 * @returns {CreateUserBody} User body
 */
const createUser = async (dto: IUser): Promise<User> => {
  const userRepo = getRepository(User);
  const user = await userRepo.create(dto);
  const savedUser = await userRepo.save(user);
  return savedUser;
};

/**
 * The function updates a user by the id
 * @memberof UserRepository
 * @param {string} userId The id of a user
 * @param {CreateUserBody} user Data to update a user
 * @returns {CreateUserBody}
 */
const updateUser = async (userId: string, dto: IUser): Promise<User | null> => {
  const userRepo = getRepository(User);
  const updatedRes = await userRepo.update(userId, dto);
  return updatedRes.raw;
};

/**
 * This function deletes a user by the id
 * @memberof UserRepository
 * @param {string} id The id of a user
 * @returns {string} The id of a user
 */
const deleteUser = async (id: string): Promise<boolean> => {
  const userRepo = getRepository(User);
  const deletedRes = await userRepo.delete(id);
  return Boolean(deletedRes.affected);
};

export { getAll, getUserById, createUser, deleteUser, updateUser };
