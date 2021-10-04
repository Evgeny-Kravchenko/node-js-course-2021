const router = require('express').Router({ mergeParams: true });
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const Task = require('./task.model');
const tasksService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const {
    params: { boardId },
  } = req;
  const tasks = await tasksService.getAll(boardId);
  if (Array.isArray(tasks)) {
    res.status(StatusCodes.OK);
    res.json(tasks.map(Task.toResponse));
  } else {
    res.status(StatusCodes.NOT_FOUND);
    res.json({ message: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
});

router.route('/:taskId').get(async (req, res) => {
  const {
    params: { boardId, taskId },
  } = req;
  if (taskId) {
    const task = await tasksService.getTaskById(boardId, taskId);
    if (!task) {
      res.status(StatusCodes.NOT_FOUND);
      res.json({ message: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
    res.status(StatusCodes.OK);
    res.json(task);
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
});

router.route('/').post(async (req, res) => {
  const {
    body,
    params: { boardId },
  } = req;
  if (boardId) {
    try {
      const task = await tasksService.createTask({ ...body, boardId });
      res.status(StatusCodes.CREATED);
      res.json(task);
    } catch {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const {
    params: { boardId, taskId },
  } = req;
  if (boardId && taskId) {
    try {
      await tasksService.deleteTasks(boardId, [taskId]);
      res.status(StatusCodes.NO_CONTENT);
      res.json({ boardId, taskId });
    } catch {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
});

router.route('/:taskId').put(async (req, res) => {
  const {
    params: { boardId, taskId },
    body,
  } = req;
  if (boardId && taskId) {
    try {
      await tasksService.updateTask(boardId, taskId, body);
      res.status(StatusCodes.OK);
      res.json({ message: 'Task is updated successfully' });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
});

module.exports = router;
