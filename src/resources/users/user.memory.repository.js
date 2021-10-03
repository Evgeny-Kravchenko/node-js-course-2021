const { dataBaseService } = require('../../services');

const getAll = async () =>
  // TODO: mock implementation. should be replaced during task development
  dataBaseService.getResource('users');

const getUserById = async (id) => {
  const doesResourceExist = dataBaseService.checkIfResourceExist(
    `${__dirname}/../../local-data-base/users/${id}.json`
  );
  if (!doesResourceExist) {
    return null;
  }
  return dataBaseService.getSpecifiedResource(
    `${__dirname}/../../local-data-base/users/${id}.json`
  );
};

const createUser = async (user) => dataBaseService.createEntity('users', user.id, user);

const updateUser = async (userId, user) => dataBaseService.updateEntity('users', userId, user);

const deleteUser = async (id) => dataBaseService.deleteEntity('users', id);

module.exports = { getAll, getUserById, createUser, deleteUser, updateUser };
