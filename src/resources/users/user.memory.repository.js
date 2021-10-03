let USERS = [];

const getAll = async () =>
  // TODO: mock implementation. should be replaced during task development
  USERS;

const getUserById = async (id) => {
  const user = USERS.find((item) => item.id === id);
  return user;
};

const createUser = async (user) => {
  USERS.push(user);
  return user;
};

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

const deleteUser = async (id) => {
  USERS = USERS.filter((item) => item.id !== id);
  return id;
};

module.exports = { getAll, getUserById, createUser, deleteUser, updateUser };
