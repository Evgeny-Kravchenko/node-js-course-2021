const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const {
    params: { boardId },
  } = req;
  const tasks = await tasksService.getAll(boardId);
  if (Array.isArray(tasks)) {
    res.status(200);
    res.json(tasks.map(Task.toResponse));
  } else {
    res.status(404);
    res.json({ message: "There aren't tasks with such boardId" });
  }
});

router.route('/:taskId').get(async (req, res) => {
  const {
    params: { boardId, taskId },
  } = req;
  const task = await tasksService.getTaskById(boardId, taskId);
  if (!task) {
    res.status(404);
    res.json({ message: "Task with such parameters isn't find" });
  }
  res.status(200);
  res.json(task);
});

router.route('/').post(async (req, res) => {
  const {
    body,
    params: { boardId },
  } = req;
  try {
    const task = await tasksService.createTask({ ...body, boardId });
    res.status(201);
    res.json(task);
  } catch {
    res.status(500);
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const {
    params: { boardId, taskId },
  } = req;
  try {
    const result = await tasksService.deleteTasks(boardId, [taskId]);
    if (result === null) {
      res.status(400);
      res.json({ message: 'Bad request' });
    }
    res.status(204);
    res.json({ boardId, taskId });
  } catch {
    res.status(500);
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/:taskId').put(async (req, res) => {
  const {
    params: { boardId, taskId },
    body,
  } = req;
  try {
    await tasksService.updateTask(boardId, taskId, body);
    res.status(200);
    res.json({ message: 'Task is updated successfully' });
  } catch (err) {
    res.status(500);
    res.json({ message: 'Something went wrong' });
  }
});

module.exports = router;
