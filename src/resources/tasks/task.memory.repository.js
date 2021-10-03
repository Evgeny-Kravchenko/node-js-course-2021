let TASKS = [];

const getAll = async (id, parameterToSearch = 'boardId') => {
  const tasks = TASKS.filter((item) => item[parameterToSearch] === id);
  return tasks;
};

const getTaskById = async (id) => {
  const task = TASKS.find((item) => item.id === id);
  return task;
};

const createTask = async (task) => {
  TASKS.push(task);
  return task;
};

const deleteTask = async (taskId) => {
  TASKS = TASKS.filter((item) => item.id !== taskId);
  return taskId;
};

const updateTask = async (taskId, task) => {
  TASKS = TASKS.map((item) => {
    if (item.id === taskId) {
      return task;
    }
    return item;
  });
  return task;
};

module.exports = { getAll, getTaskById, createTask, deleteTask, updateTask };
