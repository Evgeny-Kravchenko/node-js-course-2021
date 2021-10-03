const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = async (boardId) => tasksRepo.getAll(boardId);

const getTaskById = async (boardId, taskId) => {
  const task = await tasksRepo.getTaskById(taskId);
  return task;
};

const createTask = async (body) => {
  const { title, order, description, userId, boardId, columnId } = body;
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

  tasksRepo.createTask(task);

  return Task.toResponse(task);
};

const deleteTasks = async (boardId, taskIds) => {
  taskIds.forEach(async (taskId) => {
    const task = await getTaskById(boardId, taskId);
    if (task && task.boardId === boardId) {
      await tasksRepo.deleteTask(taskId);
    }
  });
};

const deleteTasksByBoardId = async (boardId) => {
  const tasks = await tasksRepo.getAll(boardId);
  tasks.forEach((task) => {
    tasksRepo.deleteTask(task.id);
  });
};

const unassignTasks = async (userId) => {
  const tasks = await tasksRepo.getAll(userId, 'userId');
  tasks.forEach((task) => {
    tasksRepo.updateTask(task.id, { ...task, userId: null });
  });
};

const updateTask = async (boardId, taskId, body) => {
  const newTask = { ...body, id: taskId };
  tasksRepo.updateTask(taskId, newTask);
  return Task.toResponse(newTask);
};

module.exports = {
  getAll,
  getTaskById,
  createTask,
  deleteTasks,
  deleteTasksByBoardId,
  unassignTasks,
  updateTask,
};
