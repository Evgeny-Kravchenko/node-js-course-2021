const { dataBaseService } = require('../../services');

const getAll = async (id, parameterToSearch = 'boardId') => {
  const task = dataBaseService.getResource('tasks', {
    parameterToSearch,
    parameterValue: id,
  });
  return task;
};

const getTaskById = async (id) => {
  const doesResourceExist = dataBaseService.checkIfResourceExist(
    `${__dirname}/../../local-data-base/tasks/${id}.json`
  );
  if (!doesResourceExist) {
    return null;
  }
  const task = dataBaseService.getSpecifiedResource(
    `${__dirname}/../../local-data-base/tasks/${id}.json`
  );
  return task;
};

const createTask = async (task) =>
  dataBaseService.createEntity('tasks', task.id, task);

const deleteTask = async (taskId) => {
  dataBaseService.deleteEntity('tasks', taskId);
};

const updateTask = async (taskId, task) =>
  dataBaseService.updateEntity('tasks', taskId, task);

module.exports = { getAll, getTaskById, createTask, deleteTask, updateTask };
