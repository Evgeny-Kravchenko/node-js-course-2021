import * as tasksRepo from './task.memory.repository';
import { Task, ITask } from './task.model';
import * as boardsService from '../boards/boards.service';

const getAll = async (boardId: string): Promise<ITask[] | null> => {
  const boardExist = await boardsService.checkIfBoardExist(boardId);
  if (!boardExist) {
    return null;
  }
  return tasksRepo.getAll(boardId);
};

const getTaskById = async (
  boardId: string,
  taskId: string
): Promise<ITask | undefined> => {
  const task = await tasksRepo.getTaskById(taskId);
  return task;
};

const createTask = async (body: Omit<ITask, 'id'>): Promise<ITask> => {
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

const deleteTasks = async (
  boardId: string,
  taskIds: string[]
): Promise<void> => {
  taskIds.forEach(async (taskId) => {
    const task = await getTaskById(boardId, taskId);
    if (task && task.boardId === boardId) {
      await tasksRepo.deleteTask(taskId);
    }
  });
};

const deleteTasksByBoardId = async (boardId: string): Promise<void> => {
  const tasks = await tasksRepo.getAll(boardId);
  tasks.forEach((task) => {
    tasksRepo.deleteTask(task.id);
  });
};

const unassignTasks = async (userId: string): Promise<void> => {
  const tasks = await tasksRepo.getAll(userId, 'userId');
  tasks.forEach((task) => {
    tasksRepo.updateTask(task.id, { ...task, userId: null });
  });
};

const updateTask = async (
  boardId: string,
  taskId: string,
  body: ITask
): Promise<ITask> => {
  const newTask = { ...body, id: taskId };
  tasksRepo.updateTask(taskId, newTask);
  return Task.toResponse(newTask);
};

export {
  getAll,
  getTaskById,
  createTask,
  deleteTasks,
  deleteTasksByBoardId,
  unassignTasks,
  updateTask,
};
