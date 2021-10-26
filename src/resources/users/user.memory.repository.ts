import { IUser } from './user.model';

let USERS: IUser[] = [];

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
const getAll = async (): Promise<IUser[]> => USERS;

/**
 * This function returns a user by id
 * @memberof UserRepository
 * @param {string} id The id of a user
 * @returns {User}
 */

const getUserById = async (id: string): Promise<IUser | undefined> => {
  const user = USERS.find((item) => item.id === id);
  return user;
};

/**
 * This function creates user in a repository
 * @memberof UserRepository
 * @param {CreateUserBody} user
 * @returns {CreateUserBody} User body
 */
const createUser = async (user: IUser): Promise<IUser> => {
  USERS.push(user);
  return user;
};

/**
 * The function updates a user by the id
 * @memberof UserRepository
 * @param {string} userId The id of a user
 * @param {CreateUserBody} user Data to update a user
 * @returns {CreateUserBody}
 */
const updateUser = async (
  userId: string,
  user: IUser
): Promise<IUser | null> => {
  let isFound = false;
  const newUsers = USERS.map((item) => {
    if (item.id === userId) {
      isFound = true;
      return user;
    }
    return item;
  });
  USERS = newUsers;
  return isFound ? user : null;
};

/**
 * This function deletes a user by the id
 * @memberof UserRepository
 * @param {string} id The id of a user
 * @returns {string} The id of a user
 */
const deleteUser = async (id: string): Promise<boolean> => {
  let isDeleted = false;
  USERS = USERS.filter((item) => {
    if (item.id === id) {
      isDeleted = true;
    }
    return item.id !== id;
  });
  return isDeleted;
};

export { getAll, getUserById, createUser, deleteUser, updateUser };
