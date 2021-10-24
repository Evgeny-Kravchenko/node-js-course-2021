import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ValidationError, NotFoundError } from '../../error-handling/errors';

import { Task } from './task.model';
import * as tasksService from './tasks.service';

const router = Router({ mergeParams: true });

router.route('/').get<{ boardId: string }>(async (req, res, next) => {
  const {
    params: { boardId },
  } = req;
  try {
    if (!boardId) {
      throw new ValidationError();
    }
    const tasks = await tasksService.getAll(boardId);
    if (!Array.isArray(tasks)) {
      throw new NotFoundError();
    }
    res.status(StatusCodes.OK);
    res.json(tasks.map(Task.toResponse));
  } catch (err) {
    next(err);
  }
});

router
  .route('/:taskId')
  .get<{ boardId: string; taskId: string }>(async (req, res, next) => {
    const {
      params: { boardId, taskId },
    } = req;
    try {
      if (!taskId) {
        throw new ValidationError();
      }

      const task = await tasksService.getTaskById(boardId, taskId);
      if (!task) {
        throw new NotFoundError();
      }
      res.status(StatusCodes.OK);
      res.json(task);
    } catch (err) {
      next(err);
    }
  });

router.route('/').post<{ boardId: string }>(async (req, res, next) => {
  const {
    body,
    params: { boardId },
  } = req;
  try {
    if (!boardId) {
      throw new ValidationError();
    }

    const task = await tasksService.createTask({ ...body, boardId });
    res.status(StatusCodes.CREATED);
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router
  .route('/:taskId')
  .delete<{ boardId: string; taskId: string }>(async (req, res, next) => {
    const {
      params: { boardId, taskId },
    } = req;
    try {
      if (!boardId || !taskId) {
        throw new ValidationError();
      }

      await tasksService.deleteTasks(boardId, [taskId]);
      res.status(StatusCodes.NO_CONTENT);
      res.json({ boardId, taskId });
    } catch (err) {
      next(err);
    }
  });

router
  .route('/:taskId')
  .put<{ boardId: string; taskId: string }>(async (req, res, next) => {
    const {
      params: { boardId, taskId },
      body,
    } = req;
    try {
      if (!boardId || !taskId) {
        throw new ValidationError();
      }

      await tasksService.updateTask(boardId, taskId, body);
      res.status(StatusCodes.OK);
      res.json({ message: 'Task is updated successfully' });
    } catch (err) {
      next(err);
    }
  });

export default router;
