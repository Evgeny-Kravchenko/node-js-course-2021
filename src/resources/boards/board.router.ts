import { Router } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Board } from './board.model';
import * as boardsService from './boards.service';
import taskRouter from '../tasks/task.router';

const router = Router();

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200);
  res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  const {
    params: { boardId },
  } = req;
  if (boardId) {
    const board = await boardsService.getById(boardId);
    if (board) {
      res.status(StatusCodes.OK);
      res.json(board);
    } else {
      res.status(StatusCodes.NOT_FOUND);
      res.json({ message: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
});

router.route('/').post(async (req, res) => {
  const { body } = req;
  if (!body.title || !body.columns) {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
  try {
    const board = await boardsService.createBoard(body);
    res.status(StatusCodes.CREATED);
    res.json(board);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
});

router.route('/:boardId').put(async (req, res) => {
  const {
    params: { boardId },
    body,
  } = req;
  if (boardId) {
    try {
      await boardsService.updateBoard(boardId, body);
      res.status(StatusCodes.OK);
      res.json({ message: getReasonPhrase(StatusCodes.OK) });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      res.json({ message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
});

router.route('/:boardId').delete(async (req, res) => {
  const {
    params: { boardId },
  } = req;
  if (boardId) {
    await boardsService.deleteBoard(boardId);
    res.status(StatusCodes.NO_CONTENT);
    res.json({ boardId });
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    res.json({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }
});

router.use('/:boardId/tasks', taskRouter);

export default router;
