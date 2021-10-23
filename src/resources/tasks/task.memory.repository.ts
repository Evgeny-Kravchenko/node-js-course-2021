import { ITask } from './task.model';

let TASKS: ITask[] = [];

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
  id: string,
  parameterToSearch: keyof ITask = 'boardId'
): Promise<ITask[]> => {
  const tasks = TASKS.filter((item) => item[parameterToSearch] === id);
  return tasks;
};

/**
 * The function returns a task by id
 * @memberof TasksRepository
 * @param {string} id The id of a task
 * @returns {Task} Got task by id
 */
const getTaskById = async (id: string): Promise<ITask | undefined> => {
  const task = TASKS.find((item) => item.id === id);
  return task;
};

/**
 * The function create a task
 * @memberof TasksRepository
 * @param {Task} task This is a task that will be created in the repository
 * @returns {Task} Created task
 */

const createTask = async (task: ITask): Promise<ITask> => {
  TASKS.push(task);
  return task;
};

/**
 * The function delete a task
 * @memberof TasksRepository
 * @param {string} taskId The id of a task that will be deleted
 */

const deleteTask = async (
  taskId: string | undefined
): Promise<string | undefined> => {
  TASKS = TASKS.filter((item) => item.id !== taskId);
  return taskId;
};

/**
 * The function updates a task
 * @memberof TasksRepository
 * @param {string} taskId The id of a task that will be updated
 * @param {Task} task Data to update a task
 * @returns {Task} Updated task
 */

const updateTask = async (
  taskId: string | undefined,
  task: ITask
): Promise<ITask> => {
  TASKS = TASKS.map((item) => {
    if (item.id === taskId) {
      return task;
    }
    return item;
  });
  return task;
};

export { getAll, getTaskById, createTask, deleteTask, updateTask };
