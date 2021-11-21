import * as tasksRepo from './task.memory.repository';
import { ITask } from '../../common/types';
import Task from '../../entities/Task';
import * as boardsService from '../boards/boards.service';

const getAll = async (boardId: string): Promise<Task[] | null> => {
  const boardExist = await boardsService.checkIfBoardExist(boardId);
  if (!boardExist) {
    return null;
  }
  return tasksRepo.getAll(boardId);
};

const getTaskById = async (
  boardId: string,
  taskId: string
): Promise<Task | undefined> => {
  const boardExist = await boardsService.checkIfBoardExist(boardId);
  if (!boardExist) {
    return undefined;
  }
  const task = await tasksRepo.getTaskById(taskId);
  return task;
};

const createTask = async (dto: Omit<ITask, 'id'>): Promise<Task> => {
  return tasksRepo.createTask(dto);
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
  dto: ITask
): Promise<Task> => {
  return tasksRepo.updateTask(taskId, dto);
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
