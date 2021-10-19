let USERS = [];

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
const getAll = async () => USERS;

/**
 * This function returns a user by id
 * @memberof UserRepository
 * @param {string} id The id of a user
 * @returns {User}
 */

const getUserById = async (id) => {
  const user = USERS.find((item) => item.id === id);
  return user;
};

/**
 * This function creates user in a repository
 * @memberof UserRepository
 * @param {CreateUserBody} user
 * @returns {CreateUserBody} User body
 */
const createUser = async (user) => {
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
const updateUser = async (userId, user) => {
  const newUsers = USERS.map((item) => {
    if (item.id === userId) {
      return user;
    }
    return item;
  });
  USERS = newUsers;
  return user;
};

/**
 * This function deletes a user by the id
 * @memberof UserRepository
 * @param {string} id The id of a user
 * @returns {string} The id of a user
 */
const deleteUser = async (id) => {
  USERS = USERS.filter((item) => item.id !== id);
  return id;
};

module.exports = { getAll, getUserById, createUser, deleteUser, updateUser };
