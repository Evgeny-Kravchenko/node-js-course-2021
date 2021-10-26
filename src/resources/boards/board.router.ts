import { Router } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Board } from './board.model';
import * as boardsService from './boards.service';
import taskRouter from '../tasks/task.router';

import { ValidationError, NotFoundError } from '../../error-handling/errors';

const router = Router();

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200);
  res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res, next) => {
  const {
    params: { boardId },
  } = req;

  try {
    if (!boardId) {
      throw new ValidationError();
    }

    const board = await boardsService.getById(boardId);
    if (!board) {
      throw new NotFoundError();
    }
    res.status(StatusCodes.OK);
    res.json(board);
  } catch (err) {
    next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  const { body } = req;
  try {
    if (!body.title || !body.columns) {
      throw new ValidationError();
    }

    const board = await boardsService.createBoard(body);
    res.status(StatusCodes.CREATED);
    res.json(board);
  } catch (err) {
    next(err);
  }
});

router.route('/:boardId').put(async (req, res, next) => {
  const {
    params: { boardId },
    body,
  } = req;
  try {
    if (!boardId || !body.title || !body.columns) {
      throw new ValidationError();
    }

    const board = await boardsService.updateBoard(boardId, body);
    if (!board) {
      throw new NotFoundError();
    }
    res.status(StatusCodes.OK);
    res.json({ message: getReasonPhrase(StatusCodes.OK) });
  } catch (err) {
    next(err);
  }
});

router.route('/:boardId').delete(async (req, res, next) => {
  const {
    params: { boardId },
  } = req;
  try {
    if (!boardId) {
      throw new ValidationError();
    }

    const isDeleted = await boardsService.deleteBoard(boardId);
    if (!isDeleted) {
      throw new NotFoundError();
    }
    res.status(StatusCodes.NO_CONTENT);
    res.json({ boardId });
  } catch (err) {
    next(err);
  }
});

router.use('/:boardId/tasks', taskRouter);

export default router;
