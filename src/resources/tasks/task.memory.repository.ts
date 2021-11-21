import { getRepository } from 'typeorm';
import Task from '../../entities/Task';
import { ITask } from '../../common/types';

/**
 * @namespace TasksRepository
 */

/**
 *
 * @typedef {Object} Task
 * @property {string} id The id of a task
 * @property {string} title The title of a task
 * @property {number} order The order of a task
 * @property {string} description The description of a task
 * @property {string} userId The user id that a task assibned to
 * @property {string} boardId The board id that a task belong to
 * @property {string} columnId The column where a task is
 */

/**
 * This function returns all tasks by searching parameter and value
 * @memberof TasksRepository
 * @param {String} id This is a value that will be used to find task
 * @param {String} parameterToSearch This is a key of a value
 * @returns {Task[]} Array of tasks
 */
const getAll = async (
  value: string,
  parameterToSearch: keyof ITask = 'boardId'
): Promise<Task[]> => {
  const taskRepo = getRepository(Task);
  const tasks = taskRepo.find({
    where: { [parameterToSearch]: value },
  });
  return tasks;
};

/**
 * The function returns a task by id
 * @memberof TasksRepository
 * @param {string} id The id of a task
 * @returns {Task} Got task by id
 */
const getTaskById = async (id: string): Promise<Task | undefined> => {
  const taskRepo = getRepository(Task);
  return taskRepo.findOne(id);
};

/**
 * The function create a task
 * @memberof TasksRepository
 * @param {Task} task This is a task that will be created in the repository
 * @returns {Task} Created task
 */

const createTask = async (dto: ITask): Promise<Task> => {
  const taskRepo = getRepository(Task);
  const createdTask = taskRepo.create(dto as Task);
  const savedTask = await taskRepo.save(createdTask);
  return savedTask;
};

/**
 * The function delete a task
 * @memberof TasksRepository
 * @param {string} taskId The id of a task that will be deleted
 */

const deleteTask = async (taskId: string): Promise<boolean> => {
  const taskRepo = getRepository(Task);
  const deletedRes = await taskRepo.delete(taskId);
  return Boolean(deletedRes.affected);
};

/**
 * The function updates a task
 * @memberof TasksRepository
 * @param {string} taskId The id of a task that will be updated
 * @param {Task} task Data to update a task
 * @returns {Task} Updated task
 */

const updateTask = async (taskId: string, dto: ITask): Promise<Task> => {
  const taskRepo = getRepository(Task);
  const updatedRes = await taskRepo.update(taskId, dto as Task);
  return updatedRes.raw;
};

export { getAll, getTaskById, createTask, deleteTask, updateTask };
