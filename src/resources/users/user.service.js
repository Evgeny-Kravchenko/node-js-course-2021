const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/tasks.service');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getUserById = async (id) => {
  const user = id ? await usersRepo.getUserById(id) : null;
  return user;
};

const createUser = ({ name, login, password }) => {
  const user = new User({ name, login, password });
  usersRepo.createUser(user);
  return user;
};

const updateUser = (userId, body) => {
  const newUser = { ...body, id: userId };
  usersRepo.updateUser(userId, newUser);
  return newUser;
};

const deleteUser = (id) => {
  taskService.unassignTasks(id);
  usersRepo.deleteUser(id);
  return id;
};

module.exports = { getAll, getUserById, createUser, deleteUser, updateUser };
